(function () {
    angular.module('crimeHelper.countQueryController', [
        'barChart.service'
    ])
        .controller("countQueryController", countQueryCtrl);

    function countQueryCtrl(api, $scope, $barChart) {
        var vm = this;
        vm.venues = [];
        vm.flag = false;
        vm.graphOptions = $barChart.getOptions();

        $scope.$on('$locationChangeStart', function(event) {
            window.onresize = null;
        });

        api.GetTableEntryCount.get({}, function (response) {

            angular.forEach(response.TableCounts,function(val,index){
                var temp = [];
                temp.push(val.TABLE_NAME);
                temp.push(val.COUNT);
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

    countQueryCtrl.$inject = ["api", "$scope", "$barChart"];

})();