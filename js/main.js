(() => {
  document.addEventListener('DOMContentLoaded', () => {

    /**
     * Инициализация слайдеров swiper
     */
    var heroSlider = new Swiper(".hero__slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      speed: 600,
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    var clientsSlider = new Swiper(".clients__slider", {
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

    var work__items = new Swiper(".work__items", {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      speed: 600,
      breakpoints: {
        600: {
          slidesPerView: 6,
        }
      }
    });


    const header = document.getElementById('header');
    const scrollPrev = 0;

    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;

      if (scrolled > 100 && scrolled > scrollPrev) {
        header.classList.add('out');
      } else {
        header.classList.remove('out');
      }

    });



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



    gsap.registerPlugin(ScrollTrigger);

    /**
     * Инициализация Lenis для плавного скрола
     */
    const lenis = new Lenis({
      anchors: {
        offset: -150,
        onComplete: () => {
          console.log('scrolled to anchor')
        }
      }
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const component1 = document.querySelector(".component--1");
    const component2 = document.querySelector(".component--2");
    const component3 = document.querySelector(".component--3");
    const component4 = document.querySelector(".component--4");

    const component1Item = component1.querySelector(".component__item");
    const component2Item = component2.querySelector(".component__item");
    const component3Item = component3.querySelector(".component__item");
    const component4Item = component4.querySelector(".component__item");

    const hero = document.getElementById("hero");
    const heroContent = document.querySelectorAll(".hero__content");

    gsap.from(component1Item, {
      opacity: 1,
      y: -500,
      duration: 0.6,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    gsap.from(component2Item, {
      opacity: 1,
      y: -1200,
      duration: 0.5,
      delay: 0.6,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    gsap.from(component3Item, {
      opacity: 1,
      y: -1200,
      duration: 0.5,
      delay: 0.6,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
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
        preventOverlaps: true,
      }
    });

    const target = document.querySelectorAll('.hero__title');

    for (let i = 0; i < target.length; i++) {

      const text = new SplitType(target[i], { types: 'lines, words' })

      gsap.from(text.words, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        delay: 0.5,
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
        },
      })
    }


    window.addEventListener('resize', function () {
      if (this.window.innerWidth >= 769) {
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
      } else {
        return;
      }
    }, true);



    // const items = document.querySelectorAll('.work__slide');
    // const itemsActive = document.getElementsByClassName('work__slide-active');

    // items.forEach(element => {
    //   if (element !== items[0]) {
    //     element.addEventListener('mouseover', function () {
    //       if (itemsActive.length > 0 && itemsActive[0] !== this) {
    //         itemsActive[0].classList.remove('work__slide-active');
    //       }
    //       this.classList.add('work__slide-active');

    //     });
    //     element.addEventListener('mouseout', function () {
    //       items[0].classList.add('work__slide-active');
    //       this.classList.remove('work__slide-active');
    //     });
    //   }
    // });



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