class Key {

  constructor(color, parent, id){
    this.color = color;
    this.simon = parent;
    this.sound = "assets/sounds/son"+id+".mp3";
    this.element = this.constructMe();
    this.startListeners();
    return this;
  }

  constructMe(){
    let k = document.createElement('div');
        k.className = 'key';
        k.setAttribute('style',"background: url('assets/images/"+ this.color +".png')");
        this.simon.append(k);
    return k;
  }

  startListeners(){
    var me = this;
    this.element.onclick = function(){

      me.play();
    }
  }

  play(computerPlay){
      var me = this;
      this.element.setAttribute('style',"background: url('assets/images/l_"+ me.color +".png')");
      return new Promise(function(resolve, reject){
        var audio = new Audio(me.sound);
        audio.play();
        audio.onended = function(){
          me.stop();
          let ev = new CustomEvent("keyPlayed", { detail : { color : me.color } });
          if(!computerPlay){
            me.element.dispatchEvent(ev);
          }
          resolve();
        };
        audio.onerror = function(err){
          reject(err);
        }
      });
  }

  stop(){
    this.element.setAttribute('style',"background: url('assets/images/"+ this.color +".png')");
  }

}