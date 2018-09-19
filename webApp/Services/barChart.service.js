(function(){
    angular.module("barChart.service",[

    ])
        .factory("$barChart",function() {
            return {
                getOptions: getOptions
            };
        })

    function getOptions(xLabel, bottom) {
        return {
            chart: {
                "type": "discreteBarChart",
                "height": 450,
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 200,
                    "left": 65
                },
                "showValues": false,
                "duration": 500,
                "xAxis": {
                    "axisLabel": xLabel,
                    "rotateLabels": -45
                },
                "yAxis": {
                    "axisLabel": "Number of reported crimes",
                    "axisLabelDistance": 0
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];}

            }
        }
    }
})();