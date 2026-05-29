import { create } from 'zustand';
import type { FileSystemNode } from '@/types';

const createDefaultFS = (): FileSystemNode => ({
  name: '/',
  type: 'directory',
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  children: {
    'home': {
      name: 'home',
      type: 'directory',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      children: {
        'user': {
          name: 'user',
          type: 'directory',
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          children: {
            'Desktop': {
              name: 'Desktop',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {
                'Welcome.txt': {
                  name: 'Welcome.txt',
                  type: 'file',
                  content: 'Welcome to NexusOS!\n\nThis is a fully functional web-based operating system with 50+ applications.\n\nExplore the blockchain tools, AI agents, development environment, and more.\n\nDouble-click apps from the Start Menu to launch them.',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  size: 256,
                  mimeType: 'text/plain'
                }
              }
            },
            'Documents': {
              name: 'Documents',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {}
            },
            'Downloads': {
              name: 'Downloads',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {}
            },
            'Projects': {
              name: 'Projects',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {
                'hello-world.sol': {
                  name: 'hello-world.sol',
                  type: 'file',
                  content: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\n\ncontract HelloWorld {\n    string public message = "Hello, NexusOS!";\n    \n    function setMessage(string memory _message) public {\n        message = _message;\n    }\n    \n    function getMessage() public view returns (string memory) {\n        return message;\n    }\n}',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  size: 312,
                  mimeType: 'text/x-solidity'
                },
                'token.sol': {
                  name: 'token.sol',
                  type: 'file',
                  content: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\n\ncontract MyToken is ERC20 {\n    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {\n        _mint(msg.sender, initialSupply);\n    }\n}',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  size: 278,
                  mimeType: 'text/x-solidity'
                }
              }
            },
            'Media': {
              name: 'Media',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {
                'Music': {
                  name: 'Music',
                  type: 'directory',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  children: {}
                },
                'Videos': {
                  name: 'Videos',
                  type: 'directory',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  children: {}
                },
                'Pictures': {
                  name: 'Pictures',
                  type: 'directory',
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  children: {}
                }
              }
            },
            '.config': {
              name: '.config',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {
                'settings.json': {
                  name: 'settings.json',
                  type: 'file',
                  content: JSON.stringify({
                    username: 'user',
                    hostname: 'nexus-os',
                    wallpaper: '/wallpapers/default.jpg',
                    theme: 'dark',
                    soundEnabled: true,
                    notificationsEnabled: true,
                    dockPosition: 'bottom',
                    dockSize: 'medium'
                  }, null, 2),
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  size: 256,
                  mimeType: 'application/json'
                }
              }
            },
            '.wallet': {
              name: '.wallet',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {
                'wallet.json': {
                  name: 'wallet.json',
                  type: 'file',
                  content: JSON.stringify({
                    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
                    privateKey: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                    balances: {
                      ETH: 12.456,
                      USDT: 5000.00,
                      BNB: 45.23,
                      TRX: 10000.00,
                      USDC: 2500.00,
                      BUSD: 1800.00
                    },
                    transactions: []
                  }, null, 2),
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                  size: 512,
                  mimeType: 'application/json'
                }
              }
            },
            '.trash': {
              name: '.trash',
              type: 'directory',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              children: {}
            }
          }
        }
      }
    },
    'etc': {
      name: 'etc',
      type: 'directory',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      children: {
        'hosts': {
          name: 'hosts',
          type: 'file',
          content: '127.0.0.1 localhost\n127.0.0.1 nexus.local',
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          size: 48,
          mimeType: 'text/plain'
        }
      }
    },
    'var': {
      name: 'var',
      type: 'directory',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      children: {
        'log': {
          name: 'log',
          type: 'directory',
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          children: {
            'syslog': {
              name: 'syslog',
              type: 'file',
              content: '',
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
              size: 0,
              mimeType: 'text/plain'
            }
          }
        }
      }
    }
  }
});

interface FileSystemState {
  root: FileSystemNode;
  currentPath: string;
  
  navigateTo: (path: string) => void;
  readFile: (path: string) => string | null;
  writeFile: (path: string, content: string) => boolean;
  mkdir: (path: string) => boolean;
  readdir: (path: string) => FileSystemNode[] | null;
  rm: (path: string) => boolean;
  exists: (path: string) => boolean;
  getNode: (path: string) => FileSystemNode | null;
  getParentAndName: (path: string) => { parent: FileSystemNode; name: string } | null;
}

const pathToParts = (path: string): string[] => {
  if (path === '/') return [];
  return path.split('/').filter(Boolean);
};

const getNodeAtPath = (root: FileSystemNode, path: string): FileSystemNode | null => {
  if (path === '/') return root;
  const parts = pathToParts(path);
  let current = root;
  for (const part of parts) {
    if (!current.children || !current.children[part]) return null;
    current = current.children[part];
  }
  return current;
};

export const useFileSystem = create<FileSystemState>((set, get) => ({
  root: createDefaultFS(),
  currentPath: '/home/user',

  navigateTo: (path: string) => set({ currentPath: path }),

  readFile: (path: string) => {
    const node = getNodeAtPath(get().root, path);
    return node?.type === 'file' ? node.content || '' : null;
  },

  writeFile: (path: string, content: string) => {
    const state = get();
    const lastSlash = path.lastIndexOf('/');
    const dirPath = path.substring(0, lastSlash) || '/';
    const fileName = path.substring(lastSlash + 1);
    
    const parent = getNodeAtPath(state.root, dirPath);
    if (!parent || parent.type !== 'directory') return false;
    
    const newRoot = { ...state.root };
    const targetParent = getNodeAtPath(newRoot, dirPath)!;
    
    if (!targetParent.children) targetParent.children = {};
    
    if (targetParent.children[fileName]) {
      targetParent.children[fileName] = {
        ...targetParent.children[fileName],
        content,
        modifiedAt: new Date().toISOString(),
        size: new Blob([content]).size
      };
    } else {
      targetParent.children[fileName] = {
        name: fileName,
        type: 'file',
        content,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        size: new Blob([content]).size,
        mimeType: 'text/plain'
      };
    }
    
    set({ root: newRoot });
    return true;
  },

  mkdir: (path: string) => {
    const state = get();
    const lastSlash = path.lastIndexOf('/');
    const dirPath = path.substring(0, lastSlash) || '/';
    const dirName = path.substring(lastSlash + 1);
    
    const parent = getNodeAtPath(state.root, dirPath);
    if (!parent || parent.type !== 'directory') return false;
    
    const newRoot = { ...state.root };
    const targetParent = getNodeAtPath(newRoot, dirPath)!;
    
    if (!targetParent.children) targetParent.children = {};
    if (targetParent.children[dirName]) return false;
    
    targetParent.children[dirName] = {
      name: dirName,
      type: 'directory',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      children: {}
    };
    
    set({ root: newRoot });
    return true;
  },

  readdir: (path: string) => {
    const node = getNodeAtPath(get().root, path);
    if (!node || node.type !== 'directory' || !node.children) return null;
    return Object.values(node.children);
  },

  rm: (path: string) => {
    const state = get();
    const lastSlash = path.lastIndexOf('/');
    const dirPath = path.substring(0, lastSlash) || '/';
    const name = path.substring(lastSlash + 1);
    
    const parent = getNodeAtPath(state.root, dirPath);
    if (!parent || parent.type !== 'directory' || !parent.children?.[name]) return false;
    
    const newRoot = { ...state.root };
    const targetParent = getNodeAtPath(newRoot, dirPath)!;
    if (targetParent.children) {
      const { [name]: _, ...rest } = targetParent.children;
      targetParent.children = rest;
    }
    
    set({ root: newRoot });
    return true;
  },

  exists: (path: string) => {
    return getNodeAtPath(get().root, path) !== null;
  },

  getNode: (path: string) => {
    return getNodeAtPath(get().root, path);
  },

  getParentAndName: (path: string) => {
    const lastSlash = path.lastIndexOf('/');
    const dirPath = path.substring(0, lastSlash) || '/';
    const name = path.substring(lastSlash + 1);
    const parent = getNodeAtPath(get().root, dirPath);
    return parent ? { parent, name } : null;
  }
}));
