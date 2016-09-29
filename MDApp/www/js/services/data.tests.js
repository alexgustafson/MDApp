describe('Data Unit Tests', function () {

  beforeEach(function() {

    angular.module('$cordovaSQLite', []);

    module('MDApp.services');

    module(function ($provide) {

      $provide.service('MDDataService', function () {
        this.getData = function (quark) {
          return quark;
        }
      });

    });
  });


  it('will mottoXmattofy any word', inject(function (MDLesionImage) {
    expect(MDLesionImage.mottomatto('XoX')).toEqual('mottoXoXmatto');
  }));

  it('will mitto any word', inject(function (MDLesionImage) {
    expect(MDLesionImage.mitomato('XoX')).toEqual('XoX');
  }));


})