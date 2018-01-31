/* made by Curtis Bratton adjusted by Daan Uittenhout
11057777
Java Script for bubble gauge in main.js
main script */
// set defult settings for bubble gauge
function liquidFillGaugeDefaultSettings() {

  return {
    // set default values for gauge
    minValue: 0,
    maxValue: 100,
    circleThickness: 0.05,
    circleFillGap: 0.05,
    circleColor: "#178BCA",
    waveHeight: 0.05,
    waveCount: 1,
    waveRiseTime: 1000,
    waveAnimateTime: 1800,
    waveRise: true,
    waveHeightScaling: true,
    waveAnimate: true,
    waveColor: "#178BCA",
    waveOffset: 0,
    textVertPosition: .5,
    textSize: 1,
    valueCountUp: true,
    displayPercent: true,
    textColor: "#045681",
    waveTextColor: "#A4DBf8"
  };
}
// load and create gauge
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

  // rounding functions
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

  // data for building the wave
  var data = [];
  for (var i = 0; i <= 40 * waveClipCount; i++) {
    data.push({
      x: i / (40 * waveClipCount),
      y: (i / (40))
    });
  }

  // scales fot the circle
  var gaugeCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
  var gaugeCircleY = d3.scale.linear().range([0, radius]).domain([0, radius]);

  // scale for the path
  var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
  var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

  // scale for position of path
  var waveRiseScale = d3.scale.linear()
    // set the height and fill in circle
    .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
    .domain([0, 1]);
  var waveAnimateScale = d3.scale.linear()
    .range([0, waveClipWidth - fillCircleRadius * 2])
    .domain([0, 1]);

  // set text position
  var textRiseScaleY = d3.scale.linear()
    .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
    .domain([0, 1]);

  // place gauge on svg
  var gaugeGroup = gauge.append("g")
    .attr("transform", "translate(" + locationX + "," + locationY + ")")
    .attr("id", "match1");

  // draw the outer circle
  var gaugeCircleArc = d3.svg.arc()
    .startAngle(gaugeCircleX(0))
    .endAngle(gaugeCircleX(1))
    .outerRadius(gaugeCircleY(radius))
    .innerRadius(gaugeCircleY(radius - circleThickness));
  gaugeGroup.append("path")
    .attr("d", gaugeCircleArc)
    .style("fill", config.circleColor)
    .attr("transform", "translate(" + radius + "," + radius + ")");

  // text where the wave does not overlap
  var text1 = gaugeGroup.append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.textColor)
    .attr("transform", "translate(" + radius + "," + textRiseScaleY(config.textVertPosition) + ")");

  // the clipping wave area
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

  // declare the inner circle with the clipping
  var fillCircleGroup = gaugeGroup.append("g")
    .attr("clip-path", "url(#clipWave" + elementId + ")");
  fillCircleGroup.append("circle")
    .attr("cx", radius)
    .attr("cy", radius)
    .attr("r", fillCircleRadius)
    .style("fill", config.waveColor);

  // set text where the wave does overlap
  var text2 = fillCircleGroup.append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.waveTextColor)
    .attr("transform", "translate(" + radius + "," + textRiseScaleY(config.textVertPosition) + ")");

  // let the value count up
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

  // make the wave, make the wave motion
  var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
  if (config.waveRise) {
    waveGroup.attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(0) + ")")
      .transition()
      .duration(config.waveRiseTime)
      .attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(fillPercent) + ")")
      .each("start", function() {
        wave.attr("transform", "translate(1,0)");
      });
  } else {
    waveGroup.attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(fillPercent) + ")");
  }

  if (config.waveAnimate) animateWave();

  function animateWave() {
    wave.attr("transform", "translate(" + waveAnimateScale(wave.attr("T")) + ",0)");
    wave.transition()
      .duration(config.waveAnimateTime * (1 - wave.attr("T")))
      .ease("linear")
      .attr("transform", "translate(" + waveAnimateScale(1) + ",0)")
      .attr("T", 1)
      .each("end", function() {
        wave.attr("T", 0);
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
        .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr("T"))) : (config.waveRiseTime))
        .ease("linear")
        .attr("d", newClipArea)
        .attr("transform", "translate(" + newWavePosition + ",0)")
        .attr("T", "1")
        .each("end", function() {
          if (config.waveAnimate) {
            wave.attr("transform", "translate(" + waveAnimateScale(0) + ",0)");
            animateWave(config.waveAnimateTime);
          }
        });
      waveGroup.transition()
        .duration(config.waveRiseTime)
        .attr("transform", "translate(" + waveGroupXPosition + "," + newHeight + ")")
    }
  }

  return new GaugeUpdater();
}
