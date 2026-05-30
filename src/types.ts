/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  tagline: string;
  description: string;
  accentColor: string;
  themeColor: string;
}

export interface ProductItem {
  id: string;
  name: string;
  type: string;
  specs: string;
  desc: string;
  toolName: string;
  metrics: {
    accuracy: number;
    speedUp: number;
    reliability: number;
  };
}

export interface PartnerItem {
  name: string;
  logo: string;
  type: 'military' | 'testing' | 'enterprise' | 'government';
  details: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  client: string;
  status: string;
}

export interface CacheLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}
