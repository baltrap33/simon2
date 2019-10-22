//
// 				<div class="key" style="background: url('assets/images/red.png')"></div>
// 				<div class="key" style="background: url('assets/images/yellow.png')"></div>
// 				<div class="key" style="background: url('assets/images/blue.png')"></div>

$(document).ready(function(){

  var tabColors = ["green", "red", "yellow", "blue"];
  var keys = [];

  function keyPlayed(detail) {
    console.log(detail.color);
  }

  function createKeys(tabColors){
    for (var i = 0; i < tabColors.length; i ++) {
      let color = tabColors[i];
      let key = new Key( color, $(".simon"), i+1 );
      key.element.addEventListener("keyPlayed", function(ev){
        let detail= ev.detail;
        keyPlayed(detail);
      });
      keys.push( key );
    }
  }

  function playNote(el){
    return el.play(true);
  }

  function playMelodie(tab){
    let max = tab.length;
    let index = 0;
    return new Promise(function(resolve, reject){
        let play = function (index){
          if (index < max){
            playNote( tab[index] ).then(function(){
              play(index+1);
            });
          } else {
            resolve();
          }
        };
        play(index);
    });
  }


  $(".start-btn").click(function(){
    var melodie = [ keys[3],keys[1],keys[2],keys[3],keys[1],keys[1],keys[0],keys[3],keys[1],keys[2],keys[3],keys[1],keys[1],keys[0],keys[3],keys[1],keys[2],keys[3],keys[1],keys[1],keys[0] ];
    playMelodie(melodie);
  });




  createKeys(tabColors);
});
