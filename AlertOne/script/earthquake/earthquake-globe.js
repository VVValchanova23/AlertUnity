require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function(Map, SceneView, Graphic, GraphicsLayer) {
    
    const graphicsLayer = new GraphicsLayer();
    
    const map = new Map({
        basemap: "dark-gray-vector",
        ground: "world-elevation",
        layers: [graphicsLayer]
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                longitude: 0,
                latitude: 20,
                z: 15000000
            },
            tilt: 15
        },
        environment: {
            atmosphere: {
                quality: "high"
            },
            lighting: {
                directShadowsEnabled: true,
                date: new Date()
            }
        },
        ui: {
            components: ["attribution"]
        }
    });

    view.when(() => {
        view.ui.remove("attribution");
    });

    function getMagnitudeColor(magnitude) 
    {
        if (magnitude < 3) return [212, 165, 116, 200];
        if (magnitude < 5) return [201, 148, 86, 200];
        if (magnitude < 6) return [184, 115, 51, 200];
        if (magnitude < 7) return [139, 90, 43, 200];
        
        return [93, 58, 26, 220];
    }

    function getMagnitudeSize(magnitude) 
    {
        return Math.pow(2, magnitude) * 2500;
    }

    async function fetchEarthquakes(minMag, days, limit) 
    {
        const loading = document.getElementById('loading');
        loading.classList.add('active');
        
        const endTime = new Date();
        const startTime = new Date(endTime - days * 24 * 60 * 60 * 1000);
        
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime.toISOString()}&endtime=${endTime.toISOString()}&minmagnitude=${minMag}&limit=${limit}&orderby=magnitude`;
        
        try 
        {
            const response = await fetch(url);
            const data = await response.json();
            
            // Filter by country
            const country = document.getElementById('country').value.trim();
            let filteredFeatures = data.features;
            
            if (country) 
            {
                filteredFeatures = data.features.filter(feature => 
                {
                    const place = feature.properties.place.toLowerCase();
                    return place.includes(country.toLowerCase());
                });
            }
            
            graphicsLayer.removeAll();
            
            filteredFeatures.forEach(feature => 
            {
                const coords = feature.geometry.coordinates;
                const props = feature.properties;
            
                const point = 
                {
                    type: "point",
                    longitude: coords[0],
                    latitude: coords[1],
                    z: 0
                };
            
                const symbol = 
                {
                    type: "simple-marker",
                    color: getMagnitudeColor(props.mag),
                    size: getMagnitudeSize(props.mag) / 50000,
                    outline: 
                    {
                        color: [255, 255, 255, 100],
                        width: 1.5
                    }
                };
            
                const graphic = new Graphic(
                {
                    geometry: point,
                    symbol: symbol,
                    attributes: 
                    {
                        magnitude: props.mag,
                        place: props.place,
                        time: new Date(props.time),
                        depth: coords[2],
                        title: props.title,
                        longitude: coords[0],
                        latitude: coords[1]
                    },
                    popupTemplate: 
                    {
                        title: "{title}",
                        content: `
                            <b>Magnitude:</b> {magnitude}<br>
                            <b>Depth:</b> {depth} km<br>
                            <b>Time:</b> {time}
                        `
                    }
                });
            
                graphicsLayer.add(graphic);
            });
            
            displayBiggestEarthquakes(filteredFeatures);
            
            loading.classList.remove('active');
            
            if (filteredFeatures.length > 0) 
            {
                const firstEarthquake = filteredFeatures[0];
                view.goTo(
                {
                    target: [firstEarthquake.geometry.coordinates[0], firstEarthquake.geometry.coordinates[1]],
                    zoom: 4
                });
            }
            
        }
        catch (error) 
        {
            console.error('Error fetching earthquakes:', error);
            loading.classList.remove('active');
            alert('Error loading earthquake data. Please try again.');
        }
    }

    function displayBiggestEarthquakes(features) 
    {
        const topPanel = document.getElementById('biggestEarthquakes');
        const listDiv = document.getElementById('earthquakeList');
        
        if (features.length === 0)
        {
            topPanel.classList.remove('active');
            return;
        }
    
        // Sort by magnitude and get top 10
        const biggestEarthquakes = features
            .sort((a, b) => b.properties.mag - a.properties.mag)
            .slice(0, 10);
    
        listDiv.innerHTML = '';
    
        biggestEarthquakes.forEach((feature, index) => 
        {
            const props = feature.properties;
            const coords = feature.geometry.coordinates;
            const color = getMagnitudeColor(props.mag);
            const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            
            const item = document.createElement('div');
            item.className = 'earthquake-item';
            item.style.borderTopColor = colorString;
            
            const date = new Date(props.time);
            const timeString = date.toLocaleString('en-US', 
            { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        
            item.innerHTML = `
            <div class="mag" style="color: ${colorString}">M ${props.mag.toFixed(1)}</div>
            <div class="location">${props.place}</div>
            <div class="time">${timeString}</div>
            `;
        
            item.addEventListener('click', () => 
            {
                const infoPanel = document.getElementById('infoPanel');
                document.getElementById('infoTitle').textContent = props.title;
                document.getElementById('infoMagnitude').textContent = `Magnitude: ${props.mag}`;
                document.getElementById('infoLocation').textContent = `Location: ${props.place}`;
                document.getElementById('infoTime').textContent = `Time: ${date.toLocaleString()}`;
                document.getElementById('infoDepth').textContent = `Depth: ${coords[2]} km`;
                infoPanel.style.display = 'block';
            
                const targetGraphic = graphicsLayer.graphics.find(g => 
                    g.attributes.longitude === coords[0] && 
                    g.attributes.latitude === coords[1] &&
                    g.attributes.magnitude === props.mag
                );
        
                if (targetGraphic) 
                {
                    view.popup.open({
                    features: [targetGraphic],
                    location: targetGraphic.geometry
                    });
                    
                    // Zoom to the location
                    view.goTo({
                    target: targetGraphic.geometry,
                    zoom: 6
                    }, {
                    duration: 1500
                    });
                }
            });
        
            listDiv.appendChild(item);
        });
    
        topPanel.classList.add('active');
    }


    view.on("click", function(event) 
    {
        view.hitTest(event).then(function(response) 
        {
            if (response.results.length) 
            {
                const graphic = response.results[0].graphic;

                if (graphic.attributes) 
                {
                    const infoPanel = document.getElementById('infoPanel');

                    document.getElementById('infoTitle').textContent = graphic.attributes.title || 'Earthquake';
                    document.getElementById('infoMagnitude').textContent = `Magnitude: ${graphic.attributes.magnitude}`;
                    document.getElementById('infoLocation').textContent = `Location: ${graphic.attributes.place}`;
                    document.getElementById('infoTime').textContent = `Time: ${graphic.attributes.time.toLocaleString()}`;
                    document.getElementById('infoDepth').textContent = `Depth: ${graphic.attributes.depth} km`;
                    infoPanel.style.display = 'block';
                }
            }
        });
    });

    document.getElementById('searchForm').addEventListener('submit', function(e) 
    {
        e.preventDefault();

        const minMag = parseFloat(document.getElementById('minMagnitude').value);
        const days = parseInt(document.getElementById('days').value);
        const limit = parseInt(document.getElementById('limit').value);

        fetchEarthquakes(minMag, days, limit);
    });

    fetchEarthquakes(4.5, 7, 100);
});