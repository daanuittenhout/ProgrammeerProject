window.onload = function(e) {

  var body = d3.select("body")
    .append("div")
    .attr("id", "legend");
  var scrollable = d3.select("#scrollable");

  var h = 500,
    w = 1000;
  fill = "100%"
  var x = d3.scale.ordinal().rangeRoundBands([0, w], .05);

  var y = d3.scale.linear().range([h, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m"));

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
  // scale the height of the bars
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

  var svg3 = d3.select("#bar").append("svg")
    .attr("height", h)
    .attr("width", fill);

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1);

  var y = d3.scale.linear()
    .range([h, 0]);

  var basic = new Datamap({
    element: document.getElementById("map")
  });
  d3.select(".datamap")
    .attr("width", "100%")
    .attr("height", "750")
    .attr("transform", "translate(" + -50 + "," + -50 + ")")
    .attr("viewBox", "-50 -100 1600 100")
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

  d3.json("../data/dataBar1.json", function(data) {
    console.log(data);
    dataBar = data
    d3.select("#year").on("input", function() {
      year1 = this.value
      title.text(year1)
    })
    d3.selectAll('.datamaps-subunit').on("click", function(d, dataBar) {
      $('html,body').animate({
        scrollTop: $("#slider").offset().top
      }, 'slow')
      country = d["properties"]["name"]
      countrycode = d["id"];
      console.log(country);
      data1 = data[String(year1)][String(countrycode)]

      updatebar(data1, country, year1, x, y)
      // d3.event.stopPropagation();
    });

  });

  function updatebar(data1, country, year1, x, y, remove) {

    d3.selectAll(".yaxis1").remove()
    d3.selectAll(".bar").remove()
    d3.selectAll(".xaxis1").remove()

    dataPilars = []
    data_list = []
    dataEstimates = []
    dataEstimates.push(Object.values(data1))
    dataPilars.push(Object.getOwnPropertyNames(data1))

    for (var i = 0; i < dataEstimates[0].length; i++) {
      data_list.push(parseFloat(dataEstimates[0][i]))
    }
    console.log(data_list);
    // Scale the range of the data in the domains
    x.domain(dataPilars.map(function(d) {console.log(d);
      return d;
    }));
    y.domain([0, d3.max(data_list, function(d) {
      return d * 2;
    })])

    svg3.selectAll("bar")
      .data(data_list)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) {
        return 50 + (i * 100)
      })
      .attr("y", function(d, i) {
        if (d < 0) {
          return 300;
        } else {
          return 300 - (d * 100);
        }
      })
      .attr("height", function(d, i) {
        return Math.abs(d * 100);
      })
      .attr("width", 30)


    svg3.append("g")
      .attr("class", 'xaxis1')
      .attr("transform", "translate(10," + 300 + ")")
      .call(d3.svg.axis(xAxis));

    // add the y Axis
    svg3.append("g")
      .attr("class", 'yaxis1')
      .attr("transform", "translate(100," + ")")
      .call(d3.svg.axis(yAxis));


  }
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
