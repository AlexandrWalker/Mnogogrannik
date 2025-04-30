(() => {
  document.addEventListener('DOMContentLoaded', () => {

    // const header = document.getElementById('header');
    // const scrollPrev = 0;

    // window.addEventListener('scroll', function () {
    //   const scrolled = window.pageYOffset;

    //   console.log(scrolled);

    //   if (scrolled > 100 && scrolled > scrollPrev) {
    //     header.classList.add('out');
    //   } else {
    //     header.classList.remove('out');
    //   }

    //   scrollPrev = scrolled;
    // });

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

    const component1 = document.querySelector(".component-1");
    const component2 = document.querySelector(".component-2");
    const component3 = document.querySelector(".component-3");
    const hero = document.getElementById("hero");

    gsap.from(component1, {
      opacity: 1,
      y: -500,
      duration: 0.5,
      delay: 0.5,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    gsap.from(component2, {
      opacity: 1,
      y: -1200,
      duration: 0.5,
      // delay: 0.5,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    gsap.from(component3, {
      opacity: 1,
      y: -1200,
      duration: 0.5,
      // delay: 0.5,
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    const target = document.querySelector('.hero__title');

    const text = new SplitType(target, { types: 'lines, words' })

    gsap.from(text.words, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      delay: 0.2,
      stagger: { amount: 0.2 },
      scrollTrigger: {
        trigger: hero,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      },
    })

  });
})();