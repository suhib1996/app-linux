export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  props?: Record<string, any>;
}

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  isSystem: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType<any>;
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileSystemNode>;
  createdAt: string;
  modifiedAt: string;
  size?: number;
  mimeType?: string;
}

export interface DesktopIcon {
  id: string;
  name: string;
  appId: string;
  x: number;
  y: number;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface SystemSettings {
  username: string;
  hostname: string;
  wallpaper: string;
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  dockPosition: 'bottom' | 'left' | 'right';
  dockSize: 'small' | 'medium' | 'large';
}

export interface WalletData {
  address: string;
  privateKey: string;
  balances: Record<string, number>;
  transactions: TransactionRecord[];
}

export interface TransactionRecord {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake' | 'unstake' | 'deploy';
  from: string;
  to: string;
  amount: string;
  token: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  hash: string;
  network: 'ethereum' | 'bsc' | 'tron';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  color: string;
}

export interface GitRepo {
  name: string;
  branches: string[];
  currentBranch: string;
  commits: GitCommit[];
  staged: string[];
  unstaged: string[];
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  timestamp: number;
  branch: string;
}

export interface ContainerInfo {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  ports: string[];
  cpu: number;
  memory: number;
}

export interface APIMetrics {
  requests: number;
  avgResponseTime: number;
  errorRate: number;
  endpoints: EndpointMetric[];
}

export interface EndpointMetric {
  path: string;
  method: string;
  calls: number;
  avgTime: number;
}

export interface NFTItem {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  tokenId: string;
  owner: string;
  attributes: Record<string, string>;
}
