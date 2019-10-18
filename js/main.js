//
// 				<div class="key" style="background: url('assets/images/red.png')"></div>
// 				<div class="key" style="background: url('assets/images/yellow.png')"></div>
// 				<div class="key" style="background: url('assets/images/blue.png')"></div>

$(document).ready(function(){

  var tabColors = ["green", "red", "yellow", "blue"];
  var keys = [];
  function createKeys(tabColors){
    for (var i = 0; i < tabColors.length; i ++) {
      let color = tabColors[i];
      keys.push( new Key( color, $(".simon"), i+1 ) );
    }
  }








  createKeys(tabColors);
});
