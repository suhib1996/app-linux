import { create } from 'zustand';
import type { WindowState, Notification, SystemSettings } from '@/types';

let zIndexCounter = 100;

interface OSState {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  notifications: Notification[];
  settings: SystemSettings;
  bootComplete: boolean;
  installedApps: string[];
  pinnedApps: string[];
  
  openWindow: (appId: string, title?: string, props?: Record<string, any>) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  toggleStartMenu: () => void;
  setStartMenuOpen: (open: boolean) => void;
  addNotification: (notification: { title: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; read?: boolean }) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  updateSettings: (settings: Partial<SystemSettings>) => void;
  setBootComplete: () => void;
  installApp: (appId: string) => void;
  uninstallApp: (appId: string) => void;
  pinApp: (appId: string) => void;
  unpinApp: (appId: string) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  startMenuOpen: false,
  notifications: [],
  settings: {
    username: 'user',
    hostname: 'nexus-os',
    wallpaper: '/wallpapers/default.jpg',
    theme: 'dark',
    soundEnabled: true,
    notificationsEnabled: true,
    dockPosition: 'bottom',
    dockSize: 'medium'
  },
  bootComplete: false,
  installedApps: [],
  pinnedApps: ['terminal', 'files', 'vscode', 'browser', 'settings'],

  openWindow: (appId: string, title?: string, props?: Record<string, any>) => {
    const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newWindow: WindowState = {
      id,
      appId,
      title: title || appId,
      x: 50 + (get().windows.length * 30) % 200,
      y: 50 + (get().windows.length * 30) % 150,
      width: 900,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: ++zIndexCounter,
      props
    };
    set(state => ({
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      startMenuOpen: false
    }));
    return id;
  },

  closeWindow: (id: string) => {
    set(state => {
      const filtered = state.windows.filter(w => w.id !== id);
      return {
        windows: filtered,
        activeWindowId: filtered.length > 0 ? filtered[filtered.length - 1].id : null
      };
    });
  },

  minimizeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      )
    }));
  },

  maximizeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: true } : w
      )
    }));
  },

  restoreWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w
      ),
      activeWindowId: id
    }));
  },

  focusWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: ++zIndexCounter, isMinimized: false } : w
      ),
      activeWindowId: id
    }));
  },

  updateWindowPosition: (id: string, x: number, y: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      )
    }));
  },

  updateWindowSize: (id: string, width: number, height: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, width, height } : w
      )
    }));
  },

  toggleStartMenu: () => {
    set(state => ({ startMenuOpen: !state.startMenuOpen }));
  },

  setStartMenuOpen: (open: boolean) => {
    set({ startMenuOpen: open });
  },

  addNotification: (notification) => {
    const notif: Notification = {
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: false,
      id: `notif-${Date.now()}`,
      timestamp: Date.now()
    };
    set(state => ({
      notifications: [notif, ...state.notifications].slice(0, 50)
    }));
  },

  markNotificationRead: (id: string) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  updateSettings: (newSettings) => {
    set(state => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  setBootComplete: () => {
    set({ bootComplete: true });
  },

  installApp: (appId: string) => {
    set(state => ({
      installedApps: [...state.installedApps, appId]
    }));
  },

  uninstallApp: (appId: string) => {
    set(state => ({
      installedApps: state.installedApps.filter(id => id !== appId)
    }));
  },

  pinApp: (appId: string) => {
    set(state => ({
      pinnedApps: [...state.pinnedApps, appId]
    }));
  },

  unpinApp: (appId: string) => {
    set(state => ({
      pinnedApps: state.pinnedApps.filter(id => id !== appId)
    }));
  }
}));
