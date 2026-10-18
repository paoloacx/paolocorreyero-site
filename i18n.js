/**
 * i18n helper for Paolo Correyero's personal site.
 * Designed to gracefully support future multilingual features without overriding existing markup.
 */
const translations = {
  es: {
    "site.title": "Paolo Correyero | Poeta",
    "site.description": "Sitio web oficial del poeta Paolo Correyero (Madrid, 1985). Accésit del Premio Adonáis 2004 por 'Hoy cumplo 16' (Ediciones Rialp).",
    "site.author": "Paolo Correyero",
  },
  en: {
    "site.title": "Paolo Correyero | Poet",
    "site.description": "Official website of Spanish poet Paolo Correyero (Madrid, 1985). Adonáis Poetry Award Runner-up 2004 for 'Hoy cumplo 16' (Rialp).",
    "site.author": "Paolo Correyero",
  },
};

const currentLang = document.documentElement.lang || "es";
const messages = translations[currentLang] || translations.es;

document.querySelectorAll("[data-i18n]").forEach((element) => {
  const key = element.dataset.i18n;
  if (messages[key]) {
    element.textContent = messages[key];
  }
});

document.querySelectorAll("[data-i18n-content]").forEach((element) => {
  const key = element.dataset.i18nContent;
  if (messages[key]) {
    element.content = messages[key];
  }
});

document.querySelectorAll("[data-i18n-title]").forEach((element) => {
  const key = element.dataset.i18nTitle;
  if (messages[key]) {
    element.title = messages[key];
  }
});
