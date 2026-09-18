(function () {
  var STORAGE_KEY = 'shc-docs-lang';
  var root = document.getElementById('html-root') || document.documentElement;
  var titlePt = 'Simple Hair Cards — Documentação';
  var titleEn = 'Simple Hair Cards — Documentation';
  var htmlLangPt = 'pt-BR';
  var htmlLangEn = 'en';

  function detectDefaultLang() {
    var saved = null;
    try { saved = window.localStorage.getItem(STORAGE_KEY); } catch (e) { /* localStorage bloqueado, ignora */ }
    if (saved === 'pt' || saved === 'en') return saved;

    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'pt' ? htmlLangPt : htmlLangEn);

    var titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = lang === 'pt' ? titlePt : titleEn;

    var buttons = document.querySelectorAll('.lang-switch-btn');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-choice') === lang ? 'true' : 'false');
    });

    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora se bloqueado */ }
  }

  document.querySelectorAll('.lang-switch-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang-choice'));
    });
  });

  applyLang(detectDefaultLang());
})();
