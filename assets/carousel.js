const CAROUSEL_INTERVAL = 7000;
const PRODUCT_ORDER = [
  'automate',
  'mouse-assistant',
  'message-assistant',
  'keyboard-assistant',
  'scheduled-screenshot'
];

const carouselCopy = {
  automate: {
    eyebrow: '旗舰自动化工具',
    title: '录制一次，重复无数次',
    accent: '重复操作交给 AutoMate',
    note: '从录制鼠标键盘，到保存、循环和随时停止，一套流程完成日常自动化。'
  },
  'mouse-assistant': {
    eyebrow: '多点鼠标自动化',
    title: '多个点击位置，按顺序完成',
    accent: '固定流程不再手动重复',
    note: '记录坐标、设置等待时间，让多步点击稳定地循环执行。'
  },
  'message-assistant': {
    eyebrow: '重复输入辅助',
    title: '多条内容，按规则依次发送',
    accent: '格式与顺序都能保留',
    note: '支持全部、逐行和逐段发送，适合需要重复输入的工作场景。'
  },
  'keyboard-assistant': {
    eyebrow: '按键与组合键循环',
    title: '把重复按键交给工具',
    accent: '每一步都有自己的节奏',
    note: '录入普通按键或组合键，自定义次数、按下时长和等待间隔。'
  },
  'scheduled-screenshot': {
    eyebrow: '自动屏幕记录',
    title: '按时间或画面变化截图',
    accent: '需要留档时自动完成',
    note: '选择屏幕区域，按定时、画面变化或手动触发完成截图。'
  }
};

const iconAssets = {
  automate: '/assets/product-icons/automate.png',
  'mouse-assistant': '/assets/product-icons/mouse-assistant.png',
  'message-assistant': '/assets/product-icons/message-assistant.png',
  'keyboard-assistant': '/assets/product-icons/keyboard-assistant.png',
  'scheduled-screenshot': '/assets/product-icons/scheduled-screenshot.png'
};

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function productMark(product) {
  const source = iconAssets[product.slug];
  if (source) return `<img src="${source}" alt="" aria-hidden="true">`;
  return `<span aria-hidden="true">${escapeHtml(product.name.slice(0, 1))}</span>`;
}

function productScreenshot(product, index) {
  const source = product.screenshots?.[0];
  if (!source) {
    return `<div class="carousel-empty-screen">${productMark(product)}<strong>${escapeHtml(product.name)}</strong><span>产品界面将在发布后展示</span></div>`;
  }
  return `<img src="${escapeHtml(source)}" alt="${escapeHtml(product.name)} 软件界面" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}

function createCarousel(products) {
  const featured = PRODUCT_ORDER
    .map(slug => products.find(product => product.slug === slug))
    .filter(Boolean);

  if (!featured.length) throw new Error('没有可展示的软件');

  const slides = featured.map((product, index) => {
    const copy = carouselCopy[product.slug] || {
      eyebrow: product.category,
      title: product.name,
      accent: product.subtitle,
      note: product.description
    };
    const Heading = index === 0 ? 'h1' : 'h2';
    return `<article class="lucas-carousel-slide${index === 0 ? ' active' : ''}" data-carousel-slide="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
      <div class="container lucas-carousel-grid">
        <div class="lucas-carousel-copy">
          <span class="carousel-eyebrow"><i></i>${escapeHtml(copy.eyebrow)}</span>
          <${Heading}>${escapeHtml(copy.title)}<br><span>${escapeHtml(copy.accent)}</span></${Heading}>
          <p>${escapeHtml(copy.note)}</p>
          <div class="carousel-actions">
            <a class="btn btn-primary" href="/products/${encodeURIComponent(product.slug)}">查看软件详情 <span aria-hidden="true">→</span></a>
            <a class="carousel-quiet-link" href="/products">全部软件 <span aria-hidden="true">↗</span></a>
          </div>
          <div class="carousel-facts">
            <span>${escapeHtml(product.platform.split('·')[0].trim())}</span>
            <span>${escapeHtml(product.pricing || '查看产品详情')}</span>
          </div>
        </div>
        <div class="lucas-carousel-visual">
          <div class="carousel-orbit orbit-one"></div><div class="carousel-orbit orbit-two"></div>
          <div class="carousel-window">
            <div class="carousel-windowbar"><span class="window-dots"><i></i><i></i><i></i></span><strong>${escapeHtml(product.name)}</strong><span>—　□　×</span></div>
            <div class="carousel-screen">${productScreenshot(product, index)}</div>
          </div>
          <div class="carousel-feature-chip"><span>✓</span><div><small>核心能力</small><strong>${escapeHtml(product.features?.[0] || product.subtitle)}</strong></div></div>
          <span class="carousel-real-label">真实软件界面</span>
        </div>
      </div>
    </article>`;
  }).join('');

  const switcher = featured.map((product, index) => `<button class="carousel-product${index === 0 ? ' active' : ''}" type="button" data-carousel-index="${index}" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}">
    <span class="carousel-product-icon">${productMark(product)}</span>
    <span><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.subtitle)}</small></span>
  </button>`).join('');

  return `<div class="lucas-carousel" role="region" aria-roledescription="carousel" aria-label="Lucas 软件展示" tabindex="0">
    <div class="lucas-carousel-track">${slides}</div>
    <div class="container carousel-navigation">
      <div class="carousel-products" role="tablist" aria-label="选择要查看的软件">${switcher}</div>
      <div class="carousel-controls">
        <span class="carousel-count"><b>01</b> / ${String(featured.length).padStart(2, '0')}</span>
        <button class="carousel-toggle" type="button" aria-label="暂停自动轮播" title="暂停自动轮播">Ⅱ</button>
        <button class="carousel-arrow prev" type="button" aria-label="上一个软件">←</button>
        <button class="carousel-arrow next" type="button" aria-label="下一个软件">→</button>
      </div>
    </div>
    <div class="carousel-progress" aria-hidden="true"><i></i></div>
  </div>`;
}

let cachedProducts;
let productPromise;
let activeCarousel;

function loadProducts() {
  if (cachedProducts) return Promise.resolve(cachedProducts);
  if (!productPromise) {
    productPromise = fetch('/data/products.json', {cache: 'no-store'})
      .then(response => {
        if (!response.ok) throw new Error('无法读取产品数据');
        return response.json();
      })
      .then(data => (cachedProducts = data));
  }
  return productPromise;
}

function bindCarousel(root) {
  const track = root.querySelector('.lucas-carousel-track');
  const slides = [...root.querySelectorAll('.lucas-carousel-slide')];
  const tabs = [...root.querySelectorAll('.carousel-product')];
  const prev = root.querySelector('.carousel-arrow.prev');
  const next = root.querySelector('.carousel-arrow.next');
  const toggle = root.querySelector('.carousel-toggle');
  const count = root.querySelector('.carousel-count b');
  const progress = root.querySelector('.carousel-progress i');
  const controller = new AbortController();
  const {signal} = controller;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer;
  let scrollFrame;
  let paused = reducedMotion;

  const setActive = target => {
    index = (target + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.querySelectorAll('a, button').forEach(element => element.tabIndex = active ? 0 : -1);
    });
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    count.textContent = String(index + 1).padStart(2, '0');
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  };

  const goTo = (target, smooth = true) => {
    const nextIndex = (target + slides.length) % slides.length;
    setActive(nextIndex);
    track.scrollTo({left: nextIndex * track.clientWidth, behavior: smooth && !reducedMotion ? 'smooth' : 'auto'});
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    stop();
    if (!paused && document.visibilityState === 'visible') {
      timer = window.setInterval(() => goTo(index + 1), CAROUSEL_INTERVAL);
    }
  };

  const useControl = target => {
    goTo(target);
    start();
  };

  tabs.forEach((tab, tabIndex) => tab.addEventListener('click', () => useControl(tabIndex), {signal}));
  prev.addEventListener('click', () => useControl(index - 1), {signal});
  next.addEventListener('click', () => useControl(index + 1), {signal});
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? '继续自动轮播' : '暂停自动轮播');
    toggle.title = paused ? '继续自动轮播' : '暂停自动轮播';
    start();
  }, {signal});
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); useControl(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); useControl(index + 1); }
  }, {signal});
  root.addEventListener('pointerenter', stop, {signal});
  root.addEventListener('pointerleave', start, {signal});
  root.addEventListener('focusin', stop, {signal});
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget)) start();
  }, {signal});
  track.addEventListener('scroll', () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(() => {
      const target = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (target !== index) setActive(target);
    });
  }, {signal, passive: true});
  document.addEventListener('visibilitychange', start, {signal});

  const resizeObserver = new ResizeObserver(() => goTo(index, false));
  resizeObserver.observe(track);
  setActive(0);
  start();

  return {
    destroy() {
      stop();
      controller.abort();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(scrollFrame);
    }
  };
}

async function enhanceHomeHero() {
  const hero = document.querySelector('#app main .hero');
  if (!hero || hero.dataset.carouselEnhanced === 'true') return;
  hero.dataset.carouselEnhanced = 'true';
  try {
    const products = await loadProducts();
    if (!document.body.contains(hero)) return;
    hero.innerHTML = createCarousel(products);
    hero.classList.add('hero-carousel-enabled');
    activeCarousel?.destroy();
    activeCarousel = bindCarousel(hero.querySelector('.lucas-carousel'));
  } catch (error) {
    console.warn('[Lucas] 软件展示加载失败，保留基础首屏。', error);
    hero.dataset.carouselEnhanced = 'false';
  }
}

const observer = new MutationObserver(() => {
  if (!document.querySelector('#app main .hero') && activeCarousel) {
    activeCarousel.destroy();
    activeCarousel = undefined;
  }
  enhanceHomeHero();
});

observer.observe(document.getElementById('app'), {childList: true, subtree: true});
enhanceHomeHero();
