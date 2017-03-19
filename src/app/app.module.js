(function () {
    'use strict';

    angular
        .module('iDiscoveryApp', [
            'ngMaterial',
            'ui.router',
            'ngMessages',
            'mdPickers'
        ])
        .run(run);

    run.$inject = ['DatabaseService'];

    function run(DatabaseService) {
        DatabaseService.initialize();
    }
})();