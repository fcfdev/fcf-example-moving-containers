const libFS = require('fs');
const libUtil = require('util');

fcf.module({
  name:         "templates/blocks/moving-containers.receive.js",
  dependencies: [],
  lazy:         [],
  module: function() {
    return class Handler {
      async receive(a_data, a_files){
        if (a_data.strings) {
          await fcf.application.setSystemVariable("application:strings", a_data.strings);
        }
        if (a_files[0]) {
          await libUtil.promisify(libFS.copyFile)(a_files[0].path, fcf.getPath(":files/background.jpg"));
        }
      }
    }
  }
});
