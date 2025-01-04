import { HomeIcon, DocumentTextIcon, ChartPieIcon } from '@heroicons/react/24/outline';

export const categories = [
  { value: 'food', label: 'Food' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' }
];

export const navItems = [
  { path: '/', name: 'Dashboard', icon: HomeIcon },
  { path: '/expenses', name: 'Expense Report', icon: DocumentTextIcon },
  { path: '/charts', name: 'Charts', icon: ChartPieIcon },
];