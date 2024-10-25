$(document).ready(function () {

  $('form').submit(function (event) {
    event.preventDefault();

    formData = new FormData(event.target);

    let btn = $(this).find("button[type=submit]");
    let statusMessage = $(this).find("div.statusMessage");
    let phone = $(this).find("input[name=phone]");
    let preloader = $(this).find("div.preloader");
    

    grecaptcha.execute('6Lfm22ApAAAAAI6Wwj77Ru9jcojrFFDGNlRDmLJ6', {
      action: 'create_comment'
    }).then(function(token) {
    
      formData.append("g-recaptcha-response", token);

      const data = Object.fromEntries(formData.entries());
      var error = false;
    
      if (phone.val().length < 6 || phone.val().length > 20) {
        phone.addClass('error');
        error = true;
        phone.val("");
        phone.attr("placeholder", "Укажите верный телефон");
      }
      
  
      if (error == false) {
        $.ajax({
          type: 'POST',
          url: '/php/mail.php',
          contentType: 'application/json',
          data: JSON.stringify(data),
          beforeSend: function() {
            btn.addClass('hide');
            statusMessage.css("display", "block");
          },
          success: function (response) {
            preloader.hide();
            statusMessage.text('Заявка отправлена. Мы скоро с Вами свяжемся');
            btn.addClass('hide');
            //statusMessage.text('Данные успешно отправлены на сервер.');
          },
          error: function (error) {
            console.error('Ошибка при отправке на сервер:', error);
            btn.addClass('hide');
            statusMessage.text('Ошибка отправки. Позвоните нам.');
          }
        });
      }

    });

    
  });
});