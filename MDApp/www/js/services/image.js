angular.module('MDApp.image.services', [])

  .service('MDImageService', function ($q) {

    this.getBorder = function (image) {

      var fileURL = image

      var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
      }

      var fail = function (error) {
        console.log("An error has occurred: Code =  " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
      }

      var options = new FileUploadOptions();
      options.fileKey = "image";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.headers = {
          Connection: "close"
        };

      var params = {};
      params.value11 = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      params.key = fileURL.substr(fileURL.lastIndexOf('/') + 1);

      options.params = params;

      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI("http://192.168.1.63:8000/border/upload/"), win, fail, options);



    }


  });

