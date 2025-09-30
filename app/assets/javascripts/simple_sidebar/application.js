// show a greeting on load (support turbo)
document.addEventListener("turbo:load", function() {
  console.log("[SimpleSidebar] ❤️");
});

class SimpleSidebar {
  constructor(element) {
    console.log('🔧 SimpleSidebar constructor called for:', element.id);
    this.element = element;
    this.position = element.dataset.sidebarPosition;
    this.mode = element.dataset.sidebarMode || 'overlay';
    this.size = element.dataset.sidebarSize || '300px';
    this.state = element.dataset.sidebarState || 'closed';
    this.loadUrl = element.dataset.sidebarLoad;

    this.mainContent = document.getElementById('main-content');
    this.modalBackground = null;

    this.init();
  }

  init() {
    console.log('🚀 SimpleSidebar init() called for:', this.element.id);
    // Start hidden to measure and position reliably
    this.element.style.display = 'none';

    this.addCSSClasses();
    this.setSize();
    this.addInlineStyles();
    this.positionOffScreen();

    // Make visible but off-screen (so rects measure later)
    this.element.style.display = 'inherit';

    if (this.state === 'open') {
      this.open(false);
    } else {
      // Re-apply off-screen after paint
      setTimeout(() => this.positionOffScreen(), 0);
    }
  }

  addCSSClasses() {
    this.element.classList.add('sidebar', `sidebar-${this.position}`, `sidebar-${this.mode}`);
  }

  addInlineStyles() {
    const el = this.element;
    el.style.setProperty('background-color', '#ffffff', 'important');
    el.style.setProperty('color', '#333333', 'important');
    el.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 'important');
    el.style.setProperty('z-index', '3000', 'important');
    el.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
    el.style.setProperty('padding', '1rem', 'important');
    el.style.setProperty('box-sizing', 'border-box', 'important');
    el.style.setProperty('position', 'fixed', 'important');

    if (this.position === 'left' || this.position === 'right') {
      el.style.setProperty('height', '100vh', 'important');
      el.style.setProperty('top', '0', 'important');
      el.style.setProperty('overflow-y', 'auto', 'important');
      if (this.position === 'left') {
        el.style.setProperty('border-right', '1px solid #e0e0e0', 'important');
      } else {
        el.style.setProperty('border-left', '1px solid #e0e0e0', 'important');
      }
    } else {
      el.style.setProperty('width', '100vw', 'important');
      el.style.setProperty('left', '0', 'important');
      el.style.setProperty('overflow-x', 'auto', 'important');
      if (this.position === 'top') {
        el.style.setProperty('border-bottom', '1px solid #e0e0e0', 'important');
      } else {
        el.style.setProperty('border-top', '1px solid #e0e0e0', 'important');
      }
    }
  }

  setSize() {
    if (['top', 'bottom'].includes(this.position)) {
      this.element.style.setProperty('height', this.size, 'important');
    } else {
      this.element.style.setProperty('width', this.size, 'important');
    }
  }

  positionOffScreen() {
    // Force reflow
    // eslint-disable-next-line no-unused-expressions
    this.element.offsetHeight;

    const rect = this.element.getBoundingClientRect();
    const width = rect.width || this.parseSize(this.size);
    const height = rect.height || this.parseSize(this.size);

    if (this.position === 'left') {
      this.element.style.setProperty('left', `-${width + 200}px`, 'important');
    } else if (this.position === 'right') {
      this.element.style.setProperty('right', `-${width + 200}px`, 'important');
    } else if (this.position === 'top') {
      this.element.style.setProperty('top', `-${height + 200}px`, 'important');
    } else if (this.position === 'bottom') {
      this.element.style.setProperty('bottom', `-${height + 200}px`, 'important');
    }
  }

  open(animate = false) {
    this.element.style.display = 'inherit';

    if (animate) {
      this.animateToPosition(0);
    } else {
      this.setPosition(0);
    }

    if (this.mode === 'push') {
      animate ? this.animateMainContentMargin(this.size) : this.setMainContentMargin(this.size);
    }

    if (this.mode === 'modal') {
      this.createModalBackground();
    }

    if (this.loadUrl) this.loadContent();

    this.setState('open');
  }

  close(animate = false) {
    if (this.mode === 'push') {
      animate ? this.animateMainContentMargin('0px') : this.setMainContentMargin('0px');
    }

    if (this.mode === 'modal') {
      this.removeModalBackground();
    }

    if (animate) {
      const rect = this.element.getBoundingClientRect();
      const outer = ['left', 'right'].includes(this.position) ? rect.width : rect.height;
      this.animateToPosition(-outer);
    } else {
      this.positionOffScreen();
    }

    this.setState('closed');
  }

  toggle(animate = true) {
    if (this.state === 'closed') this.open(animate);
    else this.close(animate);
  }

  setPosition(value) {
    const v = `${value}px`;
    if (this.position === 'left') this.element.style.setProperty('left', v, 'important');
    else if (this.position === 'right') this.element.style.setProperty('right', v, 'important');
    else if (this.position === 'top') this.element.style.setProperty('top', v, 'important');
    else if (this.position === 'bottom') this.element.style.setProperty('bottom', v, 'important');
  }

  animateToPosition(value) {
    const startTime = performance.now();
    const duration = 500;
    const startValue = this.getCurrentPosition();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (value - startValue) * easeOut;
      this.setPosition(currentValue);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  getCurrentPosition() {
    const rect = this.element.getBoundingClientRect();
    if (this.position === 'left') return rect.left;
    if (this.position === 'right') return window.innerWidth - rect.right;
    if (this.position === 'top') return rect.top;
    if (this.position === 'bottom') return window.innerHeight - rect.bottom;
    return 0;
  }

  setMainContentMargin(value) {
    if (this.mainContent) this.mainContent.style[`margin-${this.position}`] = value;
  }

  animateMainContentMargin(value) {
    if (!this.mainContent) return;
    const startTime = performance.now();
    const duration = 500;
    const startValue = this.getMainContentMargin();
    const targetValue = this.parseSize(value);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetValue - startValue) * easeOut;
      this.mainContent.style[`margin-${this.position}`] = `${currentValue}px`;
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  getMainContentMargin() {
    if (!this.mainContent) return 0;
    const computedStyle = window.getComputedStyle(this.mainContent);
    return this.parseSize(computedStyle[`margin-${this.position}`]);
  }

  parseSize(size) {
    if (typeof size === 'number') return size;
    if (typeof size === 'string') {
      const match = size.match(/^([\d.]+)(.*)$/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        if (unit === 'px' || unit === '') return value;
        if (unit === 'rem' || unit === 'em') return value * 16;
      }
    }
    return 0;
  }

  createModalBackground() {
    if (this.modalBackground) return;
    const bg = document.createElement('div');
    bg.id = 'sidebar-modal-background';
    bg.dataset.sidebarTarget = this.element.id;
    bg.style.position = 'fixed';
    bg.style.zIndex = '2000';
    bg.style.left = '0';
    bg.style.top = '0';
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.background = 'rgba(0, 0, 0, 0.4)';
    bg.style.cursor = 'pointer';
    bg.style.display = 'block';
    bg.style.opacity = '0';
    document.body.appendChild(bg);
    this.modalBackground = bg;

    // Click-to-close
    bg.addEventListener('click', () => this.close(true));

    // Fade in
    requestAnimationFrame(() => {
      bg.style.transition = 'opacity 0.3s ease';
      bg.style.opacity = '1';
    });
  }

  removeModalBackground() {
    if (!this.modalBackground) return;
    const bg = this.modalBackground;
    bg.style.transition = 'opacity 0.3s ease';
    bg.style.opacity = '0';
    setTimeout(() => {
      if (bg.parentNode) bg.parentNode.removeChild(bg);
      this.modalBackground = null;
    }, 300);
  }

  async loadContent() {
    try {
      const response = await fetch(this.loadUrl, {
        method: 'GET',
        headers: { 'Accept': 'text/html', 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (response.ok) {
        const content = await response.text();
        this.element.innerHTML = content;
      }
    } catch (e) {
      // swallow
    }
  }

  setState(state) {
    this.state = state;
    this.element.dataset.sidebarState = state;
  }

  // ---- Turbo helpers (new) ----
  teardownForCache() {
    // If open in push mode, reset margins
    if (this.mode === 'push') this.setMainContentMargin('0px');
    // Remove backdrops
    if (this.mode === 'modal') this.removeModalBackground();
    // Move off-screen so snapshot is clean
    this.positionOffScreen();
  }

  destroy() {
    // Ensure closed UI state and cleanup
    this.close(false);
    this.removeModalBackground();
  }
}

// ---------------- SimpleSidebarManager ----------------
class SimpleSidebarManager {
  constructor() {
    this.sidebars = new Map();
    // Bind handlers so we can remove them later
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onModalClick = this._onModalClick.bind(this);

    this.init();
  }

  init() {
    this.initializeSidebars();
    this.bindEvents();
  }

  initializeSidebars() {
    const sidebarElements = document.querySelectorAll('[data-sidebar-position]');
    sidebarElements.forEach(element => {
      if (!element.id) return; // must have id
      // Avoid double-instantiating the same element
      if (this.sidebars.has(element.id)) return;
      const sidebar = new SimpleSidebar(element);
      this.sidebars.set(element.id, sidebar);
    });
  }

  bindEvents() {
    // Use one delegated click handler per manager instance
    document.addEventListener('click', this._onDocumentClick);
    // We also listen for backdrop clicks through delegation (kept for parity)
    document.addEventListener('click', this._onModalClick);
  }

  unbindEvents() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('click', this._onModalClick);
  }

  _onDocumentClick(event) {
    const trigger = event.target.closest?.('[data-sidebar-trigger]');
    if (!trigger) return;

    const targetId = trigger.dataset.sidebarTrigger; // e.g. "#my-sidebar"
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const sidebar = this.sidebars.get(targetElement.id);
    if (!sidebar) return;

    event.preventDefault();
    sidebar.toggle(true);
  }

  _onModalClick(event) {
    if (event.target?.id !== 'sidebar-modal-background') return;
    const targetId = event.target.dataset.sidebarTarget;
    const sidebar = this.sidebars.get(targetId);
    if (sidebar) sidebar.close(true);
  }

  // Public API — unchanged
  getSidebar(id) { return this.sidebars.get(id); }
  getAllSidebars() { return Array.from(this.sidebars.values()); }
  openSidebar(id, animate = true) { const s = this.sidebars.get(id); if (s) s.open(animate); }
  closeSidebar(id, animate = true) { const s = this.sidebars.get(id); if (s) s.close(animate); }
  toggleSidebar(id, animate = true) { const s = this.sidebars.get(id); if (s) s.toggle(animate); }
  closeAllSidebars(animate = true) { this.sidebars.forEach(s => { if (s.state === 'open') s.close(animate); }); }

  addSidebar(element) {
    if (!element?.id) return null;
    if (this.sidebars.has(element.id)) return this.sidebars.get(element.id);
    const sidebar = new SimpleSidebar(element);
    this.sidebars.set(element.id, sidebar);
    return sidebar;
  }

  removeSidebar(id) {
    const s = this.sidebars.get(id);
    if (s) { s.destroy(); this.sidebars.delete(id); }
  }

  // ---- Turbo helpers (new) ----
  beforeCache() {
    // Prepare all sidebars for snapshot
    this.sidebars.forEach(s => s.teardownForCache());
  }

  destroy() {
    // Full cleanup when leaving page or re-bootstrapping
    this.unbindEvents();
    this.sidebars.forEach(s => s.destroy());
    this.sidebars.clear();
  }
}

// ---------------- Bootstrap (Turbo-aware, keeps global API) ----------------
let sidebarManager = window.sidebarManager; // preserve if already present

const bootstrap = () => {
  // Recreate manager fresh on each Turbo visit to avoid duplicate listeners
  if (window.sidebarManager) {
    window.sidebarManager.destroy();
  }
  window.sidebarManager = new SimpleSidebarManager();
  sidebarManager = window.sidebarManager;
};

const beforeCache = () => {
  if (window.sidebarManager) {
    window.sidebarManager.beforeCache();
  }
};

// Initialize for both classic and Turbo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}

// Turbo Drive lifecycle
document.addEventListener('turbo:load', bootstrap);
document.addEventListener('turbo:before-cache', beforeCache);

// Export for external use (unchanged)
export { SimpleSidebar, SimpleSidebarManager, sidebarManager };
export default sidebarManager;
