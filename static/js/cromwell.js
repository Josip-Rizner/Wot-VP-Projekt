function translate_x(d) {
    return "translate(" + 1300 + "," + 0 + ")";
  }

  function translate_back(d) {
    return "translate(" + 0 + "," + 0 + ")";
  }

  var width = 1500;
  var height = 400;
  
  var svg = d3.select('#shell_speed').append('svg')
    .attr('width', width)
    .attr('height',height)
    .style("background", "lightgray")
    .style("margin", "25px")
    .style("padding", "25px");

  // Create scale
  var scale = d3.scale.linear()
    .domain([0, 1000])
    .range([100, 1400]);

    // Add scales to axis
  var x_axis = d3.svg.axis()
      .scale(scale);
  
  //Append group and insert axis
  svg.append("g")
    .call(x_axis)

  svg.append("h1")
    .text("test")

  var shell = svg.append('image')
    .attr('xlink:href', '../static/images/AP.png')
    .attr('width', 100)
    .attr('height', 100)
    //.attr('x', 50);



  d3.select("#replay").on("click", function() {
    shell.transition()
    .duration(500)
    .ease("linear")
    .attr("transform", translate_x)
    .transition()
      .duration(0)
      .attr("transform", translate_back)
  });