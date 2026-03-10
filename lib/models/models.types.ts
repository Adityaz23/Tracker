export interface JobApplication {
  _id: string;
  comapny: string;
  postition?: string;
  location: string;
  role: string;
  notes: string;
  salary?: string;
  jobUrl?: string;
  order: string;
  columnId: string;
  tags?: string[];
  description: string;
}

export interface Column {
  _id: string;
  name: string;
  order: string;
  jobApplication: JobApplication[];
}

export interface Board {
  _id: string;
  name: string;
  columns: Column[];
}

