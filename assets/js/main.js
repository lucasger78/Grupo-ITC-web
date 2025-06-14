

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})();

// FAQs
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const allItems = document.querySelectorAll('.faq-item');

    const faqItems = document.querySelectorAll('.faq-item');




    // Cierra todos excepto el clickeado
    allItems.forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
        item.querySelector('.faq-toggle').textContent = '＋';
      }
    });

    // Toggle el actual
    const isActive = faqItem.classList.contains('active');
    faqItem.classList.toggle('active');
    button.querySelector('.faq-toggle').textContent = isActive ? '＋' : '✕';
  });
});



function aplicarEstilos() {
    let styles = [
        "assets/css/styles(Empresa).css",
        "assets/css/styles(Courier).css",
        "assets/css/styles(Home).css"
    ];

    // Verificar el ancho de la ventana
    if (window.innerWidth <= 768) {
        styles.forEach((style) => {
            if (!document.querySelector(`link[href="${style}"]`)) {
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = style;
                link.className = "mobile-style"; // Para identificación posterior
                document.head.appendChild(link);
            }
        });
    } else {
        // Eliminar estilos en escritorio
        document.querySelectorAll(".mobile-style").forEach((link) => {
            link.remove();
        });
    }
}

// Ejecutar cuando la página cargue completamente
window.addEventListener("load", aplicarEstilos);
window.addEventListener("resize", aplicarEstilos); // También ejecutarlo si el usuario cambia el tamaño de la ventana


// // FLAGS

const flags = document.querySelectorAll(".flags-ar, .flags-br, .flags-gb");

const selectFlag = (flag) => {
  // Eliminar la clase "hovered" de todos los elementos
  flags.forEach((flag) => flag.classList.remove("hovered"));
  // Agregar la clase "hovered" al elemento seleccionado
  flag.classList.add("hovered");

  // Almacenar la selección de la bandera en el almacenamiento local del navegador
  localStorage.setItem("selectedFlag", flag.dataset.language);
};

const loadFlag = () => {
  // Obtener la bandera seleccionada almacenada en el almacenamiento local del navegador
  const selectedFlag = localStorage.getItem("selectedFlag");

  if (selectedFlag) {
    // Buscar el elemento de bandera correspondiente a la selección almacenada
    const flagElement = document.querySelector(`[data-language="${selectedFlag}"]`);
    if (flagElement) {
      flagElement.classList.add("hovered");
    }
  }
};

flags.forEach((flag) => {
  flag.addEventListener("click", () => {
    selectFlag(flag);
  });
});

// Cargar la bandera al cargar la página
loadFlag();



