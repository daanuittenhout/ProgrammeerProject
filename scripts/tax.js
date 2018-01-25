window.onload = function(e) {
  //
  // var body = d3.select("body")
  //   .append("div")
  //   .attr("id", "legend");
  var scrollable = d3.select("#scrollable");

  var h = 500,
    w = 1000,
    fill = "100%",
    height = 500
  width = 300


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
    .domain([0, 55])
    .range(["#BBDEFB", "#0D47A1"])


  var svg1 = d3.select("#checkbox").append("svg")
    .attr("height", h)
    .attr("width", fill);

  var svg2 = d3.select("#flower").append("svg")
    .attr("height", h)
    .attr("width", fill)
    .attr("id", "pie")
    .append('g') //create a group to hold our pie chart
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')'); //move the center of the pie chart from 0, 0 to specified value

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
  var colour = d3.scale.category20b(); //builtin range of colors



  d3.json("./data/corTax1.json", function(data) {

    var map = new Datamap({
      element: document.getElementById("map2"),
      projection: 'mercator',
      fills: {
        defaultFill: "#ABDDA4",
        lowvalue: "#BBDEFB",
        "RUS": "blue",
        highvalue: "#AB18ED",
        middle: "#AB18ED"
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
      // fills: {
      //   // defaultFill: "#ABDDA4",
      //   lowvalue : "#BBDEFB",
      //   RUS : "blue",
      //   highvalue : "#AB18ED",
      //   middle : "#AB18ED"
      // },
      // data : {
      //   USA : {fillkey:'lowvalue'}
      // }


    });
    d3.json("./data/colors.json", function(data) {
      map.updateChoropleth(data)
    })



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
        countrycode = d["id"];
        console.log(country);
        data1 = data[String(year1)][String(countrycode)]
        updatebar(data1, country, year1, x, y)
      }
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
  tableCreate()
  for (var i = 0; i < 10; i++) {
    d3.selectAll("#id" + i + 0).append("text").text(String(i))
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
  radiobutt()

  d3.selectAll("#radio00").on("click", function(d) {
    console.log(this.value);
  })
  d3.select("#resetbutton").on("click", function(d) {
    d3.selectAll(".flower").remove()
    d3.selectAll(".radio").remove()
    radiobutt()

  })
  d3.select("#gobutton").on("click", function(d, error) {
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
      alert("vul in bitch");
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
            // console.log(lists);
            results.push(data[lists[r - 1]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
            // console.log(data[lists[7]][document.getElementsByTagName("INPUT")[i].getAttribute("value")]);
          }
        }
        for (var i = 35; i < 40; i++) {
          if (document.getElementsByTagName("INPUT")[i].checked == true) {
            results.push(data[lists[7]][document.getElementsByTagName("INPUT")[i].getAttribute("value")])
            console.log(data[lists[7]][document.getElementsByTagName("INPUT")[i].getAttribute("value")]);

          }
        }


        function flatten(arr) {
          return arr.reduce(function(flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
          }, []);
        }
        allResults = flatten(results)
        var counts = {}; //We are going to count occurrence of item here
        var compare = 0; //We are going to compare using stored value
        var mostFrequent;
        console.log(allResults);
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
        console.log(mostFrequent);
        console.log(counts);

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
        var total = 0;
        var sortedCountries = sortProperties(counts)
        for (var i = 0; i < sortedCountries.slice(0, 5).length; i++) {
          total += sortedCountries.slice(0, 5)[i][1]
        }
        countriestop = []
        console.log(total);
        percentages = []
        for (var i = 0; i < sortedCountries.slice(0, 5).length; i++) {
          percentages.push((sortedCountries.slice(0, 5)[i][1] / total) * 100)
          countriestop.push(sortedCountries.slice(0, 5)[i][0])
        }
        console.log(countriestop);
        console.log(percentages);

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
        svg.call(tip1);
        svg.call(tip);
        var path = svg2.selectAll("path")
          .data(pie(percentages))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return colour(i);
          })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on("click", tip1.show)


          

        // console.log(allResults);
        // console.log(sortedCountries[-5][0]);
      })
      d3.selectAll("path").on("click", function(d, i) {
        return svg3.select("#bar").html("heuuuuu");
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      })
    }
  })

}
