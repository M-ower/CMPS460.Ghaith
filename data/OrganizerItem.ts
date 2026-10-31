export type OrganizerCategory =
  | 'Maintenance'
  | 'Expenses'
  | 'Reminders';

export interface OrganizerItem {
  id: string;
  title: string;
  description: string;
  category: OrganizerCategory;
  date: string;
  completed: boolean;
}