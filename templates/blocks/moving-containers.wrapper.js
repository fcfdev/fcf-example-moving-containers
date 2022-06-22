fcf.module({
  name:         "templates/blocks/moving-containers.wrapper.js",
  dependencies: ["fcf:NClient/Wrapper.js"],
  module: function(Wrapper){
    return class WrapperEx extends Wrapper{

      constructor(a_initializeOptions){
        super(a_initializeOptions);
      }

      initialize(){
        this._background = undefined;
        this._clickCounter = 0;
        this._reboundCounter = 0;
        return super.initialize();
      }

      attach(){
        if (this._background)
          this.select(".moving-containers-view-img")[0].src = this._background;
        fcf.addDomListener(this.select(".moving-containers-view-img")[0], "dragstart", this, "onImageDragStart");
        return super.attach();
      }

      onArg(a_argName, a_value, a_editor, a_ignoreRedrawing, a_isInnerCall, a_suffix) {
        if ((a_argName == "_strings" || a_argName == "_file") && !this.getArg("_modify")) {
          this.setArg("_modify", true);
        }
      }

      onImageDragStart(a_event){
        a_event.preventDefault();
      }

      onClickString(a_event){
        ++this._clickCounter;
        this.select("[name=click_counter]")[0].innerHTML = this._clickCounter;
      }

      onReboundString(a_event){
        ++this._reboundCounter;
        this.select("[name=rebound_counter]")[0].innerHTML = this._reboundCounter;
      }

      onSave() {
        this.setArg("_modify", false);
        this.send({strings: this.getArg("_strings")}, [this.getArg("_file")]);
        this.select("input[type=file]")[0].value = "";
        this.update();
      }

      onCancel(a_index) {
        this._background = false;
        this.reload();
      }

      onRemoveString(a_index){
        let strings = this.getArg("_strings");
        strings.splice(a_index, 1);
        this.setArg("_strings", strings);
        this.update();
      }

      onAddString(){
        let strings = this.getArg("_strings");
        strings.push("")
        this.setArg("_strings", strings);
        this.update();
      }

      onFile(){
        let self = this;
        let fileReader = new FileReader();
        fileReader.onload = () => {
          self._background = fileReader.result;
          self.select(".moving-containers-view-img")[0].src = fileReader.result;
        }
        let input = this.select("input[type=file]")[0];
        fileReader.readAsDataURL(input.files[0]);
        this.setArg("_file", input);
      }

    };
  }
});
