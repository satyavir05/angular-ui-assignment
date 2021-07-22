
export interface Project {
  id: string;
  organization_id: string;
  user_id: string;
  name: string;
  created_at: Date;
}

export interface Organization {
  organization_id: string;
  name: string;
}
