fcf.module({
  name:         "templates/blocks/moving-containers.wrapper.js",
  dependencies: ["fcf:NClient/Wrapper.js"],
  module: function(Wrapper){
    return class WrapperImpl extends Wrapper{

      constructor(a_initializeOptions){
        super(a_initializeOptions);
      }

      onArg(a_argName, a_value, a_editor, a_ignoreRedrawing, a_isInnerCall, a_suffix) {
        if ((a_argName == "_strings" || a_argName == "_file") && !this.getArg("_modify")) {
          this.setArg("_modify", true);
        }
      }

      onRemoveString(a_index){
        let strings = this.getArg("_strings");
        strings.splice(a_index, 1);
        this.setArg("_strings", strings);
        this.update();
      }

      onAddString() {
        let strings = this.getArg("_strings");
        strings.push("")
        this.setArg("_strings", strings);
        this.update();
      }

      onFile() {
        let self = this;
        let fileReader = new FileReader();
        fileReader.onload = () => {
          self.setArg("_file", fileReader.result);
          self.update();
        }
        fileReader.readAsDataURL(this.select("input[type=file]")[0].files[0]);
      }

      onSave() {
        this.send({strings: this.getArg("_strings")}, [this.select("input[type='file']")[0]]);
        this.setArg("_modify", false);
      }

    };
  }
});
