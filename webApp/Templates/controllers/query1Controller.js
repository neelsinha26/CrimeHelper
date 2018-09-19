

// IIFE to not pollute global scope
(function() {

    // enforce variable declarations and others
    'use strict';

    // controller for about view
    angular
        .module('app.demo')
        .controller('query1Controller', query1Controller);

    query1Controller.$inject = [ '$scope', '$http', 'd3', 'drawGraph' ];

    function query1Controller($scope, $http, d3, drawGraph) {

        // bindables up top
        var vm = this;
        // two dates the user enters on 'demo.view.html'
        vm.userDate1;
        vm.userDate2;
        vm.userDate3;



        // functions called from buttons on 'demo.view.html'
        vm.generateGraph = generateGraph;
        vm.resetGraph = resetGraph;

        // function call upon controller instantiation
        activate();

        /////////////////////////////////////////////////

        function activate() {

            //Hide the tooltip box until graph is drawn
            d3.select("#tooltip").classed("hidden", true);


            var margin = {top: 20, right: 20, bottom: 70, left: 40},
                width = 600 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;


// set the ranges
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

            var y = d3.scale.linear().range([height, 0]);

// define the axis
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")


            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);


// add the SVG element
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


// load the data
            d3.json("mydata.json", function(error, data) {

                data.forEach(function(d) {
                    d.AREA_NAME = d.AREA_NAME;
                    d.NUM = +d.NUM;
                });

                // scale the range of the data
                x.domain(data.map(function(d) { return d.AREA_NAME; }));
                y.domain([0, d3.max(data, function(d) { return d.NUM; })]);

                // add axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.55em")
                    .attr("transform", "rotate(-90)" );

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 5)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("NUMuency");


                // Add bar chart
                svg.selectAll("bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.AREA_NAME); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.NUM); })
                    .attr("height", function(d) { return height - y(d.NUM); });

            });

            // // INITIAL GRAPH DRAW WITH FULL API DATA
            // // =======================================================================
            // $http.get("https://www.quandl.com/api/v1/datasets/FRED/GDP.json?auth_token=hnqzyDsDyLFLY8yW5Yr5&collapse=annual")
            //     .success(function(data, status, headers, config) {
            //
            //         drawGraph(data);
            //
            //         // end $http.get success
            //     })
            //     // end $http.get request
            //     .error(function(data) {
            //         console.log("API Error");
            //     });




        };

        /////////////////////////////////////////////////

        // watch for updates to the two date fields
        $scope.$watch('vm.userDate1', function() {
            console.log('vm.userDate1 updated!');
        });

        $scope.$watch('vm.userDate2', function() {
            console.log('vm.userDate2 updated!');
        });

        // function to generate dynamic chart based on user inputted dates
        // =======================================================================
        function generateGraph() {

            // angular async call to Quandl API using user input data
            $http.get("https://www.quandl.com/api/v1/datasets/FRED/GDP.json?auth_token=hnqzyDsDyLFLY8yW5Yr5&collapse=annual&trim_start=" + vm.userDate1 + "-12-31&trim_end=" + vm.userDate2 + "-12-31")

            // on success of API call...
                .success(function(data, status, headers, config) {

                    // remove the existing graph and replace it
                    d3.select("div.svg-container").remove();

                    // redraw graph with new data
                    drawGraph(data);

                    // end $http.get success
                })
                // end $http.get request
                .error(function(data) {
                    console.log("API Error");
                });

            // end generateGraph() function
        };

        // this resets the graph to the default 1949-2014 date range
        // this function is called from the 'demo.view.html' page 'reset' button
        // =======================================================================
        function resetGraph() {
            $http.get("https://www.quandl.com/api/v1/datasets/FRED/GDP.json?auth_token=hnqzyDsDyLFLY8yW5Yr5&collapse=annual")
                .success(function(data, status, headers, config) {

                    // clear text input boxes
                    vm.userDate1 = null;
                    vm.userDate2 = null;

                    // remove the existing graph and replace it
                    d3.select("div.svg-container").remove();

                    // redraw graph with full data set
                    drawGraph(data);

                    // end $http.get success
                })
                // end $http.get request
                .error(function(data) {
                    console.log("API Error");
                });

            // END RESET GRAPH FUNCTION
        };
        // end 'demoController'
    };

})();