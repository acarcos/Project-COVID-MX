// Range Plot

const data = jsonObject;

// Just to verify that are only cosidered positive cases
var filterData = data.records.filter(value => value.fields.resultado == "Positivo SARS-CoV-2");
//console.log(filterData);

var numAge = {};

for (var i=0; i<filterData.length; i++) {
    var tempAge = filterData[i].fields.rango_edad;

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
    title: "COVID Cases per Age Range",
    xaxis: { title: "Age Range (years)"},
    yaxis: { title: "Counts" }
};

var dataNumAge = [trace2];
Plotly.newPlot("plotdos", dataNumAge, layout2);