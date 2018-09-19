(function () {
    angular.module('api.service',[
        'ngResource'
    ])
        .factory('api',['$resource',function ($resource) {
            return{
                GetUnsafeAreas: $resource('/api/v1/getUnsafeAreas',{},{}),

                GetCategories: $resource('/api/v1/getCategories', {}, {}),

                GetCrimeAreas: $resource('/api/v1/getCrimeAreasCategory', {startTime: '@startTime', endTime: '@endTime', category: '@category'}, {}),

                GetAreas: $resource('/api/v1/getAreas', {}, {}),

                GetRace: $resource('/api/v1/getRace', {}, {}),

                GetTableEntryCount: $resource('/api/v1/getTableEntryCount', {}, {}),

                GetPercentageAreas : $resource('/api/v1/getPercentageCrime/RaceGenderAge', {race: '@race', age: '@age', gender: '@gender'}, {}),

                GetWeaponUsed: $resource('/api/v1/getTopWeaponsUsed', {}, {}),
            };
        }])
})();