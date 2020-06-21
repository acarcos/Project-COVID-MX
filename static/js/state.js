// == PLOTS ==

// Get the data
const data = jsonObject;

// Just to verify that are only cosidered positive cases
//var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");
//console.log(filterData);

// Group function used to gather the data per states
let groupedData = data.records.reduce((r,a) => {
    r[a.fields.entidad_res] = [...r[a.fields.entidad_res] || [], a];
    return r;
}, {});

console.log(groupedData);

// Date of actualization (mostly is a day of delay)
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

// == Plot number of cases per state ==
var trace1 = {
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

var layout1 = {
    title: `Cases per State on: ${dateAct}`,
    yaxis: { title: "Counts" }, 
    font: { size: 10},
    height: 600,
    width: 1000
};

var config = {responsive: true}

var dataNumAge = [trace1];
Plotly.newPlot("plotdos", dataNumAge, layout1, config);

// === Plot per age ===

var numAge = {};

for (var i=0; i<data.records.length; i++) {
    var tempAge = data.records[i].fields.rango_edad;

    if (tempAge in numAge) {
        numAge[tempAge] += 1;
    } else {
        numAge[tempAge] = 1;
    }
};

var trace2 = {
    x: Object.keys(numAge),
    y: Object.values(numAge),
    type: "bar",
    marker: {
        color: '#8856a7',
        opacity: 0.7,
        line: {
            color: '#9ebcda',
            width: 1.5
        }
    }
};

var layout2 = {
    title: "Cases per Age Range",
    xaxis: { title: "Age Range (years)"},
    yaxis: { title: "Counts" },
    height: 400,
    width: 700,
};

var dataNumAge = [trace2];
Plotly.newPlot("plotage", dataNumAge, layout2);


// === Plot per genre ===

var numGenre = {};

for (var i=0; i<data.records.length; i++) {
    var tempGenre = data.records[i].fields.sexo;

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
    height: 400,
    width: 400,
    title: "Distribution Cases per Genre"
};

Plotly.newPlot("pie", pieData, layout_pie);
