angular.module('MDApp.services', ['$cordovaSQLite'])
  .service('MDDataService', function($cordovaSQLite) {

    var db = $cordovaSQLite.openDB({name: "mdapp.db", location: 'default'});

    this.getData = function(request) {
      return 'real response';
    }

  })


  .service('MDLesionImage', ['MDDataService', function(MDDataService){

    this.check = function() {return 'loaded'};

    this.mottomatto = function(name) {
      return 'motto' + name + 'matto';
    };

    this.mitomato = function(request) {
      return MDDataService.getData(request);
    };

  }]);