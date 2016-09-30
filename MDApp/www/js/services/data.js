angular.module('MDApp.data.services', [])

  .service('MDDataService', function($q) {

    var db = null;
    this.defered = null;

    document.addEventListener('deviceready', function() {
      db = window.sqlitePlugin.openDatabase({name: "mdapp.db", location: 'default'});
    });

    this.initializeDB = function() {

      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Images (filePath, creationDate)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS LesionImage (filePath, creationDate)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Metadata (lesionImage INTEGER, ' +
          'lesionDescription, lesionLocation INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS LesionLocation (bodyLocationID INTEGER, ' +
          'x INTEGER, y INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS BorderImage (lesionImage INTEGER, ' +
          'filePath, creationDate)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS RiskAssessment (lesionImage INTEGER, ' +
          'assessmentDate, versionNr INTEGER, sfaMajor INTEGER, sfaMinor INTEGER, ' +
          'border INTEGER, color INTEGER, tdsScore REAL )');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ActiveElement (LesionImage INTEGER)');
      }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
      }, function(){
        console.log('Populated database OK')
      });

    };

    this.select = function(query) {

      this.defered = $q.defer();

      db.transaction(function (tx) {

        tx.executeSql(query, values, function(tx, resultSet){
          this.defered.resolve(resultSet);
        }, function(tx, error) {
          this.deferred.reject(error);
        });
      });

      return this.defered.promise;
    };

    this.selectFirst = function (query, value) {
      this.defered = $q.defer();

      db.transaction(function (tx) {

        tx.executeSql(query, values, function(tx, resultSet){
          this.defered.resolve(resultSet.rows.item(0));
        }, function(tx, error) {
          this.deferred.reject(error);
        });
      });

      return this.defered.promise;
    };


    this.getItemFromTableWithID = function(table, id) {

      return db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + table + ' WHERE ROWID = ' + id);
      })

    };

    this.insertItemIntoTable = function(query, values) {

      this.defered = $q.defer();

      db.transaction(function (tx) {

        tx.executeSql(query, values, function(tx, resultSet){
          this.defered.resolve(resultSet);
        }, function(tx, error) {
          this.deferred.reject(error);
        });
      });

      return this.defered.promise;
    }

  })


  .service('MDLesionImage', ['MDDataService', function(MDDataService){

    this.check = function() {return 'loaded'};
    this.table = 'LesionImage'

    this.getLesionImage = function(id) {
      return MDDataService.getItemFromTableWithID(this.table, id);
    }

    this.newImage = function(path) {
      var date = new Date()
      var values = [path, date.toISOString()];
      var query = "INSERT INTO Images (filePath, creationDate) VALUES (?,?) ";

      return MDDataService.insertItemIntoTable(query, values);

    }

    this.getActiveImage = function() {

      var query = 'SELECT * FROM Images ORDER BY ASC(?)'
      var value = 'creationDate'

      return MDDataService.selectFirst(query)

    }

  }]);