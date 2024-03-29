fcf.module({
  name:         "templates/blocks/moving-containers+view-item.wrapper.js",
  dependencies: ["fcf:NClient/Wrapper.js"],
  module: function(Wrapper){
    return class WrapperImpl extends Wrapper{

      constructor(a_initializeOptions){
        super(a_initializeOptions);
        this._radians  = Math.PI * Math.random() * 2;
        this._x        = 0;
        this._y        = 0;
      }

      initialize() {
        this.timer();
        return super.initialize();
      }

      attach(){
        this.setPosition();
        this.setColor();
        fcf.addDomListener(this.getDomElement(), "click", this);
        return super.attach();
      }

      onClick(a_event){
        let string = this.getArg("string");
        string = string.split("").reverse().join("");
        this.setArg("string", string);
      }

      timer() {
        let self  = this;
        if (this._destroy)
          return;
        this.setPosition();
        setTimeout(()=>{
          self.timer();
        }, 30);
      }

      setPosition(){
        let selfRect   = fcf.getRect(this.getDomElement());
        let ownerRect  = fcf.getRect(this.getParent().select(".moving-containers-view")[0]);
        let dx = Math.cos(this._radians) / 200;
        let dy = Math.sin(this._radians) / 200;
        if ((dx > 0 && (this._x + (selfRect.width / ownerRect.width) + dx > 1)) ||
            (dx < 0 && (this._x + dx < 0))) {
          this._radians += ((Math.PI / 2) - this._radians) * 2;
          dx = -dx;
          fcf.emitDomEvent(this.getDomElement(), "rebound", {});
        } else if (((dy > 0) && (this._y + (selfRect.height / ownerRect.height) + dy > 1)) ||
                   ((dy < 0) && (this._y + dy < 0))){
          this._radians += (Math.PI - this._radians) * 2;
          dy = -dy;
          fcf.emitDomEvent(this.getDomElement(), "rebound", {});
        }
        this._x += dx;
        this._y += dy;
        let rect = fcf.getRect(this.getParent().select(".moving-containers-view")[0]);
        this.getDomElement().style.left = (this._x * rect.width + rect.left) + "px";
        this.getDomElement().style.top = (this._y * rect.height + rect.top) + "px";
      }

      setColor(){
        let string = this.getArg("string");
        let r = 0;
        let g = 0;
        let b = 0;
        for(let i = 0; i < string.length; ++i) {
          r += string.charCodeAt(i)*9;
          g += string.charCodeAt(i)*99;
          b += string.charCodeAt(i)*999;
        }
        r = Math.floor(r % 255);
        g = Math.floor(g % 255);
        b = Math.floor(b % 255);
        let color = "#" +
                    fcf.padStart(r.toString(16), 2, "0") +
                    fcf.padStart(g.toString(16), 2, "0") +
                    fcf.padStart(b.toString(16), 2, "0");
        this.getDomElement().style.color = color;
      }

    };
  }
});
