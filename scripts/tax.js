window.onload = function(e) {
  //
  // var body = d3.select("body")
  //   .append("div")
  //   .attr("id", "legend");
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

  var svg = d3.select("#map1").append("svg")
    .attr("height", 1100)
    .attr("width", 0)
    .attr("class", "svg2")

  var color = d3.scale.linear()
    .domain([0,55])
    .range(["#BBDEFB", "#0D47A1"])


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
  //
  // var tool = d3.select("body").append("div")
  //   .attr("class", "tooltip")
  //   .attr("height", 30)
  //   .attr("width", 30)
  //   .style("opacity", 0);
  d3.json("../data/corTax1.json", function(data) {
    var basic = new Datamap({
      element: document.getElementById("map"),
      projection: 'mercator',
      geographyConfig: {
        highlightBorderColor: '#bada55',
        popupTemplate: function(geography, d) {
          ctr = "not known"
          if (typeof data[geography.properties.name] !== "undefined") {
            dummy = data[geography.properties.name]["Tax"]
            if (typeof x !== "undefined") {
              ctr = String(dummy) + ("%")
            }
          }
          return ['<div class="hoverinfo">',
            '<strong>', geography.properties.name, '</strong>',
            '<br>Tax rate: <strong>', ctr, '</strong>',
            '</div>'
          ].join('');
        },
        highlightBorderWidth: 3
      },
      fills: {
        defaultFill: "#ABDDA4",
        "Tax": "red",
      },

    });
  })
  // d3.json("../data/corTax1.json", function(data) {
  //   d3.selectAll('.datamaps-subunit').on("mouseover", function(d) {
  // ctr = "not known"
  // if (typeof data[d.properties.name] !== "undefined") {
  //   dummy = data[d.properties.name]["Tax"]
  //   if (typeof x !== "undefined") {
  //     ctr = dummy
  //   }
  // }
  //       tool.transition()
  //         .duration(200)
  //         .style("opacity", .9);
  //       tool.html(d.properties.name + "\r" + "Corporate Tax rate: " + ctr + "%")
  //         .style("left", (d3.event.pageX) + "px")
  //         .style("top", (d3.event.pageY - 28) + "px");
  //     })
  //     .on("mouseout", function(d) {
  //       tool.transition()
  //         .duration(500)
  //         .style("opacity", 0);
  //
  //     })
  // })

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
      if (isNaN(dataEstimates[0][i])) {
        dataList = []
      } else {
        dataList.push(parseFloat(dataEstimates[0][i]))
      }
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
      .style("fill", function(d){
          if (d < 0) {
            return "red";
          }
          else{
            return "green"
          }

      })


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
  function tableCreate() {
    var body = document.getElementById("checkboxes")
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.height = '25%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 6; j++) {
            if (i == 0) {
                var th = document.createElement('th');
                th.appendChild(document.createTextNode('\u0020'))
            }
            else if (i == 10 && j == 6) {
              break
            }
            else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('\u0020'))
                // i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
            }
        } 
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}
tableCreate()

}
