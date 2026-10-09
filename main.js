(() => {
  const currentFile = location.pathname.split('/').pop() || 'index.html';

  const headerHost = document.getElementById('site-header');
  if (headerHost && !headerHost.querySelector('.header-inner')) {
    headerHost.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="株式会社やね太郎さん トップページ">
          <span class="brand-mark" aria-hidden="true"><i></i><b></b></span>
          <span class="brand-copy"><small>屋根・板金・外装工事</small><strong>株式会社やね太郎さん</strong></span>
        </a>
        <nav class="desktop-nav" aria-label="メインナビゲーション">
          <a href="services.html">工事内容</a><a href="index.html#reasons">選ばれる理由</a><a href="works.html">施工実績</a><a href="index.html#area">対応エリア</a><a href="company.html">会社概要</a><a href="faq.html">よくある質問</a>
        </nav>
        <div class="header-actions">
          <a class="header-phone" href="tel:08090177945" aria-label="080-9017-7945へ電話する">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2.8 10 7.6 7.9 9.7c1.1 2.3 3 4.2 5.4 5.4l2.1-2.1 4.8 2.8-.9 4c-.2.8-.9 1.3-1.7 1.3C9.5 20.7 3.3 14.5 2.9 6.4c0-.8.5-1.5 1.3-1.7l3-.7Z"/></svg>
            <span><small>直通電話</small><b>080-9017-7945</b></span>
          </a>
          <a class="btn btn-primary btn-small" href="contact.html">無料見積もり</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="メニューを開く"><span></span><span></span><span></span></button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true"><nav aria-label="スマートフォンナビゲーション"><a href="services.html">工事内容</a><a href="index.html#reasons">選ばれる理由</a><a href="works.html">施工実績</a><a href="index.html#area">対応エリア</a><a href="company.html">会社概要</a><a href="faq.html">よくある質問</a><a href="contact.html">お問い合わせ</a></nav></div>`;
  }

  const footerHost = document.getElementById('site-footer');
  if (footerHost) {
    footerHost.innerHTML = `
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"><i></i><b></b></span><span class="brand-copy"><small>屋根・板金・外装工事</small><strong>株式会社やね太郎さん</strong></span></a>
            <address>事務所：〒963-7711 福島県田村郡三春町桜ヶ丘3-2-8 B-102<br>工場：〒963-4205 福島県田村市船引町遠山沢反田70<br>TEL 0247-73-8092 / FAX 0247-61-6771</address>
          </div>
          <nav class="footer-nav" aria-label="工事内容"><strong>工事内容</strong><a href="roof.html">屋根工事</a><a href="sheet-metal.html">板金工事</a><a href="stainless.html">ステンレス工事</a><a href="gutter.html">雨樋工事</a><a href="exterior.html">外壁工事</a><a href="copper.html">銅板工事</a><a href="snow-guard.html">雪止め工事</a><a href="painting.html">塗装工事</a></nav>
          <nav class="footer-nav" aria-label="会社案内"><strong>会社案内</strong><a href="works.html">施工実績</a><a href="company.html">会社概要</a><a href="faq.html">よくある質問</a><a href="recruitment.html">採用情報</a><a href="contact.html">お問い合わせ</a><a href="privacy.html">プライバシーポリシー</a><a href="https://www.instagram.com/" rel="noopener noreferrer">Instagram</a></nav>
        </div>
        <div class="footer-bottom"><span>© 2026 株式会社やね太郎さん</span><span>屋根・板金・外装工事のご相談を承ります</span></div>
      </div>`;
  }

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
      toggle.classList.toggle('is-open', !open);
      menu.classList.toggle('is-open', !open);
      menu.setAttribute('aria-hidden', String(open));
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
        toggle.focus();
      }
    });
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('.faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details[open]').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const filterButtons = document.querySelectorAll('[data-work-filter]');
  const workCards = document.querySelectorAll('[data-work]');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    const filter = button.dataset.workFilter;
    workCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.work !== filter));
  }));

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = contactForm.querySelector('.form-status');
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(`Webサイトからのご相談：${data.get('purpose')}`);
      const body = encodeURIComponent(`お名前：${data.get('name')}\nメール：${data.get('email')}\n電話：${data.get('phone') || '未入力'}\n\n${data.get('message')}`);
      if (status) status.textContent = 'メールソフトを開きます。内容をご確認のうえ送信してください。';
      location.href = `mailto:yanetarosan@kfd.biglobe.ne.jp?subject=${subject}&body=${body}`;
    });
  }

  document.querySelectorAll('.desktop-nav a, .footer-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentFile) link.setAttribute('aria-current', 'page');
  });
})();
