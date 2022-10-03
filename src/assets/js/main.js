window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById("header_testing"),
        anchors = document.querySelectorAll(".header__logo_link, .nav__menu_link, .arrow__content-link"),
        burgerButton = document.querySelector(".hamburger__menu"),
        mobileMenu = document.querySelector(".mobile__menu"),
        burgerLinks = document.querySelectorAll(".sidemenu__list_link"),
        modalWindow = document.querySelector('.modal__callback'),
        modalField = document.querySelector('.callback__field'),
        overlay = document.querySelector('.overlay'),
        btnModalCallbackOpen = document.querySelectorAll('[data-modal]');

        function showSuccessForm() {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ваше повідомлення відправлено, чекайте на дзвінок від оператора',
            showConfirmButton: false,
            timer: 5000,
          });
        }
        function showInfoValidate() {
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Заповніть усі поля!',
            showConfirmButton: false,
            timer: 4000
          });
        }
        function showErrorForm() {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Помилка на сервері, повідомлення не відправлено',
            showConfirmButton: false,
            timer: 4000
          });
        }
        function showError() {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Помилка на сервері, картки товарів не можуть бути завантажені',
            showConfirmButton: false,
            timer: 4000
          });
        }

  // fix header
  function fixHeader() {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {
      functionFixHeader();
    };
    function functionFixHeader() {
      if (window.pageYOffset > 0) {
        header.classList.add("fixed_header");
      } else {
        header.classList.remove("fixed_header");
      }
    } 
  }
  fixHeader();

  // Smooth Scroll
  function smoothScroll() {
    for (let i of anchors) {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = i.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }
  smoothScroll();

  // Hamburger-menu
  function burgerMenu(btn, menu, links) {
    btn.addEventListener('click', function(){
      btn.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('open');
      // Style for no scroll page-website
      document.body.classList.toggle('overflow');
    });
    // Close Hamburger-menu
    links.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        btn.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('open');
        document.body.classList.remove('overflow');
      });
    });
  }
  burgerMenu(burgerButton, mobileMenu, burgerLinks);

  // Create main-cards-slider
  // axios.get('assets/common/mainSlider.json')
  // .then( (data) => { 
  //   createMainCard(data);
  // })
  // .catch( () => { 
  //   showError(); 
  // });
  // function createMainCard(data) {
  //   data.data.forEach(({mainText, title, subtitle, button}) => {
  //     let element = document.createElement('div');
  //     element.innerHTML = `
  //       <div class="home__slider-inner swiper-slide">
  //         <div class="home__slide">
  //             <div class="home__text">${mainText}</div>
  //             <h3 class="home__title">${title}</h3>
  //             <div class="home__subtitle">
  //                 <p class="home__subtitle_text">${subtitle}</p>
  //             </div>
  //             <div class="home__button">
  //                 <button class="home__button_detail btn" type="button">${button}</button>
  //             </div>
  //         </div>
  //       </div>
  //     `;
  //     document.querySelector('.home__slider-wrapper').append(element);
  //   });
  // }

  // init Swiper-Slider
  function startSwiper() {
    const swiperScroll = new Swiper(".myScrollSwiper", {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      mousewheel: true,
    });

    const swiper = new Swiper('.swiper', {
      rewind: true,
      slidesPerView: 1,
      slidesPerGroup: 1, 
      effect: 'cube',
      cubeEffect: {
        shadow: false,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.home__slider-next',
        prevEl: '.home__slider-prev',
      },
      // autoplay: {
      //   delay: 5000,
      // },
    });
    const swiper2 = new Swiper('.swiper2', {
      // autoHeight: true,
      loop: true,
      rewind: true,
      spaceBetween: 30,
      slidesPerView: 3,
      slidesPerGroup: 3,
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15
        },
        699: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1023: {
          slidesPerView: 3,
        },
      },  
      navigation: {
        nextEl: '.advantage__slider-next',
        prevEl: '.advantage__slider-prev',
      },
    });
  }
  startSwiper();
  // Counter for Slider - Викорстовую деструктуризацію {}
  sliderCounter({
    container: '.home__forslide',
    slide: '.home__slide',
    totalCounter: '[data-total]',
    currentCounter: '[data-current]',
    nextArrow: '.home__slider-next',
    prevArrow: '.home__slider-prev'
  });
  function sliderCounter({container, slide, nextArrow, prevArrow, totalCounter, currentCounter}) {
    const wrapper = document.querySelector(container),
          slides = wrapper.querySelectorAll(slide),
          totalSliderCounter = wrapper.querySelector(totalCounter),
          currentSliderCounter = wrapper.querySelector(currentCounter),
          arrowPrev = wrapper.querySelector(prevArrow),
          arrowNext = wrapper.querySelector(nextArrow);
    // Индекс опред-й полож-е в текущем слайде, где 1 это номер нашего слайда
    let slideIndex = 1;
    // Отображаем или нет 0 в общем счетчике слайдов
    if (slides.length < 10) {
        // .textContent - Позволяет задавать или получать текстовое содержимое элемента и его потомков.
        totalSliderCounter.textContent = `0${slides.length}`;
        currentSliderCounter.textContent = `0${slideIndex}`;
    } else {
        totalSliderCounter.textContent = slides.length;
        currentSliderCounter.textContent = slideIndex;
    }
    arrowNext.addEventListener('click', () => {
        // При перем-и слайдов контр-м slideIndex в Счетчике. Если мы дошли до конца слайда(slides.length)
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        showZeroInCounterSlider();
    });
    arrowPrev.addEventListener('click', () => {
        // При перем-и слайдов мы также должны контр-ть slideIndex в Счетчике.
        // Если мы на 1-м слайде, то при клике на кнопку пред-го слайда мы будем смещ-ся в самый конец
        if (slideIndex == 1) {
            slideIndex = slides.length;
            // кол-во слайдов соот. умен-ся при нажатии
        } else {
            slideIndex--;
        }
        showZeroInCounterSlider();
    });
    // Фун-я отображения 0 в счетчике слайдов
    function showZeroInCounterSlider() {
      if (slides.length < 10) {
          currentSliderCounter.textContent = `0${slideIndex}`;
      } else {
          currentSliderCounter.textContent = slideIndex;
      }
    }
  }
  

  // Create goods-card by axios
  axios.get('assets/common/goods.json')
  .then( (data) => { 
    createCard(data);
  })
  .catch( () => { 
    showError(); 
  });
  function createCard(data) {
    data.data.forEach(({pic, title, price, priceSale}) => {
      let element = document.createElement('li');
      element.classList.add('goods__item');
      element.innerHTML = `
        <li class="goods__item">
          <a class="goods__item-link goods-link" href="assets/images/goods/${pic.bigImage}" title="${title}">
            <img class="goods__item-image"
            src="assets/images/goods/${pic.image}" alt="${title}">
            ${pic.info.length !== 0 ? `<span class="goods__item-info goods-window">${pic.info}</span>` : ''}
            ${pic.sale.length !== 0 ? `<span class="goods__item-sale goods-window">${pic.sale}</span>` : ''}
            <div class="goods__item-about">
                <h6 class="goods__item-title goods-title">${title}</h6>
                <div class="goods__item-prices">
                ${pic.sale === "Акція" ?
                `<span style="color:#FF1B1B" class="goods__price goods-title price-red">${price}</span>` :
                `<span style="color:#1E2E36" class="goods__price goods-title price-red">${price}</span>`}
                <span class="goods__price price-crossing bold">${priceSale}</span>
                </div>
            </div>
          </a>
        </li>
      `;
      // Далее нам нужно поместить куда-то тот элемент что только-что создали
      document.querySelector('.goods__column').append(element);
    });
    // Gallery for image
    lightGallery(document.getElementById('aniimated-thumbnials'), {
      selector: '.goods-link',
      thumbnail: true,
      mode: 'lg-fade'
    });
  }

  // Send form to my Telegram, Validate input
  const phoneInput = document.querySelectorAll('.form_phone'),
        // nameInput = document.querySelectorAll('.form_name'),
        nameInputRecall = document.querySelector('.callback__names'),
        phoneInputRecall = document.querySelector('.callback__telephone'),
        nameInputConsult = document.querySelector('.contacts__name'),
        phoneInputConsult = document.querySelector('.contacts__tel'),
        formRecall =  document.querySelector('#my_callback-form'),
        formConsult =  document.querySelector('#my_form-consult'),
        BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
        CHAT_ID = '-1001758890997';

  phoneInput.forEach(inputPhone => {
    inputPhone.addEventListener('input', () => {
      onInputPhone(inputPhone);
    });
  });

  // To color name-input
  function validationFormColor(elem) {
    elem.addEventListener('input', () => {
      if (elem.value !== '') {
        elem.style.borderColor = 'green';
      } else {
        elem.style.borderColor = 'red';
      }
    });
  }
  validationFormColor(nameInputRecall);
  validationFormColor(nameInputConsult);
  // Mask phone-number
  function maskPhone() {
    [].forEach.call(document.querySelectorAll('.form_phone'), function(input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        // Element.selectionStart - повертає/задає позицію початку виділення у текстовому полі textarea або input
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+38(___)___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        } 
      }
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    });
  }
  maskPhone();
  // Add border-color for phone-input
  function onInputPhone(phone) {
    if (phone.value.length < 17) {
      phone.style.borderColor = 'red';
    } else {
      phone.style.borderColor = 'green';
    }
  }
  // onInputPhone(phoneInputRecall);
  // onInputPhone(phoneInputConsult);

  // Send form to telegram
    // forms.forEach(item => { 
    //   postDataConsult(item); 
    // });
  function postDataConsult(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let text = encodeURI(`Furniture.test Website\nПередзвонити\n\nName: ${nameInputRecall.value};\nPhone: ${phoneInputRecall.value};`);
      if (nameInputRecall.value !== '' && phoneInputRecall.value !== '' && phoneInputRecall.value.length > 16) { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
          showSuccessForm();
        })
        .catch( () => { 
          showErrorForm(); 
        })
        .finally( () => {
          form.reset();
        }); 
      } else {
        showInfoValidate();
      }
    });
  }
  postDataConsult(formRecall);
  
  function postDataRecall(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let text = encodeURI(`Furniture.test Website\nПроконсультувати\n\nName: ${nameInputConsult.value};\nPhone: ${phoneInputConsult.value};`);
      if (nameInputConsult.value !== '' && phoneInputConsult.value !== '' && phoneInputConsult.value.length > 16) { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
          showSuccessForm();
        })
        .catch( () => { 
          showErrorForm(); 
        })
        .finally( () => {
          form.reset();
        }); 
      } else {
        showInfoValidate();
      }
    });
  }
  postDataRecall(formConsult);

  // Modal-window-callback
  function openModal(window, background) {
    window.classList.toggle('active');
    background.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  // переберем наши кнопки btnModalOpen чтобы мы могли с любой кнопки откр-ть модал.окно
  btnModalCallbackOpen.forEach(btn => {
    btn.addEventListener('click', () => { 
      openModal(modalWindow, overlay);
    });
  });
  // If only one button
  // btnModalCallbackOpen.addEventListener('click', () => { openModal(modalWindow, overlay);});

  function closeModal(window, background) {
    window.classList.toggle('active');
    background.classList.remove('active');
    document.body.style.overflow = '';
  }
  // реал.функ-л закрытия модал. окна по клику вне мод. окна и на "крестик"
  modalField.addEventListener('click', (e) => {
    if(e.target === modalField || e.target.getAttribute('data-close') == '') {
      closeModal(modalWindow, overlay);
    }
  });
  // закрытия модал. окна по ESС. Cобытие keydown срабатывает, когда клавиша была нажата
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('active')) {
      closeModal(modalWindow,  y);
    }
  });

});

