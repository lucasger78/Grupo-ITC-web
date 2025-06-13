const flagsElement = document.getElementById("flags");

// Función que aplica traducciones usando data-section y data-value
const changeLanguage = async (language) => {
  const requestJson = await fetch(`assets/js/${language}.json`);
  const texts = await requestJson.json();

  const textsToChange = document.querySelectorAll("[data-section]");

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section.trim();
    const value = textToChange.dataset.value.trim();

    if (texts[section] && texts[section][value]) {
      textToChange.innerHTML = texts[section][value];
    } else {
      console.warn(`Missing translation for [${section}][${value}]`);
    }
  }

  localStorage.setItem("selectedLanguage", language);

  // Vuelve a activar el FAQ una vez traducido
  initFAQ();
};

// Carga el idioma al iniciar la página
const loadLanguage = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage");
  changeLanguage(selectedLanguage || "default");
};

// Evento de clic en banderas
flagsElement.addEventListener("click", (e) => {
  const lang = e.target.closest("[data-language]")?.dataset.language;
  if (lang) {
    changeLanguage(lang);
  }
});

// Lógica de comportamiento de FAQ
// function initFAQ() {
//   const faqQuestions = document.querySelectorAll(".faq-question");

//   faqQuestions.forEach((btn) => {
//     btn.onclick = () => {
//       const faqItem = btn.closest(".faq-item");
//       const isActive = faqItem.classList.contains("active");

//       // Cerrar todos los ítems
//       document.querySelectorAll(".faq-item").forEach((item) => {
//         item.classList.remove("active");
//         const icon = item.querySelector(".faq-toggle");
//         if (icon) icon.textContent = "＋";
//       });

//       // Si el clic fue en uno cerrado, abrimos ese
//       if (!isActive) {
//         faqItem.classList.add("active");
//         const icon = faqItem.querySelector(".faq-toggle");
//         if (icon) icon.textContent = "✕";
//       }
//     };
//   });
// }

// Función de cambio de idioma (modificada)
// Sistema de traducción
const changeLanguage2 = async (language) => {
  try {
    const response = await fetch(`assets/js/${language}.json`);
    const translations = await response.json();
    
    // Aplicar traducciones
    document.querySelectorAll('[data-translate]').forEach(element => {
      const [section, key] = element.getAttribute('data-translate').split('.');
      if (translations[section] && translations[section][key]) {
        element.innerHTML = translations[section][key];
      }
    });
    
    localStorage.setItem('selectedLanguage', language);
    console.log(`Idioma cambiado a ${language}`);
  } catch (error) {
    console.error('Error al cargar el idioma:', error);
  }
};

// Sistema de FAQ
function initFAQ() {
  // Limpiar eventos anteriores
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.onclick = null;
  });

  // Configurar nuevos eventos
  document.querySelectorAll('.faq-question').forEach(button => {
    button.onclick = function() {
      const item = this.closest('.faq-item');
      const icon = this.querySelector('.faq-icon');
      const isActive = item.classList.contains('active');

      // Cerrar todos los demás
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Alternar estado actual
      item.classList.toggle('active', !isActive);
      if (icon) icon.textContent = isActive ? '+' : '×';
    };
  });
}

// Evento para banderas de idioma
document.getElementById('flags').addEventListener('click', (e) => {
  const lang = e.target.closest('[data-language]')?.dataset.language;
  if (lang) {
    changeLanguage2(lang).then(() => {
      initFAQ(); // Reiniciar FAQ después de cambiar idioma
    });
  }
});

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem('selectedLanguage') || 'es';
  changeLanguage2(defaultLang).then(() => {
    initFAQ();
  });
});

// Inicialización al cargar
loadLanguage();
// initFAQ();
   




// const loadLanguage = async () => {
//   // Verificar si el idioma seleccionado ya está almacenado en el almacenamiento local del navegador
//   const selectedLanguage = localStorage.getItem("selectedLanguage");

//   if (selectedLanguage) {
//     changeLanguage(selectedLanguage);
//   } else {
//     // Cargar el archivo "es.json" y almacenar su contenido en el almacenamiento local
//     const response = await fetch("es.json");
//     const languageData = await response.json();
//     localStorage.setItem("selectedLanguage", JSON.stringify(languageData));
//     changeLanguage(languageData);
//   }
// };

// flagsElement.addEventListener("click", (e) => {
//   changeLanguage(e.target.parentElement.dataset.language);
// });

// // Cargar el idioma al cargar la página
// loadLanguage();