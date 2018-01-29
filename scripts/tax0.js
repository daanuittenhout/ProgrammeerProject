window.onload = function(e) {

  // declare global variables
  h = 500,
    w = 1000,
    fill = "100%",
    height = 500,
    width = 300;
  // make alle the svg's for the grid
  svg = d3.select("#map1").append("svg")
    .attr("height", 900)
    .attr("width", 0)
    .attr("class", "svg2")

  svg1 = d3.select("#checkbox").append("svg")
    .attr("height", h)
    .attr("width", fill);

  svg2 = d3.select("#flower").append("svg")
    .attr("height", h)
    .attr("width", fill)
    .attr("id", "pie")
    .append('g') //create a group to hold our pie chart
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (150) + ')'); //move the center of the pie chart from 0, 0 to specified value

  svg3 = d3.select("#bar").append("svg")
    .attr("height", 600)
    .attr("width", fill);

  svg4 = d3.select("#bar1").append("svg")
    .attr("height", 600)
    .attr("width", fill);
  // declare x and y for the bar chart
  x = d3.scale.ordinal()
    .rangeRoundBands([0, 600], .5);

  y = d3.scale.linear()
    .range([h, 0]);
  // determine the radius for the pie chart
  radius = 300 / 2;
  // the start year for the slider
  year1 = 2003
  // colour for the piechart
  var colour = d3.scale.category20c();
  // tooltip lay out
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d, i) {
      return "<strong>Country:</strong> <span style='color:red'>" + countriestop[i] + "</span>";
    })
  // piechart arc
  var arc = d3.svg.arc().outerRadius(radius);
  // make the slider
  d3.select("#slider").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "2003")
    .attr("max", "2016")
    .attr("value", year1)
    .attr("id", "year");
  // add text to slider
  var title = d3.select("#slider").insert("h1", ":first-child")
  title.text(year1)
  // load tax data
  d3.json("./data/corTax1.json", function(data) {
    // make map with configurations
    var map = new Datamap({
      element: document.getElementById("map2"),
      projection: 'mercator',
      fills: {
        defaultFill: "black"
      },
      geographyConfig: {
        highlightBorderColor: '#bada55',
        // create hover-info
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
      }
    });
    // color the map
    d3.json("./data/colors1.json", function(data) {
      map.updateChoropleth(data)
    })
  })
  // scroll down when here button is clicked
  d3.selectAll('#herebutton').on("click", function(d) {
    $('html,body').animate({
      scrollTop: $("#header").offset().top
    }, 'slow')
  })

  // load data for bar chart and let it iteract with slider
  d3.json("./data/dataBar1.json", function(data) {
    dataBar = data
    d3.select("#year").on("input", function() {
      year1 = this.value
      if (typeof country != "undefined") {
        title.text(year1 + " " + country)
      } else {
        title.text(year1)
      }
      if (typeof countrycode != "undefined") {
        data1 = data[String(year1)][String(countrycode)]
        updatebar(data1, country, year1, x, y)
      }
    })
    // create the click function for the map to select data and scroll down
    d3.selectAll('.datamaps-subunit').on("click", function(d, dataBar) {
      $('html,body').animate({
        scrollTop: $("#slider").offset().top
      }, 'slow')
      if (d["id"] != "") {
        country = d["properties"]["name"]
        console.log(country);
        countrycode = d["id"];
        data1 = data[String(year1)][String(countrycode)]
        updatebar(data1, country, year1, x, y)
        title.text(year1 + " " + country)

      }
    });
  });
  // create table
  tableCreate()
  // add numbers to table
  for (var i = 0; i < 10; i++) {
    d3.selectAll("#id" + i + 0).append("text").text(String(i))
  }
  // add radio buttons to table
  radiobutt()
  // remove data with reset button
  d3.select("#resetbutton").on("click", function(d) {
    d3.selectAll(".piechart").remove()
    d3.selectAll(".radio").remove()
    d3.selectAll("#match1").remove()
    radiobutt()
  })
  // calculate new data with go button en remove old charts
  d3.select("#gobutton").on("click", function(d) {
    d3.selectAll(".piechart").remove()
    d3.selectAll("#match1").remove()
    //
    lists = ["Minwage", "English", "ChildLabour", "Environment", "Education",
      "Inovation", "Infrastructure", "ICTAcces", "TaxRate"
    ]
    // check if the sufficient radio buttons are checked
    var count = 0;
    for (var i = 0; i < 46; i++) {
      if (document.getElementsByTagName("INPUT")[i].checked == true) {
        count++
      }
    }
    if (count < 9) {
      alert("Please fill in all the questions");
    } else {
      $('html,body').animate({
        scrollTop: $("#flower").offset().top
      }, 'slow')
      // load data of the ranks of the country
      d3.json("./data/ranks.json", function(data) {
        results = []
        r = 0
        // check which buttons are checked
        for (var i = 0; i < 45; i++) {
          if (i % 5 == 0) {
            r++
          }
          if (document.getElementsByTagName("INPUT")[i].checked == true) {
            results.push(data[lists[r - 1]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
          }
        }
        // the eight row has to be cheked again as a workaround (reason unknown)
        for (var i = 35; i < 40; i++) {
          if (document.getElementsByTagName("INPUT")[i].checked == true) {
            results.push(data[lists[7]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
          }
        }

        // make one array from all the results of the questions
        allResults = flatten(results)
        // count occurrence of countries in the results
        counts = {}
        frequency(allResults)
        // sort the coutries on frequency
        var sortedCountries = sortProperties(counts)
        total = 0;
        // take the top 5 most frequent countries
        countriestop = []
        percentages = []
        sliceup(sortedCountries, 5)
        // make the pie chart with the obtained data
        var pie = d3.layout.pie()
          .value(function(d, i) {
            return percentages[i];
          })
          .sort(null);
        // activate the tooltip
        svg.call(tip);
        // draw the pie chart
        var path = svg2.selectAll("path")
          .data(pie(percentages))
          .enter()
          .append('path')
          .attr("class", "piechart")
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return colour(i);
          })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on("click", function(d, i) {
            // delete the old gauge and initiate a new one
            d3.selectAll("#match1").remove()
            var gauge1 = loadLiquidFillGauge("fillgauge1", Math.round(((sortedCountries.slice(0, 5)[i][1] / 9) * 100), 2));
            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#FF7777";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#FFDDDD";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            return countriestop[i];
          })
      })
    }
  })
}
