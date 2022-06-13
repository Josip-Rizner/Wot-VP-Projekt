RadarChart.defaultConfig.color = function() {};
    RadarChart.defaultConfig.radius = 5;
    RadarChart.defaultConfig.w = 500;
    RadarChart.defaultConfig.h = 500;

var data = [
    {
    className: 'specific',
    axes: [
        {axis: "Firepower", value: 647}, 
        {axis: "Survivability", value: 566}, 
        {axis: "Mobility", value: 643},  
        {axis: "Concealment", value: 302},  
        {axis: "Spotting", value: 598}
    ]
    },
    {
    className: 'average',
    axes: [
        {axis: "Firepower", value: 766}, 
        {axis: "Survivability", value: 285}, 
        {axis: "Mobility", value: 469},  
        {axis: "Concealment", value: 345},  
        {axis: "Spotting", value: 706}
    ]
    }
];
          

var shell_data = [
    {
        "type": "APCR",
        "speed": "1535"
    },
    {
        "type": "HEAT",
        "speed": "900"
    },
    {
        "type": "HE",
        "speed": "900"
    }
    ];  


var chart = RadarChart.chart();
var cfg = chart.config(); // retrieve default config
var svg = d3.select('#radar_chart').append('svg')
    .attr('width', cfg.w + cfg.w)
    .attr('height', cfg.h + cfg.h / 4);

svg.append('g').classed('single', 1).datum(data).call(chart);

svg.append("circle").attr("cx",40).attr("cy",cfg.h + 20).attr("r", 6).style("fill", "#FFD700")
svg.append("circle").attr("cx",40).attr("cy",cfg.h + 50).attr("r", 6).style("fill", "#ADD8E6")
svg.append("text").attr("x", 60).attr("y", cfg.h + 20).text("Object 907").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 60).attr("y", cfg.h + 50).text("Average for mediums tanks in tier X").style("font-size", "15px").attr("alignment-baseline","middle")

function translate_x(d) {
  return "translate(" + d + "," + 0 + ")";
}

function translate_back(d) {
  return "translate(" + 0 + "," + 0 + ")";
}

var width = 1500;
var height = 300;

var svg_speed = d3.select('#shell_speed').append('svg')
  .attr('width', width)
  .attr('height',height)
  .style("background", "#edebeb")
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
svg_speed.append("g")
  .call(x_axis)
  .attr("x", 50)
  .attr("y", 100);


var shells = svg_speed.selectAll("image.shells")
  .data(shell_data)
  .enter()
  .append("svg:image")
  .attr("x", function(d){return  60})
  .attr("y", function(d,i){ return 1 + (i)*70})
  .attr('width',  150)
  .attr('height', 150)
  .attr("xlink:href", function(d){return `../static/images/${d.type}.png`});

var shellTypes = svg_speed.selectAll("h1")
  .data(shell_data)
  .enter()
  .append("svg:text")
  .style("font-weight", "bold")
  .text(function(d){return `${d.type}`})
  .attr("x", function(d){return  0})
  .attr("y", function(d,i){return 70 + (i)*70});
  


d3.select("#replay_shell_speed_animation").on("click", function() {
  shells.transition()
  .duration(function(d,i){ return calculateDistancePerSecond(d.speed) *1000})
  .ease("linear")
  .attr("transform", translate_x(1300))
  .transition()
    .duration(0)
    .attr("transform", translate_back)
});


function calculateDistancePerSecond(speed){
  return 1000/speed;
}              


var svg_behaviour = d3.select('#shell_behaviour').append('svg')
    .attr('width', width)
    .attr('height',height)
    .style("background", "#edebeb")
    .style("margin", "25px")
    .style("padding", "25px");

var shells_behaviour = svg_behaviour.selectAll("image.shells")
    .data(shell_data)
    .enter()
    .append("svg:image")
    .attr("class", function(d){if(`${d.type}` == "AP" || `${d.type}` == "APCR"){return "penetrates_dest_obj"} return "explodes_om_impact"})
    .attr("x", function(d){return  60})
    .attr("y", function(d,i){ return 1 + (i)*70})
    .attr('width',  150)
    .attr('height', 150)
    .attr("xlink:href", function(d){return `../static/images/${d.type}.png`});

var shellTypes_behaviour = svg_behaviour.selectAll("h1")
    .data(shell_data)
    .enter()
    .append("svg:text")
    .style("font-weight", "bold")
    .text(function(d){return `${d.type}`})
    .attr("x", function(d){return  0})
    .attr("y", function(d,i){return 70 + (i)*70});

    

var wall = svg_behaviour.append('image')
    .attr('xlink:href', '../static/images/wall.png')
    .attr('width', 100)
    .attr('height', height)
    .attr('x', width/2);

var behaviour1Shells = svg_behaviour.selectAll("image.penetrates_dest_obj");
var behaviour2Shells = svg_behaviour.selectAll("image.explodes_om_impact");

d3.select("#replay_shell_behaviour_animation").on("click", function() {

    behaviour1Shells.transition()
    .duration(function(d,i){ /*return calculateDistancePerSecond(d.speed) *1000*/ return 1500})
    .ease("linear")
    .attr("transform", translate_x(1300))
    .transition()
        .duration(0)
        .attr("transform", translate_back)
        .delay(1500)

    behaviour2Shells.transition()
    .duration(function(d,i){ /*return calculateDistancePerSecond(d.speed) *1000*/ return 750})
    .ease("linear")
    .attr("transform", translate_x(width/2-100))
    .transition()
        .delay(1500)
        .duration(0)
        .delay(1500)
        .attr("transform", translate_back)
        .delay(1500)

});