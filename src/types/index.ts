export interface INavLink {
  name: string;
  path: string;
}

export interface IMe {
  name: string;
  nickname: string;
  email: string;
  github: string;
  linkedin: string;
  message: string;
}

export interface IAboutMe {
  description: string;
  skills: string[];
  want_to_try: string[];
}

export interface IExperience {
  title: string;
  company_name: string;
  from: number;
  to: number;
  is_current: boolean;
  responsibilities: string[];
}

export interface IContact {
  message: string;
}
