// @TODO: YOUR CODE HERE!
  const svgWidth = 960;
  const svgHeight = 500;

  const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  const svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const chosenXAxis = "poverty";

  const data = d3.csv("../assets/data/data.csv").then(function(data) {
    data.forEach(function(d) {
      d.poverty = +d.poverty;
      d.healthcare = +d.heatlhcare;
    })
    console.log(data);  
  });
  
  // Initial Params
  var xScale = d3.scaleLinear()
    .domain(0, d3.max(data, d => d.poverty))
    .range([0, width]);
    
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.heatlhcare)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  const xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);
 
  const circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[chosenXAxis]))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "5")
    .style("fill", "lightblue")

  circlesGroup.on("mouseover", function() {
    d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 20)
      .attr("fill", "lightblue");
  })
  .on("mouseout", function() {
    d3.select(this)
    .transition()
    .duration(1000)
    .attr("r", 10)
    .attr("fill", "red");
  });

  chartGroup.selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", d => yScale(d));

  // // Create Circles
  // var circlesGroup = chartGroup.selectAll("circle")
  //   .data(data)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", d => xScale(d.poverty))
  //   .attr("cy", d => yScale(d.healthcare))
  //   .attr("r", 15)
  //   .attr("class", function(d) {
  //       return "stateCircle " + d.abbr;
  //     })
  //   .attr("fill", "Blue")
  //   .attr("opacity", ".8")

  // var toolTip = d3.tip()
  // .attr("class", "tooltip")
  // .attr([1, -1])
  // .html(function(d) {
  //   return (`${d.abbr}`);
  // });

  // // Create tooltip in the chart
  // chartGroup.call(toolTip);

  // circlesGroup.on("click", function(data) {
  //     toolTip.show(data, this);
  //   })
  //     // onmouseout event
  //     .on("mouseout", function(data, index) {
  //       toolTip.hide(data);
  //     });

  // chartGroup.append("text")
  //   .attr("transform", `translate(${width / 3}, ${height + margin.top + 20})`)
  //   .text("In Poverty (%)");

  //   // Create axes labels
  //   chartGroup.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left + 40)
  //     .attr("x", 0 - (height/1.2))
  //     .attr("dy", "1em")
  //     .attr("class", "axisText");


