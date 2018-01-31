/* Daan Uittenhout
11057777
Java Script with functions for main.js */
// update the bar chart
function updatebar(data1, country, year1, x, y, remove) {
  // remove old chart
  d3.selectAll(".yaxis").remove()
  d3.selectAll(".bar").remove()
  d3.selectAll(".xaxis").remove()
  // append the x values and y values to lists
  dataPilars = []
  dataList = []
  dataEstimates = []
  dataAbr = ["Lack of Terrorism", "Lack of Corruption", "Effectiveness(Government)", "Regulatory Quality", "Rule of Law"]
  dataEstimates.push(Object.values(data1))
  dataPilars.push(Object.getOwnPropertyNames(data1))
  // if there is no data leave the list empty
  for (var i = 0; i < dataEstimates[0].length; i++) {
    if (isNaN(dataEstimates[0][i])) {
      dataList = []
    } else {
      dataList.push(parseFloat(dataEstimates[0][i]))
    }
  }
  // Scale the range of the data in the domains
  x.domain(dataAbr.map(function(d) {
    return d;
  }));
  y.domain([-3, 3])
  // create bars
  svg3.selectAll("bar")
    .data(dataList)
    .enter().append("rect")
    .attr("class", "bar")
    // scale the bars on x axis
    .attr("x", function(d, i) {
      return 120 + (i * 107.5)
    })
    // scale the bars on y axis
    .attr("y", function(d, i) {
      if (d < 0) {
        return 300;
      } else {
        return 300 - (d * 84);
      }
    })
    // determine height of bars
    .attr("height", function(d, i) {
      return Math.abs(d * 84);
    })
    .attr("width", 30)
    // change color of bars
    .style("fill", function(d) {
      if (d < 0) {
        return "red";
      } else {
        return "green"
      }
    })

  // set x axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  // set y axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  // append x axis to svg
  svg3.append("g")
    .attr("width", "100")
    .attr("class", "xaxis")
    .attr("transform", "translate(50," + 300 + ")")
    .call((xAxis));
  // append y axis to svg
  svg3.append("g")
    .attr("width", "100%")
    .attr("class", "yaxis")
    .attr("transform", "translate(50," + 50 + ")")
    .call((yAxis))
    .append("text")
    .text("Index Estimates")
    .attr("x", "25");
}
// create the table
function tableCreate() {
  var body = document.getElementById("checkboxes")
  var tbl = document.createElement("table");
  tbl.style.width = "100%";
  tbl.style.height = "25%";
  tbl.setAttribute("border", "1");
  var tbdy = document.createElement("tbody");
  for (var i = 0; i < 10; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 6; j++) {
      if (i == 0) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("\u0020"))
      } else if (i == 10 && j == 6) {
        break
      } else {
        var td = document.createElement("td");
        td.setAttribute("id", "id" + String(i) + String(j))
        td.appendChild(document.createTextNode("\u0020"))
        tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
// create the radio buttons
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
// make one array from multiple
function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
// count the frequency of elements in a array
function frequency(array) {

  var compare = 0; //We are going to compare using stored value
  var mostFrequent;
  var counter = 0

  for (var i = 0, len = array.length; i < len; i++) {
    var word = array[i];
    // check if word is new if so add to dict if not add to count
    if (counts[word] === undefined) {
      counts[word] = 1;
    } else {
      counts[word] = counts[word] + 1;
    }
    // if there is a new word with the highest value
    if (counts[word] > compare) {
      compare = counts[word];
      mostFrequent = array[i];
    }
  }
  return counts;
}
// sort a dict on values
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
// slice the top of an array
function sliceup(sortedArray, top) {
  for (var i = 0; i < sortedArray.slice(0, top).length; i++) {
    total += sortedArray.slice(0, 5)[i][1]
  }


  for (var i = 0; i < sortedArray.slice(0, top).length; i++) {
    percentages.push((sortedArray.slice(0, top)[i][1] / total) * 100)
    countriestop.push(sortedArray.slice(0, top)[i][0])
  }
  return percentages, countriestop;
}
// create bubble gauge
function createBubble(match) {

  var gauge1 = loadLiquidFillGauge("fillgauge1", match);
  var config1 = liquidFillGaugeDefaultSettings();
  config1.circleColor = "#FF7777";
  config1.textColor = "#FF4444";
  config1.waveTextColor = "#FFAAAA";
  config1.waveColor = "#FFDDDD";
  config1.circleThickness = 0.2;
  config1.textVertPosition = 0.2;
  config1.waveAnimateTime = 1000;
}
