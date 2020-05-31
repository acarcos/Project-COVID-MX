// Plot by State

const data = jsonObject;

// Just to verify that are only cosidered positive cases
var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");
//console.log(filterData);


// Group function used to gather the data per states
let groupedData = filterData.reduce((r,a) => {
    r[a.fields.entidad_res] = [...r[a.fields.entidad_res] || [], a];
    return r;
}, {});

console.log(groupedData);

// Date of actualization
var dateAct = groupedData['PUEBLA'][0].fields.fecha_actualizacion;

// The database shows counts of all the cases (positive, negative, possible)
// So we count only the positive cases using a dictionary
var countCases = {};
for (var i=0; i<Object.keys(groupedData).length; i++) {
    var tempState = Object.keys(groupedData)[i];
    //console.log(tempState);
    countCases[tempState] = groupedData[tempState].length;
};

//console.log(countCases);

// Plot
var trace2 = {
    x: Object.keys(countCases),
    y: Object.values(countCases),
    type: "bar",
    marker: {
        color: 'rgb(49,130,189)',
        opacity: 0.7,
        line: {
            color: 'rgb(8,48,107)',
            width: 1.5
        }
    }
};

var layout2 = {
    title: `Cases per State on: ${dateAct}`,
    yaxis: { title: "Counts" }, 
    font: { size: 9},
    height: 550,
    width: 900
};

var dataNumAge = [trace2];
Plotly.newPlot("plotdos", dataNumAge, layout2);