/**
 * CozyTV+ i18n & Client Interactions
 * Handles dual-language switching (EN/TR), URL preservation (query params + hash),
 * device code handling, and activation page state.
 */
(function () {
  'use strict';

  function getCurrentLang() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('/tr') === 0 || path.indexOf('/tr/') !== -1) {
      return 'tr';
    }
    if (path.indexOf('/en') === 0 || path.indexOf('/en/') !== -1) {
      return 'en';
    }
    var saved = localStorage.getItem('cozytv_lang');
    if (saved === 'tr' || saved === 'en') {
      return saved;
    }
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return navLang.indexOf('tr') === 0 ? 'tr' : 'en';
  }

  function getCorrespondingUrl(targetLang) {
    var path = window.location.pathname;
    var search = window.location.search || '';
    var hash = window.location.hash || '';

    var isActivate = path.indexOf('activate') !== -1;
    var newPath = '/' + targetLang + '/';
    if (isActivate) {
      newPath = '/' + targetLang + '/activate/';
    }

    if (window.location.protocol === 'file:') {
      if (isActivate) {
        return '../../' + targetLang + '/activate/index.html' + search + hash;
      } else {
        return '../' + targetLang + '/index.html' + search + hash;
      }
    }

    return newPath + search + hash;
  }

  function setupLangSwitchers(currentLang) {
    var switchers = document.querySelectorAll('.lang-switcher');
    switchers.forEach(function (sw) {
      var enLink = sw.querySelector('[data-lang="en"]');
      var trLink = sw.querySelector('[data-lang="tr"]');

      if (enLink) {
        enLink.href = getCorrespondingUrl('en');
        if (currentLang === 'en') {
          enLink.classList.add('active');
          enLink.setAttribute('aria-current', 'page');
        } else {
          enLink.classList.remove('active');
          enLink.removeAttribute('aria-current');
        }
        enLink.addEventListener('click', function () {
          localStorage.setItem('cozytv_lang', 'en');
        });
      }

      if (trLink) {
        trLink.href = getCorrespondingUrl('tr');
        if (currentLang === 'tr') {
          trLink.classList.add('active');
          trLink.setAttribute('aria-current', 'page');
        } else {
          trLink.classList.remove('active');
          trLink.removeAttribute('aria-current');
        }
        trLink.addEventListener('click', function () {
          localStorage.setItem('cozytv_lang', 'tr');
        });
      }
    });
  }

  function setupLightbox() {
    var dialog = document.getElementById('preview');
    if (!dialog) return;

    var previewImg = dialog.querySelector('img');
    var previewCaption = dialog.querySelector('p');
    var closeBtn = dialog.querySelector('button');

    document.querySelectorAll('[data-preview]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetSrc = this.getAttribute('href');
        var altText = this.querySelector('img') ? this.querySelector('img').alt : '';
        if (previewImg) {
          previewImg.src = targetSrc;
          previewImg.alt = altText;
        }
        if (previewCaption) {
          previewCaption.textContent = altText;
        }
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dialog.close();
      });
    }

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }

  function setupActivationPage(currentLang) {
    var form = document.getElementById('activate-form');
    if (!form) return;

    var deviceInput = document.getElementById('device-code');
    var urlParams = new URLSearchParams(window.location.search);
    var deviceParam = urlParams.get('device');
    var planParam = urlParams.get('plan');
    var statusParam = urlParams.get('status');

    if (deviceParam && deviceInput) {
      deviceInput.value = deviceParam.toUpperCase();
    }

    if (deviceInput) {
      deviceInput.addEventListener('input', function (e) {
        var val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (val.indexOf('CZTV') !== 0 && val.length <= 4) {
          // let user type CZTV or standard code
        }
        if (val.length > 4 && val.indexOf('CZTV') === 0) {
          var rest = val.substring(4);
          var parts = ['CZTV'];
          if (rest.length > 0) parts.push(rest.substring(0, 4));
          if (rest.length > 4) parts.push(rest.substring(4, 8));
          e.target.value = parts.join('-');
        }
      });
    }

    // Plan selection card highlighting
    var planRadios = document.querySelectorAll('input[name="plan"]');
    var planCards = document.querySelectorAll('.plan-card');

    function updateSelectedCard() {
      var selectedVal = document.querySelector('input[name="plan"]:checked')?.value || 'lifetime';
      planCards.forEach(function (card) {
        if (card.getAttribute('data-plan') === selectedVal) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    }

    if (planParam) {
      var targetRadio = document.querySelector('input[name="plan"][value="' + planParam.toLowerCase() + '"]');
      if (targetRadio) {
        targetRadio.checked = true;
      }
    }
    updateSelectedCard();

    planRadios.forEach(function (radio) {
      radio.addEventListener('change', updateSelectedCard);
    });

    planCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var radio = card.querySelector('input[name="plan"]');
        if (radio) {
          radio.checked = true;
          updateSelectedCard();
        }
      });
    });

    // Check states: success or expired
    var formView = document.getElementById('activate-form-view');
    var successView = document.getElementById('activate-success-view');
    var expiredView = document.getElementById('activate-expired-view');

    if (statusParam === 'success' && successView) {
      if (formView) formView.style.display = 'none';
      if (expiredView) expiredView.style.display = 'none';
      successView.style.display = 'block';

      var devSpan = successView.querySelector('.res-device-code');
      if (devSpan) devSpan.textContent = deviceParam || 'CZTV-DEMO-2026';

      var planSpan = successView.querySelector('.res-plan-type');
      if (planSpan) {
        var isTr = currentLang === 'tr';
        var isLifetime = (planParam || 'lifetime') === 'lifetime';
        planSpan.textContent = isLifetime
          ? (isTr ? 'Ömür Boyu Premium' : 'Lifetime Premium')
          : (isTr ? '1 Yıllık Premium' : '1 Year Premium');
      }
    } else if (statusParam === 'expired' && expiredView) {
      if (formView) formView.style.display = 'none';
      if (successView) successView.style.display = 'none';
      expiredView.style.display = 'block';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var code = deviceInput ? deviceInput.value.trim() : '';
      if (!code) {
        alert(currentLang === 'tr' ? 'Lütfen geçerli bir CozyTV+ cihaz kodu girin.' : 'Please enter a valid CozyTV+ device code.');
        if (deviceInput) deviceInput.focus();
        return;
      }

      var selectedPlan = document.querySelector('input[name="plan"]:checked')?.value || 'lifetime';

      // Mock / Checkout flow (PayTR or Lemon Squeezy integration hook)
      // Preserves device code and shows success state for demonstration
      var targetSearch = '?status=success&device=' + encodeURIComponent(code) + '&plan=' + encodeURIComponent(selectedPlan);
      window.location.search = targetSearch;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = getCurrentLang();
    setupLangSwitchers(lang);
    setupLightbox();
    setupActivationPage(lang);
  });
})();
