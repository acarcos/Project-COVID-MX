// Visualization of number of cases per state
const data = jsonObject;

// Just to verify that are only cosidered positive cases
var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");
//console.log(filterData);

// Group function used to gather the data per states
let groupedData = filterData.reduce((r,a) => {
    r[a.fields.entidad_res] = [...r[a.fields.entidad_res] || [], a];
    return r;
}, {});

//console.log(groupedData);
    
// The database shows counts of all the cases (positive, negative, possible)
// So we count only the positive cases using a dictionary
var countCases = {};
for (var i=0; i<Object.keys(groupedData).length; i++) {
    var tempState = Object.keys(groupedData)[i];
    //console.log(tempState);
    countCases[tempState] = groupedData[tempState].length;
};

    
// Draw map
var mymap = L.map('map').setView([23.85664,-101.524857], 5.3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2FuNXE5YXUxbGRyMnFuc3c5dzRkamkxIn0.2IEQgoBPJmtVyxaXuGxBAQ"
}).addTo(mymap);

// Draw states
d3.json("../static/data/mexican_states.geojson").then(function (edos) {
    //console.log(edos);
    L.geoJSON(edos)
        .bindPopup(function (layer) {
        var state = layer.feature.properties.admin_name;
            return `${state} <hr> Number cases: ${countCases[state]}`;
        }).addTo(mymap);
});