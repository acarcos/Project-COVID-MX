// Pie PLOT: genre

// Mexico City Government Database
// const database = "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=1500&facet=fecha_actualizacion&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&exclude.resultado=No+positivo+SARS-CoV-2";
// d3.json(database).then(function(data) {

//     // Just to verify that are only cosidered positive cases
//     var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");

//     // PIE PLOT: Cases per genre
//     // Same with dicts?

//     var numGenre = {};

//     for (var i=0; i<filterData.length; i++) {
//         var tempGenre = filterData[i].fields.sexo;

//         if (tempGenre in numGenre) {
//             numGenre[tempGenre] += 1;
//         } else {
//             numGenre[tempGenre] = 1;
//         }
//     };

//      var data = [{
//          values: Object.values(numGenre),
//          labels: Object.keys(numGenre),
//          type: "pie"
//      }];

//     var layout_pie = {
//         height: 600,
//         width: 800
//     };

//     Plotly.newPlot("pie", data, layout_pie);

// });

const data = jsonObject;

// Just to verify that are only cosidered positive cases
var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");

// PIE PLOT: Cases per genre
    // Same with dicts?

var numGenre = {};

for (var i=0; i<filterData.length; i++) {
    var tempGenre = filterData[i].fields.sexo;

    if (tempGenre in numGenre) {
        numGenre[tempGenre] += 1;
    } else {
        numGenre[tempGenre] = 1;
    }
};

var pieData = [{
    values: Object.values(numGenre),
    labels: Object.keys(numGenre),
    type: "pie",
    marker: {
        colors: ["#756bb1", "#9ebcda"]
    }
}];

var layout_pie = {
    height: 600,
    width: 800,
    title: "Distribution of COVID Cases per Genre"
};

Plotly.newPlot("pie", pieData, layout_pie);
