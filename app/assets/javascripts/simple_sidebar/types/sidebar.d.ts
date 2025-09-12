/**
 * TypeScript definitions for SimpleSidebar
 */

export interface SidebarOptions {
  id?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  mode?: 'push' | 'overlay' | 'modal';
  size?: string;
  state?: 'open' | 'closed';
  load?: string;
}

export interface SidebarElement extends HTMLElement {
  dataset: DOMStringMap & {
    sidebarPosition?: 'left' | 'right' | 'top' | 'bottom';
    sidebarMode?: 'push' | 'overlay' | 'modal';
    sidebarSize?: string;
    sidebarState?: 'open' | 'closed';
    sidebarLoad?: string;
  };
}

export interface TriggerElement extends HTMLElement {
  dataset: DOMStringMap & {
    sidebarTrigger?: string;
  };
}

export interface SimpleSidebarInstance {
  element: SidebarElement;
  position: 'left' | 'right' | 'top' | 'bottom';
  mode: 'push' | 'overlay' | 'modal';
  size: string;
  state: 'open' | 'closed';
  loadUrl?: string;
  mainContent: HTMLElement | null;
  modalBackground: HTMLElement | null;

  init(): void;
  open(animate?: boolean): void;
  close(animate?: boolean): void;
  toggle(animate?: boolean): void;
  setState(state: 'open' | 'closed'): void;
  loadContent(): Promise<void>;
}

export interface SimpleSidebarManagerInstance {
  sidebars: Map<string, SimpleSidebarInstance>;

  init(): void;
  getSidebar(id: string): SimpleSidebarInstance | undefined;
  getAllSidebars(): SimpleSidebarInstance[];
  openSidebar(id: string, animate?: boolean): void;
  closeSidebar(id: string, animate?: boolean): void;
  toggleSidebar(id: string, animate?: boolean): void;
  closeAllSidebars(animate?: boolean): void;
  addSidebar(element: SidebarElement): SimpleSidebarInstance | null;
  removeSidebar(id: string): void;
}

export interface SimpleSidebarManagerConstructor {
  new (): SimpleSidebarManagerInstance;
}

// Global declarations
declare global {
  interface Window {
    SimpleSidebar: {
      Manager: SimpleSidebarManagerConstructor;
      sidebarManager: SimpleSidebarManagerInstance;
    };
  }
}

export default SimpleSidebarManagerInstance;
