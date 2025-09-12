/**
 * SimpleSidebar Application Entry Point
 * Modern ES6+ JavaScript implementation replacing CoffeeScript
 * Bundled version to avoid importmap module resolution issues
 */

/**
 * @fileoverview SimpleSidebar - Modern sidebar component
 * Converts CoffeeScript to ES6+ JavaScript with no jQuery dependency
 * @typedef {Object} SidebarOptions
 * @property {string} [id] - Unique identifier for the sidebar
 * @property {'left'|'right'|'top'|'bottom'} [position='left'] - Position of the sidebar
 * @property {'push'|'overlay'|'modal'} [mode='overlay'] - Display mode
 * @property {string} [size='300px'] - Size of the sidebar
 * @property {'open'|'closed'} [state='closed'] - Initial state
 * @property {string} [load] - URL to load content from
 */

/**
 * SimpleSidebar Class - Handles individual sidebar functionality
 * @class SimpleSidebar
 */
class SimpleSidebar {
  /**
   * Creates a new SimpleSidebar instance
   * @param {HTMLElement} element - The sidebar element
   */
  constructor(element) {
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
    this.addCSSClasses();
    this.setSize();
    this.positionOffScreen();
    this.showElement();
    
    if (this.state === 'open') {
      this.open(false);
    }
  }

  addCSSClasses() {
    this.element.classList.add('sidebar', `sidebar-${this.position}`, `sidebar-${this.mode}`);
  }

  setSize() {
    if (['top', 'bottom'].includes(this.position)) {
      this.element.style.height = this.size;
    } else {
      this.element.style.width = this.size;
    }
  }

  positionOffScreen() {
    const rect = this.element.getBoundingClientRect();
    const outerWidth = rect.width;
    
    if (this.position === 'left') {
      this.element.style.left = `-${outerWidth}px`;
    } else if (this.position === 'right') {
      this.element.style.right = `-${outerWidth}px`;
    } else if (this.position === 'top') {
      const outerHeight = rect.height;
      this.element.style.top = `-${outerHeight}px`;
    } else if (this.position === 'bottom') {
      const outerHeight = rect.height;
      this.element.style.bottom = `-${outerHeight}px`;
    }
  }

  showElement() {
    this.element.style.display = 'inherit';
  }

  /**
   * Opens the sidebar
   * @param {boolean} [animate=false] - Whether to animate the opening
   */
  open(animate = false) {
    // Move sidebar into viewport
    if (animate) {
      this.animateToPosition(0);
    } else {
      this.setPosition(0);
    }

    // Add margin to main content for push mode
    if (this.mode === 'push') {
      if (animate) {
        this.animateMainContentMargin(this.size);
      } else {
        this.setMainContentMargin(this.size);
      }
    }

    // Add modal background if in modal mode
    if (this.mode === 'modal') {
      this.createModalBackground();
    }

    // Load content via fetch if URL provided
    if (this.loadUrl) {
      this.loadContent();
    }

    this.setState('open');
  }

  /**
   * Closes the sidebar
   * @param {boolean} [animate=false] - Whether to animate the closing
   */
  close(animate = false) {
    // Reset main content margin for push mode
    if (this.mode === 'push') {
      if (animate) {
        this.animateMainContentMargin('0px');
      } else {
        this.setMainContentMargin('0px');
      }
    }

    // Remove modal background
    if (this.mode === 'modal') {
      this.removeModalBackground();
    }

    // Move sidebar off screen
    if (animate) {
      const rect = this.element.getBoundingClientRect();
      const outerWidth = rect.width;
      this.animateToPosition(-outerWidth);
    } else {
      this.positionOffScreen();
    }

    this.setState('closed');
  }

  /**
   * Toggles the sidebar state
   * @param {boolean} [animate=true] - Whether to animate the transition
   */
  toggle(animate = true) {
    if (this.state === 'closed') {
      this.open(animate);
    } else {
      this.close(animate);
    }
  }

  setPosition(value) {
    if (this.position === 'left') {
      this.element.style.left = `${value}px`;
    } else if (this.position === 'right') {
      this.element.style.right = `${value}px`;
    } else if (this.position === 'top') {
      this.element.style.top = `${value}px`;
    } else if (this.position === 'bottom') {
      this.element.style.bottom = `${value}px`;
    }
  }

  animateToPosition(value) {
    const startTime = performance.now();
    const duration = 500;
    const startValue = this.getCurrentPosition();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (value - startValue) * easeOut;
      this.setPosition(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  getCurrentPosition() {
    const rect = this.element.getBoundingClientRect();
    if (this.position === 'left') {
      return rect.left;
    } else if (this.position === 'right') {
      return window.innerWidth - rect.right;
    } else if (this.position === 'top') {
      return rect.top;
    } else if (this.position === 'bottom') {
      return window.innerHeight - rect.bottom;
    }
    return 0;
  }

  setMainContentMargin(value) {
    if (this.mainContent) {
      this.mainContent.style[`margin-${this.position}`] = value;
    }
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

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  getMainContentMargin() {
    if (!this.mainContent) return 0;
    const computedStyle = window.getComputedStyle(this.mainContent);
    const marginValue = computedStyle[`margin-${this.position}`];
    return this.parseSize(marginValue);
  }

  parseSize(size) {
    if (typeof size === 'number') return size;
    if (typeof size === 'string') {
      const match = size.match(/^([\d.]+)(.*)$/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        if (unit === 'px') return value;
        if (unit === 'rem') return value * 16; // Assume 16px base font size
        if (unit === 'em') return value * 16;
      }
    }
    return 0;
  }

  createModalBackground() {
    this.modalBackground = document.createElement('div');
    this.modalBackground.id = 'sidebar-modal-background';
    this.modalBackground.dataset.sidebarTarget = this.element.id;
    this.modalBackground.style.display = 'none';
    
    document.body.appendChild(this.modalBackground);
    
    // Fade in
    this.modalBackground.style.display = 'block';
    this.modalBackground.style.opacity = '0';
    
    requestAnimationFrame(() => {
      this.modalBackground.style.transition = 'opacity 0.3s ease';
      this.modalBackground.style.opacity = '1';
    });
  }

  removeModalBackground() {
    if (this.modalBackground) {
      this.modalBackground.style.transition = 'opacity 0.3s ease';
      this.modalBackground.style.opacity = '0';
      
      setTimeout(() => {
        if (this.modalBackground && this.modalBackground.parentNode) {
          this.modalBackground.parentNode.removeChild(this.modalBackground);
          this.modalBackground = null;
        }
      }, 300);
    }
  }

  async loadContent() {
    if (!this.loadUrl) return;

    try {
      const response = await fetch(this.loadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/html',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        const content = await response.text();
        this.element.innerHTML = content;
      } else {
        console.error('Failed to load sidebar content:', response.status);
      }
    } catch (error) {
      console.error('Error loading sidebar content:', error);
    }
  }

  setState(state) {
    this.state = state;
    this.element.dataset.sidebarState = state;
  }
}

/**
 * SimpleSidebarManager Class - Manages multiple sidebar instances
 * @class SimpleSidebarManager
 */
class SimpleSidebarManager {
  constructor() {
    this.sidebars = new Map();
    this.init();
  }

  init() {
    this.initializeSidebars();
    this.initializeTriggers();
    this.initializeModalBackground();
  }

  initializeSidebars() {
    const sidebarElements = document.querySelectorAll('[data-sidebar-position]');
    
    sidebarElements.forEach(element => {
      const sidebar = new SimpleSidebar(element);
      this.sidebars.set(element.id, sidebar);
    });
  }

  initializeTriggers() {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-sidebar-trigger]');
      if (!trigger) return;

      const targetId = trigger.dataset.sidebarTrigger;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement && this.sidebars.has(targetElement.id)) {
        event.preventDefault();
        const sidebar = this.sidebars.get(targetElement.id);
        sidebar.toggle(true);
      }
    });
  }

  initializeModalBackground() {
    document.addEventListener('click', (event) => {
      if (event.target.id === 'sidebar-modal-background') {
        const targetId = event.target.dataset.sidebarTarget;
        const targetElement = document.getElementById(targetId);
        
        if (targetElement && this.sidebars.has(targetId)) {
          const sidebar = this.sidebars.get(targetId);
          sidebar.close(true);
        }
      }
    });
  }

  // Public API methods
  
  /**
   * Gets a sidebar instance by ID
   * @param {string} id - The sidebar ID
   * @returns {SimpleSidebar|undefined} The sidebar instance or undefined
   */
  getSidebar(id) {
    return this.sidebars.get(id);
  }

  /**
   * Gets all sidebar instances
   * @returns {SimpleSidebar[]} Array of all sidebar instances
   */
  getAllSidebars() {
    return Array.from(this.sidebars.values());
  }

  /**
   * Opens a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the opening
   */
  openSidebar(id, animate = true) {
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.open(animate);
    }
  }

  /**
   * Closes a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the closing
   */
  closeSidebar(id, animate = true) {
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.close(animate);
    }
  }

  /**
   * Toggles a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the transition
   */
  toggleSidebar(id, animate = true) {
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.toggle(animate);
    }
  }

  /**
   * Closes all open sidebars
   * @param {boolean} [animate=true] - Whether to animate the closing
   */
  closeAllSidebars(animate = true) {
    this.sidebars.forEach(sidebar => {
      if (sidebar.state === 'open') {
        sidebar.close(animate);
      }
    });
  }

  /**
   * Method to dynamically add new sidebars
   * @param {HTMLElement} element - The sidebar element
   * @returns {SimpleSidebar|null} The new sidebar instance or null
   */
  addSidebar(element) {
    if (!element.id) {
      console.error('Sidebar element must have an id');
      return null;
    }

    const sidebar = new SimpleSidebar(element);
    this.sidebars.set(element.id, sidebar);
    return sidebar;
  }

  /**
   * Method to remove sidebars
   * @param {string} id - The sidebar ID to remove
   */
  removeSidebar(id) {
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.close(false);
      this.sidebars.delete(id);
    }
  }
}

// Create global instance
const sidebarManager = new SimpleSidebarManager();

// Export for external use
export { SimpleSidebar, SimpleSidebarManager, sidebarManager };
export default sidebarManager;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Sidebar manager is already initialized in its constructor
    console.log('SimpleSidebar initialized');
  });
} else {
  // DOM is already ready
  console.log('SimpleSidebar initialized');
}