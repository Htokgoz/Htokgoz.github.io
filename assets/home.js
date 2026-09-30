(() => {
  const modal = document.querySelector('#preview');
  if (!modal || typeof modal.showModal !== 'function') return;
  const img = modal.querySelector('img');
  document.querySelectorAll('[data-preview]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const source = link.querySelector('img');
      img.src = link.href;
      img.alt = source.alt;
      modal.querySelector('p').textContent = source.alt;
      modal.showModal();
    });
  });
  modal.querySelector('button').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
})();
