
var thedata= [];

d3.tsv('data.tsv', function(data){

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

data.forEach(function(d){
    thedata.push(d.value);
})

var margin = {top :30, right: 30, bottom: 40, left: 50}

var height = 400,
    width = document.getElementById('chart').clientWidth;

colors = d3.scale.linear()
.domain([0,  thedata.length])
.range(['#6baed6','#31a354'])

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'black')
        .style('opacity', 0)
        .style('border-radius', '2px')
        .attr('class', 'd3-tip')

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, thedata.length))
        .rangePoints([0, width],1)

var myChart = d3.select('#chart').append('svg')
    .style('background','#E7E0CB')
    .attr('width', width)
    .attr('height', height)
    .selectAll('circle').data(thedata)
    .enter().append('g')
        .attr('class', 'labe')

    var cir = d3.selectAll('g.labe')
    .append('circle')
    .style('fill', function(d,i) {
            return colors(i);
    })
    .attr('cx',function(d,i){ 
         return xScale(i);
    })
    .attr('cy', function(d, i){
          return (height/2);
    })
    .attr('r', function(d){
      return 35*(d);
    })
    .attr('fill', function(d,i){
      return colors(i);
    })
    .on('mouseover', function(d, i) {

    tooltip.transition()
            .style('opacity', .85)

    tooltip.html( "<strong style = 'color:white'>Significance:</strong> <span style='color:red'>" + d + "</span>")
            .style('left', xScale(i) + (35*d) +"px")
            .style('top', (height / 2) - (30 * d)  + 'px')

    tempColor = this.style.fill;
        d3.select(this)
            .style('fill', '#595AB7')
   })

    .on('mouseout', function(d) {
        tooltip.transition()
            .style('opacity', 0)        
            d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })
    var text = d3.selectAll('g.labe')
        .append('text')
        .data(data)
        .text(function(d , i){
            return d.domain;
        })
        .attr('fill', palette.darkgray)
        .attr('text-anchor', 'middle')
        .attr("transform", function(d, i) {
             // Set d.x and d.y here so that other elements can use it. d is 
             // expected to be an object here.
             d.x =xScale(i),
             d.y = (3*height / 4+10);
             return "translate(" + d.x + "," + d.y + ")"; 
           });
    
});