

(function () {
  'use strict';

  angular.module('app.d3')
    .factory('drawGraph', [function() {
        return function(data) {
            var dataset = (data.data).reverse();

            // Set dimensions of SVG element
            var margin = { top: 30, right: 20, bottom: 50, left: 50 },
                w = 500 - margin.left - margin.right,
                h = 400 - margin.top - margin.bottom;
                var barPadding = 1;

            // parse dates from the API data
            var parseDate = d3.time.format("%Y-%m-%d").parse;

            dataset.forEach(function(d) {
                d[0] = parseDate(d[0]);
            });

            // Set the ranges and scales
            var x = d3.time.scale()
                .domain(d3.extent(dataset, function(d) { return d[0]; }))
                .range([0, w]);
            var y = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                .range([h, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(10);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Adds the svg canvas
            var svg = d3.select("#chart-area")
                .append("div")
                .classed("svg-container", true) //container class to make it responsive
                .append("svg")
                    //.attr("width", w + margin.left + margin.right)
                    //.attr("height", h + margin.top + margin.bottom)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 600 500")
                    //class to make it responsive
                    .classed("svg-content-responsive", true)
                .append("g")
                    .attr("transform",
                          "translate(" + margin.left + "," + margin.top + ")");

            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return i * (w / dataset.length);
                })
                .attr("y", function(d) {
                    return y(d[1]);
                })
                .attr("width", w / dataset.length - barPadding)
                .transition().delay(function (d, i) {
                    return i * 50;
                })
                .duration(50)
                .attr("height", function(d) {
                    return h - y(d[1]);
                })
                .attr("y", function(d) {
                    return y(d[1]);
                })
                .attr("fill", "#1C72FC");

            // populate the popups on mouse over
            svg.selectAll("rect")
                .on("mouseover", function(d) {

                    // change bar cover on hover
                    d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("fill", "#333");

                    //Get this bar's x/y values, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x")) + x / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", "140px")
                        .style("top", "160px")
                        .select("#year")
                        .text(d[0].getFullYear());

                    d3.select("#tooltip")
                        .select("#value")
                        .text('$' + d[1].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false);

                })
                .on("mouseout", function(d) {
                    d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("fill", "#1C72FC");

                    //Hide the tooltip
                    d3.select("#tooltip").classed("hidden", true);
                });


            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            // y-axis label
            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("GDP (Billions USD)");
        };
    }]);

}());