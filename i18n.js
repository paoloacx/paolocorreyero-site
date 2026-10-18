/**
 * i18n helper for Paolo Álvarez Correyero's site (paolocorreyero.es).
 */
const translations = {
  es: {
    "site.title": "Paolo Álvarez Correyero | Poeta",
    "site.description": "Sitio web oficial del poeta español Paolo Álvarez Correyero (Madrid, 1985). Accésit del Premio Adonáis 2004 por 'Hoy cumplo 16' (Ediciones Rialp).",
    "site.author": "Paolo Álvarez Correyero",
  },
  en: {
    "site.title": "Paolo Álvarez Correyero | Poet",
    "site.description": "Official website of Spanish poet Paolo Álvarez Correyero (Madrid, 1985). Adonáis Poetry Award Runner-up 2004 for 'Hoy cumplo 16' (Rialp).",
    "site.author": "Paolo Álvarez Correyero",
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
