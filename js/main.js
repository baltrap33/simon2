//
// 				<div class="key" style="background: url('assets/images/red.png')"></div>
// 				<div class="key" style="background: url('assets/images/yellow.png')"></div>
// 				<div class="key" style="background: url('assets/images/blue.png')"></div>

$(document).ready(function(){

  function keyPlayed(detail) {
    let color = detail.color;
    if (color && gameMode){
      let key = keys.find(function(k){
        return k.color === color;
      });
      playerMelodie.push( key );
      compareMelodies();
    }
  }

  function compareMelodies(){
    var error = false;
    for (let i = 0; i < playerMelodie.length; i++) {
      let userNote = playerMelodie[i];
      let note = melodie[i];
      if (note.color !== userNote.color){
        error = true;
      }
    }
    if (error) {
      stopGame();
    }
    if (!error && playerMelodie.length === melodie.length) {
      setTimeout(launchGame, 900);
    }
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

  function addToMelodie(){
    let indexRandom = Math.floor( Math.random() * keys.length );
    melodie.push( keys[indexRandom] );
  }

  function launchGame(){
    playerMelodie = [];
    addToMelodie();
    playMelodie(melodie);
  }

  function stopGame(){
    gameMode = false;
    console.log('GAMEOVER');
  }

  function initGame(){
    gameMode = true;
    melodie = [];
    playerMelodie = [];
    launchGame();
  }
  var tabColors = ["green", "red", "yellow", "blue"];
  var keys = [], gameMode = false;
  var melodie = [], playerMelodie = [];

  $(".start-btn").click(function(){
    initGame();
  });
  createKeys(tabColors);
});
