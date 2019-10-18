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
      this.setAttribute('style',"background: url('assets/images/l_"+ me.color +".png')");
      me.play();
    }
  }

  play(){
      var me = this;
      var audio = new Audio(this.sound);
      audio.play();
      setTimeout(function(){
        me.stop();
      }, 350);
  }

  stop(){
    this.element.setAttribute('style',"background: url('assets/images/"+ this.color +".png')");
  }

}