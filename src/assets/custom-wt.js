$wt.map.render({

/*     map: {
        center: [47, 3],
        zoom: 5,
        background: ["positron"],
        height: 400
    } */

    // ... you can easily ...
}).ready(function (map) {

    // ... use any Leaflet API


    cases.forEach(c => {

    L.marker([c., -3]).bindPopup("Leaflet marker").addTo(map);
    });


    L.marker([48, -3]).bindPopup("Leaflet marker").addTo(map);

    // ... same with webtools API with extend parameter
/*     map.markers([47, 0], {
        color: "red"
    }).bindPopup("Webtools marker").addTo(map); */


 /*    map.flyTo([48, -3], 6); */


});