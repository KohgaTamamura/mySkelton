$(document).ready(function(){

  $('#btn-nav').click(function(){
    $('#nav').slideToggle(250);
    $('#btn-nav span').toggleClass('closed');
  });

});


