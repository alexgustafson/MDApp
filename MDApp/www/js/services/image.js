angular.module('MDApp.image.services', [])

  .service('MDBorderService', function ($q) {

    this.getBorder = function (imagePath) {

      var fileURL = imagePath

      var options = new FileUploadOptions();
      options.fileKey = "image";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.headers = { Connection: "close" };
      options.params = { key: options.fileName };

      var defered = $q.defer();

      var win = function (r) {
        defered.resolve(JSON.parse(r.response));
      }

      var fail = function (error) {
        defered.reject(error);
      }

      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI("http://mdserver.offshore.webfactional.com/border/upload/"), win, fail, options);

      return defered.promise;

    }

    this.confirmBorder = function (imagePath, confirmed) {

    }


  })

  .service('MDAnalysisService', function ($q) {

    this.getAnalysis = function (imagePath) {




    };

  });
