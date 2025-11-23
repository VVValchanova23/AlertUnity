require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/Home",
  "esri/widgets/Compass"
], function(Map, SceneView, FeatureLayer, Legend, Expand, Home, Compass) {
  
  // Create the 3D map
  const map = new Map({
    basemap: "dark-gray-vector",
    ground: "world-elevation"
  });
  
  // Create the 3D scene view - global view
  const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: {
        x: 20,
        y: 20,
        z: 30000000
      },
      tilt: 0,
      heading: 0
    },
    environment: {
      atmosphere: {
        quality: "high"
      },
      lighting: {
        date: new Date(),
        directShadowsEnabled: true
      }
    }
  });
  
  // Global fire data using NASA FIRMS (last 7 days of active fires)
  const globalFiresLayer = new FeatureLayer({
    url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/MODIS_Thermal_v1/FeatureServer/0",
    title: "Global Active Fires (MODIS)",
    outFields: ["*"],
    popupTemplate: {
      title: "Fire Detection",
      content: [
        {
          type: "fields",
          fieldInfos: [
            { fieldName: "ACQ_DATE", label: "Detection Date" },
            { fieldName: "ACQ_TIME", label: "Detection Time" },
            { fieldName: "CONFIDENCE", label: "Confidence Level" },
            { fieldName: "BRIGHT_T31", label: "Brightness (K)", format: { places: 1 } },
            { fieldName: "FRP", label: "Fire Radiative Power (MW)", format: { places: 1 } }
          ]
        }
      ]
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [{
          type: "object",
          resource: { primitive: "cylinder" },
          material: { color: [255, 69, 0, 0.9] },
          width: 20000,
          depth: 20000,
          height: 50000
        }]
      },
      visualVariables: [
        {
          type: "size",
          field: "FRP",
          axis: "height",
          stops: [
            { value: 0, size: 10000 },
            { value: 50, size: 50000 },
            { value: 200, size: 150000 },
            { value: 500, size: 300000 }
          ]
        },
        {
          type: "color",
          field: "CONFIDENCE",
          stops: [
            { value: 0, color: [255, 235, 59, 0.7] },
            { value: 50, color: [255, 152, 0, 0.8] },
            { value: 80, color: [244, 67, 54, 0.9] },
            { value: 100, color: [183, 28, 28, 0.95] }
          ]
        }
      ]
    }
  });
  
  map.add(globalFiresLayer);
  
  // Region presets
  const regions = {
    global: { x: 0, y: 20, z: 30000000, tilt: 0 },
    northAmerica: { x: -100, y: 40, z: 3000000, tilt: 45 },
    southAmerica: { x: -60, y: -10, z: 3500000, tilt: 45 },
    europe: { x: 15, y: 50, z: 2500000, tilt: 45 },
    africa: { x: 20, y: 0, z: 4000000, tilt: 45 },
    asia: { x: 100, y: 35, z: 4500000, tilt: 45 },
    australia: { x: 135, y: -25, z: 3000000, tilt: 45 },
    russia: { x: 100, y: 65, z: 4000000, tilt: 45 },
    middleEast: { x: 50, y: 30, z: 2500000, tilt: 45 }
  };
  
  // Region selector
  document.getElementById('region-select').addEventListener('change', (e) => {
    const region = regions[e.target.value];
    view.goTo({
      position: region,
      heading: 0
    }, {
      duration: 2000
    });
  });
  
  // Time range selector
  document.getElementById('time-range').addEventListener('change', (e) => {
    const days = parseInt(e.target.value);
    const now = new Date();
    const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    globalFiresLayer.definitionExpression = `ACQ_DATE >= DATE '${formatDate(startDate)}'`;
    updateFireStats();
  });
  
  // Add Home widget
  const homeBtn = new Home({
    view: view
  });
  view.ui.add(homeBtn, "top-left");
  
  // Add Compass widget
  const compass = new Compass({
    view: view
  });
  view.ui.add(compass, "top-left");
  
  // Add Legend
  const legend = new Legend({
    view: view,
    style: "card"
  });
  
  const legendExpand = new Expand({
    view: view,
    content: legend,
    expanded: false
  });
  view.ui.add(legendExpand, "bottom-left");
  
  // Update fire statistics
  function updateFireStats() {
    const query = globalFiresLayer.createQuery();
    query.where = globalFiresLayer.definitionExpression || "1=1";
    query.outStatistics = [
      {
        statisticType: "count",
        onStatisticField: "OBJECTID",
        outStatisticFieldName: "fire_count"
      },
      {
        statisticType: "avg",
        onStatisticField: "FRP",
        outStatisticFieldName: "avg_frp"
      }
    ];
    
    globalFiresLayer.queryFeatures(query).then((result) => {
      if (result.features.length > 0) {
        const stats = result.features[0].attributes;
        document.getElementById('fire-count').textContent = stats.fire_count ? stats.fire_count.toLocaleString() : '0';
        document.getElementById('avg-intensity').textContent = stats.avg_frp ? Math.round(stats.avg_frp).toLocaleString() : '0';
      }
    }).catch(err => {
      console.error("Query error:", err);
    });
  }
        
  // Initialize
  view.when(() => {
    document.getElementById('loading').style.display = 'none';
    updateFireStats();
  }).catch(err => {
    console.error("View error:", err);
    document.getElementById('loading').textContent = 'Error loading map';
  });
});