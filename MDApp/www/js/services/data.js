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
        borderIrregularity : "INTEGER",
        colorCount : "INTEGER",
        tdsScore: "REAL",
        key: "TEXT"
      });

      this.ApplicationState.index('key',{unique:true});

      this.Metadata = persistence.define('Metadata', {
        bodyLocationID: "INTEGER",
        x: "INTEGER",
        y: "INTEGER",
        description: "TEXT"
      });

      this.LesionImage.hasOne('metadata', this.Metadata);

      this.ApplicationState = persistence.define('ApplicationState', {
        key: "TEXT",
        valueStr: "TEXT",
        valueInt: "INTEGER"
      });

      this.ApplicationState.index('key',{unique:true});

      persistence.schemaSync();

      var allImages = this.LesionImage.all();

      allImages.list(null, function(results) {
        results.forEach(function(r) {
          console.log(r.filePath);
          window.lesionimage = r;
        })
      })
    };

    this.add = function (item){
      persistence.add(item);
    };


  })


  .service('MDLesionImage', ['MDDataService', function (MDDataService) {

    this.check = function () {
      return 'loaded'
    };

    this.newImage = function (path) {
      var image = new MDDataService.LesionImage({
        originalImagePath: path,
        creationDate: new Date(),
        borderImagePath: "",
        borderVersionID: 0,
        borderConfirmed: false
      });

      MDDataService.add(image);
      return image;
    }



  }]);