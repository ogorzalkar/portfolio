// FAQ accordion logic for vertical cards
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Open clicked
      if (!isOpen) item.classList.add('open');
    });
  });
});
