(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$state', 'EventService'];

    function EventController($scope, $state, EventService) {
        var vm = this;

        vm.events = EventService.all();
        
    }
})();