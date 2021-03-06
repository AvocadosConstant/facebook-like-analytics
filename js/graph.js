function graphLine(data) {

  var lineData = data;

   //var svg = dimple.newSvg("#lineGraph", 590, 400);
  // var myChart = new dimple.chart(svg, lineData);
  // myChart.addCategoryAxis("x", "x");
  // myChart.addMeasureAxis("y", "y");
  // myChart.addSeries("Likes per post", dimple.plot.line);
  // myChart.draw();

    
      // var myChart = new dimple.chart(svg, lineData);
      // myChart.setBounds(60, 30, 505, 305);
      // var x = myChart.addCategoryAxis("x", 'x');
      // x.addOrderRule("Value");
      // myChart.addMeasureAxis("y", 'y');
      // var s = myChart.addSeries(null, dimple.plot.line);
      // myChart.draw();

  var vis = d3.select('#lineGraph'),
    WIDTH = 800,
    HEIGHT = 550,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.max(lineData, function(d) {
      return d.x;
    }), d3.min(lineData, function(d) {
      return d.x;
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
      return d.y;
    }), d3.max(lineData, function(d) {
      return d.y;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);
   
  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);
   
  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);


  var lineFunc = d3.svg.line()
    .x(function(d) {
      return xRange(d.x);
    })
    .y(function(d) {
      return yRange(d.y);
    })
    .interpolate('linear');


  vis.append('svg:path')
    .attr('d', lineFunc(lineData))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}




function graphBar(data) {

  var barData = data;

  var svg = dimple.newSvg("#barGraph", 800, 550);
      var chart = new dimple.chart(svg, barData);
      chart.addCategoryAxis("x", "name");
      chart.addMeasureAxis("y", "likes");
      chart.addSeries(null, dimple.plot.bar);
      chart.draw();

// var barData = [{
//     'x': 1,
//     'y': 5
//   }, {
//     'x': 20,
//     'y': 20
//   }, {
//     'x': 40,
//     'y': 10
//   }, {
//     'x': 60,
//     'y': 40
//   }, {
//     'x': 80,
//     'y': 5
//   }, {
//     'x': 100,
//     'y': 60
//   }];

  // var vis = d3.select('#barGraph'),
  //   WIDTH = 1000,
  //   HEIGHT = 500,
  //   MARGINS = {
  //     top: 20,
  //     right: 20,
  //     bottom: 20,
  //     left: 50
  //   },
  //   xRange = d3.scale.ordinal()
  //     .rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1)
  //     .domain(barData.key)
  //   ,


  //   yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
  //     d3.max(barData, function (d) {
  //       return d.likes;
  //     })
  //   ]),

  //   xAxis = d3.svg.axis()
  //     .scale(xRange)
  //     .tickSize(5)
  //     .tickSubdivide(true),

  //   yAxis = d3.svg.axis()
  //     .scale(yRange)
  //     .tickSize(5)
  //     .orient("left")
  //     .tickSubdivide(true);


  // vis.append('svg:g')
  //   .attr('class', 'x axis')
  //   .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  //   .call(xAxis);

  // vis.append('svg:g')
  //   .attr('class', 'y axis')
  //   .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  //   .call(yAxis);

  // vis.selectAll('rect')
  //   .data(barData)
  //   .enter()
  //   .append('rect')
  //   .attr('x', function (d, i) {
  //     return xRange(barData.key[i]);
  //   })
  //   .attr('y', function (d) {
  //     return yRange(d.likes);
  //   })
  //   .attr('width', xRange.rangeBand())
  //   .attr('height', function (d) {
  //     return ((HEIGHT - MARGINS.bottom) - yRange(d.likes));
  //   })
  //   .attr('fill', 'grey');

}