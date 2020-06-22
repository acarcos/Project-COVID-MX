// Getting the information from the Mexican Government Database

const url = "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=3500&facet=fecha_actualizacion&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&exclude.resultado=No+positivo+SARS-CoV-2";

var xhReq = new XMLHttpRequest();
xhReq.open("GET", url, false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

console.log(jsonObject);