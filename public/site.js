// The star demo follows StreakSpark's real rule: the star grows on each of days 1–30,
// then at 50, 100, 200 and 365. Without this script the page shows day 1 as plain text.
Array.prototype.forEach.call(document.querySelectorAll('[data-star]'), function (root) {
  var STEPS = [];
  for (var d = 1; d <= 30; d++) STEPS.push(d);
  STEPS.push(50, 100, 200, 365);

  var dayEl = root.querySelector('[data-star-day]');
  var nextEl = root.querySelector('[data-star-next]');
  var button = root.querySelector('[data-star-button]');
  var index = 0;

  function render() {
    var day = STEPS[index];
    var next = STEPS[index + 1];
    root.style.setProperty('--star-scale', (0.4 + (0.6 * index) / (STEPS.length - 1)).toFixed(3));
    dayEl.textContent = 'A ' + day + '-day streak.';
    nextEl.textContent = next
      ? 'The star grows again at ' + next + ' days.'
      : 'A full year. The star is as bright as it gets.';
    button.textContent = !next ? 'Start again' : next - day === 1 ? 'Check in for tomorrow' : 'Keep going to day ' + next;
  }

  button.hidden = false;
  button.addEventListener('click', function () {
    index = index === STEPS.length - 1 ? 0 : index + 1;
    render();
  });
  render();
});

// Scroll-in: elements marked data-reveal rise and fade once. The hidden state only exists
// under the class added here, so with JS off (or failing) everything stays visible.
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!items.length || calm || !('IntersectionObserver' in window)) return;

  var root = document.documentElement;
  try {
    var observer = new IntersectionObserver(
      function (entries) {
        var n = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty('--reveal-delay', Math.min(n, 4) * 90 + 'ms');
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
          n++;
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    root.classList.add('reveal-on');
    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  } catch (e) {
    root.classList.remove('reveal-on');
  }
})();
