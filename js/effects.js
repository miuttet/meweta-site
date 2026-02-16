(function() {

  // ── D. ページフェードイン + 要素スライドダウン ──────────────
  window.addEventListener('load', function() {
    // ページ全体フェードイン
    document.documentElement.style.opacity = '1';

    // .anim-slide クラスの要素を順番にスライドイン
    var targets = document.querySelectorAll('.anim-slide');
    targets.forEach(function(el, i) {
      setTimeout(function() {
        el.classList.add('is-visible');
      }, i * 80);
    });
  });


  // ── E. サイトタイトル「meweta」グリッチ ──────────────────
  var GLITCH_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

  function randomChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  function glitchText(el, original) {
    var steps = 6;
    var delay = 0;
    var len = original.length;

    for (var s = 0; s < steps; s++) {
      (function(step) {
        setTimeout(function() {
          var result = '';
          for (var i = 0; i < len; i++) {
            if (original[i] === ' ') {
              result += ' ';
            } else if (i < step * (len / steps)) {
              result += original[i];
            } else {
              result += randomChar();
            }
          }
          el.textContent = result;
        }, delay);
        delay += 60;
      })(s);
    }

    // 最後に元に戻す
    setTimeout(function() {
      el.textContent = original;
    }, delay);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var titleLink = document.querySelector('.site-title a');
    if (!titleLink) return;

    var original = titleLink.textContent;

    // ページ読み込み直後に一度グリッチ
    setTimeout(function() {
      glitchText(titleLink, original);
    }, 600);

    // hover のたびにグリッチ
    titleLink.addEventListener('mouseenter', function() {
      glitchText(titleLink, original);
    });
  });

})();
