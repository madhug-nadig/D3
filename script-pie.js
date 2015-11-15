var margin = {top :30, right: 30, bottom: 40, left: 50}

var height = 650,
    width = document.getElementById('chart').clientWidth;

var outerRadius = height / 2 - 20,
    innerRadius = outerRadius / 2,
    cornerRadius = 10;


var pie = d3.layout.pie()
    .sort(null)
    .padAngle(.02)
    .value(function(d) { return d.value; });


var arc = d3.svg.arc()
    .padRadius(outerRadius)
    .innerRadius(innerRadius);

d3.tsv("data.tsv", function(error, data) {


var svg = d3.select("#chart").append("svg")
    .style('background','#E7E0CB')
    .attr("width", width)
    .attr("height", height)
    .append("g")
     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


svg.selectAll("path")
    .data(pie(data))
  .enter().append("g")
    .attr('class', 'slice')

     var slice = d3.selectAll('g.slice')
      .append('path')
      .each(function(d) {
        d.outerRadius = outerRadius - 20;
      })
      .attr("d", arc)
      .attr('fill', function(d, i) {
        return colors(i)
      })
      .on("mouseover", arcTween(outerRadius, 0))
      .on("mouseout", arcTween(outerRadius - 20, 150));

    var text = d3.selectAll('g.slice')
    .append('text')
    .data(pie(data))
    .text(function(d, i) {
      return d.data.domain;
    })
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', function(d, i) {
      d.innerRadius = innerRadius;
      d.outerRadius = outerRadius;
      return 'translate(' + arc.centroid(d) + ')'
    });
        

})
function arcTween(outerRadius, delay) {
  return function() {
    d3.select(this).transition().delay(delay).attrTween("d", function(d) {
      var i = d3.interpolate(d.outerRadius, outerRadius);
      return function(t) { d.outerRadius = i(t); return arc(d); };
    });
  };
}
