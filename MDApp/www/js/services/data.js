angular.module('MDApp.data.services', [])

  .service('MDDataService', function ($q) {

    var db = null;
    this.defered = null;
    this.LesionImage = null;
    this.Metadata = null;
    this.ApplicationState = null;

    document.addEventListener('deviceready', function () {
      db = window.sqlitePlugin.openDatabase({name: "mdapp.db", location: 'default'});
    });

    this.initializeDB = function () {

      persistence.store.cordovasql.config(
        persistence,
        'mdapp.db',
        '0.0.1',                // DB version
        'MDApp Database',          // DB display name
        5 * 1024 * 1024,        // DB size (WebSQL fallback only)
        0,                      // SQLitePlugin Background processing disabled
        2                       // DB location (iOS only), 0 (default): Documents, 1: Library, 2: Library/LocalDatabase
      );

      this.LesionImage = persistence.define('LesionImage', {
        originalImagePath: "TEXT",
        creationDate: "TEXT",
        borderImagePath: "TEXT",
        borderVersionID: "INTEGER",
        borderConfirmed: "INTEGER",
        assessmentDate: "DATE",
        assessmentVersionID: "INTEGER",
        sfaMajor: "INTEGER",
        sfaMinor: "INTEGER",
        borderIrregularity: "INTEGER",
        colorCount: "INTEGER",
        tdsScore: "REAL",
        key: "TEXT"
      });

      this.LesionImage.prototype.save = function () {
        persistence.flush();
      }

      this.LesionImage.index('key', {unique: true});

      this.Metadata = persistence.define('Metadata', {
        bodyLocationID: "INTEGER",
        x: "INTEGER",
        y: "INTEGER",
        description: "TEXT"
      });

      this.Metadata.prototype.save = function () {
        persistence.flush();
      }

      this.LesionImage.hasOne('metadata', this.Metadata);

      this.ApplicationState = persistence.define('ApplicationState', {
        key: "TEXT",
        valueStr: "TEXT",
        valueInt: "INTEGER"
      });

      this.ApplicationState.prototype.save = function () {
        persistence.flush();
      }

      this.ApplicationState.index('key', {unique: true});

      persistence.schemaSync();

      var allImages = this.LesionImage.all();

      allImages.list(null, function (results) {
        results.forEach(function (r) {
          console.log(r.filePath);
          window.lesionimage = r;
        })
      })
    };

    this.add = function (item) {
      persistence.add(item);
      persistence.flush();
    };

    this.save = function () {
      persistence.flush();
    }


  })


  .service('MDLesionImage', ['MDDataService', function (MDDataService) {


    this.newImage = function (path) {
      var image = new MDDataService.LesionImage({
        originalImagePath: path,
        creationDate: new Date(),
        borderImagePath: "",
        borderVersionID: 0,
        borderConfirmed: 0
      });

      MDDataService.add(image);
      return image;
    }

    this.save = function () {
      MDDataService.save()
    };

  }])

  .service('MDAppState', ['MDDataService', function (MDDataService) {

    this.ActiveImageKey = null;

    this.save = function () {
      MDDataService.save()
    };

    this.initialize = function () {

      var stateManager = this;

      MDDataService.ApplicationState.all().filter('key', '=', 'ActiveImageKey').one(function (result) {
        if (result) {
          stateManager.ActiveImageKey = result;
        } else {
          stateManager.ActiveImageKey = new MDDataService.ApplicationState({
            key: "ActiveImageKey",
            valueStr: ""
          });

          MDDataService.add(stateManager.ActiveImageKey);
        }
      });
    };


  }]);