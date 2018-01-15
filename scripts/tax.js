

window.onload = function(e){

var body = d3.select("body")
    .append("div")
    .attr("id", "legend");

var h = 500,
    w = 1000;
    fill = "100%"

// var projection = d3.geo.mercator()
//         .scale(1)
//         .translate([3, 0]);
//
// var path = d3.geo.path()
//         .projection(projection);

// var svg = d3.select("#map").append("svg")
//         .attr("height", 10)
//         .attr("width", 10)
//         .attr("class", "svg")


var svg1 = d3.select("#checkbox").append("svg")
        .attr("height", h)
        .attr("width", fill);

var svg2 = d3.select("#flower").append("svg")
        .attr("height", h)
        .attr("width", fill);


var basic = new Datamap({
      element: document.getElementById("map")
  });
d3.select(".datamap")
    .attr("width", "100%")
    .attr("transform", "translate(" + -50 + "," + -50 + ")")
    .attr("viewBox","-50 150 1100 250")
d3.select("path")
    .attr("height", "100%")

var year1 = 2003

d3.select("#slider").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "2003")
    .attr("max", "2016")
    .attr("value", year1)
    .attr("id", "year");

var title = d3.select("#slider").insert("h1", ":first-child")
title.text(year1)
dataBar = dataBar
d3.selectAll('.datamaps-subunit').on("click", function(d) {


      data1 = dataBar[String(year1)][d["properties"]["name"]]
      console.log(d["properties"]["name"]);
      console.log(data1);
      // updatebar(data1, , year1, x, y)
      // d3.event.stopPropagation();
      });

console.log(year1);
// var basic_choropleth = new Datamap({
//   element: document.getElementById("map"),
//   projection: 'mercator',
//   fills: {
//     defaultFill: "#ABDDA4",
//     authorHasTraveledTo: "#fa0fa0"
//   },
//   data: {
//     USA: { fillKey: "authorHasTraveledTo" },
//     JPN: { fillKey: "authorHasTraveledTo" },
//     ITA: { fillKey: "authorHasTraveledTo" },
//     CRI: { fillKey: "authorHasTraveledTo" },
//     KOR: { fillKey: "authorHasTraveledTo" },
//     DEU: { fillKey: "authorHasTraveledTo" },
//   }
// });
//
// var colors = d3.scale.category10();
//
//
// window.setInterval(function() {
//   d3.select("datamap").attr("width", "60%");
//   basic_choropleth.updateChoropleth({
//
//   });
// }, 2000);

}
