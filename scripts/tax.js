window.onload = function(e){

var body = d3.select("body")
    .append("div")
    .attr("id", "legend");

var h = 600,
    w = 1200;
var projection = d3.geo.mercator()
            .scale(1)
            .translate([3, 0]);

    var path = d3.geo.path()
            .projection(projection);

    var svg = d3.select("body").append("svg")
            .attr("height", 1500)
            .attr("width", 3000);
    // set-up svg canvas
    var svg = d3.select("#map").append("svg")
            .attr("height", h)
            .attr("width", w);
    var color = d3.scale.linear()
            .range(["blue", "red"]);
    var showValue= "gdp";
    var record=[];

    var linear = d3.scale.linear()
            .range(["blue", "red"]);

    function addRecord(d){
        d[showValue]=+d[showValue];
        var obj = {key: d.countries, value: d[showValue]};
        record.push(obj);
        return d;

    }
    d3.csv("data/gdp.csv", addRecord, function(error,data){
        color.domain(d3.extent(data, function(d){
            return d[showValue];
        }));
        linear.domain(d3.extent(data, function(d){
            return d[showValue];
        }));
    });

    //https://github.com/johan/world.geo.json
    d3.json("countries.topo.json", function(error, data) {

        d3.csv("data/gdp.csv", function(error, csv) {
            var world = data.features;

            csv.forEach(function(d, i) {
                world.forEach(function(e, j) {
                    if (d.id === e.id) {
                        e.name = d.name
                    }
                })
            })

            // calculate bounds, scale and transform
            // see http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
            var b = path.bounds(data),
                    s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
                    t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

            projection.scale(s)
                    .translate(t);

            svg.selectAll("path")
                    .data(world).enter()
                    .append("path")
                    .style("fill", getColor)
                    .style("stroke", "grey")
                    .style("stroke-width", "1px")
                    .attr("d", path)
                    .on("mouseover", function(d, i) {
                        reporter(d);
                    });
        });
        svg.append("g")
                .attr("class", "legendLinear")
                .attr("transform", "translate(650,20)");

        var legendLinear = d3.legend.color()
                .shapeWidth(60)
                .labelFormat(d3.format(".0f"))
                .scale(linear);

        svg.select(".legendLinear")
                .call(legendLinear);

        function reporter(x) {
            console.log(x);
            var value = "Not known";
            record.forEach(function(d){
                if(x.name === d.key){
                    value = d.value;
                    return;
                }
            });
            d3.select("#report").text(function() {
                return x.name+": "+value;
            });

        }

        function getColor(data){
            var value=-1;
            record.forEach(function(d){
                if(data.name === d.key){
                    value = d.value;
                    return;
                }
            });
            if(value==-1){
                return "none";
            }
            return color(value);
        }

    })
}
