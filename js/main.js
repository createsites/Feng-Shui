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

    // добавление в корзину
    $('.buy').click(function () {
        // к родителю добавил .size_kind - это общий класс для small и big, чтобы проще было искать
        var size = $(this).parent('.size_kind');
        // собираем инфу о товаре
        var name;
        var sizeKind;
        var price;
        var weight;
        // стандарт
        if (size.hasClass('small')) {
            sizeKind = 'стандарт';
            price = size.find('.small__price').text();    // этого дублирования кода можно избежать, если добавить общий класс для цены и веса
            weight = size.find('.small__gramm').text();   // но, как говорится, и так сойдет)
        }
        // большой
        else if (size.hasClass('big')) {
            sizeKind = 'большой';
            price = size.find('.big__price').text();    // я про дублирование этого кода говорил
            weight = size.find('.big__gramm').text();   //
        }
        // ищем название товара
        name = $(size).parents('.wrap__product').find('.product__title').text();

        // тупо добавляем html код с товаром в блок корзины
        var strForAdding = '<div>' + name + '<br>Цена: ' + price + '<br>Вес: ' + weight + '<br>Размер: ' + sizeKind + '</div>';
        $('#basket .products_list').append(strForAdding);
        return false;
    });
  
});