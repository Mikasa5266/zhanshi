import React from 'react';
import { SlideLayoutProps } from './SlideLayout';
import CompanyIntroLayout from './CompanyIntroLayout';
import AITestGenLayout from './AITestGenLayout';
import WebRunnerLayout from './WebRunnerLayout';
import DBBenchmarkLayout from './DBBenchmarkLayout';
import MilitaryDataLayout from './MilitaryDataLayout';
import DBBackupLayout from './DBBackupLayout';
import AgentRunnerLayout from './AgentRunnerLayout';
import PartnersLayout from './PartnersLayout';

export const SLIDE_LAYOUTS: React.ComponentType<SlideLayoutProps>[] = [
  CompanyIntroLayout,
  AITestGenLayout,
  WebRunnerLayout,
  DBBenchmarkLayout,
  MilitaryDataLayout,
  DBBackupLayout,
  AgentRunnerLayout,
  PartnersLayout,
];
