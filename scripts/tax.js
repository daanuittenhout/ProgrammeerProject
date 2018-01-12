window.onload = function(e){

var body = d3.select("body")
    .append("div")
    .attr("id", "legend");

var h = 500,
    w = 1000;
    fill = "100%"

var projection = d3.geo.mercator()
            .scale(1)
            .translate([3, 0]);

var path = d3.geo.path()
        .projection(projection);

var svg = d3.select("#map").append("svg")
        .attr("height", h)
        .attr("width", fill)


var svg1 = d3.select("#bar").append("svg")
        .attr("height", h)
        .attr("width", fill);

var svg2 = d3.select("#flower").append("svg")
        .attr("height", h)
        .attr("width", fill);


}
