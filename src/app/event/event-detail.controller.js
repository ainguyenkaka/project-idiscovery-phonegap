(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$state', 'entity','previousState'];

    function EventDetailController($scope, $state, entity,previousState) {
        var vm = this;
        vm.event = entity;

        vm.previousState = previousState;
    }
})();