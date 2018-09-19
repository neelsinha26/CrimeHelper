(function () {



    angular.module('crimeHelper.percentageQueryController', [
        'pieChart.service'
    ])
        .controller("percentageQueryController", percentageQueryCtrl);

    percentageQueryCtrl.$inject = [ '$scope', '$http', 'api', 'pieChart' ];

    function percentageQueryCtrl( $scope,$http, api, pieChart ) {

        // two dates the user enters on 'demo.view.html'
        var vm = this;
        vm.race = "Select Race";
        vm.gender = "Select Gender";
        vm.genderList = ["Male", "Female", "NotKnown", "Trans"];
        vm.graphOptions = pieChart.getOptions();
        vm.flag = true;

        vm.selectRace = function (race) {
            vm.race = race.RACE;
        };
        vm.selectGender = function (gender) {
            vm.gender = gender;
        };
        api.GetRace.get({}, function (response) {
            vm.raceList = response.areas;
        });


        vm.myFunc = function() {
            vm.graphData = [];
            var url = "http://localhost:3000/api/v1/getPercentageCrime/RaceGenderAge?race="+vm.race+"&age="+vm.age+"&gender="+vm.gender;

            console.log("inside myfunc");

            console.log(url);
            $http.get(url)
                .then(function(response) {
                    console.log("Inside get Call");
                    console.log(response.data);
                    var g = response.data;
                    $scope.result = g.areas;
                    console.log("VM result");
                    console.log($scope.result);

                    angular.forEach(g.areas,function(val,index){
                        var temp = {};
                        temp.key = val.AREA_NAME;
                        temp.y = val.PERCENTAGE;
                        // temp.color = "yellow";
                        vm.graphData.push(temp);
                        vm.flag = true;
                    });
                });

        };


    }


})();