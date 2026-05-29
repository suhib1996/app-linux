import { useState, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';
import { appRegistry } from '@/store/appRegistry';
import * as Icons from 'lucide-react';

export default function Taskbar() {
  const windows = useOSStore(s => s.windows);
  const activeWindowId = useOSStore(s => s.activeWindowId);
  const pinnedApps = useOSStore(s => s.pinnedApps);
  const toggleStartMenu = useOSStore(s => s.toggleStartMenu);
  const startMenuOpen = useOSStore(s => s.startMenuOpen);
  const openWindow = useOSStore(s => s.openWindow);
  const restoreWindow = useOSStore(s => s.restoreWindow);
  const minimizeWindow = useOSStore(s => s.minimizeWindow);
  const focusWindow = useOSStore(s => s.focusWindow);
  const [clock, setClock] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifications = useOSStore(s => s.notifications);
  const clearNotifications = useOSStore(s => s.clearNotifications);

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (appId: string) => {
    const existing = windows.find(w => w.appId === appId && !w.isMinimized);
    if (existing) {
      if (activeWindowId === existing.id) {
        minimizeWindow(existing.id);
      } else {
        focusWindow(existing.id);
      }
    } else {
      const minimized = windows.find(w => w.appId === appId && w.isMinimized);
      if (minimized) {
        restoreWindow(minimized.id);
      } else {
        const app = appRegistry[appId];
        if (app) openWindow(appId, app.name);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-700/30 z-[9998] flex items-center px-2 gap-1">
      {/* Start Button */}
      <button
        onClick={toggleStartMenu}
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${startMenuOpen ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-zinc-800 text-zinc-300'}`}
      >
        <Icons.Terminal size={20} />
      </button>

      <div className="w-px h-6 bg-zinc-700/50 mx-1" />

      {/* Pinned Apps */}
      {pinnedApps.map(appId => {
        const app = appRegistry[appId];
        if (!app) return null;
        const Icon = (Icons as any)[app.icon] || Icons.AppWindow;
        const hasWindow = windows.some(w => w.appId === appId);
        const isActive = windows.some(w => w.appId === appId && w.id === activeWindowId && !w.isMinimized);
        return (
          <button
            key={appId}
            onClick={() => handleAppClick(appId)}
            className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-zinc-700/60 text-blue-400' : 'hover:bg-zinc-800 text-zinc-400'}`}
          >
            <Icon size={20} />
            {hasWindow && (
              <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full ${isActive ? 'w-5 bg-blue-400' : 'w-1.5 bg-zinc-500'}`} />
            )}
          </button>
        );
      })}

      <div className="w-px h-6 bg-zinc-700/50 mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-0.5 overflow-hidden">
        {windows.filter(w => !w.isMinimized).map(win => {
          const app = appRegistry[win.appId];
          const Icon = app ? (Icons as any)[app.icon] || Icons.AppWindow : Icons.AppWindow;
          const isActive = win.id === activeWindowId;
          return (
            <button
              key={win.id}
              onClick={() => handleAppClick(win.appId)}
              className={`h-10 px-3 rounded-xl flex items-center gap-2 transition-all max-w-48 ${isActive ? 'bg-zinc-700/60 text-blue-400' : 'hover:bg-zinc-800 text-zinc-400'}`}
            >
              <Icon size={16} />
              <span className="text-xs truncate">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
        >
          <Icons.Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors">
          <Icons.Volume2 size={16} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors">
          <Icons.Wifi size={16} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors">
          <Icons.BatteryMedium size={16} />
        </button>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="h-9 px-3 rounded-xl hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
        >
          {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </button>
      </div>

      {/* Calendar Flyout */}
      {showCalendar && (
        <div className="fixed bottom-14 right-4 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl p-4 z-[9999] w-72">
          <div className="text-lg font-semibold text-zinc-200 mb-3">
            {clock.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <MiniCalendar />
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifs && (
        <div className="fixed bottom-14 right-20 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl z-[9999] w-80 max-h-96 overflow-auto">
          <div className="p-3 border-b border-zinc-700 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-200">Notifications</span>
            <button
              onClick={() => clearNotifications()}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Clear all
            </button>
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-sm">No notifications</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-3 border-b border-zinc-700/50 ${!n.read ? 'bg-blue-500/5' : ''}`}>
                <div className="text-sm text-zinc-200 font-medium">{n.title}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{n.message}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-zinc-500 font-medium">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d, i) => (
          <div
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              d === today.getDate() ? 'bg-blue-500 text-white' : d ? 'text-zinc-300 hover:bg-zinc-700' : ''
            }`}
          >
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
