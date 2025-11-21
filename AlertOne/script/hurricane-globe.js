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
            position: { longitude: 0, latitude: 20, z: 15000000 },
            tilt: 15
        },
        environment: {
            atmosphere: { quality: "high" },
            lighting: { directShadowsEnabled: true, date: new Date() }
        },
        ui: { components: ["attribution"] }
    });

    view.when(() => view.ui.remove("attribution"));

    // -------------------------------------------------------
    // COLORS (HURRICANE INTENSITY)
    // -------------------------------------------------------
    function getWindColor(wind) {
        if (wind < 63)  return [139, 195, 74, 200];  // TD
        if (wind < 118) return [76, 175, 80, 200];   // TS
        if (wind < 153) return [46, 125, 50, 200];   // Cat1
        if (wind < 177) return [27, 94, 32, 200];    // Cat2
        if (wind < 208) return [13, 77, 26, 200];    // Cat3
        if (wind < 251) return [11, 63, 23, 200];    // Cat4
        return [8, 47, 18, 220];                     // Cat5
    }

    function getWindSize(wind) {
        return Math.max(10, wind / 10);
    }

    // -------------------------------------------------------
    // FETCH HURRICANES – IBTrACS (last 30 years)
    // -------------------------------------------------------
    async function fetchHurricanes(minWind, basin, limit) {

        const loading = document.getElementById("loading");
        loading.classList.add("active");

        const endYear = new Date().getFullYear();
        const startYear = endYear - 30;

        const url = `https://ibtracs5474.herokuapp.com/api/tracks?start=${startYear}&end=${endYear}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            let storms = data.tracks;

            // Basin filter
            if (basin !== "all") {
                storms = storms.filter(s => s.basin === basin.toUpperCase());
            }

            // Flatten points
            let points = [];
            storms.forEach(storm => {
                storm.data.forEach(p => {
                    if (p.wmo_wind && p.wmo_wind >= minWind) {
                        points.push({
                            name: storm.name,
                            basin: storm.basin,
                            lat: p.lat,
                            lon: p.lon,
                            wind: p.wmo_wind,
                            time: p.iso_time
                        });
                    }
                });
            });

            points = points.slice(0, limit);

            graphicsLayer.removeAll();

            points.forEach(p => {

                const point = {
                    type: "point",
                    longitude: p.lon,
                    latitude: p.lat,
                    z: 0
                };

                const symbol = {
                    type: "simple-marker",
                    color: getWindColor(p.wind),
                    size: getWindSize(p.wind),
                    outline: {
                        color: [255, 255, 255, 80],
                        width: 1.2
                    }
                };

                const graphic = new Graphic({
                    geometry: point,
                    symbol: symbol,
                    attributes: {
                        name: p.name,
                        wind: p.wind,
                        time: p.time,
                        basin: p.basin
                    },
                    popupTemplate: {
                        title: "{name}",
                        content: `
                            <b>Wind Speed:</b> {wind} km/h<br>
                            <b>Basin:</b> {basin}<br>
                            <b>Time:</b> {time}
                        `
                    }
                });

                graphicsLayer.add(graphic);
            });

            displayTopHurricanes(points);
            loading.classList.remove("active");

        } catch (e) {
            console.error(e);
            loading.classList.remove("active");
            alert("Error loading hurricane data.");
        }
    }

    // -------------------------------------------------------
    // TOP 10 PANEL (same structure)
    // -------------------------------------------------------
    function displayTopHurricanes(features) {

        const panel = document.getElementById("biggestEarthquakes");
        const list = document.getElementById("earthquakeList");

        if (features.length === 0) {
            panel.classList.remove("active");
            return;
        }

        const top10 = features
            .sort((a, b) => b.wind - a.wind)
            .slice(0, 10);

        list.innerHTML = "";

        top10.forEach(h => {

            const color = getWindColor(h.wind);
            const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

            const el = document.createElement("div");
            el.className = "earthquake-item";
            el.style.borderTopColor = colorString;

            const t = new Date(h.time).toLocaleString();

            el.innerHTML = `
                <div class="mag" style="color:${colorString}">
                    ${h.wind} km/h
                </div>
                <div class="location">${h.name}</div>
                <div class="time">${t}</div>
            `;

            el.addEventListener("click", () => {
                document.getElementById("infoPanel").style.display = "block";

                document.getElementById("infoTitle").textContent = h.name;
                document.getElementById("infoMagnitude").textContent = `Wind: ${h.wind} km/h`;
                document.getElementById("infoLocation").textContent = `Basin: ${h.basin}`;
                document.getElementById("infoTime").textContent = `Time: ${t}`;
                document.getElementById("infoDepth").textContent = ``; // hurricanes have no depth
            });

            list.appendChild(el);
        });

        panel.classList.add("active");
    }

    // Form behavior
    document.getElementById("searchForm").addEventListener("submit", e => {
        e.preventDefault();
        const minWind = parseInt(document.getElementById("minMagnitude").value);
        const basin    = document.getElementById("country").value;
        const limit    = parseInt(document.getElementById("limit").value);

        fetchHurricanes(minWind, basin, limit);
    });

    fetchHurricanes(100, "all", 200);
});
function getMagnitudeColor(magnitude) 
{
    if (magnitude < 3) return [167, 245, 216, 220];   
    if (magnitude < 5) return [111, 239, 204, 220];   
    if (magnitude < 6) return [46, 217, 183, 220];    
    if (magnitude < 7) return [14, 179, 149, 230];    
    return [0, 137, 123, 240];                      
}
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/projection",
  "esri/widgets/Legend",
  "esri/core/promiseUtils"
], function(
  Map, SceneView, GraphicsLayer, Graphic, Point, Polyline, projection, Legend, promiseUtils
) {

  const trackLayer = new GraphicsLayer();
  const pointLayer = new GraphicsLayer();

  const map = new Map({
    basemap: "dark-gray-vector",
    ground: "world-elevation",
    layers: [trackLayer, pointLayer]
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: { longitude: 0, latitude: 20, z: 15000000 },
      tilt: 15
    },
    environment: {
      atmosphere: { quality: "high" },
      lighting: { directShadowsEnabled: true, date: new Date() }
    }
  });

  view.when(() => view.ui.add(new Legend({ view, layerInfos: [
    { layer: pointLayer, title: "Hurricane Points" },
    { layer: trackLayer, title: "Hurricane Tracks" }
  ] }), "bottom-right"));

  // Цветова функция (аква-зелени нюанси)
  function getWindColor(wind) {
    if (wind < 63) return [167, 245, 216, 200];
    if (wind < 118) return [111, 239, 204, 200];
    if (wind < 153) return [46, 217, 183, 200];
    if (wind < 177) return [14, 179, 149, 220];
    return [0, 137, 123, 240];
  }

  function getWindSize(wind) {
    return Math.max(6, wind / 10);
  }

  // Зареждам CSV данни
  fetch("path/to/hurricane-data.csv")
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.split("\n");
      const header = lines[0].split(",");
      const idx = {
        lat: header.indexOf("LAT"),
        lon: header.indexOf("LON"),
        wind: header.indexOf("WIND"),
        time: header.indexOf("ISO_TIME"),
        trackId: header.indexOf("TRACK_ID")
      };

      // Групиране по track
      const tracks = {};
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",");
        if (row.length !== header.length) continue;

        const lat = parseFloat(row[idx.lat]);
        const lon = parseFloat(row[idx.lon]);
        const wind = parseFloat(row[idx.wind]);
        const time = row[idx.time];
        const tid = row[idx.trackId];

        if (!tracks[tid]) tracks[tid] = [];
        tracks[tid].push({ lat, lon, wind, time });
      }

      // Проектиране и създаване на графики
      const promises = Object.values(tracks).map(track => {
        const points = track.map(p => new Point({ longitude: p.lon, latitude: p.lat }));
        const polyline = new Polyline({
          paths: [points.map(pt => [pt.longitude, pt.latitude])]
        });

        // Добавяне на линия
        trackLayer.add(new Graphic({
          geometry: polyline,
          symbol: {
            type: "simple-line",
            color: "#00e0ff",
            width: 2
          }
        }));

        // Добавяне точки
        track.forEach(p => {
          const pt = new Point({ longitude: p.lon, latitude: p.lat });
          pointLayer.add(new Graphic({
            geometry: pt,
            symbol: {
              type: "simple-marker",
              color: getWindColor(p.wind),
              size: getWindSize(p.wind),
              outline: { color: [255,255,255,150], width: 1 }
            },
            attributes: {
              wind: p.wind,
              time: p.time
            },
            popupTemplate: {
              title: "Hurricane Observation",
              content: `<b>Wind:</b> {wind} knots<br><b>Time:</b> {time}`
            }
          }));
        });
      });

      return promiseUtils.eachAlways(promises);
    })
    .catch(err => console.error("Error loading CSV:", err));
});
