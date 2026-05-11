// Search & filter on homepage
const searchInput = document.getElementById('search-input');
if (searchInput) {
  const cards = document.querySelectorAll('.subject-card');
  const noResults = document.querySelector('.no-results');
  const countEl = document.getElementById('subjects-count');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    let visible = 0;

    cards.forEach((card, i) => {
      const name = card.querySelector('.card-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.card-tag')?.textContent.toLowerCase() || '';
      const match = !q || name.includes(q) || desc.includes(q) || tag.includes(q);

      card.style.display = match ? '' : 'none';
      if (match) {
        card.style.animationDelay = `${visible * 0.05}s`;
        visible++;
      }
    });

    if (noResults) noResults.classList.toggle('visible', visible === 0);
    if (countEl) countEl.textContent = `${visible} môn học`;
  });
}

// TOC active state on subject pages
const tocLinks = document.querySelectorAll('.toc-link[data-section]');
if (tocLinks.length) {
  const sections = [...tocLinks].map(l => document.getElementById(l.dataset.section)).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-56px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  tocLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Mobile TOC toggle on subject pages
const toggleBtn = document.getElementById('mobile-toc-toggle');
const sidebar = document.querySelector('.subject-sidebar');
if (toggleBtn && sidebar) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    toggleBtn.querySelector('.toggle-label').textContent = isOpen ? 'Ẩn mục lục' : 'Mục lục';
    toggleBtn.querySelector('.toggle-icon').style.transform = isOpen ? 'rotate(180deg)' : '';
  });
}

// Stagger card animation on load
document.querySelectorAll('.subject-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.06}s`;
});
