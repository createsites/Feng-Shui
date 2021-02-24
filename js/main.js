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
        // обновляем корзину в cookies
        basket.refreshCookie();
        // пересчитываем и показываем цену в корзине
        basket.refreshPrice();
        // добавляем товар в оформление заказа
        basket.addProductToOrder(product);
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

    // отображение цены
    basket.refreshPrice = function () {
        var newPrice = basket.getPrice();
        // в краткой корзине
        fixd__basket.find('.total__price_amount').text(newPrice);
        // сумма в оформлении заказа
        $('#modal__total__price_amount').text(newPrice);
    };

    // обновляет инфу в оформлении заказа
    basket.refreshOrder = function () {
        $('#modal__product_list').html('');
        // цикл по продуктам в корзине
        $.each(basket.products, function (key, product) {
            // добавляем в заказ
            basket.addProductToOrder(product);
        });
    };

    // обновляет инфу в оформлении заказа
    basket.addProductToOrder = function (product) {
        var productStr = '' +
            '        <div class="modal__product">\n' +
            '          <div class="modal__product__img">\n' +
            '            <img class="product__img" src="' + product.img + '" alt="#">\n' +
            '          </div>\n' +
            '          <!-- /.modal__product__img -->\n' +
            '          <div class="modal__product__title">\n' +
            '            <span class="modal__product__name">' + product.name + '</span>' +
            '            <p class="modal__product__text modal__product__size_kind">' + product.sizeKind + '</p>\n' +
            '            <p class="modal__product__text">' + product.structure + '</p>\n' +
            '          </div>\n' +
            '          <!-- /.modal__product__title -->\n' +
            '          <div class="modal__buttom">\n' +
            '            <button class="add add__plus">+</button>\n' +
            '            <button class="add add__minus">&#8211</button>\n' +
            '          </div>\n' +
            '          <!-- /.modal__buttom -->\n' +
            '          <div class="quantity"> Количество <br> <span class="lot">' + product.quantity + '</span> </div>\n' +
            '          <!-- /.quantity -->\n' +
            '          <div class="modal__price"> Стоимость <span class="cost">' + product.price + ' р.</span></div>\n' +
            '          <!-- /.modal__price -->\n' +
            '        </div>\n' +
            '      </div>';

        $('#modal__product_list').append(productStr);
    };

    // ищет продукт в корзине по имени и размеру
    // возвращает индекс найденного продукта в массиве или false
    basket.searchProduct = function (prod) {
        for (var i = 0; i < basket.products.length; i++) {
            var product = basket.products[i];
            // ищем в массиве нужный продукт по совпадению имени и размера
            if (prod.name === product.name && prod.sizeKind === product.sizeKind) {
                return i;
            }
        }
        return false;
    };

    // возвращает количество конкретного продукта в корзине
    // prod может быть не полноценным объектом, а содержать лишь имя и размер, необходимые для поиска
    basket.getProductQuantity = function (prod) {
        var index = basket.searchProduct(prod);
        if (index !== false) {
            return basket.products[index].quantity;
        }

        return 0;
    };

    // добавляет или отнимает указанное quantity к количеству товара в корзине
    // чтобы отнять, нужно передавать quantity со знаком минус. Например чтобы отнять один ролл:
    // basket.changeQuantity(product, -1);
    // первым параметром принимает index товара в массиве basket.products
    basket.changeQuantity = function (index, quantity) {
        // считаем цену одного ролла
        var price = basket.products[index].price / basket.products[index].quantity;
        // меняем сумму
        basket.products[index].price += price * quantity;
        // меняем количество
        basket.products[index].quantity += quantity;
        // обновляем куки
        basket.refreshCookie();
        // обновляем сумму в краткой корзине и оформлении заказа
        basket.refreshPrice();
        // количество товара в оформлении заказа
        basket.refreshOrder();
    };

    // обновляет куки массивом из basket.products
    basket.refreshCookie = function () {
        // делаем из объекта строку json, чтобы хранить ее в cookies
        var newCookie = JSON.stringify(basket.products);
        // обновляем
        $.cookie(cookieName, newCookie, {path: '/'});
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
            product.price = parseInt(size.find('.small__price').text().trim());    // этого дублирования кода можно избежать, если добавить общий класс для цены и веса
            product.weight = size.find('.small__gramm').text().trim();   // но, как говорится, и так сойдет)
        }
        // большой
        else if (size.hasClass('big')) {
            product.sizeKind = 'большой';
            product.price = parseInt(size.find('.big__price').text().trim());    // я про дублирование этого кода говорил
            product.weight = size.find('.big__gramm').text().trim();   //
        }
        var wrapProduct = $(size).parents('.wrap__product');
        // ищем название товара
        product.name = wrapProduct.find('.product__title').text().trim();
        // картинка
        product.img = wrapProduct.find('.product__img').attr('src');
        // картинка
        product.structure = wrapProduct.find('.product__structure').text().trim();
        // количество
        product.quantity = 1;
        // смотрим, был ли товар уже добавлен в корзину
        var index = basket.searchProduct(product);
        // если нет - добавляем в корзину
        if (index === false) {
            basket.add(product);
        }
        // иначе увеличиваем количество на один
        else {
            // увеличиваем количество
            basket.changeQuantity(index, 1);
        }
    });

    // нажатие + в детальной корзине
    $(document).on('click', '.add__plus', function () {
        var parent = $(this).parents('.modal__product');
        var prod = {};
        // ищем у продукта, количество которого меняем, название
        prod.name = parent.find('.modal__product__name').text().trim();
        // и размер
        prod.sizeKind = parent.find('.modal__product__size_kind').text().trim();
        // ищем индекс продукта в массиве товаров
        var index = basket.searchProduct(prod);
        // увеличиваем количество
        basket.changeQuantity(index, 1);
    });

    // нажатие - в детальной корзине
    // продублировал код, стоит отрефакторить
    $(document).on('click', '.add__minus', function () {
        var parent = $(this).parents('.modal__product');
        var prod = {};
        // ищем у продукта, количество которого меняем, название
        prod.name = parent.find('.modal__product__name').text().trim();
        // и размер
        prod.sizeKind = parent.find('.modal__product__size_kind').text().trim();
        // ищем индекс продукта в массиве товаров
        var index = basket.searchProduct(prod);
        // не уменьшаем количество если ролл один
        if (basket.products[index].quantity > 1) {
            // уменьшаем количество
            basket.changeQuantity(index, -1);
        }
    });

    // массив с объектами продуктов (при первой загрузке страницы берется из cookies)
    basket.products = ($.cookie(cookieName) != null) ? JSON.parse($.cookie(cookieName)) : [];
    // пересчитываем и показываем цену в корзине
    basket.refreshPrice();
    // обновляем продукты в оформлении заказа
    basket.refreshOrder();

});