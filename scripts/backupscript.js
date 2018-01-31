window.onload = function(e) {

  var h = 500,
    w = 1000,
    fill = "100%",
    height = 500,
    width = 300;

  var x = d3.scale.ordinal().rangeRoundBands([0, 300], 1);

  var y = d3.scale.linear().range([400, 0]);

  var svg = d3.select("#map1").append("svg")
    .attr("height", 900)
    .attr("width", 0)
    .attr("class", "svg2")

  var svg1 = d3.select("#checkbox").append("svg")
    .attr("height", h)
    .attr("width", fill);

  var svg2 = d3.select("#flower").append("svg")
    .attr("height", h)
    .attr("width", fill)
    .attr("id", "pie")
    .append('g') //create a group to hold our pie chart
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (150) + ')'); //move the center of the pie chart from 0, 0 to specified value

  var svg3 = d3.select("#bar").append("svg")
    .attr("height", 600)
    .attr("width", fill);

  var svg4 = d3.select("#bar1").append("svg")
    .attr("height", 600)
    .attr("width", fill);

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, 600], .5);

  var y = d3.scale.linear()
    .range([h, 0]);

  var radius = 300 / 2; //radius of the pie-chart
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
    // Scale the range of the data in the domains
    x.domain(dataAbr.map(function(d) {
      // if dataList.values;
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
      .style("fill", function(d) {
        if (d < 0) {
          return "red";
        } else {
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
        } else if (i == 10 && j == 6) {
          break
        } else {
          var td = document.createElement('td');
          td.setAttribute("id", "id" + String(i) + String(j))
          td.appendChild(document.createTextNode('\u0020'))
          // i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
          tr.appendChild(td)
        }

        // td.append(document.getElementById("checkboxes").appendChild(newInput))
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }

  function radiobutt() {


    for (var p = 0; p < 9; p++) {

      for (var q = 0; q < 5; q++) {

        newInput = document.createElement("INPUT");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("name", "optradio" + p);
        newInput.setAttribute("value", q + 1);
        newInput.setAttribute("id", "radio" + p + q)
        newInput.setAttribute("class", "radio")
        document.getElementById("id" + String(p + 1) + String(q + 1)).append(newInput)
      }
    }
  }

  function flatten(arr) {
    return arr.reduce(function(flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

  function sortProperties(obj) {
    // convert object into array
    var sortable = [];
    for (var key in obj)
      if (obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b) {
      return b[1] - a[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  function liquidFillGaugeDefaultSettings() {
    return {
      minValue: 0, // The gauge minimum value.
      maxValue: 100, // The gauge maximum value.
      circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
      circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
      circleColor: "#178BCA", // The color of the outer circle.
      waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
      waveCount: 1, // The number of full waves per width of the wave circle.
      waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
      waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
      waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
      waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
      waveAnimate: true, // Controls if the wave scrolls or is static.
      waveColor: "#178BCA", // The color of the fill wave.
      waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
      textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
      textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
      valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
      displayPercent: true, // If true, a % symbol is displayed after the value.
      textColor: "#045681", // The color of the value text when the wave does not overlap it.
      waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
    };
  }

  function loadLiquidFillGauge(elementId, value, config) {
    if (config == null) config = liquidFillGaugeDefaultSettings();

    var gauge = d3.select("#" + elementId);
    var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height"))) / 2;
    var locationX = parseInt(gauge.style("width")) / 2 - radius;
    var locationY = parseInt(gauge.style("height")) / 2 - radius;
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;

    var waveHeightScale;
    if (config.waveHeightScaling) {
      waveHeightScale = d3.scale.linear()
        .range([0, config.waveHeight, 0])
        .domain([0, 50, 100]);
    } else {
      waveHeightScale = d3.scale.linear()
        .range([config.waveHeight, config.waveHeight])
        .domain([0, 100]);
    }

    var textPixels = (config.textSize * radius / 2);
    var textFinalValue = parseFloat(value).toFixed(2);
    var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
    var percentText = config.displayPercent ? "%" : "";
    var circleThickness = config.circleThickness * radius;
    var circleFillGap = config.circleFillGap * radius;
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin;
    var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

    var waveLength = fillCircleRadius * 2 / config.waveCount;
    var waveClipCount = 1 + config.waveCount;
    var waveClipWidth = waveLength * waveClipCount;

    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
    var textRounder = function(value) {
      return Math.round(value);
    };
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
      textRounder = function(value) {
        return parseFloat(value).toFixed(1);
      };
    }
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
      textRounder = function(value) {
        return parseFloat(value).toFixed(2);
      };
    }

    // Data for building the clip wave area.
    var data = [];
    for (var i = 0; i <= 40 * waveClipCount; i++) {
      data.push({
        x: i / (40 * waveClipCount),
        y: (i / (40))
      });
    }

    // Scales for drawing the outer circle.
    var gaugeCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
    var gaugeCircleY = d3.scale.linear().range([0, radius]).domain([0, radius]);

    // Scales for controlling the size of the clipping path.
    var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
    var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

    // Scales for controlling the position of the clipping path.
    var waveRiseScale = d3.scale.linear()
      // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
      // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
      // circle at 100%.
      .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
      .domain([0, 1]);
    var waveAnimateScale = d3.scale.linear()
      .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
      .domain([0, 1]);

    // Scale for controlling the position of the text within the gauge.
    var textRiseScaleY = d3.scale.linear()
      .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
      .domain([0, 1]);

    // Center the gauge within the parent SVG.
    var gaugeGroup = gauge.append("g")
      .attr('transform', 'translate(' + locationX + ',' + locationY + ')')
      .attr("id", "match1");

    // Draw the outer circle.
    var gaugeCircleArc = d3.svg.arc()
      .startAngle(gaugeCircleX(0))
      .endAngle(gaugeCircleX(1))
      .outerRadius(gaugeCircleY(radius))
      .innerRadius(gaugeCircleY(radius - circleThickness));
    gaugeGroup.append("path")
      .attr("d", gaugeCircleArc)
      .style("fill", config.circleColor)
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    // Text where the wave does not overlap.
    var text1 = gaugeGroup.append("text")
      .text(textRounder(textStartValue) + percentText)
      .attr("class", "liquidFillGaugeText")
      .attr("text-anchor", "middle")
      .attr("font-size", textPixels + "px")
      .style("fill", config.textColor)
      .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

    // The clipping wave area.
    var clipArea = d3.svg.area()
      .x(function(d) {
        return waveScaleX(d.x);
      })
      .y0(function(d) {
        return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
      })
      .y1(function(d) {
        return (fillCircleRadius * 2 + waveHeight);
      });
    var waveGroup = gaugeGroup.append("defs")
      .append("clipPath")
      .attr("id", "clipWave" + elementId);
    var wave = waveGroup.append("path")
      .datum(data)
      .attr("d", clipArea)
      .attr("T", 0);

    // The inner circle with the clipping wave attached.
    var fillCircleGroup = gaugeGroup.append("g")
      .attr("clip-path", "url(#clipWave" + elementId + ")");
    fillCircleGroup.append("circle")
      .attr("cx", radius)
      .attr("cy", radius)
      .attr("r", fillCircleRadius)
      .style("fill", config.waveColor);

    // Text where the wave does overlap.
    var text2 = fillCircleGroup.append("text")
      .text(textRounder(textStartValue) + percentText)
      .attr("class", "liquidFillGaugeText")
      .attr("text-anchor", "middle")
      .attr("font-size", textPixels + "px")
      .style("fill", config.waveTextColor)
      .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

    // Make the value count up.
    if (config.valueCountUp) {
      var textTween = function() {
        var i = d3.interpolate(this.textContent, textFinalValue);
        return function(t) {
          this.textContent = textRounder(i(t)) + percentText;
        }
      };
      text1.transition()
        .duration(config.waveRiseTime)
        .tween("text", textTween);
      text2.transition()
        .duration(config.waveRiseTime)
        .tween("text", textTween);
    }

    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    if (config.waveRise) {
      waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
        .transition()
        .duration(config.waveRiseTime)
        .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
        .each("start", function() {
          wave.attr('transform', 'translate(1,0)');
        }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
      waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
    }

    if (config.waveAnimate) animateWave();

    function animateWave() {
      wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
      wave.transition()
        .duration(config.waveAnimateTime * (1 - wave.attr('T')))
        .ease('linear')
        .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
        .attr('T', 1)
        .each('end', function() {
          wave.attr('T', 0);
          animateWave(config.waveAnimateTime);
        });
    }

    function GaugeUpdater() {
      this.update = function(value) {
        var newFinalValue = parseFloat(value).toFixed(2);
        var textRounderUpdater = function(value) {
          return Math.round(value);
        };
        if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
          textRounderUpdater = function(value) {
            return parseFloat(value).toFixed(1);
          };
        }
        if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
          textRounderUpdater = function(value) {
            return parseFloat(value).toFixed(2);
          };
        }

        var textTween = function() {
          var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
          return function(t) {
            this.textContent = textRounderUpdater(i(t)) + percentText;
          }
        };

        text1.transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);
        text2.transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);

        var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
        var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
        var waveRiseScale = d3.scale.linear()
          // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
          // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
          // circle at 100%.
          .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
          .domain([0, 1]);
        var newHeight = waveRiseScale(fillPercent);
        var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
        var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
        var newClipArea;
        if (config.waveHeightScaling) {
          newClipArea = d3.svg.area()
            .x(function(d) {
              return waveScaleX(d.x);
            })
            .y0(function(d) {
              return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
            })
            .y1(function(d) {
              return (fillCircleRadius * 2 + waveHeight);
            });
        } else {
          newClipArea = clipArea;
        }

        var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
        wave.transition()
          .duration(0)
          .transition()
          .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr('T'))) : (config.waveRiseTime))
          .ease('linear')
          .attr('d', newClipArea)
          .attr('transform', 'translate(' + newWavePosition + ',0)')
          .attr('T', '1')
          .each("end", function() {
            if (config.waveAnimate) {
              wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
              animateWave(config.waveAnimateTime);
            }
          });
        waveGroup.transition()
          .duration(config.waveRiseTime)
          .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')')
      }
    }

    return new GaugeUpdater();
  }
  d3.json("../data/dataBar1.json", function(data) {
    dataBar = data
    d3.select("#year").on("input", function() {
      year1 = this.value
      if (typeof country != "undefined") {
        title.text(year1 + " " + country)
      }
      else {
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

        var counts = {}; //We are going to count occurrence of item here
        var compare = 0; //We are going to compare using stored value
        var mostFrequent;
        var counter = 0

        for (var i = 0, len = allResults.length; i < len; i++) {
          var word = allResults[i];
          if (counts[word] === undefined) { //if count[word] doesn't exist
            counts[word] = 1; //set count[word] value to 1
          } else { //if exists
            counts[word] = counts[word] + 1; //increment existing value
          }
          if (counts[word] > compare) { //counts[word] > 0(first time)
            compare = counts[word]; //set compare to counts[word]
            mostFrequent = allResults[i]; //set mostFrequent value
          }
        }

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

        var colour = d3.scale.category20c();
        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d, i) {
            return "<strong>Country:</strong> <span style='color:red'>" + countriestop[i] + "</span>";
          })
        var tip1 = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-100, 0])
          .html(function(d, i) {
            return "<strong>hoi:</strong> <span style='color:red'>" + Math.round(((sortedCountries.slice(0, 5)[i][1] / 9) * 100), 2) + "</span>";
          })
        var arc = d3.svg.arc().outerRadius(radius);
        var pie = d3.layout.pie()
          .value(function(d, i) {
            return percentages[i];
          })
          .sort(null);
        svg.call(tip);
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
