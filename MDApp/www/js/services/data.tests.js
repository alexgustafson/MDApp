describe('MDLesionImage Tests', function () {

  beforeEach(function() {

    angular.module('$cordovaSQLite', []);

    module('MDApp.data.services');

    module(function ($provide) {

      $provide.service('MDDataService', function () {


        this.initializeDB = function() {};

        this.insertItemIntoTable = function(values, table){

          var statement = "INSERT INTO " + table + " VALUES(" + values + ")";
          console.log(statement)
          return 1
        };

      });

    });
  });


  it('will load MDLesionImage', inject(function (MDLesionImage) {
    expect(MDLesionImage.check()).toEqual('loaded');
  }));

  it('will insert image data', inject(function (MDLesionImage) {
    expect(MDLesionImage.newImage('path/to/image.jpeg')).toEqual(1);
  }));



})