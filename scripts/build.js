const fs = require('fs');
const path = require('path');

const repoRoot = '/Users/hakantokgoz/Projects/htokgoz.github.io';
const translations = require(path.join(repoRoot, 'assets/translations.js'));

function generateHomeHtml(lang) {
  const t = translations[lang];
  const isTr = lang === 'tr';
  const canonicalUrl = `https://htokgoz.github.io/${lang}/`;
  const enUrl = 'https://htokgoz.github.io/en/';
  const trUrl = 'https://htokgoz.github.io/tr/';

  // Feature cards HTML
  const featureCardsHtml = t.features_section.items.map(item => `
      <article class="feature-card">
        <span class="card-num">${item.num}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </article>`).join('');

  // Experience tags helper
  const renderTags = (tags) => tags.map(tag => `<li>${tag}</li>`).join('');

  // TV Points HTML
  const tvPointsHtml = t.tv_section.points.map(pt => `
          <article>
            <span aria-hidden="true">✓</span>
            <div>
              <h3>${pt.title}</h3>
              <p>${pt.desc}</p>
            </div>
          </article>`).join('');

  // Gallery items HTML
  const galleryImages = [
    { src: '../assets/home.webp', alt: isTr ? 'CozyTV+ Ana Ekran' : 'CozyTV+ Home Screen' },
    { src: '../assets/live.webp', alt: isTr ? 'CozyTV+ Canlı Yayın Rehberi' : 'CozyTV+ Live TV Guide' },
    { src: '../assets/movies.webp', alt: isTr ? 'CozyTV+ Film Kataloğu' : 'CozyTV+ Movie Catalog' },
    { src: '../assets/series.webp', alt: isTr ? 'CozyTV+ Dizi Kataloğu' : 'CozyTV+ Series Catalog' },
    { src: '../assets/details.webp', alt: isTr ? 'CozyTV+ İçerik Detayları' : 'CozyTV+ Media Details' },
    { src: '../assets/home-tr.webp', alt: isTr ? 'CozyTV+ Türkçe Arayüz' : 'CozyTV+ Turkish Interface' }
  ];

  const galleryHtml = galleryImages.map((img, idx) => `
    <a href="${img.src}" data-preview><img src="${img.src}" alt="${img.alt}" loading="lazy"><span>${t.gallery.items[idx].label} <b>↗</b></span></a>`).join('');

  // FAQ items HTML
  const faqItemsHtml = t.faq.items.map(item => `
      <details>
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>`).join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t.meta.title}</title>
<meta name="description" content="${t.meta.description}">
<meta name="theme-color" content="#080b10">

<!-- Canonical & Hreflang SEO -->
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="tr" href="${trUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">

<link rel="stylesheet" href="../assets/home.css">
</head>
<body>
<a class="skip" href="#main">${isTr ? 'İçeriğe atla' : 'Skip to content'}</a>
<header>
  <div class="nav wrap">
    <a class="brand" href="index.html" aria-label="CozyTV+">CozyTV<span>+</span></a>
    <nav aria-label="${isTr ? 'Ana navigasyon' : 'Main navigation'}">
      <a href="#features">${t.nav.features}</a>
      <a href="#experience">${t.nav.experience}</a>
      <a href="#screens">${t.nav.screens}</a>
      <a href="#pricing">${t.nav.pricing}</a>
      <a href="activate/">${t.nav.activate}</a>
      <a href="../privacy.html">${t.nav.privacy}</a>
      <a href="../terms.html">${t.nav.terms}</a>
      <a href="../refund.html">${t.nav.refund}</a>
      <a href="../support.html">${t.nav.support} <span aria-hidden="true">↗</span></a>
    </nav>
    <div class="lang-switcher" aria-label="${isTr ? 'Dil seçimi' : 'Language selector'}">
      <a href="../en/" class="${lang === 'en' ? 'active' : ''}" data-lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
      <span class="sep">|</span>
      <a href="../tr/" class="${lang === 'tr' ? 'active' : ''}" data-lang="tr" ${lang === 'tr' ? 'aria-current="page"' : ''}>TR</a>
    </div>
  </div>
</header>

<main id="main">
<section class="hero wrap">
  <div class="eyebrow"><span class="dot"></span> ${t.hero.eyebrow}</div>
  <h1>${t.hero.title}</h1>
  <p class="intro">${t.hero.subtitle}</p>
  <div class="actions">
    <a class="button primary" href="#experience">${t.hero.cta_explore} <span aria-hidden="true">↓</span></a>
    <a class="button secondary" href="#pricing">${t.hero.cta_pricing}</a>
  </div>
  <p class="availability">${t.hero.availability}</p>

  <!-- Legal / Product Definition Notice -->
  <div class="legal-banner" role="note">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <p><strong>${isTr ? 'Önemli Bilgilendirme:' : 'Important Notice:'}</strong> ${t.legal_banner}</p>
  </div>

  <figure class="hero-screen">
    <img src="../assets/home.webp" width="1600" height="900" alt="${isTr ? 'CozyTV+ TV arayüzü ana ekranı' : 'CozyTV+ TV interface home screen'}" fetchpriority="high">
    <figcaption><span>${t.hero.fig_tag}</span><span>${t.hero.fig_caption}</span></figcaption>
  </figure>
  <p class="demo-note">${t.gallery.note}</p>
</section>

<div class="feature-strip wrap" aria-label="${isTr ? 'Öne çıkan özellikler' : 'Key player highlights'}">
  <span>${t.feature_strip.webos}</span>
  <span>${t.feature_strip.remote}</span>
  <span>${t.feature_strip.sources}</span>
</div>

<!-- 6-Feature Cards Section -->
<section class="section wrap" id="features">
  <div class="section-heading">
    <div>
      <span class="number">${t.features_section.eyebrow}</span>
      <h2>${t.features_section.title}</h2>
    </div>
  </div>
  <div class="features-grid">
${featureCardsHtml}
  </div>
</section>

<!-- Deep-Dive Experience Section -->
<section class="section wrap" id="experience">
  <div class="section-heading">
    <div>
      <span class="number">${t.experience.eyebrow}</span>
      <h2>${t.experience.title}</h2>
    </div>
    <p>${t.experience.subtitle}</p>
  </div>

  <div class="feature">
    <div class="feature-copy">
      <span class="number">${t.experience.live_num}</span>
      <h3>${t.experience.live_title}</h3>
      <p>${t.experience.live_desc}</p>
      <ul class="tags">${renderTags(t.experience.live_tags)}</ul>
    </div>
    <a class="screen-link" href="../assets/live.webp" data-preview aria-label="${isTr ? 'Canlı yayın arayüzünü büyüt' : 'Enlarge live TV interface'}">
      <img src="../assets/live.webp" width="1600" height="900" alt="${isTr ? 'Canlı TV rehberi' : 'Live TV guide'}" loading="lazy">
    </a>
  </div>

  <div class="feature reverse">
    <div class="feature-copy">
      <span class="number">${t.experience.movies_num}</span>
      <h3>${t.experience.movies_title}</h3>
      <p>${t.experience.movies_desc}</p>
      <ul class="tags">${renderTags(t.experience.movies_tags)}</ul>
    </div>
    <a class="screen-link" href="../assets/movies.webp" data-preview aria-label="${isTr ? 'Film kataloğunu büyüt' : 'Enlarge movies catalog'}">
      <img src="../assets/movies.webp" width="1600" height="900" alt="${isTr ? 'Film kataloğu' : 'Movies catalog'}" loading="lazy">
    </a>
  </div>

  <div class="feature">
    <div class="feature-copy">
      <span class="number">${t.experience.series_num}</span>
      <h3>${t.experience.series_title}</h3>
      <p>${t.experience.series_desc}</p>
      <ul class="tags">${renderTags(t.experience.series_tags)}</ul>
    </div>
    <a class="screen-link" href="../assets/series.webp" data-preview aria-label="${isTr ? 'Dizi arayüzünü büyüt' : 'Enlarge TV series interface'}">
      <img src="../assets/series.webp" width="1600" height="900" alt="${isTr ? 'Dizi kataloğu' : 'Series catalog'}" loading="lazy">
    </a>
  </div>
</section>

<!-- TV Remote Focus Section -->
<section class="tv-section">
  <div class="wrap tv-grid">
    <div>
      <span class="number">${isTr ? 'TV KUMANDASI İÇİN TASARLANDI' : 'DESIGNED FOR TV REMOTES'}</span>
      <h2>${t.tv_section.title}</h2>
      <p class="muted">${t.tv_section.subtitle}</p>
    </div>
    <div class="tv-points">
${tvPointsHtml}
    </div>
  </div>
</section>

<!-- 6-Item Screenshots Gallery -->
<section class="section wrap" id="screens">
  <div class="section-heading">
    <div>
      <span class="number">${t.gallery.eyebrow}</span>
      <h2>${t.gallery.title}</h2>
    </div>
    <p>${t.gallery.subtitle}</p>
  </div>
  <div class="gallery">
${galleryHtml}
  </div>
  <p class="demo-note">${t.gallery.note}</p>
</section>

<!-- Pricing Section -->
<section class="wrap pricing-section" id="pricing">
  <div class="section-heading">
    <div>
      <span class="number">${t.pricing.eyebrow}</span>
      <h2>${t.pricing.title}</h2>
    </div>
    <p>${t.pricing.subtitle}</p>
  </div>
  <p class="muted">${t.pricing.trial_note}</p>

  <div class="pricing-grid">
    <div class="pricing-card">
      <div>
        <span class="pricing-badge">${isTr ? 'YILLIK LİSANS' : 'YEARLY LICENSE'}</span>
        <h3>${t.pricing.plan_yearly.name}</h3>
        <p class="muted">${isTr ? 'Tek cihaz için 1 yıl süreli Premium lisansı.' : '1 year of Premium software access for a single device.'}</p>
        <div class="pricing-price">${t.pricing.plan_yearly.price} <span>/ ${t.pricing.plan_yearly.period}</span></div>
        <ul class="pricing-features">
          ${t.pricing.plan_yearly.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      <a href="activate/?plan=yearly" class="pricing-btn secondary">${t.pricing.plan_yearly.cta}</a>
    </div>

    <div class="pricing-card highlight">
      <div>
        <span class="pricing-badge">${t.pricing.plan_lifetime.badge}</span>
        <h3>${t.pricing.plan_lifetime.name}</h3>
        <p class="muted">${isTr ? 'Tek cihaz için süresiz ve kalıcı Premium lisansı.' : 'Non-expiring permanent Premium license for a single device.'}</p>
        <div class="pricing-price">${t.pricing.plan_lifetime.price} <span>/ ${t.pricing.plan_lifetime.period}</span></div>
        <ul class="pricing-features">
          ${t.pricing.plan_lifetime.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      <a href="activate/?plan=lifetime" class="pricing-btn primary">${t.pricing.plan_lifetime.cta}</a>
    </div>
  </div>

  <div class="info-box">
    <h3>${isTr ? 'Yazılım Lisansı ve Ürün Tanımı' : 'Software License & Product Information'}</h3>
    <p><strong>${isTr ? 'Yasal Tanım:' : 'Legal Definition:'}</strong> ${t.pricing.product_definition}</p>
    <p>${t.pricing.disclaimer}</p>
  </div>
</section>

<!-- Getting Started Setup Guide -->
<section class="section wrap" id="setup">
  <div class="section-heading">
    <div>
      <span class="number">${t.setup.eyebrow}</span>
      <h2>${t.setup.title}</h2>
    </div>
  </div>
  <div class="steps">
    <article>
      <span>01</span>
      <h3>${t.setup.step1_title}</h3>
      <p>${t.setup.step1_desc}</p>
    </article>
    <article>
      <span>02</span>
      <h3>${t.setup.step2_title}</h3>
      <p>${t.setup.step2_desc}</p>
    </article>
    <article>
      <span>03</span>
      <h3>${t.setup.step3_title}</h3>
      <p>${t.setup.step3_desc}</p>
    </article>
  </div>
</section>

<!-- FAQ Accordion -->
<section class="section wrap faq">
  <div>
    <span class="number">${t.faq.eyebrow}</span>
    <h2>${t.faq.title}</h2>
  </div>
  <div>
${faqItemsHtml}
  </div>
</section>

<!-- Contact / Brand Section -->
<section class="wrap">
  <div class="contact">
    <img src="../assets/brand.webp" alt="CozyTV+ on TV" loading="lazy">
    <div>
      <span class="number">${t.contact.eyebrow}</span>
      <h2>${t.contact.title}</h2>
      <p>${t.contact.desc}</p>
      <div style="margin-top:20px;">
        <a class="button primary" href="../support.html">${t.contact.cta}</a>
      </div>
    </div>
  </div>
</section>
</main>

<!-- Lightbox Modal -->
<dialog id="preview" aria-label="${isTr ? 'Görsel önizleme' : 'Image preview modal'}">
  <button type="button" aria-label="${isTr ? 'Kapat' : 'Close preview'}">${isTr ? 'Kapat ✕' : 'Close ✕'}</button>
  <img src="" alt="">
  <p></p>
</dialog>

<footer class="wrap">
  <div class="footer-top">
    <div class="brand">CozyTV<span>+</span></div>
    <nav aria-label="${isTr ? 'Yasal bağlantılar' : 'Legal links'}">
      <a href="../privacy.html">${t.nav.privacy}</a>
      <a href="../terms.html">${t.nav.terms}</a>
      <a href="../refund.html">${t.nav.refund}</a>
      <a href="../support.html">${t.nav.support}</a>
    </nav>
  </div>
  <p>${t.footer.disclaimer}</p>
  <div class="footer-bottom">
    <span>${t.footer.copyright}</span>
  </div>
</footer>

<script src="../assets/translations.js"></script>
<script src="../assets/i18n.js"></script>
</body>
</html>`;
}

function generateActivateHtml(lang) {
  const t = translations[lang];
  const isTr = lang === 'tr';
  const ap = t.activate_page;
  const canonicalUrl = `https://htokgoz.github.io/${lang}/activate/`;
  const enUrl = 'https://htokgoz.github.io/en/activate/';
  const trUrl = 'https://htokgoz.github.io/tr/activate/';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t.meta.activate_title}</title>
<meta name="description" content="${t.meta.activate_description}">
<meta name="theme-color" content="#080b10">

<!-- Canonical & Hreflang SEO -->
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="tr" href="${trUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">

<link rel="stylesheet" href="../../assets/home.css">
</head>
<body>
<a class="skip" href="#main">${isTr ? 'İçeriğe atla' : 'Skip to content'}</a>
<header>
  <div class="nav wrap">
    <a class="brand" href="../index.html" aria-label="CozyTV+">CozyTV<span>+</span></a>
    <nav aria-label="${isTr ? 'Navigasyon' : 'Navigation'}">
      <a href="../#features">${t.nav.features}</a>
      <a href="../#experience">${t.nav.experience}</a>
      <a href="../#pricing">${t.nav.pricing}</a>
      <a href="./" style="color:var(--accent)">${t.nav.activate}</a>
      <a href="../../privacy.html">${t.nav.privacy}</a>
      <a href="../../terms.html">${t.nav.terms}</a>
      <a href="../../refund.html">${t.nav.refund}</a>
      <a href="../../support.html">${t.nav.support} ↗</a>
    </nav>
    <div class="lang-switcher" aria-label="${isTr ? 'Dil seçimi' : 'Language selector'}">
      <a href="../../en/activate/" class="${lang === 'en' ? 'active' : ''}" data-lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
      <span class="sep">|</span>
      <a href="../../tr/activate/" class="${lang === 'tr' ? 'active' : ''}" data-lang="tr" ${lang === 'tr' ? 'aria-current="page"' : ''}>TR</a>
    </div>
  </div>
</header>

<main id="main">
  <div class="wrap activate-hero">
    <div class="eyebrow"><span class="dot"></span> ${ap.badge}</div>
    <h1>${ap.title}</h1>
    <p class="intro">${ap.subtitle}</p>
  </div>

  <div class="wrap">
    <div class="activate-container">

      <!-- Form View -->
      <div id="activate-form-view">
        <form id="activate-form">
          <div class="form-group">
            <label for="device-code">${ap.device_label}</label>
            <div class="code-input-wrapper">
              <input type="text" id="device-code" class="code-input" placeholder="${ap.device_placeholder}" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" required maxlength="14">
            </div>
            <div class="input-hint">${ap.device_hint}</div>
          </div>

          <div class="plan-options">
            <div class="plan-card" data-plan="yearly">
              <input type="radio" name="plan" id="plan-yearly" value="yearly">
              <div class="plan-card-title">${ap.plan_yearly_title}</div>
              <div class="plan-card-price">${ap.plan_yearly_price}</div>
              <p class="plan-card-desc">${ap.plan_yearly_desc}</p>
            </div>

            <div class="plan-card selected" data-plan="lifetime">
              <span class="plan-card-badge">${ap.plan_lifetime_badge}</span>
              <input type="radio" name="plan" id="plan-lifetime" value="lifetime" checked>
              <div class="plan-card-title">${ap.plan_lifetime_title}</div>
              <div class="plan-card-price">${ap.plan_lifetime_price}</div>
              <p class="plan-card-desc">${ap.plan_lifetime_desc}</p>
            </div>
          </div>

          <button type="submit" class="btn-submit">${ap.btn_submit}</button>

          <div class="activate-notices">
            <p>• ${ap.notice_onetime}</p>
            <p>• ${ap.notice_device}</p>
            <p>• <strong>${isTr ? 'Ürün Tanımı:' : 'Product Definition:'}</strong> ${ap.notice_license_type}</p>
          </div>
        </form>
      </div>

      <!-- Payment Success View -->
      <div id="activate-success-view" style="display:none;" class="status-card">
        <div class="status-icon success" aria-hidden="true">✓</div>
        <h2>${ap.success_title}</h2>
        <p class="muted">${ap.success_msg}</p>
        <div class="status-details">
          <div class="status-details-row">
            <span class="muted">${ap.device_field_label}</span>
            <strong class="res-device-code">CZTV-XXXX-XXXX</strong>
          </div>
          <div class="status-details-row">
            <span class="muted">${ap.license_field_label}</span>
            <strong class="res-plan-type">${ap.plan_lifetime_title}</strong>
          </div>
        </div>
        <p style="color:var(--accent); font-weight:600; margin-top:20px;">${ap.return_tv}</p>
      </div>

      <!-- Expired License View -->
      <div id="activate-expired-view" style="display:none;" class="status-card">
        <div class="status-icon expired" aria-hidden="true">!</div>
        <h2>${ap.expired_title}</h2>
        <p class="muted">${ap.expired_msg}</p>
        <div class="status-actions">
          <a href="?plan=yearly" class="pricing-btn secondary" style="flex:1;">${ap.btn_renew_yearly}</a>
          <a href="?plan=lifetime" class="pricing-btn primary" style="flex:1;">${ap.btn_upgrade_lifetime}</a>
        </div>
      </div>

    </div>
  </div>
</main>

<footer class="wrap">
  <div class="footer-top">
    <div class="brand">CozyTV<span>+</span></div>
    <nav aria-label="${isTr ? 'Yasal bağlantılar' : 'Legal links'}">
      <a href="../../privacy.html">${t.nav.privacy}</a>
      <a href="../../terms.html">${t.nav.terms}</a>
      <a href="../../refund.html">${t.nav.refund}</a>
      <a href="../../support.html">${t.nav.support}</a>
    </nav>
  </div>
  <p>${t.footer.disclaimer}</p>
  <div class="footer-bottom">
    <span>${t.footer.copyright}</span>
  </div>
</footer>

<script src="../../assets/translations.js"></script>
<script src="../../assets/i18n.js"></script>
</body>
</html>`;
}

function generateRootIndex() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CozyTV+ — Smart Media Player for LG webOS</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://htokgoz.github.io/en/">
<link rel="alternate" hreflang="en" href="https://htokgoz.github.io/en/">
<link rel="alternate" hreflang="tr" href="https://htokgoz.github.io/tr/">
<link rel="alternate" hreflang="x-default" href="https://htokgoz.github.io/en/">
<script>
(function() {
  var saved = localStorage.getItem('cozytv_lang');
  var lang = (saved === 'tr' || saved === 'en') ? saved : (((navigator.language || navigator.userLanguage || '').toLowerCase().indexOf('tr') === 0) ? 'tr' : 'en');
  var search = window.location.search || '';
  var hash = window.location.hash || '';
  if (window.location.protocol === 'file:') { window.location.replace('./' + lang + '/index.html' + search + hash); } else { window.location.replace('/' + lang + '/' + search + hash); }
})();
</script>
<meta http-equiv="refresh" content="0; url=/en/">
<style>
  body { background:#080b10; color:#f5f7fa; font-family:sans-serif; text-align:center; padding-top:100px; }
  a { color:#05d5ed; text-decoration:none; margin: 0 10px; font-weight: bold; }
</style>
</head>
<body>
  <h2>CozyTV+</h2>
  <p>Redirecting to <a href="/en/">English</a> / <a href="/tr/">Türkçe</a>...</p>
</body>
</html>`;
}

function generateRootActivate() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CozyTV+ Activation</title>
<meta name="robots" content="noindex">
<script>
(function() {
  var saved = localStorage.getItem('cozytv_lang');
  var lang = (saved === 'tr' || saved === 'en') ? saved : (((navigator.language || navigator.userLanguage || '').toLowerCase().indexOf('tr') === 0) ? 'tr' : 'en');
  var search = window.location.search || '';
  var hash = window.location.hash || '';
  if (window.location.protocol === 'file:') { window.location.replace('../' + lang + '/activate/index.html' + search + hash); } else { window.location.replace('/' + lang + '/activate/' + search + hash); }
})();
</script>
<meta http-equiv="refresh" content="0; url=/en/activate/">
<style>
  body { background:#080b10; color:#f5f7fa; font-family:sans-serif; text-align:center; padding-top:100px; }
  a { color:#05d5ed; text-decoration:none; margin: 0 10px; font-weight: bold; }
</style>
</head>
<body>
  <h2>CozyTV+ Activation</h2>
  <p>Redirecting to <a href="/en/activate/">English</a> / <a href="/tr/activate/">Türkçe</a>...</p>
</body>
</html>`;
}

// Ensure target directories
const dirs = [
  path.join(repoRoot, 'en'),
  path.join(repoRoot, 'tr'),
  path.join(repoRoot, 'en/activate'),
  path.join(repoRoot, 'tr/activate'),
  path.join(repoRoot, 'activate')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Write pages
fs.writeFileSync(path.join(repoRoot, 'en/index.html'), generateHomeHtml('en'), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'tr/index.html'), generateHomeHtml('tr'), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'en/activate/index.html'), generateActivateHtml('en'), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'tr/activate/index.html'), generateActivateHtml('tr'), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'index.html'), generateRootIndex(), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'activate/index.html'), generateRootActivate(), 'utf8');

console.log('Successfully built:');
console.log(' - /en/index.html');
console.log(' - /tr/index.html');
console.log(' - /en/activate/index.html');
console.log(' - /tr/activate/index.html');
console.log(' - /index.html (smart root redirect)');
console.log(' - /activate/index.html (smart activate redirect)');
