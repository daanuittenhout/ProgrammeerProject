window.onload = function(e) {

  h = 500,
    w = 1000,
    fill = "100%",
    height = 500,
    width = 300;

  x = d3.scale.ordinal().rangeRoundBands([0, 300], 1);

  y = d3.scale.linear().range([400, 0]);

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

  x = d3.scale.ordinal()
    .rangeRoundBands([0, 600], .5);

  y = d3.scale.linear()
    .range([h, 0]);

  radius = 300 / 2; //radius of the pie-chart
  d3.select("path")
    .attr("height", "100%")

  year1 = 2003

  var colour = d3.scale.category20c();

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d, i) {
      return "<strong>Country:</strong> <span style='color:red'>" + countriestop[i] + "</span>";
    })

  var arc = d3.svg.arc().outerRadius(radius);

  d3.select("#slider").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "2003")
    .attr("max", "2016")
    .attr("value", year1)
    .attr("id", "year");

  var title = d3.select("#slider").insert("h1", ":first-child")
  title.text(year1)

  d3.json("./data/corTax1.json", function(data) {

    var map = new Datamap({
      element: document.getElementById("map2"),
      projection: 'mercator',
      fills: {
        defaultFill: "grey"
      },

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
      }
    });
    d3.json("./data/colors1.json", function(data) {
      map.updateChoropleth(data)
    })
  })
  d3.selectAll('#herebutton').on("click", function(d) {
    $('html,body').animate({
      scrollTop: $("#header").offset().top
    }, 'slow')
  })


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
  tableCreate()
  for (var i = 0; i < 10; i++) {
    d3.selectAll("#id" + i + 0).append("text").text(String(i))
  }
  radiobutt()

  d3.select("#resetbutton").on("click", function(d) {
    d3.selectAll(".piechart").remove()
    d3.selectAll(".radio").remove()
    d3.selectAll("#match1").remove()
    radiobutt()
  })
  d3.select("#gobutton").on("click", function(d) {
    d3.selectAll(".piechart").remove()
    d3.selectAll("#match1").remove()

    var count = 0;
    lists = ["Minwage", "English", "ChildLabour", "Environment", "Education",
      "Inovation", "Infrastructure", "ICTAcces", "TaxRate"
    ]

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
      d3.json("./data/ranks.json", function(data) {
        results = []
        r = 0
        for (var i = 0; i < 45; i++) {
          if (i % 5 == 0) {
            r++
            // console.log(r, i);
          }
          if (document.getElementsByTagName("INPUT")[i].checked == true) {
            results.push(data[lists[r - 1]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
          }
        }
        for (var i = 35; i < 40; i++) {
          if (document.getElementsByTagName("INPUT")[i].checked == true) {
            results.push(data[lists[7]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
          }
        }

        allResults = flatten(results)
        counts = {}; //We are going to count occurrence of item here
        frequency(allResults)

        var total = 0;
        var sortedCountries = sortProperties(counts)
        for (var i = 0; i < sortedCountries.slice(0, 5).length; i++) {
          total += sortedCountries.slice(0, 5)[i][1]
        }
        
        countriestop = []

        percentages = []
        for (var i = 0; i < sortedCountries.slice(0, 5).length; i++) {
          percentages.push((sortedCountries.slice(0, 5)[i][1] / total) * 100)
          countriestop.push(sortedCountries.slice(0, 5)[i][0])
        }
        var pie = d3.layout.pie()
          .value(function(d, i) {
            return percentages[i];
          })
          .sort(null);
        svg.call(tip);

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
            // d3.selectAll("#fillgauge1").remove()
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
