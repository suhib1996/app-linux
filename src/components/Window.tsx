import { useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { useOSStore } from '@/store/osStore';
import type { WindowState } from '@/types';
import * as Icons from 'lucide-react';
import { appRegistry } from '@/store/appRegistry';

interface WindowProps {
  window: WindowState;
}

export default function Window({ window: win }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize, restoreWindow } = useOSStore();
  const rndRef = useRef<Rnd>(null);
  const app = appRegistry[win.appId];

  const handleFocus = useCallback(() => {
    focusWindow(win.id);
  }, [win.id, focusWindow]);

  if (win.isMinimized) return null;

  const isMax = win.isMaximized;
  const IconComponent = app ? (Icons as any)[app.icon] || Icons.AppWindow : Icons.AppWindow;

  return (
    <Rnd
      ref={rndRef}
      position={{ x: isMax ? 0 : win.x, y: isMax ? 0 : win.y }}
      size={{ width: isMax ? '100%' as any : win.width, height: isMax ? 'calc(100vh - 48px)' as any : win.height }}
      minWidth={300}
      minHeight={200}
      maxWidth="100%"
      maxHeight="calc(100vh - 48px)"
      dragHandleClassName="window-title-bar"
      onDragStop={(e, d) => {
        if (!isMax) updateWindowPosition(win.id, d.x, d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(win.id, parseInt(ref.style.width), parseInt(ref.style.height));
        updateWindowPosition(win.id, position.x, position.y);
      }}
      onMouseDown={handleFocus}
      style={{ zIndex: win.zIndex }}
      className="window-rnd"
      enableResizing={!isMax}
      disableDragging={isMax}
    >
      <div className={`flex flex-col h-full rounded-lg overflow-hidden border ${useOSStore.getState().activeWindowId === win.id ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-zinc-700/50'} bg-zinc-900`}>
        {/* Title Bar */}
        <div className="window-title-bar flex items-center justify-between h-9 px-3 bg-zinc-800/90 select-none cursor-default">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <IconComponent size={14} className="text-zinc-400 shrink-0" />
            <span className="text-xs text-zinc-300 truncate">{win.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => minimizeWindow(win.id)}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Icons.Minus size={12} />
            </button>
            <button
              onClick={() => isMax ? restoreWindow(win.id) : maximizeWindow(win.id)}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {isMax ? <Icons.Copy size={10} /> : <Icons.Maximize2 size={10} />}
            </button>
            <button
              onClick={() => closeWindow(win.id)}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors"
            >
              <Icons.X size={12} />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-hidden">
          <WindowContent win={win} />
        </div>
      </div>
    </Rnd>
  );
}

function WindowContent({ win }: { win: WindowState }) {
  const app = appRegistry[win.appId];
  if (!app) return <div className="p-4 text-zinc-500">Unknown app: {win.appId}</div>;

  const Component = app.component;
  return (
    <div className="w-full h-full overflow-auto">
      <Component windowId={win.id} {...win.props} />
    </div>
  );
}
