export function lazyLoadObserver(data, renderMap) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const fnName = target.getAttribute('data-lazy');

        // ✅ Tambahkan animasi transisi
        target.classList.add('opacity-100', 'scale-100');
        target.classList.remove('opacity-0', 'scale-95');

        // Jalankan fungsi dari map
        if (renderMap[fnName]) {
          renderMap[fnName]();
          obs.unobserve(target);
        }
      }
    });
  });

  document.querySelectorAll('[data-lazy]').forEach((el) => observer.observe(el));
}
