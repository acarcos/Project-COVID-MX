// const database = "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=1500&facet=fecha_actualizacion&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&exclude.resultado=No+positivo+SARS-CoV-2";
// var basedatos = d3.json(database).then(function(data) {
//     // Just to verify that are only cosidered positive cases
//     var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");
//     //console.log(filterData);

//     // Date of actualization
//     //var dateAct = filterData[0].fields.fecha_actualizacion;

//     // Group function used to gather the data per states
//     let groupedData = filterData.reduce((r,a) => {
//         r[a.fields.entidad_res] = [...r[a.fields.entidad_res] || [], a];
//         return r;
//     }, {});

//     console.log(groupedData);
    
//     // The database shows counts of all the cases (positive, negative, possible)
//     // So we count only the positive cases using a dictionary
//     var countCases = {};
//     for (var i=0; i<Object.keys(groupedData).length; i++) {
//         var tempState = Object.keys(groupedData)[i];
//         //console.log(tempState);
//         countCases[tempState] = groupedData[tempState].length;
//     };
// });

const url = "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=1500&facet=fecha_actualizacion&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&exclude.resultado=No+positivo+SARS-CoV-2";


var xhReq = new XMLHttpRequest();
xhReq.open("GET", url, false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

console.log(jsonObject);