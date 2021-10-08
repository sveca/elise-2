console.log("map webtools");
// If UEC parameters are not enough to cover all your
// requirements ...
$wt.map.render({

    map: {
        center: [47, 3],
        zoom: 5,
        background: ["positron"],
        height: "80vh"
    }

    // ... you can easily ...
}).ready(function (map) {

    console.log(map);

    // Remove an existing button.
    map.menu.remove("fullscreen");

    // Add a custom button.
    map.menu.add({
        name: "custom",
        class: "layer",
        tooltip: "Layers",
        before: "print",
        click: function (evt) {
            console.log("I'm the layers button: ", evt.target);
        }
    });

    L.geoJSON(data, {
        style: function (feature) {
            return {
                color: feature.properties.color
            };
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);

    // ... use any Leaflet API
    L.marker([48, -3]).bindPopup("Leaflet marker").addTo(map);

    // ... same with webtools API with extend parameter
    map.markers([47, 0], {
        color: "red"
    }).bindPopup("Webtools marker").addTo(map);


    map.flyTo([48, -3], 6);


});