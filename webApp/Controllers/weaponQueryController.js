(function () {
    angular.module('crimeHelper.weaponQueryController', [
        'barChart.service'
    ])
        .controller("weaponQueryController", weaponQueryCtrl);

    function weaponQueryCtrl(api, $scope, $barChart) {
        var vm = this;
        vm.venues = [];
        vm.flag = false;
        vm.graphOptions = $barChart.getOptions("Weapons");

        $scope.$on('$locationChangeStart', function(event) {
            window.onresize = null;
        });

        api.GetWeaponUsed.get({}, function (response) {

            angular.forEach(response.weapons,function(val,index){
                var temp = [];
                temp.push(val.WEAPON_NAME);
                temp.push(val.TIMES_USED);
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

    weaponQueryCtrl.$inject = ["api", "$scope", "$barChart"];

})();