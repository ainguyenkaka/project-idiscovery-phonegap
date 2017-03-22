(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('DatabaseService', DatabaseService);

    DatabaseService.$inject = ['$window', 'GeneratoreService','ConvertService'];

    function DatabaseService($window, GeneratoreService,ConvertService) {

        var instance = {
            initialize: initialize,
            getDB: getDB
        };

        var database = null;

        function initialize() {
            database = $window.openDatabase('idiscovery_db', '1.0', 'iDiscovery database', 2 * 1024 * 1024, firstCreate);
            function firstCreate() {
                createTables(database);
            }
        }

        function getDB() {
            return database;
        }

        function createTables(db) {
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE event (' +
                    'id INT NOT NULL PRIMARY KEY,' +
                    'activity_name TEXT NOT NULL,' +
                    'reporter_name TEXT NOT NULL,' +
                    'activity_date DATE NOT NULL,' +
                    'activity_location TEXT,' +
                    'attending_time DATETIME' +
                    ')', null, onEventTableSuccess);
            });

            function onEventTableSuccess() {
                insertDefaultEvents(db);
            }
        }

        function insertDefaultEvents(db) {
            var query = 'INSERT INTO event VALUES (?,?,?,?,?,?)';
            db.transaction(function (tx) {
                var data = [GeneratoreService.generateID(), 'Running', 'BBC', ConvertService.convertDateToString(new Date()),  '15 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 'Eating', 'BBN', ConvertService.convertDateToString(new Date()),  '10 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 'Playing football', 'CNN', ConvertService.convertDateToString(new Date()), '21 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);
            });
        }


        return instance;
    }
})();