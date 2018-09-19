(function () {
    angular.module('crimeHelper.unsafeAreaController', [
        'barChart.service'
    ])
        .controller("unsafeAreaController", unsafeAreaCtrl);

    function unsafeAreaCtrl(api, $scope, $barChart) {
        var vm = this;
        vm.venues = [];
        vm.flag = false;
        vm.graphOptions = $barChart.getOptions("Areas");

        $scope.$on('$locationChangeStart', function(event) {
            window.onresize = null;
        });

        api.GetUnsafeAreas.get({}, function (response) {

            angular.forEach(response.areas,function(val,index){
                var temp = [];
                temp.push(val.AREA_NAME);
                temp.push(val['COUNT(*)']);
                vm.venues.push(temp);

            });

            vm.graphData = [
                {
                    key: "Check-ins",
                    bar: true,
                    values: vm.venues
                }
            ];
            vm.flag = true;
        }, function (errResponse) {

        })

    }

    unsafeAreaCtrl.$inject = ["api", "$scope", "$barChart"];

})();