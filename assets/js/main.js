const links = Array.from(document.querySelectorAll('#toc a'));
const targets = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean)
  // Ordena pela posição real no documento, não pela ordem do menu --
  // o menu agrupa os links por tema, o que pode ficar diferente da
  // ordem visual das seções na página. Sem isso, quando as duas ordens
  // não batem, o destaque "prende" no item errado.
  .sort((a, b) => {
    const pos = a.compareDocumentPosition(b);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });

let suppressScrollSpy = false;

const setActive = () => {
  if (suppressScrollSpy) return;
  let current = targets[0];
  for (const t of targets){
    if (t.getBoundingClientRect().top - 80 <= 0) current = t;
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
};

links.forEach(a => {
  a.addEventListener('click', () => {
    links.forEach(l => l.classList.toggle('active', l === a));
    suppressScrollSpy = true;
    window.clearTimeout(a._resumeTimer);
    a._resumeTimer = window.setTimeout(() => { suppressScrollSpy = false; }, 700);
  });
});

document.addEventListener('scroll', setActive, { passive: true });
setActive();
