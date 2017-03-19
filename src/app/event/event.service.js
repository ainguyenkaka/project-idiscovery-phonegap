(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('EventService', EventService);

    EventService.$inject = [];

    function EventService() {
        var instance = {
            all: all,
            add: add,
            del: del,
            get: get,
            update: update
        };

        var list = [{
                id: 2131211231212,
                activity_name: 'Running',
                reporter_name: 'BBC',
                activity_date: new Date('2016-08-12'),
                activity_location: '13 Street London',
                attending_time: new Date('2016-08-12 12:00'),

            },
            {
                id: 412121312121,
                activity_name: 'Eating',
                reporter_name: 'BBC',
                activity_date: new Date('2016-08-12'),
                activity_location: '13 Street London',
                attending_time: new Date('2016-08-12 12:00'),

            },
            {
                id: 12121213121,
                activity_name: 'Playing football',
                reporter_name: 'CNN',
                activity_date: new Date('2016-08-12'),
                activity_location: '13 Street London',
                attending_time: new Date('2016-08-12 12:00'),
            }
        ];

        function all() {
            return list;
        }

        function add(item) {
            list.push[item];
        }

        function get(id) {
            return list[0];
        }

        function update(item) {
            list[0] = item;
        }

        function del(id) {
            list.splice(0,1);
        }

        return instance;
    }
})();