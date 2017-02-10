$(document).ready(function(){

  $('a').click(function(){
    $('#nav').slideToggle(250);
    $('#btn-nav span').toggleClass('closed');
  });

});


