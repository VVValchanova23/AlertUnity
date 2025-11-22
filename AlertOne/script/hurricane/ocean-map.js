const [Map, ImageryTileLayer] = await $arcgis.import([
    "@arcgis/core/Map.js",
    "@arcgis/core/layers/ImageryTileLayer.js",
]);
      
const viewElement = document.querySelector("arcgis-map");

// Using a global ocean currents dataset - covers Bulgaria/Black Sea
const layer = new ImageryTileLayer({
    url: "https://tiledimageservices.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Spilhaus_UV_ocean_currents/ImageServer",
    title: "Flow Visualization - Bulgaria Region",
    renderer: {
        type: "flow",
        trailWidth: "2px",
        density: 1,
        visualVariables: [
        {
            type: "color",
            field: "Magnitude",
            stops: [
            {
                color: [40, 146, 199, 1],
                value: 0,
            },
            {
                color: [160, 194, 155, 1],
                value: 5,
            },
            {
                color: [218, 230, 119, 1],
                value: 10,
            },
            ],
        },
        ],
    },
    effect: "bloom(1.5, 0.5px, 0)",
});

const map = new Map({
    basemap: "dark-gray-vector",
    layers: [layer],
});
      
viewElement.map = map;

// Wire up controls
const sliderProps = ["trailWidth", "density", "maxPathLength", "flowSpeed", "trailLength"];
    sliderProps.forEach((prop) => {
    document.getElementById(prop).addEventListener("calciteSliderChange", updateRenderer);
});

document.getElementById("flowRepresentation")
        .addEventListener("calciteSegmentedControlChange", updateRenderer);

document
    .getElementById("trailCap")
    .addEventListener("calciteSegmentedControlChange", updateRenderer);

document.getElementById("effectsEnabled")
    .addEventListener("calciteCheckboxChange", updateEffect);

function updateEffect(event) {
    layer.effect = event.target.checked ? "bloom(1.5, 0.5px, 0)" : null;
}

function updateRenderer(event) {
    let propName = event.target.id;
    let propValue = event.target.value;
    if (propName && propValue != null) {
        let tempRenderer = layer.renderer.clone();
        tempRenderer[propName] = propValue;
        layer.renderer = tempRenderer;
    }
}