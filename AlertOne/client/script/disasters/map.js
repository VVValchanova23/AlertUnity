import { db } from "../../data/firebase-config.js";
import { collection, onSnapshot, getDocs, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

// Configuration for different disaster types
const DISASTER_MAP_CONFIGS = {
  fire: {
    collection: "fires",
    markerColors: {
      low: '#4ade80',
      medium: '#f97316',
      high: '#dc2626'
    },
    title: "Fire Report",
    routeColor: '#ff4500'
  },
  flood: {
    collection: "floods",
    markerColors: {
      low: '#4ade80',
      medium: '#f97316',
      high: '#dc2626'
    },
    title: "Flood Report",
    routeColor: '#3b82f6'
  },
  hurricane: {
    collection: "hurricanes",
    markerColors: {
      low: '#4ade80',
      medium: '#f97316',
      high: '#dc2626'
    },
    title: "Hurricane Report",
    routeColor: '#1da364'
  },
  earthquake: {
    collection: "earthquakes",
    markerColors: {
      low: '#4ade80',
      medium: '#f97316',
      high: '#dc2626'
    },
    title: "Earthquake Report",
    routeColor: '#ebe0cc'
  }
};

// Initialize disaster map
function initDisasterMap(disasterType, mapboxToken, initialCenter = [25.4858, 42.7339], initialZoom = 6) {
  const config = DISASTER_MAP_CONFIGS[disasterType];
  
  if (!config) {
    console.error(`Unknown disaster type: ${disasterType}`);
    return;
  }

  mapboxgl.accessToken = mapboxToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: initialCenter,
    zoom: initialZoom
  });

  let markers = [];
  let disasterData = [];
  let currentUserInfo = null;
  let userMarker = null;

  const auth = getAuth();

  // Auth state listener
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          currentUserInfo = { uid: user.uid, ...userDocSnap.data() };
          startDisasterListener();
        } else {
          alert("User data not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      currentUserInfo = null;
    }
  });

  // Create popup content
  function createPopupContent(disaster) {
    const isResponder = currentUserInfo?.role === "firefighter" || currentUserInfo?.role.includes("rescuer");

    return `
      <div class="popup-content">
        <h3 class="popup-title">${config.title}</h3>
        <p><strong>Severity:</strong> ${disaster.severity}</p>
        <p><strong>Address:</strong> ${disaster.address}</p>
        <p><strong>Description:</strong> ${disaster.description}</p>
        <p><strong>Reported:</strong> ${disaster.timestamp?.toDate().toLocaleString() ?? 'Unknown'}</p>
        ${isResponder ? `
          <button class="get-route-btn btn-primary" data-id="${disaster.id}" style="border-radius: 10px; padding: 10px; self-align: center; margin-top:10px; cursor:pointer;">Get Route</button>
          <button class="deactivate-btn btn-secondary" data-id="${disaster.id}" style="border-radius: 10px; padding: 10px; margin-top:10px; cursor:pointer;">Mark as Inactive</button>
          ` : ''}
      </div>
    `;
  }

  // Get color by severity
  function getColorBySeverity(severity) {
    return config.markerColors[severity] || 'gray';
  }

  // Render markers
  function renderMarkers(disasters) {
    disasters = disasters.filter(disaster => disaster.status === 'active');

    markers.forEach(marker => marker.remove());
    markers = [];

    disasters.forEach(disaster => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = getColorBySeverity(disaster.severity);
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';

      const marker = new mapboxgl.Marker(el)
        .setLngLat(disaster.coords)
        .setPopup(new mapboxgl.Popup().setHTML(createPopupContent(disaster)))
        .addTo(map);

      markers.push(marker);
    });

    // Update stats
    document.getElementById('activeCount').textContent = disasters.length;
    const highSeverityCount = disasters.filter(d => d.severity === 'high').length;
    document.getElementById('highCount').textContent = highSeverityCount;
    document.getElementById('lastUpdate').textContent = new Date().toTimeString().slice(0, 9);
  }

  // Fetch latest disasters
  async function fetchLatestDisasters() {
    const disastersCollection = collection(db, config.collection);
    const snapshot = await getDocs(disastersCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Toggle layer
  async function toggleLayer(type) {
    disasterData = await fetchLatestDisasters();

    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    switch (type) {
      case 'all':
        renderMarkers(disasterData);
        buttons[0].classList.add('active');
        break;
      case 'high':
        const highSeverityDisasters = disasterData.filter(d => d.severity === 'high');
        renderMarkers(highSeverityDisasters);
        buttons[1].classList.add('active');
        break;
      case 'recent':
        const now = new Date();
        const recentDisasters = disasterData.filter(d => {
          const reportedTime = new Date(d.timestamp?.toDate() ?? d.time);
          const diffHours = (now - reportedTime) / (1000 * 60 * 60);
          return diffHours <= 24;
        });
        renderMarkers(recentDisasters);
        buttons[2].classList.add('active');
        break;
    }
  }

  // Refresh data
  function refreshData() {
    toggleLayer('all');
    const refreshBtn = document.querySelector('.control-btn:last-child');
    refreshBtn.classList.add('active');
    setTimeout(() => refreshBtn.classList.remove('active'), 500);
  }

  // Setup controls
  function setupControls() {
    document.querySelector('.all-btn')?.addEventListener('click', () => toggleLayer('all'));
    document.querySelector('.high-btn')?.addEventListener('click', () => toggleLayer('high'));
    document.querySelector('.recent-btn')?.addEventListener('click', () => toggleLayer('recent'));
    document.querySelector('.refresh-btn')?.addEventListener('click', () => refreshData());
  }

  // Show route to disaster
  async function showRouteToDisaster(disasterCoords) {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
      const userCoords = [position.coords.longitude, position.coords.latitude];

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords[0]},${userCoords[1]};${disasterCoords[0]},${disasterCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
          alert("No route found.");
          return;
        }

        const route = data.routes[0].geometry;

        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        }

        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': config.routeColor,
            'line-width': 5,
            'line-opacity': 0.75
          }
        });

        const coordinates = route.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        map.fitBounds(bounds, { padding: 50 });

      } catch (error) {
        console.error("Error fetching directions:", error);
        alert("Failed to load route.");
      }
    }, () => {
      alert("Unable to retrieve your location.");
    });
  }

  // Event listeners for popup buttons
  document.body.addEventListener('click', async (event) => {
    if (event.target.classList.contains('get-route-btn')) {
      event.target.disabled = true;

      if (!currentUserInfo) {
        alert("User is not logged in.");
        event.target.disabled = false;
        return;
      }

      const disasterId = event.target.getAttribute('data-id');
      const disaster = disasterData.find(d => d.id === disasterId);
      if (!disaster) {
        alert("Disaster not found.");
        event.target.disabled = false;
        return;
      }

      showRouteToDisaster(disaster.coords);
    }

    if (event.target.classList.contains('deactivate-btn')) {
      const disasterId = event.target.getAttribute('data-id');
      const confirmDeactivation = confirm("Are you sure you want to mark this as inactive?");
      if (!confirmDeactivation) return;

      try {
        const disasterRef = doc(db, config.collection, disasterId);
        await updateDoc(disasterRef, {
          status: 'inactive'
        });

        alert("Marked as inactive.");
        renderMarkers(disasterData);
      } catch (error) {
        console.error("Failed to deactivate:", error);
        alert("Failed to mark as inactive.");
      }
    }
  });

  // User location marker
  const pulsingDot = document.createElement('div');
  pulsingDot.style.width = '20px';
  pulsingDot.style.height = '20px';
  pulsingDot.style.borderRadius = '50%';
  pulsingDot.style.backgroundColor = 'rgba(56, 135, 190, 1)';
  pulsingDot.style.border = '3px solid white';
  pulsingDot.style.position = 'relative';
  pulsingDot.style.cursor = 'pointer';
  pulsingDot.style.boxShadow = '0 0 0 0 rgba(0, 122, 255, 0.7)';
  pulsingDot.style.animation = 'pulse 2s infinite';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(0, 122, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 122, 255, 0);
      }
    }
  `;
  document.head.appendChild(style);

  // Show user location
  function showUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const userCoords = [position.coords.longitude, position.coords.latitude];

      if (!userMarker) {
        userMarker = new mapboxgl.Marker(pulsingDot)
          .setLngLat(userCoords)
          .addTo(map);

        userMarker.getElement().addEventListener('click', () => {
          new mapboxgl.Popup({ offset: 25 })
            .setLngLat(userCoords)
            .setHTML('<div style="font-weight:bold;">You</div>')
            .addTo(map);
        });

      } else {
        userMarker.setLngLat(userCoords);
      }
    }, () => {
      alert("Unable to retrieve your location.");
    });
  }

  // Start disaster listener
  function startDisasterListener() {
    const disastersCollection = collection(db, config.collection);
    onSnapshot(disastersCollection, snapshot => {
      disasterData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderMarkers(disasterData);
    });

    setupControls();
    showUserLocation();

    // Update user location every 30 seconds
    setInterval(showUserLocation, 30000);
  }
}

// Export for use in different pages
export { initDisasterMap, DISASTER_MAP_CONFIGS };