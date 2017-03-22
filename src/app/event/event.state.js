(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];


    function stateConfig($stateProvider) {
        $stateProvider
            .state('event', {
                parent: 'app',
                url: '/event',
                views: {
                    'content@': {
                        templateUrl: 'app/event/events.html',
                        controller: 'EventController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('event.new', {
                url: '/new',
                views: {
                    'content@': {
                        templateUrl: 'app/event/event-addedit.html',
                        controller: 'EventAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: [function () {
                        var entity = {
                            id: null,
                            activity_name: null,
                            reporter_name: null,
                            activity_location: null,
                            attending_time: new Date(),
                            activity_date: new Date()
                        };
                        return entity;
                    }]
                }
            })
            .state('event.detail', {
                url: '/detail/{id}',
                views: {
                    'content@': {
                        templateUrl: 'app/event/event-detail.html',
                        controller: 'EventDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'EventService', function ($stateParams, EventService) {
                        return EventService.get($stateParams.id);
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'event',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })
            .state('event.edit', {
                url: '/edit/{id}',
                views: {
                    'content@': {
                        templateUrl: 'app/event/event-addedit.html',
                        controller: 'EventAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'EventService', function ($stateParams, EventService) {
                        return EventService.get($stateParams.id);
                    }]
                }
            })
            .state('event.delete', {
                url: '/delete/{id}',
                onEnter: ['$stateParams', '$state', '$mdDialog', 'EventService', function ($stateParams, $state, $mdDialog, EventService) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this event?')
                        .textContent('This event and its details will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        EventService.del($stateParams.id).then(function () {
                            $state.go('event', null, {
                                reload: 'event'
                            });
                        });

                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('event.search', {
                url: '/search',
                views: {
                    'content@': {
                        templateUrl: 'app/event/event-search.html',
                        controller: 'EventSearchController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();