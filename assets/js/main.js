/* ==========================================================
   軽微なインタラクション
   1) ページ内アンカーのスムーズスクロール
   2) スクロールに応じた追従CTAの表示
   3) セクションのフェードイン
   4) LINE URL未設定（#LINE_URL）時の空リンク遷移を抑止
   ========================================================== */
(function () {
  'use strict';

  var LINE_PLACEHOLDER = '#LINE_URL';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1) スムーズスクロール（CSSのscroll-behaviorのフォールバック） ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;

    var href = a.getAttribute('href');

    // 公式LINEのURLが未設定のうちは、ページ先頭へ飛ばさない
    if (href === LINE_PLACEHOLDER) {
      e.preventDefault();
      return;
    }

    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });

  /* ---- 2) 追従CTA：ヒーローを過ぎたら表示、最終CTAに重なったら隠す ---- */
  var sticky = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  var lastCta = document.getElementById('cta');

  if (sticky && hero) {
    var update = function () {
      var passedHero = window.scrollY > hero.offsetHeight * 0.85;
      var reachedEnd = lastCta
        ? lastCta.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      sticky.classList.toggle('is-visible', passedHero && !reachedEnd);
    };

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  }

  /* ---- 3) フェードイン（JSが動く環境でのみ付与する＝JS無効でも内容は表示される） ---- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.label, .sec__title, .body-text, .statement, .pull, .closing, .who__facts,' +
      '.rule-list li, .check-list li, .ba__row, .voice, .value-list li,' +
      '.pillar, .profile__head, .profile__block, .btn'
    );

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) {
      io.observe(el);
    });
  }
})();
