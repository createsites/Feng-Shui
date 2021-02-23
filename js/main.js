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

  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close')

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });

  function press(event) {
    if(event.keyCode == '27') {
      modal.removeClass('modal--visible');
    }
  }
  
  window.addEventListener('keydown', press, false);

  $('a[href^="#"]').click(function(){ 
    if(document.getElementById($(this).attr('href').substr(1)) != null) { 
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 150 }, 700); 
    }     
    return false;
  });
  
  var fixd = $('.header__head');
  $(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			fixd.addClass('fixd');
		} else {
			fixd.removeClass('fixd');
		}
	});

  var fixd__basket = $('.basket');
  $(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			fixd__basket.addClass('fixd__basket');
		} else {
			fixd__basket.removeClass('fixd__basket');
		}
	});

    const cookieName = 'basket';
    // объект корзины
    var basket = {};

    // функция добавления в корзину
    basket.add = function (product) {
        // добавляем объект продукта в массив корзины
        basket.products.push(product);
        // делаем из объекта строку json, чтобы хранить ее в cookies
        var newCookie = JSON.stringify(basket.products);
        // добавляем (обновляем) корзину в cookies
        $.cookie(cookieName, newCookie, {path: '/'});
        // пересчитываем и показываем цену в корзине
        basket.refreshPrice();
    };

    // считает сумму в корзине
    basket.getPrice = function () {
        var totalPrice = 0;
        // цикл по продуктам в корзине
        $.each(basket.products, function (key, product) {
            // прибавляем цену к сумме
            totalPrice += parseInt(product.price);
        });
        return totalPrice;
    };

    // отображение цены в корзине
    basket.refreshPrice = function () {
        var newPrice = basket.getPrice();
        fixd__basket.find('.total__price_amount').text(newPrice);
    };

    // добавление в корзину
    $('.buy').click(function () {
        // к родителю добавил .size_kind - это общий класс для small и big, чтобы проще было искать
        var size = $(this).parent('.size_kind');
        // собираем инфу о товаре
        var product = {}; // объект с данными о товаре

        // стандарт
        if (size.hasClass('small')) {
            product.sizeKind = 'стандарт';
            product.price = size.find('.small__price').text().trim();    // этого дублирования кода можно избежать, если добавить общий класс для цены и веса
            product.weight = size.find('.small__gramm').text().trim();   // но, как говорится, и так сойдет)
        }
        // большой
        else if (size.hasClass('big')) {
            product.sizeKind = 'большой';
            product.price = size.find('.big__price').text().trim();    // я про дублирование этого кода говорил
            product.weight = size.find('.big__gramm').text().trim();   //
        }
        var wrapProduct = $(size).parents('.wrap__product');
        // ищем название товара
        product.name = wrapProduct.find('.product__title').text().trim();
        // картинка
        product.img = wrapProduct.find('.product__img').attr('src');
        // добавляем в корзину
        basket.add(product);
    });

    // массив с объектами продуктов (при первой загрузке страницы берется из cookies)
    basket.products = ($.cookie(cookieName) != null) ? JSON.parse($.cookie(cookieName)) : [];
    // пересчитываем и показываем цену в корзине
    basket.refreshPrice();
  
});