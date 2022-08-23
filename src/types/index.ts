export type Response<T> = {
  status: string;
  message: string;
  data: T;
};

export type Activity = {
  id?: number;
  email: string;
  title: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export type Todo = {
  id: number;
  activity_group_id: number;
  title: string;
  is_active: boolean;
  priority: PriorityEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export enum PriorityEnum {
  'Very High' = 'very-high',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  'Very Low' = 'very-low',
}
