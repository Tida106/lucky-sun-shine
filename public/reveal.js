(function () {
  var supported = 'IntersectionObserver' in window;
  var obs = supported
    ? new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              entries[i].target.classList.add('is-visible');
              obs.unobserve(entries[i].target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
    : null;

  function watch(el) {
    if (el.classList.contains('is-visible')) return;
    if (obs) obs.observe(el);
    else el.classList.add('is-visible');
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.hasAttribute('data-reveal')) watch(root);
    var els = root.querySelectorAll('[data-reveal]');
    for (var i = 0; i < els.length; i++) watch(els[i]);
  }

  scan(document.documentElement);

  // クライアント遷移(Next.js の Link)で後から挿入されたブロックも対象にする。
  // これが無いと、遷移先のページの [data-reveal] が opacity:0 のまま残り、空白になる。
  new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var added = muts[i].addedNodes;
      for (var j = 0; j < added.length; j++) scan(added[j]);
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
