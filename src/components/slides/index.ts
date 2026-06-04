import React from 'react';
import { SlideLayoutProps } from './SlideLayout';
import CompanyProfileLayout from './CompanyProfileLayout';
import PartnersLayout from './PartnersLayout';
import HonorsLayout from './HonorsLayout';
import WebRunnerLayout from './WebRunnerLayout';
import DBBenchmarkLayout from './DBBenchmarkLayout';
import AITestGenLayout from './AITestGenLayout';
import DBBackupLayout from './DBBackupLayout';
import MilitaryDataLayout from './MilitaryDataLayout';
import WaterPlantLayout from './WaterPlantLayout';
import AgentRunnerLayout from './AgentRunnerLayout';

export const SLIDE_LAYOUTS: React.ComponentType<SlideLayoutProps>[] = [
  CompanyProfileLayout,
  PartnersLayout,
  HonorsLayout,
  WebRunnerLayout,
  DBBenchmarkLayout,
  AITestGenLayout,
  DBBackupLayout,
  MilitaryDataLayout,
  WaterPlantLayout,
  AgentRunnerLayout,
];
