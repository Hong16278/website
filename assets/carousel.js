const CAROUSEL_PRODUCTS = ['automate', 'mouse-assistant', 'keyboard-assistant'];
const CAROUSEL_INTERVAL = 6000;

const carouselCopy = {
  automate: {
    eyebrow: '鼠标键盘自动化',
    line1: '让重复操作',
    accent: '更简单',
    description: '录制鼠标与键盘操作，保存为任务后重复执行，让电脑替你完成机械性的点击与输入。',
    caption: '把重复的操作\n交给软件来完成',
    kind: 'automate'
  },
  'keyboard-assistant': {
    eyebrow: '键盘按键自动化',
    line1: '把重复按键',
    accent: '交给工具',
    description: '捕获目标窗口后，依次录入按键或组合键，按设置的次数与间隔重复执行。',
    caption: '重复输入少一点\n专注时间多一点',
    kind: 'keyboard'
  },
  'mouse-assistant': {
    eyebrow: '多点鼠标自动化',
    line1: '多个点击动作',
    accent: '按顺序完成',
    description: '录入多个鼠标坐标并设置各自等待时间，把固定的多步点击交给工具循环执行。',
    caption: '把多步点击\n变成自动执行',
    kind: 'mouse'
  }
};

const miniIcon = (kind) => {
  if (kind === 'keyboard') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 15h10"/></svg>';
  if (kind === 'mouse') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 3 14 9-7 1-3 7-4-17Z"/><path d="m14.5 14.5 4 4"/></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 21h5l4-8 4 8h5L12 3Z"/><path d="M9 17h6"/></svg>';
};

function mockupMarkup(product, copy) {
  const name = product?.name || 'Lucas';
  if (copy.kind === 'keyboard') {
    return `<div class="carousel-app-window keyboard-window">
      <div class="carousel-windowbar"><span class="window-dots"><i></i><i></i><i></i></span><strong>${name}</strong><span>— □ ×</span></div>
      <div class="carousel-app-body compact-body">
        <aside class="carousel-sidebar"><div class="mini-brand purple">${miniIcon('keyboard')}<b>${name}</b></div><span class="active">按键方案</span><span>执行设置</span><span>运行记录</span><span>设置</span></aside>
        <div class="carousel-workspace">
          <div class="workspace-head"><div><small>当前方案</small><h3>日常输入方案</h3></div><button>＋ 新建方案</button></div>
          <div class="key-sequence"><span>Ctrl</span><b>+</b><span>C</span><b>→</b><span>Tab</span><b>→</b><span>Ctrl</span><b>+</b><span>V</span></div>
          <div class="setting-row"><div><strong>执行间隔</strong><small>每次按键之间等待</small></div><em>120 ms</em></div>
          <div class="setting-row"><div><strong>循环执行</strong><small>重复当前按键方案</small></div><i class="toggle on"></i></div>
          <div class="run-strip"><span>准备就绪</span><button>▶ 开始执行</button></div>
        </div>
      </div>
    </div>`;
  }
  if (copy.kind === 'mouse') {
    return `<div class="carousel-app-window clicker-window">
      <div class="carousel-windowbar"><span class="window-dots"><i></i><i></i><i></i></span><strong>${name}</strong><span>— □ ×</span></div>
      <div class="carousel-app-body clicker-body">
        <div class="clicker-focus">
          <div class="cursor-orbit"><span class="target-ring"></span><span class="cursor-arrow">↖</span><span class="pulse-dot"></span></div>
          <strong>点击位置已锁定</strong><small>屏幕坐标 X 846 · Y 512</small>
        </div>
        <div class="clicker-settings">
          <div class="workspace-head"><div><small>动作列表</small><h3>多点点击任务</h3></div><span class="status-pill">就绪</span></div>
          <div class="setting-row"><div><strong>动作 01 · X 846 / Y 512</strong><small>执行后等待时间</small></div><em>120 ms</em></div>
          <div class="setting-row"><div><strong>动作 02 · X 1032 / Y 618</strong><small>执行后等待时间</small></div><em>300 ms</em></div>
          <div class="setting-row"><div><strong>F6 添加当前位置</strong><small>将鼠标坐标录入动作列表</small></div><em>准备就绪</em></div>
          <button class="wide-run">▶ 开始执行</button>
        </div>
      </div>
    </div>`;
  }
  return `<div class="carousel-app-window automate-window">
    <div class="carousel-windowbar"><span class="window-dots"><i></i><i></i><i></i></span><strong>${name}</strong><span>— □ ×</span></div>
    <div class="carousel-app-body">
      <aside class="carousel-sidebar"><div class="mini-brand blue">${miniIcon('automate')}<b>${name}</b></div><span class="active">任务列表</span><span>录制任务</span><span>定时任务</span><span>执行记录</span><span>设置</span></aside>
      <div class="carousel-workspace">
        <div class="workspace-head"><div><small>自动化任务</small><h3>任务列表</h3></div><button>＋ 新建任务</button></div>
        ${['自动填写表单','定时打开常用软件','重复文件处理'].map((task,index)=>`<div class="task-row"><span class="task-check">✓</span><div><strong>${task}</strong><small>${index===0?'今天 09:30':'已保存的自动化任务'}</small></div><button class="round-play">▶</button></div>`).join('')}
      </div>
    </div>
  </div>`;
}

function createCarousel(products) {
  const slides = CAROUSEL_PRODUCTS.map(slug => {
    const product = products.find(item => item.slug === slug);
    const copy = carouselCopy[slug];
    if (!product || !copy) return '';
    return `<article class="lucas-carousel-slide" data-slide="${slug}" aria-label="${product.name}">
      <div class="container lucas-carousel-grid">
        <div class="lucas-carousel-copy">
          <span class="carousel-eyebrow">${copy.eyebrow}</span>
          <h1>${copy.line1}<br><span>${copy.accent}</span></h1>
          <p>${copy.description}</p>
          <div class="carousel-actions">
            <a class="btn btn-primary" href="/products/${slug}">了解 ${product.name} <span aria-hidden="true">→</span></a>
            <a class="btn btn-secondary" href="/products">查看所有产品 <span aria-hidden="true">→</span></a>
          </div>
          <div class="carousel-points"><span>✓ 专注实用</span><span>✓ 简单易用</span><span>✓ 持续改进</span></div>
        </div>
        <div class="lucas-carousel-visual">
          <div class="carousel-glow"></div>
          ${mockupMarkup(product, copy)}
          <div class="carousel-caption">${copy.caption.replace('\n','<br>')} <b>↗</b></div>
        </div>
      </div>
    </article>`;
  }).join('');

  return `<div class="lucas-carousel" role="region" aria-roledescription="carousel" aria-label="Lucas 软件推荐" tabindex="0">
    <div class="lucas-carousel-track">${slides}</div>
    <div class="carousel-controls container">
      <button class="carousel-arrow prev" type="button" aria-label="上一个软件">‹</button>
      <div class="carousel-dots" aria-label="选择软件">
        ${CAROUSEL_PRODUCTS.map((slug,index)=>`<button type="button" class="carousel-dot${index===0?' active':''}" data-carousel-index="${index}" aria-label="第 ${index+1} 个软件" aria-current="${index===0?'true':'false'}"></button>`).join('')}
      </div>
      <button class="carousel-toggle" type="button" aria-label="暂停自动轮播" title="暂停自动轮播">Ⅱ</button>
      <button class="carousel-arrow next" type="button" aria-label="下一个软件">›</button>
    </div>
  </div>`;
}

let cachedProducts = null;
let activeCarousel = null;
let productPromise = null;

function loadProducts() {
  if (cachedProducts) return Promise.resolve(cachedProducts);
  if (!productPromise) {
    productPromise = fetch('/data/products.json', {cache:'no-store'})
      .then(response => {
        if (!response.ok) throw new Error('无法读取产品数据');
        return response.json();
      })
      .then(data => (cachedProducts = data));
  }
  return productPromise;
}

function bindCarousel(root) {
  const slides = [...root.querySelectorAll('.lucas-carousel-slide')];
  const dots = [...root.querySelectorAll('.carousel-dot')];
  const prev = root.querySelector('.carousel-arrow.prev');
  const next = root.querySelector('.carousel-arrow.next');
  const toggle = root.querySelector('.carousel-toggle');
  if (!slides.length) return;

  let index = 0;
  let timer = null;
  let paused = false;
  let touchStartX = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = (target, userInitiated = false) => {
    index = (target + slides.length) % slides.length;
    slides.forEach((slide,i) => {
      const active = i === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot,i) => {
      const active = i === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (userInitiated) restart();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (!paused && !reducedMotion && document.visibilityState === 'visible') {
      timer = window.setInterval(() => render(index + 1), CAROUSEL_INTERVAL);
    }
  };
  const restart = () => start();
  const setPaused = value => {
    paused = value;
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? '继续自动轮播' : '暂停自动轮播');
    toggle.title = paused ? '继续自动轮播' : '暂停自动轮播';
    start();
  };

  prev.addEventListener('click', () => render(index - 1, true));
  next.addEventListener('click', () => render(index + 1, true));
  dots.forEach((dot,i) => dot.addEventListener('click', () => render(i, true)));
  toggle.addEventListener('click', () => setPaused(!paused));
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); render(index - 1, true); }
    if (event.key === 'ArrowRight') { event.preventDefault(); render(index + 1, true); }
  });
  root.addEventListener('pointerenter', stop);
  root.addEventListener('pointerleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) start(); });
  root.addEventListener('touchstart', event => { touchStartX = event.touches[0]?.clientX ?? null; }, {passive:true});
  root.addEventListener('touchend', event => {
    if (touchStartX == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) > 45) render(index + (delta < 0 ? 1 : -1), true);
  }, {passive:true});
  document.addEventListener('visibilitychange', start);

  render(0);
  start();
  activeCarousel = {destroy(){ stop(); activeCarousel = null; }};
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
    bindCarousel(hero.querySelector('.lucas-carousel'));
  } catch (error) {
    console.warn('[Lucas] 主图轮播加载失败，保留原始首屏。', error);
    hero.dataset.carouselEnhanced = 'false';
  }
}

const observer = new MutationObserver(() => {
  if (!document.querySelector('#app main .hero') && activeCarousel) activeCarousel.destroy();
  enhanceHomeHero();
});
observer.observe(document.getElementById('app'), {childList:true, subtree:true});
enhanceHomeHero();
