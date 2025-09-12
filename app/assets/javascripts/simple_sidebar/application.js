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
    console.log('🔧 SimpleSidebar constructor called for:', element.id);
    this.element = element;
    this.position = element.dataset.sidebarPosition;
    this.mode = element.dataset.sidebarMode || 'overlay';
    this.size = element.dataset.sidebarSize || '300px';
    this.state = element.dataset.sidebarState || 'closed';
    this.loadUrl = element.dataset.sidebarLoad;
    
    console.log('📊 Sidebar config:', {
      id: element.id,
      position: this.position,
      mode: this.mode,
      size: this.size,
      state: this.state,
      loadUrl: this.loadUrl
    });
    
    this.mainContent = document.getElementById('main-content');
    this.modalBackground = null;
    
    this.init();
  }

  init() {
    console.log('🚀 SimpleSidebar init() called for:', this.element.id);
    
    // Start with sidebar completely hidden
    console.log('👻 Setting display: none for:', this.element.id);
    this.element.style.display = 'none';
    
    this.addCSSClasses();
    this.setSize();
    this.addInlineStyles();
    this.positionOffScreen();
    
    // Only show if it should be open initially
    if (this.state === 'open') {
      console.log('🔓 Opening sidebar immediately for:', this.element.id);
      this.open(false);
    } else {
      // Show the element but keep it positioned off-screen
      console.log('👁️ Making sidebar visible but off-screen for:', this.element.id);
      this.element.style.display = 'inherit';
      
      // Force the positioning again after making visible to override any CSS
      setTimeout(() => {
        console.log('🔄 Re-applying off-screen positioning for:', this.element.id);
        this.positionOffScreen();
      }, 0);
      
      console.log('📍 Current position after init:', {
        left: this.element.style.left,
        right: this.element.style.right,
        top: this.element.style.top,
        bottom: this.element.style.bottom,
        display: this.element.style.display
      });
    }
  }

  addCSSClasses() {
    console.log('🎨 Adding CSS classes for:', this.element.id);
    this.element.classList.add('sidebar', `sidebar-${this.position}`, `sidebar-${this.mode}`);
    console.log('✅ CSS classes added:', this.element.className);
  }

  addInlineStyles() {
    console.log('💅 Adding inline styles for:', this.element.id);
    // Add basic inline styles as fallback in case CSS isn't loading
    // Use !important to override any CSS
    this.element.style.setProperty('background-color', '#ffffff', 'important');
    this.element.style.setProperty('color', '#333333', 'important');
    this.element.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 'important');
    this.element.style.setProperty('z-index', '3000', 'important');
    this.element.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
    this.element.style.setProperty('padding', '1rem', 'important');
    this.element.style.setProperty('box-sizing', 'border-box', 'important');
    this.element.style.setProperty('position', 'fixed', 'important');
    
    // Position-specific styles
    if (this.position === 'left' || this.position === 'right') {
      this.element.style.setProperty('height', '100vh', 'important');
      this.element.style.setProperty('top', '0', 'important');
      if (this.position === 'left') {
        this.element.style.setProperty('border-right', '1px solid #e0e0e0', 'important');
      } else {
        this.element.style.setProperty('border-left', '1px solid #e0e0e0', 'important');
      }
      this.element.style.setProperty('overflow-y', 'auto', 'important');
    } else if (this.position === 'top' || this.position === 'bottom') {
      this.element.style.setProperty('width', '100vw', 'important');
      this.element.style.setProperty('left', '0', 'important');
      if (this.position === 'top') {
        this.element.style.setProperty('border-bottom', '1px solid #e0e0e0', 'important');
      } else {
        this.element.style.setProperty('border-top', '1px solid #e0e0e0', 'important');
      }
      this.element.style.setProperty('overflow-x', 'auto', 'important');
    }
    console.log('✅ Inline styles applied for:', this.element.id);
  }

  setSize() {
    console.log('📏 Setting size for:', this.element.id, 'size:', this.size);
    if (['top', 'bottom'].includes(this.position)) {
      this.element.style.setProperty('height', this.size, 'important');
      console.log('📐 Set height to:', this.size);
    } else {
      this.element.style.setProperty('width', this.size, 'important');
      console.log('📐 Set width to:', this.size);
    }
  }

  positionOffScreen() {
    console.log('📍 Positioning off-screen for:', this.element.id);
    // Use a more reliable method to position off-screen
    // Force a reflow to ensure dimensions are calculated
    this.element.offsetHeight;
    
    const rect = this.element.getBoundingClientRect();
    const width = rect.width || this.parseSize(this.size);
    const height = rect.height || this.parseSize(this.size);
    
    console.log('📊 Element dimensions:', {
      rectWidth: rect.width,
      rectHeight: rect.height,
      parsedWidth: width,
      parsedHeight: height,
      size: this.size
    });
    
    // Position off-screen with a large negative value to ensure it's hidden
    // Use setProperty with !important to override CSS
    if (this.position === 'left') {
      const leftValue = `-${width + 200}px`;
      this.element.style.setProperty('left', leftValue, 'important');
      console.log('⬅️ Positioned left sidebar at:', leftValue);
    } else if (this.position === 'right') {
      const rightValue = `-${width + 200}px`;
      this.element.style.setProperty('right', rightValue, 'important');
      console.log('➡️ Positioned right sidebar at:', rightValue);
    } else if (this.position === 'top') {
      const topValue = `-${height + 200}px`;
      this.element.style.setProperty('top', topValue, 'important');
      console.log('⬆️ Positioned top sidebar at:', topValue);
    } else if (this.position === 'bottom') {
      const bottomValue = `-${height + 200}px`;
      this.element.style.setProperty('bottom', bottomValue, 'important');
      console.log('⬇️ Positioned bottom sidebar at:', bottomValue);
    }
    
    console.log('📍 Final position after off-screen positioning:', {
      left: this.element.style.left,
      right: this.element.style.right,
      top: this.element.style.top,
      bottom: this.element.style.bottom
    });
  }

  /**
   * Opens the sidebar
   * @param {boolean} [animate=false] - Whether to animate the opening
   */
  open(animate = false) {
    console.log('🔓 Opening sidebar:', this.element.id, 'animate:', animate);
    
    // Make sure element is visible
    this.element.style.display = 'inherit';
    console.log('👁️ Set display to inherit for:', this.element.id);
    
    // Move sidebar into viewport
    if (animate) {
      console.log('🎬 Animating to position 0 for:', this.element.id);
      this.animateToPosition(0);
    } else {
      console.log('⚡ Instantly setting position to 0 for:', this.element.id);
      this.setPosition(0);
    }

    // Add margin to main content for push mode
    if (this.mode === 'push') {
      console.log('📦 Push mode: adjusting main content margin for:', this.element.id);
      if (animate) {
        this.animateMainContentMargin(this.size);
      } else {
        this.setMainContentMargin(this.size);
      }
    }

    // Add modal background if in modal mode
    if (this.mode === 'modal') {
      console.log('🖼️ Modal mode: creating background for:', this.element.id);
      this.createModalBackground();
    }

    // Load content via fetch if URL provided
    if (this.loadUrl) {
      console.log('📥 Loading content from URL for:', this.element.id, 'URL:', this.loadUrl);
      this.loadContent();
    }

    this.setState('open');
    console.log('✅ Sidebar opened:', this.element.id);
  }

  /**
   * Closes the sidebar
   * @param {boolean} [animate=false] - Whether to animate the closing
   */
  close(animate = false) {
    console.log('🔒 Closing sidebar:', this.element.id, 'animate:', animate);
    
    // Reset main content margin for push mode
    if (this.mode === 'push') {
      console.log('📦 Push mode: resetting main content margin for:', this.element.id);
      if (animate) {
        this.animateMainContentMargin('0px');
      } else {
        this.setMainContentMargin('0px');
      }
    }

    // Remove modal background
    if (this.mode === 'modal') {
      console.log('🖼️ Modal mode: removing background for:', this.element.id);
      this.removeModalBackground();
    }

    // Move sidebar off screen
    if (animate) {
      const rect = this.element.getBoundingClientRect();
      const outerWidth = rect.width;
      console.log('🎬 Animating off-screen for:', this.element.id, 'width:', outerWidth);
      this.animateToPosition(-outerWidth);
    } else {
      console.log('⚡ Instantly positioning off-screen for:', this.element.id);
      this.positionOffScreen();
    }

    this.setState('closed');
    console.log('✅ Sidebar closed:', this.element.id);
  }

  /**
   * Toggles the sidebar state
   * @param {boolean} [animate=true] - Whether to animate the transition
   */
  toggle(animate = true) {
    console.log('🔄 Toggling sidebar:', this.element.id, 'current state:', this.state, 'animate:', animate);
    if (this.state === 'closed') {
      this.open(animate);
    } else {
      this.close(animate);
    }
  }

  setPosition(value) {
    console.log('📍 Setting position for:', this.element.id, 'value:', value, 'position:', this.position);
    if (this.position === 'left') {
      this.element.style.setProperty('left', `${value}px`, 'important');
      console.log('⬅️ Set left to:', `${value}px`);
    } else if (this.position === 'right') {
      this.element.style.setProperty('right', `${value}px`, 'important');
      console.log('➡️ Set right to:', `${value}px`);
    } else if (this.position === 'top') {
      this.element.style.setProperty('top', `${value}px`, 'important');
      console.log('⬆️ Set top to:', `${value}px`);
    } else if (this.position === 'bottom') {
      this.element.style.setProperty('bottom', `${value}px`, 'important');
      console.log('⬇️ Set bottom to:', `${value}px`);
    }
  }

  animateToPosition(value) {
    console.log('🎬 Starting animation for:', this.element.id, 'to value:', value);
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
      } else {
        console.log('🎬 Animation completed for:', this.element.id);
      }
    };

    requestAnimationFrame(animate);
  }

  getCurrentPosition() {
    const rect = this.element.getBoundingClientRect();
    let position = 0;
    if (this.position === 'left') {
      position = rect.left;
    } else if (this.position === 'right') {
      position = window.innerWidth - rect.right;
    } else if (this.position === 'top') {
      position = rect.top;
    } else if (this.position === 'bottom') {
      position = window.innerHeight - rect.bottom;
    }
    console.log('📍 Current position for:', this.element.id, 'position:', position);
    return position;
  }

  setMainContentMargin(value) {
    console.log('📦 Setting main content margin for:', this.element.id, 'value:', value, 'position:', this.position);
    if (this.mainContent) {
      this.mainContent.style[`margin-${this.position}`] = value;
      console.log('✅ Set margin-', this.position, 'to:', value);
    } else {
      console.log('❌ No main content element found');
    }
  }

  animateMainContentMargin(value) {
    console.log('🎬 Animating main content margin for:', this.element.id, 'to value:', value);
    if (!this.mainContent) {
      console.log('❌ No main content element found for animation');
      return;
    }

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
      } else {
        console.log('🎬 Main content margin animation completed for:', this.element.id);
      }
    };

    requestAnimationFrame(animate);
  }

  getMainContentMargin() {
    if (!this.mainContent) {
      console.log('❌ No main content element found for margin calculation');
      return 0;
    }
    const computedStyle = window.getComputedStyle(this.mainContent);
    const marginValue = computedStyle[`margin-${this.position}`];
    const parsed = this.parseSize(marginValue);
    console.log('📊 Main content margin for:', this.element.id, 'raw:', marginValue, 'parsed:', parsed);
    return parsed;
  }

  parseSize(size) {
    console.log('🔢 Parsing size:', size);
    if (typeof size === 'number') {
      console.log('✅ Size is already a number:', size);
      return size;
    }
    if (typeof size === 'string') {
      const match = size.match(/^([\d.]+)(.*)$/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        let result = value;
        if (unit === 'px') result = value;
        else if (unit === 'rem') result = value * 16; // Assume 16px base font size
        else if (unit === 'em') result = value * 16;
        console.log('✅ Parsed size:', size, '→', result, 'px');
        return result;
      }
    }
    console.log('❌ Could not parse size:', size, 'returning 0');
    return 0;
  }

  createModalBackground() {
    console.log('🖼️ Creating modal background for:', this.element.id);
    this.modalBackground = document.createElement('div');
    this.modalBackground.id = 'sidebar-modal-background';
    this.modalBackground.dataset.sidebarTarget = this.element.id;
    this.modalBackground.style.display = 'none';
    this.modalBackground.style.position = 'fixed';
    this.modalBackground.style.zIndex = '2000';
    this.modalBackground.style.left = '0';
    this.modalBackground.style.top = '0';
    this.modalBackground.style.width = '100%';
    this.modalBackground.style.height = '100%';
    this.modalBackground.style.background = 'rgba(0, 0, 0, 0.4)';
    this.modalBackground.style.cursor = 'pointer';
    
    document.body.appendChild(this.modalBackground);
    console.log('✅ Modal background created and appended for:', this.element.id);
    
    // Fade in
    this.modalBackground.style.display = 'block';
    this.modalBackground.style.opacity = '0';
    
    requestAnimationFrame(() => {
      this.modalBackground.style.transition = 'opacity 0.3s ease';
      this.modalBackground.style.opacity = '1';
      console.log('🎬 Modal background fade-in started for:', this.element.id);
    });
  }

  removeModalBackground() {
    console.log('🗑️ Removing modal background for:', this.element.id);
    if (this.modalBackground) {
      this.modalBackground.style.transition = 'opacity 0.3s ease';
      this.modalBackground.style.opacity = '0';
      
      setTimeout(() => {
        if (this.modalBackground && this.modalBackground.parentNode) {
          this.modalBackground.parentNode.removeChild(this.modalBackground);
          this.modalBackground = null;
          console.log('✅ Modal background removed for:', this.element.id);
        }
      }, 300);
    }
  }

  async loadContent() {
    console.log('📥 Loading content for:', this.element.id, 'URL:', this.loadUrl);
    if (!this.loadUrl) {
      console.log('❌ No load URL provided for:', this.element.id);
      return;
    }

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
        console.log('✅ Content loaded successfully for:', this.element.id);
      } else {
        console.error('❌ Failed to load sidebar content for:', this.element.id, 'status:', response.status);
      }
    } catch (error) {
      console.error('❌ Error loading sidebar content for:', this.element.id, 'error:', error);
    }
  }

  setState(state) {
    console.log('🔄 Setting state for:', this.element.id, 'from:', this.state, 'to:', state);
    this.state = state;
    this.element.dataset.sidebarState = state;
    console.log('✅ State updated for:', this.element.id);
  }
}

/**
 * SimpleSidebarManager Class - Manages multiple sidebar instances
 * @class SimpleSidebarManager
 */
class SimpleSidebarManager {
  constructor() {
    console.log('🏗️ SimpleSidebarManager constructor called');
    this.sidebars = new Map();
    this.init();
  }

  init() {
    console.log('🚀 SimpleSidebarManager init() called');
    this.initializeSidebars();
    this.initializeTriggers();
    this.initializeModalBackground();
    console.log('✅ SimpleSidebarManager initialized with', this.sidebars.size, 'sidebars');
  }

  initializeSidebars() {
    console.log('🔍 Looking for sidebar elements...');
    const sidebarElements = document.querySelectorAll('[data-sidebar-position]');
    console.log('📋 Found', sidebarElements.length, 'sidebar elements:', Array.from(sidebarElements).map(el => el.id));
    
    sidebarElements.forEach(element => {
      console.log('🔧 Initializing sidebar element:', element.id);
      const sidebar = new SimpleSidebar(element);
      this.sidebars.set(element.id, sidebar);
      console.log('✅ Sidebar initialized and added to manager:', element.id);
    });
  }

  initializeTriggers() {
    console.log('🎯 Setting up trigger event listeners...');
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-sidebar-trigger]');
      if (!trigger) return;

      console.log('🖱️ Trigger clicked:', trigger, 'target:', trigger.dataset.sidebarTrigger);
      const targetId = trigger.dataset.sidebarTrigger;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement && this.sidebars.has(targetElement.id)) {
        event.preventDefault();
        const sidebar = this.sidebars.get(targetElement.id);
        console.log('✅ Found sidebar for trigger, toggling:', targetElement.id);
        sidebar.toggle(true);
      } else {
        console.log('❌ Sidebar not found for trigger:', targetId, 'available sidebars:', Array.from(this.sidebars.keys()));
      }
    });
    console.log('✅ Trigger event listeners set up');
  }

  initializeModalBackground() {
    console.log('🖼️ Setting up modal background event listeners...');
    document.addEventListener('click', (event) => {
      if (event.target.id === 'sidebar-modal-background') {
        const targetId = event.target.dataset.sidebarTarget;
        const targetElement = document.getElementById(targetId);
        
        if (targetElement && this.sidebars.has(targetId)) {
          const sidebar = this.sidebars.get(targetId);
          console.log('🖱️ Modal background clicked, closing sidebar:', targetId);
          sidebar.close(true);
        }
      }
    });
    console.log('✅ Modal background event listeners set up');
  }

  // Public API methods
  
  /**
   * Gets a sidebar instance by ID
   * @param {string} id - The sidebar ID
   * @returns {SimpleSidebar|undefined} The sidebar instance or undefined
   */
  getSidebar(id) {
    console.log('🔍 Getting sidebar:', id);
    const sidebar = this.sidebars.get(id);
    console.log('📋 Sidebar found:', !!sidebar);
    return sidebar;
  }

  /**
   * Gets all sidebar instances
   * @returns {SimpleSidebar[]} Array of all sidebar instances
   */
  getAllSidebars() {
    console.log('📋 Getting all sidebars, count:', this.sidebars.size);
    return Array.from(this.sidebars.values());
  }

  /**
   * Opens a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the opening
   */
  openSidebar(id, animate = true) {
    console.log('🔓 Opening sidebar via manager:', id, 'animate:', animate);
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.open(animate);
    } else {
      console.log('❌ Sidebar not found for opening:', id);
    }
  }

  /**
   * Closes a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the closing
   */
  closeSidebar(id, animate = true) {
    console.log('🔒 Closing sidebar via manager:', id, 'animate:', animate);
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.close(animate);
    } else {
      console.log('❌ Sidebar not found for closing:', id);
    }
  }

  /**
   * Toggles a sidebar by ID
   * @param {string} id - The sidebar ID
   * @param {boolean} [animate=true] - Whether to animate the transition
   */
  toggleSidebar(id, animate = true) {
    console.log('🔄 Toggling sidebar via manager:', id, 'animate:', animate);
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.toggle(animate);
    } else {
      console.log('❌ Sidebar not found for toggling:', id);
    }
  }

  /**
   * Closes all open sidebars
   * @param {boolean} [animate=true] - Whether to animate the closing
   */
  closeAllSidebars(animate = true) {
    console.log('🔒 Closing all sidebars via manager, animate:', animate);
    this.sidebars.forEach(sidebar => {
      if (sidebar.state === 'open') {
        console.log('🔒 Closing open sidebar:', sidebar.element.id);
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
    console.log('➕ Adding new sidebar to manager:', element.id);
    if (!element.id) {
      console.error('❌ Sidebar element must have an id');
      return null;
    }

    const sidebar = new SimpleSidebar(element);
    this.sidebars.set(element.id, sidebar);
    console.log('✅ Sidebar added to manager:', element.id);
    return sidebar;
  }

  /**
   * Method to remove sidebars
   * @param {string} id - The sidebar ID to remove
   */
  removeSidebar(id) {
    console.log('➖ Removing sidebar from manager:', id);
    const sidebar = this.sidebars.get(id);
    if (sidebar) {
      sidebar.close(false);
      this.sidebars.delete(id);
      console.log('✅ Sidebar removed from manager:', id);
    } else {
      console.log('❌ Sidebar not found for removal:', id);
    }
  }
}

// Create global instance
console.log('🌍 Creating global SimpleSidebarManager instance...');
const sidebarManager = new SimpleSidebarManager();

// Export for external use
export { SimpleSidebar, SimpleSidebarManager, sidebarManager };
export default sidebarManager;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('⏳ DOM is still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    // Sidebar manager is already initialized in its constructor
    console.log('✅ SimpleSidebar initialized on DOMContentLoaded');
  });
} else {
  // DOM is already ready
  console.log('✅ SimpleSidebar initialized immediately - DOM was already ready');
}