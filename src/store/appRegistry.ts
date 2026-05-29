import { lazy } from 'react';
import type { AppDefinition } from '@/types';

const makeLazy = (path: string) => lazy(() => import(`@/apps/${path}`));

export const appRegistry: Record<string, AppDefinition> = {
  // ===== CORE SYSTEM APPS =====
  files: {
    id: 'files',
    name: 'File Manager',
    description: 'Browse and manage files',
    category: 'System',
    icon: 'FolderOpen',
    defaultWidth: 900,
    defaultHeight: 600,
    isSystem: true,
    component: makeLazy('Files')
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Command-line interface',
    category: 'System',
    icon: 'Terminal',
    defaultWidth: 800,
    defaultHeight: 500,
    isSystem: true,
    component: makeLazy('Terminal')
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    description: 'System settings',
    category: 'System',
    icon: 'Settings',
    defaultWidth: 700,
    defaultHeight: 550,
    isSystem: true,
    component: makeLazy('Settings')
  },
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    description: 'Scientific calculator',
    category: 'System',
    icon: 'Calculator',
    defaultWidth: 360,
    defaultHeight: 520,
    isSystem: false,
    component: makeLazy('Calculator')
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
    description: 'Calendar and events',
    category: 'System',
    icon: 'Calendar',
    defaultWidth: 800,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('Calendar')
  },
  monitor: {
    id: 'monitor',
    name: 'System Monitor',
    description: 'Monitor system resources',
    category: 'System',
    icon: 'Activity',
    defaultWidth: 800,
    defaultHeight: 500,
    isSystem: false,
    component: makeLazy('Monitor')
  },
  textedit: {
    id: 'textedit',
    name: 'Text Editor',
    description: 'Simple text editor',
    category: 'System',
    icon: 'FileText',
    defaultWidth: 600,
    defaultHeight: 500,
    isSystem: false,
    component: makeLazy('TextEdit')
  },

  // ===== BLOCKCHAIN APPS =====
  wallet: {
    id: 'wallet',
    name: 'Crypto Wallet',
    description: 'Manage crypto assets',
    category: 'Blockchain',
    icon: 'Wallet',
    defaultWidth: 480,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('Wallet')
  },
  dex: {
    id: 'dex',
    name: 'DEX Exchange',
    description: 'Decentralized exchange',
    category: 'Blockchain',
    icon: 'ArrowLeftRight',
    defaultWidth: 500,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('DEX')
  },
  'contract-ide': {
    id: 'contract-ide',
    name: 'Contract IDE',
    description: 'Smart contract IDE for Solidity',
    category: 'Blockchain',
    icon: 'Code2',
    defaultWidth: 1000,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('ContractIDE')
  },
  'contract-mgr': {
    id: 'contract-mgr',
    name: 'Contract Manager',
    description: 'Manage deployed contracts',
    category: 'Blockchain',
    icon: 'FileCode',
    defaultWidth: 900,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('ContractManager')
  },
  'nft-studio': {
    id: 'nft-studio',
    name: 'NFT Studio',
    description: 'Create and manage NFTs',
    category: 'Blockchain',
    icon: 'Image',
    defaultWidth: 900,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('NFTStudio')
  },
  bridge: {
    id: 'bridge',
    name: 'Bridge',
    description: 'Cross-chain bridge',
    category: 'Blockchain',
    icon: 'GitMerge',
    defaultWidth: 600,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('Bridge')
  },
  staking: {
    id: 'staking',
    name: 'Staking',
    description: 'Stake tokens and earn rewards',
    category: 'Blockchain',
    icon: 'TrendingUp',
    defaultWidth: 700,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('Staking')
  },
  'tx-history': {
    id: 'tx-history',
    name: 'Transaction History',
    description: 'View all transactions',
    category: 'Blockchain',
    icon: 'History',
    defaultWidth: 900,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('TxHistory')
  },
  'token-deploy': {
    id: 'token-deploy',
    name: 'Token Deployer',
    description: 'Deploy ERC-20/BEP-20 tokens',
    category: 'Blockchain',
    icon: 'Coins',
    defaultWidth: 650,
    defaultHeight: 750,
    isSystem: false,
    component: makeLazy('TokenDeployer')
  },
  explorer: {
    id: 'explorer',
    name: 'Block Explorer',
    description: 'Explore blockchain data',
    category: 'Blockchain',
    icon: 'Search',
    defaultWidth: 1000,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('Explorer')
  },
  'sign-tool': {
    id: 'sign-tool',
    name: 'Signature Tool',
    description: 'Sign and verify messages',
    category: 'Blockchain',
    icon: 'PenTool',
    defaultWidth: 550,
    defaultHeight: 500,
    isSystem: false,
    component: makeLazy('SignTool')
  },
  'tron-station': {
    id: 'tron-station',
    name: 'Tron Station',
    description: 'Tron network tools',
    category: 'Blockchain',
    icon: 'Zap',
    defaultWidth: 800,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('TronStation')
  },
  'bsc-hub': {
    id: 'bsc-hub',
    name: 'BSC Hub',
    description: 'BSC network tools',
    category: 'Blockchain',
    icon: 'Hexagon',
    defaultWidth: 800,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('BSCHub')
  },
  'liquidity-pool': {
    id: 'liquidity-pool',
    name: 'Liquidity Pool',
    description: 'Manage liquidity pools',
    category: 'Blockchain',
    icon: 'Droplets',
    defaultWidth: 700,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('LiquidityPool')
  },
  'yield-farm': {
    id: 'yield-farm',
    name: 'Yield Farm',
    description: 'Yield farming optimizer',
    category: 'Blockchain',
    icon: 'Sprout',
    defaultWidth: 800,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('YieldFarm')
  },
  'launchpad': {
    id: 'launchpad',
    name: 'Launchpad',
    description: 'Token launch platform',
    category: 'Blockchain',
    icon: 'Rocket',
    defaultWidth: 750,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('Launchpad')
  },

  // ===== PAYMENT APPS =====
  'card-pay': {
    id: 'card-pay',
    name: 'CardPay',
    description: 'Process card payments',
    category: 'Payments',
    icon: 'CreditCard',
    defaultWidth: 550,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('CardPay')
  },
  invoicer: {
    id: 'invoicer',
    name: 'Invoicer',
    description: 'Create and manage invoices',
    category: 'Payments',
    icon: 'Receipt',
    defaultWidth: 800,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('Invoicer')
  },
  'pay-link': {
    id: 'pay-link',
    name: 'Payment Links',
    description: 'Create payment links',
    category: 'Payments',
    icon: 'Link',
    defaultWidth: 650,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('PaymentLinks')
  },
  'sub-manager': {
    id: 'sub-manager',
    name: 'Subscriptions',
    description: 'Manage subscriptions',
    category: 'Payments',
    icon: 'Repeat',
    defaultWidth: 800,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('SubManager')
  },
  'pos-terminal': {
    id: 'pos-terminal',
    name: 'POS Terminal',
    description: 'Point of sale terminal',
    category: 'Payments',
    icon: 'ShoppingCart',
    defaultWidth: 500,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('POSTerminal')
  },
  'pay-analytics': {
    id: 'pay-analytics',
    name: 'Payment Analytics',
    description: 'Payment insights and reports',
    category: 'Payments',
    icon: 'BarChart3',
    defaultWidth: 950,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('PayAnalytics')
  },
  'crypto-pay': {
    id: 'crypto-pay',
    name: 'CryptoPay',
    description: 'Crypto payment processor',
    category: 'Payments',
    icon: 'Bitcoin',
    defaultWidth: 600,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('CryptoPay')
  },
  'pay-gateway': {
    id: 'pay-gateway',
    name: 'Payment Gateway',
    description: 'Multi-channel payment gateway',
    category: 'Payments',
    icon: 'Network',
    defaultWidth: 850,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('PayGateway')
  },

  // ===== DEVELOPMENT APPS =====
  vscode: {
    id: 'vscode',
    name: 'VS Code',
    description: 'Code editor',
    category: 'Development',
    icon: 'Code',
    defaultWidth: 1100,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('VSCode')
  },
  git: {
    id: 'git',
    name: 'Git Client',
    description: 'Git version control',
    category: 'Development',
    icon: 'GitBranch',
    defaultWidth: 950,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('GitClient')
  },
  'api-tester': {
    id: 'api-tester',
    name: 'API Tester',
    description: 'Test API endpoints',
    category: 'Development',
    icon: 'Send',
    defaultWidth: 900,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('APITester')
  },
  'db-manager': {
    id: 'db-manager',
    name: 'DB Manager',
    description: 'Database management',
    category: 'Development',
    icon: 'Database',
    defaultWidth: 900,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('DBManager')
  },
  docker: {
    id: 'docker',
    name: 'Docker Desktop',
    description: 'Container management',
    category: 'Development',
    icon: 'Container',
    defaultWidth: 900,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('DockerDesktop')
  },
  'devserver': {
    id: 'devserver',
    name: 'DevServer',
    description: 'Local dev server',
    category: 'Development',
    icon: 'Server',
    defaultWidth: 700,
    defaultHeight: 500,
    isSystem: false,
    component: makeLazy('DevServer')
  },
  'npm-gui': {
    id: 'npm-gui',
    name: 'Package Manager',
    description: 'NPM package manager',
    category: 'Development',
    icon: 'Package',
    defaultWidth: 800,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('NPMGUI')
  },
  'mobile-dev': {
    id: 'mobile-dev',
    name: 'Mobile Dev',
    description: 'Mobile app simulator',
    category: 'Development',
    icon: 'Smartphone',
    defaultWidth: 450,
    defaultHeight: 850,
    isSystem: false,
    component: makeLazy('MobileDev')
  },
  'lowcode': {
    id: 'lowcode',
    name: 'Low-Code Builder',
    description: 'Visual app builder',
    category: 'Development',
    icon: 'Layout',
    defaultWidth: 1100,
    defaultHeight: 750,
    isSystem: false,
    component: makeLazy('LowCodeBuilder')
  },
  'http-server': {
    id: 'http-server',
    name: 'HTTP Server',
    description: 'File server with logs',
    category: 'Development',
    icon: 'Globe',
    defaultWidth: 800,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('HTTPServer')
  },

  // ===== AI APPS =====
  'ai-chat': {
    id: 'ai-chat',
    name: 'AI Chat',
    description: 'Chat with AI assistant',
    category: 'AI',
    icon: 'MessageSquare',
    defaultWidth: 500,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('AIChat')
  },
  'ai-code': {
    id: 'ai-code',
    name: 'AI Code Assistant',
    description: 'AI-powered coding help',
    category: 'AI',
    icon: 'Bot',
    defaultWidth: 600,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('AICode')
  },
  'ai-image': {
    id: 'ai-image',
    name: 'AI Image Gen',
    description: 'Generate images with AI',
    category: 'AI',
    icon: 'Sparkles',
    defaultWidth: 700,
    defaultHeight: 750,
    isSystem: false,
    component: makeLazy('AIImage')
  },
  'ai-speech': {
    id: 'ai-speech',
    name: 'AI Speech',
    description: 'Text to speech',
    category: 'AI',
    icon: 'Mic',
    defaultWidth: 600,
    defaultHeight: 500,
    isSystem: false,
    component: makeLazy('AISpeech')
  },
  'agent-builder': {
    id: 'agent-builder',
    name: 'Agent Builder',
    description: 'Build AI agent workflows',
    category: 'AI',
    icon: 'Workflow',
    defaultWidth: 1100,
    defaultHeight: 750,
    isSystem: false,
    component: makeLazy('AgentBuilder')
  },
  'model-lab': {
    id: 'model-lab',
    name: 'Model Lab',
    description: 'Train and fine-tune models',
    category: 'AI',
    icon: 'FlaskConical',
    defaultWidth: 900,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('ModelLab')
  },
  'prompt-studio': {
    id: 'prompt-studio',
    name: 'Prompt Studio',
    description: 'Manage and test prompts',
    category: 'AI',
    icon: 'Pencil',
    defaultWidth: 850,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('PromptStudio')
  },
  'ai-vision': {
    id: 'ai-vision',
    name: 'AI Vision',
    description: 'Image analysis with AI',
    category: 'AI',
    icon: 'Eye',
    defaultWidth: 700,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('AIVision')
  },
  'voice-chat': {
    id: 'voice-chat',
    name: 'Voice Chat',
    description: 'Voice AI conversation',
    category: 'AI',
    icon: 'Headphones',
    defaultWidth: 500,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('VoiceChat')
  },
  copilot: {
    id: 'copilot',
    name: 'Copilot',
    description: 'OS AI assistant',
    category: 'AI',
    icon: 'Ghost',
    defaultWidth: 400,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('Copilot')
  },

  // ===== MEDIA APPS =====
  paint: {
    id: 'paint',
    name: 'Paint',
    description: 'Drawing application',
    category: 'Media',
    icon: 'Brush',
    defaultWidth: 850,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('Paint')
  },
  browser: {
    id: 'browser',
    name: 'Browser',
    description: 'Web browser',
    category: 'Media',
    icon: 'Globe',
    defaultWidth: 1000,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('Browser')
  },
  mail: {
    id: 'mail',
    name: 'Mail',
    description: 'Email client',
    category: 'Media',
    icon: 'Mail',
    defaultWidth: 1000,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('Mail')
  },
  music: {
    id: 'music',
    name: 'Music Player',
    description: 'Play audio files',
    category: 'Media',
    icon: 'Music',
    defaultWidth: 450,
    defaultHeight: 700,
    isSystem: false,
    component: makeLazy('Music')
  },

  // ===== GAMES =====
  chess: {
    id: 'chess',
    name: 'Chess',
    description: 'Chess game',
    category: 'Games',
    icon: 'Crown',
    defaultWidth: 600,
    defaultHeight: 650,
    isSystem: false,
    component: makeLazy('Chess')
  },
  'game-2048': {
    id: 'game-2048',
    name: '2048',
    description: '2048 puzzle game',
    category: 'Games',
    icon: 'Grid3X3',
    defaultWidth: 420,
    defaultHeight: 600,
    isSystem: false,
    component: makeLazy('Game2048')
  }
};

export const getAppsByCategory = () => {
  const categories: Record<string, AppDefinition[]> = {};
  Object.values(appRegistry).forEach(app => {
    if (!categories[app.category]) categories[app.category] = [];
    categories[app.category].push(app);
  });
  return categories;
};

export const getAppById = (id: string): AppDefinition | undefined => appRegistry[id];

export const getAllApps = (): AppDefinition[] => Object.values(appRegistry);
