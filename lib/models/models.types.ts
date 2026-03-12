export interface JobApplications {
  _id: string;
  company: string;
  position?: string;
  location: string;
  role: string;
  notes: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  columnId: string;
  tags?: string[];
  description: string;
}

export interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplications[];
}

export interface Board {
  _id: string;
  name: string;
  columns: Column[];
}

