(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Инициализация слайдеров swiper
     */
    const hero__slider = document.querySelector('.hero__slider');
    if (hero__slider) {
      var heroSlider = new Swiper(hero__slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 600,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    const clients__slider = document.querySelector('.clients__slider');
    if (clients__slider) {
      var clientsSlider = new Swiper(clients__slider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        slidesPerGroup: 1,
        speed: 600,
        loop: true,
        breakpoints: {
          769: {
            slidesPerView: 3,
            spaceBetween: 20,
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    const work__items = document.querySelector('.work__items');
    if (work__items) {
      var workItems = new Swiper(work__items, {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        speed: 600,
        breakpoints: {
          600: {
            slidesPerView: 6,
          }
        }
      });
    }

    const mission__slider = document.querySelector('.mission__slider');
    if (mission__slider) {
      var missionSlider = new Swiper(mission__slider, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 600,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }



    /**
     * Инициализация аккордеона
     */
    function accordionFunc() {
      var accordionHead = document.querySelectorAll('.accordion'),
        accordionActive = document.getElementsByClassName('active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          // if (this.parentNode.dataset.skip) {
          //   this.classList.toggle('active');
          //   return;
          // }
          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('active');
          }
          this.classList.toggle('active');

          ScrollTrigger.refresh();
        });
      });
    }

    accordionFunc();



    /**
     * Управляет поведением меню-бургера.
     */
    function burgerNav() {
      const burger = document.querySelector('.burger');
      const menu = document.querySelector('.menu');
      const closeButton = document.querySelector('.menu__close');
      const overlay = document.querySelector('.menu__overlay');
      const elements = document.querySelectorAll('.menu__list a');

      /**
       * Переключает видимость меню.
       */
      const toggleMenu = () => {
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('menu--opened', isOpened);
        lenis.stop();
      };

      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('menu--opened');
        lenis.start();
      };

      // Открытие/закрытие меню по клику на бургер
      burger.addEventListener('click', toggleMenu);

      // Закрытие меню по клику на кнопку закрытия или на overlay
      [closeButton, overlay].forEach((element) => element.addEventListener('click', closeMenu));

      // Закрытие меню при клике вне области меню и бургера
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          closeMenu();
        }
      });

      document.querySelectorAll('.menu__list a').forEach((element) => element.addEventListener('click', closeMenu));
    }

    burgerNav();



    /**
     * Активация любого количества модальных окон
     */
    function modalFunc() {
      var modal__btn = document.querySelector('.modal__btn');

      if (!modal__btn) {
        return;
      } else {

        var close = document.querySelectorAll('.modal__close-btn');
        var openBtn = document.querySelectorAll('.modal__btn');

        Array.from(openBtn, openButton => {
          openButton.addEventListener('click', e => {

            let open = document.getElementsByClassName('open');

            if (open.length > 0 && open[0] !== this) {
              open[0].classList.remove('open');
            }

            let modalId = e.target.getAttribute('data-id');
            if (modalId) {
              document.getElementById(modalId).classList.add('open');
              document.body.classList.add('no-scroll');
            } else {
              return
            }

            let modalTitle = e.target.getAttribute('data-title');
            if (modalTitle) {
              document.getElementById("modal-title").innerHTML = modalTitle;
            }

            let modalText = e.target.getAttribute('data-text');
            if (modalText) {
              document.getElementById("modal-text").innerHTML = modalText;
            }

            Array.from(close, closeButton => {
              closeButton.addEventListener('click', e => {
                document.getElementById(modalId).classList.remove("open");
                document.body.classList.remove('no-scroll');
              });

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  document.getElementById(modalId).classList.remove("open")
                  document.body.classList.remove('no-scroll');
                }
              });

              document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
                event._isClickWithInModal = true;
              });

              document.getElementById(modalId).addEventListener('click', event => {
                if (event._isClickWithInModal) return;
                event.currentTarget.classList.remove('open');
                document.body.classList.remove('no-scroll');
              });
            });
          });
        });
      }
    };

    modalFunc();



    gsap.registerPlugin(ScrollTrigger);

    /**
     * Инициализация Lenis для плавного скрола
     */
    const lenis = new Lenis({
      anchors: {
        offset: -100,
      }
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const titleWords = document.querySelectorAll('[data-splitting="words"]');
    titleWords.forEach(titleWord => {
      const title1WordInner = titleWord.querySelectorAll("h1");
      const title2WordInner = titleWord.querySelectorAll("h2");
      const word = new SplitType(title1WordInner, { types: 'words, words' });
      const word1 = new SplitType(title2WordInner, { types: 'words, words' });
    });

    const revealItems = document.querySelectorAll('[data-animation="reveal"]');
    revealItems.forEach(revealItem => {
      const word = revealItem.querySelectorAll("div.word");

      const tl = gsap.timeline({
        paused: true
      });
      tl.from(word, {
        opacity: 0,
        y: "30",
        duration: .4,
        ease: "power1.out",
        stagger: {
          amount: .6
        },
      }, 0).to(word, {
        opacity: 1,
        duration: 0.4,
        stagger: { amount: .6 },
      }, 0);
      scrollTriggerPlayer(revealItem, tl)
    });

    // const fadeUpItems = document.querySelectorAll('[data-animation="fadeUp"]');
    // fadeUpItems.forEach(fadeUpItem => {
    //   const tl = gsap.timeline({
    //     paused: true
    //   });
    //   tl.from(fadeUpItem, {
    //     opacity: 0,
    //     y: "80",
    //     duration: .8,
    //     ease: "power1.out",
    //     stagger: {
    //       amount: .8
    //     }
    //   });
    //   scrollTriggerPlayer(fadeUpItem, tl)
    // });



    const component = document.querySelector(".component");

    if (component) {
      const component1 = document.querySelector(".component--1");
      const component2 = document.querySelector(".component--2");
      const component3 = document.querySelector(".component--3");
      const component4 = document.querySelector(".component--4");

      const component1Item = component1.querySelector(".component__item");
      const component2Item = component2.querySelector(".component__item");
      const component3Item = component3.querySelector(".component__item");
      const component4Item = component4.querySelector(".component__item");

      const hero = document.querySelector(".hero");

      gsap.from(component1Item, {
        opacity: 1,
        y: -500,
        duration: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(component2Item, {
        opacity: 1,
        y: -1200,
        duration: 0.6,
        delay: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(component3Item, {
        opacity: 1,
        y: -1200,
        duration: 0.6,
        delay: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(component4Item, {
        opacity: 1,
        y: 1200,
        duration: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });
    }

    const hero = document.querySelector(".hero");
    const target = document.querySelectorAll('.hero__title');

    for (let i = 0; i < target.length; i++) {

      const text = new SplitType(target[i], { types: 'lines, words' })
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(text.words, {
        opacity: 0,
        x: -100,
        duration: 0.6,
        delay: 0.6,
        stagger: { amount: 0.6 },
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }, 0).to(text.words, {
        opacity: 1,
        duration: 0.6,
        delay: 0.6,
        stagger: { amount: 0.6 },
      }, 0);
      scrollTriggerPlayer(target[i], tl)
      // gsap.to(text.words, {
      //   opacity: 1,
      //   duration: 0.5,
      //   delay: 0.5,
      //   stagger: { amount: 1 },
      // });
    }



    // текст снизу вверх из прозрачности
    // const revealItems = document.querySelectorAll('[data-animation="reveal"]')

    // revealItems.forEach((revealItem) => {

    //   const words = revealItem.querySelectorAll('div.word');
    //   const tl = gsap.timeline({ paused: true });

    //   tl.fromTo(words,
    //     { opacity: 0, y: 30 },
    //     { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out', stagger: { amount: 0.6 } }
    //   );

    //   scrollTriggerPlayer(revealItem, tl);
    // });

    // блоки снизу вверх из прозрачности
    const fadeUpItems = document.querySelectorAll('[data-animation="fadeUp"]')

    fadeUpItems.forEach((fadeUpItem) => {

      const tl = gsap.timeline({
        paused: true
      });
      tl.from(fadeUpItem, {
        opacity: 0,
        y: "80",
        duration: .8,
        ease: "power1.out",
        stagger: {
          amount: .8
        },
      }, 0).to(fadeUpItem, {
        opacity: 1,
        duration: 0.8,
        stagger: { amount: .8 },
      }, 0);
      scrollTriggerPlayer(fadeUpItem, tl)

    });

    if (window.innerWidth >= 769) {
      parallaxFunc()
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 769) {
        parallaxFunc()
      } else {
        return;
      }
    }, true);

    function parallaxFunc() {

      const parallaxContainers = document.querySelectorAll('[data-animation="parallax"]');
      parallaxContainers.forEach(parallaxContainer => {
        gsap.fromTo(parallaxContainer, {
          y: "-10%"
        }, {
          y: "10%",
          scrollTrigger: {
            trigger: parallaxContainer,
            start: "top 60%",
            end: "bottom top",
            scrub: true
          }
        })
      });

      const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
      parallaxImgContainers.forEach(parallaxImgContainer => {

        const image = parallaxImgContainer.querySelector('img');

        gsap.fromTo(image,
          { y: '-5%' },
          {
            y: '5%',
            scrollTrigger: {
              trigger: parallaxImgContainer,
              start: 'top 60%',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }

    function scrollTriggerPlayer(triggerElement, timeline, onEnterStart = "top 90%") {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(1);
          timeline.pause()
        }
      });
      ScrollTrigger.create({
        trigger: triggerElement,
        start: onEnterStart,
        onEnter: () => timeline.play()
      })
    }



    const items = document.querySelectorAll('.work__slide');
    const itemsActive = document.getElementsByClassName('work__slide-active');

    items.forEach(element => {
      if (element !== items[0]) {
        element.addEventListener('mouseover', function () {
          if (itemsActive.length > 0 && itemsActive[0] !== this) {
            itemsActive[0].classList.remove('work__slide-active');
          }
          this.classList.add('work__slide-active');

        });
        element.addEventListener('mouseout', function () {
          items[0].classList.add('work__slide-active');
          this.classList.remove('work__slide-active');
        });
      }
    });



    /**
     * Кнопка куки
     */

    if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
      const cookiesNotify = document.getElementById('warning-plate');

      if (cookiesNotify) {
        cookiesNotify.style.display = 'block';
      }
    }

    // const warningBtn = document.getElementById('warning-btn');
    // if (warningBtn) {
    //   warningBtn.addEventListener('click', event => {
    //     document.getElementById('warning-plate').style.display = 'none';
    //   });
    // }


    /**
     * Скрытие и появление плашки при скролле
     */
    const hFirstSection = document.getElementById('first-section');
    if (hFirstSection) {
      const hFirstSection = document.getElementById('first-section');
      const hFooter = document.getElementById('footer');
      const h = hFirstSection.offsetHeight;
      const plate = document.getElementById('plate');
      const classToAdd = 'show';

      window.addEventListener('scroll', function () {
        const verticalScrollPosition = window.pageYOffset;
        const bottomScrollPosition = document.body.offsetHeight - hFooter.offsetHeight - window.innerHeight;

        if (verticalScrollPosition > h && verticalScrollPosition < bottomScrollPosition) {
          plate.classList.add(classToAdd);
        } else {
          plate.classList.remove(classToAdd);
        }
      });
    }



    /**
     * Скрытие шапки при скролле вниз и появление при скролле вверх.
     * Добавление класса out для смены стиля шапки при скролле.
     */
    function headerFunc() {
      let lastScroll = 0;
      const defaultOffset = 0;
      const header = document.querySelector('.header');
      const headerLogo = document.querySelector('.header__logo');
      const hero = document.querySelector('.hero');

      const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
      const containHide = () => header.classList.contains('hide');

      // window.addEventListener('scroll', () => {
      //   if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      //     //scroll down
      //     header.classList.add('hide');
      //   }
      //   else if (scrollPosition() < lastScroll && containHide()) {
      //     //scroll up
      //     header.classList.remove('hide');
      //   }

      //   lastScroll = scrollPosition();
      // })



      window.addEventListener('scroll', () => {
        if (hero) {
          if (scrollPosition() > hero.offsetHeight) {
            header.classList.add('out');
            // header.classList.remove('hide');
          }
          else {
            header.classList.remove('out');
            // header.classList.add('hide');
          }

          if (scrollPosition() > 150) {
            header.classList.add('change');
          } else {
            header.classList.remove('change');
          }

          if (scrollPosition() > 30) {
            header.classList.add('hide');
          } else {
            header.classList.remove('hide');
          }

        } else {
          if (scrollPosition() > 0) {
            header.classList.add('out');
          }
          else {
            header.classList.remove('out');
          }
        }
      })
    }

    headerFunc();


    /**
     * Анимация блока задач
     */
    window.addEventListener('scroll', function () {
      const tasks = document.querySelector('.tasks');
      if (tasks) {
        const tasksItems = document.querySelectorAll('.task__item');
        const tasksRect = tasks.getBoundingClientRect();
        // Проверяем, достиг ли блок tasks верхнего края окна
        if (tasksRect.top <= 0) {
          tasks.classList.add('fixed'); // Закрепляем блок
          // Уменьшаем и перекрываем блоки tasks__items при прокрутке
          tasksItems.forEach((item, index) => {
            const offset = window.scrollY - tasks.offsetHeight;
            const scale = Math.max(0.5, 1 - (offset / 500) + (index * 0.1)); // Уменьшаем размер
            item.style.transform = `scale(${scale}) translateY(${index * 20}px)`; // Перекрытие
          });
        } else {
          tasks.classList.remove('fixed'); // Сбрасываем закрепление
          tasksItems.forEach(item => {
            item.style.transform = 'scale(1) translateY(0)'; // Возвращаем в исходное состояние
          });
        }
      }
    });



    /**
     * Инициализация Fancybox
     */
    if (document.querySelector('.fancybox')) {
      Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options
      });
    }

  });
})();

/*=================Скрипт для блока со скролом=====================*/
const tasks = document.querySelector('.tasks');
if (tasks) {
  var len = $('.tasks__item').length;
  $(window).on('resize load', function () {
    if (window.innerWidth < "767") {
      scroll = 0;
      inc = 0.06; // speed down
      inc2 = 0.06; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth


      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = document.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop();
        var top = window.pageYOffset;

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.90; // set initial scale
            }
          }
        } else if (scroll < top) {
          // Scrolling down
          if (distanceToTop < 150 && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.90)');
            scale = 0.90;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          if (distanceToTop > 50) {
            var $activeBlock = $('.active');
            var prevCurrentBlock = $($activeBlock).prev();

            scale += inc2 / 0.006; // Increase scale on scroll up
            scale = Math.min(scale, 1); // Ensure max scale is 1

            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

            // Adjust opacity of the over block
            var $overBlock = $(prevCurrentBlock).find('.over');
            var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
            $overBlock.css('opacity', newOpacity);
          }
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc * 0.06; // Decrease scale on scroll down
          if ($(prevCurrentBlock).attr('data-index') == 1) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.83, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 2) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.86, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 3) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.89, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 4) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.92, scale) + ')');
          }

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h + 0.02)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.90)');
          scale = 0.90;
        }

        scroll = top; // Update scroll position
      });
    } else {
      scroll = 0;
      inc = 0.006; // speed down
      inc2 = 0.008; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth

      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = document.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop();
        var top = window.pageYOffset;

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.92; // set initial scale
            }
          }
        } else if (scroll < top) {
          // Scrolling down
          if (distanceToTop < h && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
            if (scale !== 1) {
              scale = 1; // set to 1 when scrolling down
            }
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.92)');
            scale = 0.92;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale += inc2; // Increase scale on scroll up
          scale = Math.min(scale, 1); // Ensure max scale is 1

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc; // Decrease scale on scroll down

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.90, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.92)');
          scale = 0.92;
        }

        scroll = top; // Update scroll position
      });

    }
  });
}

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('warning-plate').remove();
}