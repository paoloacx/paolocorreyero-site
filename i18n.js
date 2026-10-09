const translations = {
  es: {
    "site.description": "Sitio personal de Paolo Correyero, poeta.",
    "site.title": "Paolo Correyero",
    "site.status": "Próximamente",
    "site.name": "Paolo Correyero",
    "site.intro": "Poeta.",
  },
};

const language = "es";
const messages = translations[language];

document.documentElement.lang = language;

document.querySelectorAll("[data-i18n]").forEach((element) => {
  element.textContent = messages[element.dataset.i18n];
});

document.querySelectorAll("[data-i18n-content]").forEach((element) => {
  element.content = messages[element.dataset.i18nContent];
});

document.querySelectorAll("[data-i18n-title]").forEach((element) => {
  document.title = messages[element.dataset.i18nTitle];
});
