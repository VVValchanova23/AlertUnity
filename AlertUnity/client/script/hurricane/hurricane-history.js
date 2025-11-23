require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/CSVLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/symbols/PictureMarkerSymbol",
    "esri/Graphic",
    "esri/geometry/Circle",
    "esri/symbols/SimpleFillSymbol",
    "esri/widgets/Home",
    "esri/widgets/Zoom"
], function(
    Map, MapView, CSVLayer, UniqueValueRenderer, PictureMarkerSymbol,
    Graphic, Circle, SimpleFillSymbol, Home, Zoom
) {
    
    let map, view, layer, layerView;
    let exploreMode = false;
    let dragHandle = null;
    let searchGraphic = null;
    let highlight = null;
    let currentSerialNum = null;
    let queryCounter = 0;

    map = new Map({
        basemap: {
            portalItem: {
                id: "3113eacc129942b4abde490a51aeb33f"
            }
        }
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        highlightOptions: {
            color: [255, 255, 255, 1],
            fillOpacity: 0.3
        }
    });

    view.ui.empty("top-left");

    const zoom = new Zoom({
        view: view,
        layout: "horizontal"
    });

    const home = new Home({
        view: view
    });

    view.ui.add(zoom, "bottom-left");
    view.ui.add(home, "bottom-left");

    loadCSVLayer();

    function createRenderer() {
        return new UniqueValueRenderer({
            field: "Category",
            defaultSymbol: new PictureMarkerSymbol({
                url: "../../assets/hurricane/CatTS.png",
                width: "16px",
                height: "16px"
            }),
            uniqueValueInfos: [
                {
                    value: "1",
                    symbol: new PictureMarkerSymbol({
                        url: "../../assets/hurricane/Cat1.png",
                        width: "16px",
                        height: "16px"
                    })
                },
                {
                    value: "2",
                    symbol: new PictureMarkerSymbol({
                        url: "../../assets/hurricane/Cat2.png",
                        width: "16px",
                        height: "16px"
                    })
                },
                {
                    value: "3",
                    symbol: new PictureMarkerSymbol({
                        url: "../../assets/hurricane/Cat3.png",
                        width: "16px",
                        height: "16px"
                    })
                },
                {
                    value: "4",
                    symbol: new PictureMarkerSymbol({
                        url: "../../assets/hurricane/Cat4.png",
                        width: "16px",
                        height: "16px"
                    })
                },
                {
                    value: "5",
                    symbol: new PictureMarkerSymbol({
                        url: "../../assets/hurricane/Cat5.png",
                        width: "16px",
                        height: "16px"
                    })
                }
            ]
        });
    }

    function loadCSVLayer() {
        layer = new CSVLayer({
            url: "../../assets/hurricane/hurricanes.csv",
            renderer: createRenderer(),
            popupTemplate: {
                title: "{Name}",
                content: "Category: {Category}<br>Wind: {wmo_wind} kt<br>Season: {Season}"
            }
        });

        map.add(layer);
        
        layer.when(function() {
            document.getElementById('exploreBtn').disabled = false;
        });
    }

    window.toggleExplore = function() {
        exploreMode = !exploreMode;
        const btn = document.getElementById('exploreBtn');
        const infoPanel = document.getElementById('infoPanel');

        if (exploreMode) {
            btn.classList.add('active');
            infoPanel.style.display = 'block';
            enableDragSearch();
        } else {
            btn.classList.remove('active');
            infoPanel.style.display = 'none';
            disableDragSearch();
        }
    };

    function enableDragSearch() {
        view.whenLayerView(layer).then(function(lv) {
            layerView = lv;
            
            dragHandle = view.on("drag", function(event) {
                event.stopPropagation();
                view.graphics.removeAll();

                queryCounter++;
                const thisQueryId = queryCounter;

                const point = view.toMap(event);
                const searchArea = new Circle({
                    center: point,
                    radius: 500000,
                    radiusUnit: "meters"
                });

                searchGraphic = new Graphic({
                    geometry: searchArea,
                    symbol: new SimpleFillSymbol({
                        style: "none",
                        outline: {
                            color: [255, 255, 255, 0.8],
                            width: 3
                        }
                    })
                });

                view.graphics.add(searchGraphic);

                layer.queryFeatures({
                    geometry: searchArea,
                    spatialRelationship: "intersects",
                    returnGeometry: false,
                    outFields: ["Name", "Season", "wmo_wind", "Serial_Num"]
                }).then(function(results) {
                    if (thisQueryId !== queryCounter) {
                        return;
                    }

                    if (results.features.length > 0) {
                        let maxWind = 0;
                        let strongest = null;

                        results.features.forEach(f => {
                            const wind = parseFloat(f.attributes.wmo_wind);
                            if (wind > maxWind) {
                                maxWind = wind;
                                strongest = f;
                            }
                        });

                        if (strongest) {
                            if (currentSerialNum !== strongest.attributes.Serial_Num) {
                                if (highlight) {
                                    highlight.remove();
                                    highlight = null;
                                }

                                currentSerialNum = strongest.attributes.Serial_Num;

                                document.getElementById('hurricaneName').textContent = strongest.attributes.Name;
                                document.getElementById('hurricaneSeason').textContent = strongest.attributes.Season;
                                document.getElementById('hurricaneWind').textContent = maxWind.toFixed(0) + ' kt';

                                layer.queryObjectIds({
                                    where: "Serial_Num = '" + strongest.attributes.Serial_Num + "'"
                                }).then(function(objectIds) {
                                    if (objectIds.length > 0) {
                                        highlight = layerView.highlight(objectIds);
                                    }
                                });
                            }
                        }
                    } else {
                        if (highlight) {
                            highlight.remove();
                            highlight = null;
                        }
                        currentSerialNum = null;
                        document.getElementById('hurricaneName').textContent = '-';
                        document.getElementById('hurricaneSeason').textContent = '-';
                        document.getElementById('hurricaneWind').textContent = '-';
                    }
                });
            });
        });
    }

    function disableDragSearch() {
        if (dragHandle) {
            dragHandle.remove();
            dragHandle = null;
        }
        if (highlight) {
            highlight.remove();
            highlight = null;
        }
        currentSerialNum = null;
        queryCounter = 0;
        view.graphics.removeAll();
    }

    window.goToPacific = function() {
        view.goTo({
            center: [-140, 20],
            zoom: 1
        }, {
            duration: 2000,
            easing: "ease-in-out"
        });
    };

    window.goToAtlantic = function() {
        view.goTo({
            center: [-60, 25],
            zoom: 1
        }, {
            duration: 2000,
            easing: "ease-in-out"
        });
    };
});