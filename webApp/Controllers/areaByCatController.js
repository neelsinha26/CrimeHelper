(function () {
    angular.module("crimeHelper.areaByCatController", [

    ])
        .controller("AreaByCatController", areaByCatCtrl);

    function areaByCatCtrl(api, $barChart) {
        var vm = this;
        vm.startTime = new Date(1970, 0, 1, 0, 0, 0);
        vm.endTime = new Date(1970, 0, 1, 1, 0, 0);
        vm.categories = [];

        vm.flag = false;
        vm.graphOptions = $barChart.getOptions("Areas");
        vm.selectedCat = {CRIMEDESCRIPTION: "Please select crime category"};
        api.GetCategories.get({}, function (response) {
            vm.categories = response.categories;

        }, function (errResponse) {

        })

        vm.selectCat = function (crime) {
            vm.selectedCat = crime;

        }

        vm.generateGraph = function () {

                var venues = [];
                api.GetCrimeAreas.get({
                startTime: moment(vm.startTime).format("HH:MM"),
                endTime:  moment(vm.endTime).format("HH:MM"),
                category: vm.selectedCat.CRIMEDESCRIPTION
            }, function (response) {
                angular.forEach(response.areas,function(val,index){
                    var temp = [];
                    temp.push(val.AREA_NAME);
                    temp.push(val.NUM);
                    venues.push(temp);

                });

                vm.graphData = [
                    {
                        key: "Check-ins",
                        bar: true,
                        values: venues
                    }
                ];
                vm.flag = true;
            }, function (errResponse) {
                
            })
        }
    }
})();