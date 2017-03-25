'use strict';

describe('Controller Tests', function () {

    beforeEach(module('iDiscoveryApp'));

    describe('HomeController', function () {
        var $scope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('HomeController as vm', {
                $scope: $scope
            });
        }));

        it('should have iDiscovery title', function () {
            expect($scope.vm.title).toEqual('iDiscovery');
        });
    });
});