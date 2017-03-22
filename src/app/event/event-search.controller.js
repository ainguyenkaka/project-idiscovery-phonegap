(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventSearchController', EventSearchController);

    EventSearchController.$inject = ['$scope', 'EventService', ];

    function EventSearchController($scope, EventService) {
        var vm = this;

        vm.field = 'activity_name';
        vm.text = '';
        vm.startDate = null;
        vm.endDate = null;
        vm.events = [];
        vm.search = search;
        vm.reset = reset;
        vm.fields = [{
                title: 'Activity Name',
                value: 'activity_name'
            },
            {
                title: 'Reporter Name',
                value: 'reporter_name'
            },
            {
                title: 'Activity Location',
                value: 'activity_location'
            }
        ];


        search();

        function search() {
            EventService.search(vm.field, vm.text,vm.startDate,vm.endDate).then(function (value) {
                vm.events = value;
            });
        }

        function reset() {
            vm.field = 'activity_name';
            vm.text = '';
            vm.startDate = null;
            vm.endDate = null;
            search();
        }
    }
})();