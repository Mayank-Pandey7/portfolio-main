export interface ProjectTechnology {
  name: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: ProjectTechnology[];
  github?: string;
  live?: string;
  details?: boolean;
  projectDetailsPageSlug: string;
  isWorking?: boolean;
  video?: string;
}
