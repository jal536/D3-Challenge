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
  const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
  const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const data = d3.csv("../assets/data/data.csv").then(function(data) {
    data.forEach(function(d) {
      d.poverty = +d.poverty;
      d.healthcare = +d.heatlhcare;
    })
    console.log(data);  
  });
  
  // Initial Params
  const xAxis1 = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, width]);

  const yAxis1 = d3.scaleLinear()
    .domain([0, d3.extent(data, d => d.heatlhcare)])
    .range([height, 0]);

  const bottomAxis = d3.axisBottom(xAxis1);
  const leftAxis = d3.axisLeft(yAxis1);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .attr("stroke", "green")
    .call(leftAxis);

  // var xScales = d3.scaleLinear()
  //   .domain([0, d3.max(data, d => d.poverty)])
  //   .range([width, 0]);

  // var yScale = d3.scaleLinear()
  //   .domain([0, d3.max(data, d => d.healthcare)])
  //   .range([height, 0]);

  // // // function used for updating x-scale const upon click on axis label
  // function xScale(data, chosenXAxis) {
  // // create scales
  // var xLinearScale = d3.scaleLinear()
  //   .domain([d3.min(data, d => d[chosenXAxis]),
  //     d3.max(data, d => d[chosenXAxis])
  //   ])
  //   .range([0, width]);

  // return xLinearScale;

  // }
  // console.log(data);
  function renderAxes(newXScale, xAxis) {
    const bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;

  function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
  }

  // function updateToolTip(chosenXAxis, circlesGroup) {
  //   let label  = "";
  //   if (chosenXAxis === "poverty") {
  //       label = "In Poverty (%)";
  //   }
  //   else {
  //       label = "Age (Median)";
  //   }

  //   const toolTip = d3.tip()
  //       .attr("class", "tooltip")
  //       .offset([80, -60])
  //       .html(function(d) {
  //           return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
  //       });

  //   circlesGroup.call(toolTip);

  //   circlesGroup.on("mouseover", function(data) {
  //       toolTip.show(data, this);
  //   })
  //   // onmouseout event
  //   .on("mouseout", function(data, index) {
  //       toolTip.hide(data, this);
  //   });

  // return circlesGroup;
  // }

  // (async function(){
  //   const Data = await d3.csv("data.csv");

  //   // parse data
  //   Data.forEach(function(data) {
  //       data.poverty = +data.poverty;
  //       data.age = +data.age;
  //       data.income = +data.income;
  //   });

  //   // xLinearScale function above csv import
  //   const xLinearScale = xScale(Data, chosenXAxis);

  //   // Create y scale function
  //   const yLinearScale = d3.scaleLinear()
  //       .domain([0, d3.max(Data, d => d.heatlhcare)])
  //       .range([height, 0]);

  //   // Create initial axis functions
  //   const bottomAxis = d3.axisBottom(xLinearScale);
  //   const leftAxis = d3.axisLeft(yLinearScale);

  //   // append x axis
  //   const xAxis = chartGroup.append("g")
  //       .classed("x-axis", true)
  //       .attr("transform", `translate(0, ${height})`)
  //       .call(bottomAxis);

  //   // append y axis
  //   chartGroup.append("g")
  //       .call(leftAxis);

  //   // append initial circles
  //   let circlesGroup = chartGroup.selectAll("circle")
  //       .data(Data)
  //       .enter()
  //       .append("circle")
  //       .attr("cx", d => xLinearScale(d[chosenXAxis]))
  //       .attr("cy", d => yLinearScale(d.healthcare))
  //       .attr("r", 20)
  //       .attr("fill", "lightBlue")
  //       .attr("opacity", ".5");

  //   // Create group for  2 x- axis labels
  //   const labelsGroup = chartGroup.append("g")
  //       .attr("transform", `translate(${width / 2}, ${height + 20})`);

  //   const povertyLabel = labelsGroup.append("text")
  //       .attr("x", 0)
  //       .attr("y", 20)
  //       .attr("value", "poverty") // value to grab for event listener
  //       .classed("active", true)
  //       .text("In Poverty (%)");

  //   const ageLabel = labelsGroup.append("text")
  //       .attr("x", 0)
  //       .attr("y", 40)
  //       .attr("value", "age") // value to grab for event listener
  //       .classed("inactive", true)
  //       .text("Age (Median)");

  //   // append y axis
  //   chartGroup.append("text")
  //       .attr("transform", "rotate(-90)")
  //       .attr("y", 0 - margin.left)
  //       .attr("x", 0 - (height / 2))
  //       .attr("dy", "1em")
  //       .classed("axis-text", true)
  //       .text("Lacks Healthcare (%)");

  //   // updateToolTip function above csv import
  //   circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  //   // x axis labels event listener
  //   labelsGroup.selectAll("text")
  //       .on("click", function() {
  //       // get value of selection
  //       const value = d3.select(this).attr("value");
  //       if (value !== chosenXAxis) {

  //           // replaces chosenXAxis with value
  //           chosenXAxis = value;

  //           // console.log(chosenXAxis)

  //           // functions here found above csv import
  //           // updates x scale for new data
  //           xLinearScale = xScale(Data, chosenXAxis);

  //           // updates x axis with transition
  //           xAxis = renderAxes(xLinearScale, xAxis);

  //           // updates circles with new x values
  //           circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

  //           // updates tooltips with new info
  //           circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  //           // changes classes to change bold text
  //           if (chosenXAxis === "poverty") {
  //               ageLabel
  //                   .classed("active", true)
  //                   .classed("inactive", false);
  //               povertyLabel
  //                   .classed("active", false)
  //                   .classed("inactive", true);
  //           }
  //           else {
  //               ageLabel
  //                   .classed("active", false)
  //                   .classed("inactive", true);
  //               povertyLabel
  //                   .classed("active", true)
  //                   .classed("inactive", false);
  //           }
  //       }
  //   });
  // })()
  // )}
}
