import { useState, useMemo } from 'react';
import { useOSStore } from '@/store/osStore';
import { getAppsByCategory } from '@/store/appRegistry';
import * as Icons from 'lucide-react';

export default function StartMenu() {
  const startMenuOpen = useOSStore(s => s.startMenuOpen);
  const openWindow = useOSStore(s => s.openWindow);
  const toggleStartMenu = useOSStore(s => s.toggleStartMenu);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => getAppsByCategory(), []);

  const filteredApps = useMemo(() => {
    if (!search) return categories;
    const filtered: Record<string, typeof categories[string]> = {};
    Object.entries(categories).forEach(([cat, apps]) => {
      const matching = apps.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase())
      );
      if (matching.length) filtered[cat] = matching;
    });
    return filtered;
  }, [search, categories]);

  if (!startMenuOpen) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9000]">
      <div className="bg-zinc-800/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl w-[720px] max-h-[600px] flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-3 border-b border-zinc-700/50">
          <div className="relative">
            <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search apps..."
              className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Categories */}
          <div className="w-44 border-r border-zinc-700/50 p-2 overflow-auto">
            <button
              onClick={() => setActiveCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${!activeCategory ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-700/50'}`}
            >
              <Icons.Grid3X3 size={16} />
              All Apps
            </button>
            {Object.keys(categories).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${activeCategory === cat ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-700/50'}`}
              >
                {cat === 'System' && <Icons.Monitor size={16} />}
                {cat === 'Blockchain' && <Icons.Coins size={16} />}
                {cat === 'Payments' && <Icons.CreditCard size={16} />}
                {cat === 'Development' && <Icons.Code size={16} />}
                {cat === 'AI' && <Icons.Brain size={16} />}
                {cat === 'Media' && <Icons.Image size={16} />}
                {cat === 'Games' && <Icons.Gamepad2 size={16} />}
                <span className="capitalize">{cat}</span>
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="flex-1 p-3 overflow-auto">
            {Object.entries(filteredApps)
              .filter(([cat]) => !activeCategory || cat === activeCategory)
              .map(([cat, apps]) => (
                <div key={cat} className="mb-4">
                  <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 px-1">{cat}</h3>
                  <div className="grid grid-cols-3 gap-1">
                    {apps.map(app => {
                      const Icon = (Icons as any)[app.icon] || Icons.AppWindow;
                      return (
                        <button
                          key={app.id}
                          onClick={() => {
                            openWindow(app.id, app.name);
                            toggleStartMenu();
                          }}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-zinc-700/60 transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-zinc-700/50 flex items-center justify-center shrink-0 group-hover:bg-zinc-600/50">
                            <Icon size={16} className="text-zinc-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm text-zinc-200 truncate">{app.name}</div>
                            <div className="text-[11px] text-zinc-500 truncate">{app.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
            <span className="text-sm text-zinc-300">user</span>
          </div>
          <button
            onClick={() => {
              toggleStartMenu();
              openWindow('settings', 'Settings');
            }}
            className="p-2 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Icons.Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
