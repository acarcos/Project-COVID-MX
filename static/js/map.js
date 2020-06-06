// == MAP Visualization ==

// Getting the data
const data = jsonObject;

// Just to verify that are only cosidered positive cases
var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");

// Group function to gather the data per states
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

//console.log(countCases);

// Change format to list
// var arrDict = [];
// for (var key in countCases) {
//     if (countCases.hasOwnProperty(key)) {
//         arrDict.push( [ key, countCases[key] ] );
//     }
// }

//console.log(arrDict);


// Draw map
var mymap = L.map('map').setView([23.85664,-101.524857], 5.3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2FuNXE5YXUxbGRyMnFuc3c5dzRkamkxIn0.2IEQgoBPJmtVyxaXuGxBAQ"
}).addTo(mymap);

// Draw states with its corresponding number of cases
// d3.json("../static/data/mexican_states.geojson").then(function (edos) {
//     console.log(edos);
//     L.geoJSON(edos)
//         .bindPopup(function (layer) {
//         var state = layer.feature.properties.admin_name;
//             return `${state} <hr> Number cases: ${countCases[state]}`;
//         })
//         .addTo(mymap);
// });

// Chropleth map
//var myJSON = JSON.stringify(countCases);
//console.log(Object.values(countCases));

//var geoData = "../static/data/mexican_states.geojson";
//var geoVariable;

// d3.json("../static/data/mexican_states.geojson").then(function(cdata) {
//     console.log(cdata);
    

//     var lookup = {};
//     cdata.features.forEach(function (item) {
//         if (item.local) {
//             lookup[item.local] = item;
//         }
//     })
//     // geoVariable = L.choropleth(cdata, {
//     //     valueProperty: Object.values(countCases),
//     //     scale: ["#ffffb2", "#b10026"],
//     //     steps: 10,
//     //     mode: "q",
//     //     style: {
//     //     // Border color
//     //     color: "#fff",
//     //     weight: 1,
//     //     fillOpacity: 0.8
//     //     },
//     // }).addTo(mymap);

//     cdata.features.forEach(function (d) {
//         if (lookup[d.properties.NOME]) {
//             d.properties.joined = lookup[d.properties.NOME];
//         }
//     })

//     console.log(cdata);
// });

// ===============================================================
d3.json('../static/data/mexican_states.geojson').then(function (geojson) {
    var choroplethLayer = L.choropleth(geojson, {
        valueProperty: function (feature) {
            var state = feature.properties.admin_name;
            return countCases[state]
        },
        scale: ['#e0ecf4', '#8856a7'],
        steps: 5,
        mode: 'q',
        style: {
            color: '#fff',
            weight: 1,
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(function (layer) {
                var state = layer.feature.properties.admin_name;
                return `${state} <hr> Number cases: ${countCases[state]}`;
            })
        }

    }).addTo(mymap);

    // Legend
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = choroplethLayer.options.limits;
        var colors = choroplethLayer.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h5>Number of cases</h5><br>" + "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<i style=\"background-color: " + colors[index] + "\"></i>");
          });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    }

    // Add legend to map
    legend.addTo(mymap);
});

