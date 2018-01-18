window.onload = function(e) {

  var body = d3.select("body")
    .append("div")
    .attr("id", "legend");
  var scrollable = d3.select("#scrollable");

  var h = 500,
    w = 1000;
  fill = "100%"
  var x = d3.scale.ordinal().rangeRoundBands([0, 300], 1);

  var y = d3.scale.linear().range([400, 0]);


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
    .attr("height", 600)
    .attr("width", fill);

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, 600], .5);

  var y = d3.scale.linear()
    .range([h, 0]);

  var tool = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("height", 30)
    .attr("width", 30)
    .style("opacity", 0);

  var basic = new Datamap({
    element: document.getElementById("map")

  });
  d3.json("../data/corTax1.json", function(data) {
    d3.selectAll('.datamaps-subunit').on("mouseover", function(d) {
      if(typeof data[d.properties.name] !== "undefined"){
        dummy = data[d.properties.name]["Tax"]
        if (typeof x !== "undefined") {
          ctr = dummy
        }}
        tool.transition()
          .duration(200)
          .style("opacity", .9);
        tool.html(d.properties.name + "\n" + "Corporate Tax rate" + ctr)
          .style("left", (d3.event.pageX) + 10 + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tool.transition()
          .duration(500)
          .style("opacity", 0);

      })
  })

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
      data1 = data[String(year1)][String(countrycode)]
      updatebar(data1, country, year1, x, y)
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

    d3.selectAll(".yaxis").remove()
    d3.selectAll(".bar").remove()
    d3.selectAll(".xaxis").remove()

    dataPilars = []
    dataList = []
    dataEstimates = []
    dataAbr = ["Lack of Terrorism", "Lack of Corruption", "Effectiveness(Government)", "Regulatory Quality", "Rule of Law"]
    dataEstimates.push(Object.values(data1))
    dataPilars.push(Object.getOwnPropertyNames(data1))

    for (var i = 0; i < dataEstimates[0].length; i++) {
      dataList.push(parseFloat(dataEstimates[0][i]))
    }
    console.log(dataList);
    // Scale the range of the data in the domains
    x.domain(dataAbr.map(function(d) {
      console.log(d);
      return d;
    }));
    y.domain([-3, 3])

    svg3.selectAll("bar")
      .data(dataList)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) {
        return 120 + (i * 107.5)
      })
      .attr("y", function(d, i) {
        if (d < 0) {
          return 300;
        } else {
          return 300 - (d * 84);
        }
      })
      .attr("height", function(d, i) {
        return Math.abs(d * 84);
      })
      .attr("width", 30)
      .style("fill", "red")


    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    svg3.append("g")
      .attr("width", "100")
      .attr("class", 'xaxis')
      .attr("transform", "translate(50," + 300 + ")")
      .call((xAxis));

    // add the y Axis
    svg3.append("g")
      .attr("width", "100%")
      .attr("class", 'yaxis')
      .attr("transform", "translate(50," + 50 + ")")
      .call((yAxis));


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
