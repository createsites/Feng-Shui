$(document).ready(function(){
  $('.burger').on('click', function() {
    $('.info').slideToggle(300, function() {
      if($(this).css('display') === 'none') {
        $(this).removeAttr('style');
      }
    });
  });
  // $('.info__item').on('click', function() {
  //   $('.info').css('display', 'none');
  // });

  $('a[href^="#"]').click(function(){ 
    if(document.getElementById($(this).attr('href').substr(1)) != null) { 
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 150 }, 700); 
    }     
    return false;
  });
  
  var fixd = $('.header__head');
  $(window).scroll(function () {
		if ($(this).scrollTop() > 280) {
			fixd.addClass('fixd');
		} else {
			fixd.removeClass('fixd');
		}
	});
  
});