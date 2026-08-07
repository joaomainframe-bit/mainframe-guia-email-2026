// Liga o design system a este email. Uma linha para editar: `base`.
(() => {
  const base = '../_ds';
  for (const p of ["styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: falhou ' + s.src);
  document.head.appendChild(s);
})();
