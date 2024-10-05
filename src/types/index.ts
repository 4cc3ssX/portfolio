export interface IMe {
  name: string;
  nickname: string;
  email: string;
  github: string;
  linkedin: string;
  message: string;
  resume_link: string;
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

export interface IProject
  extends Omit<IExperience, "responsibilities" | "company_name"> {
  image: {
    url: string;
    blurhash_url: string;
  };
  link: string;
  tint_color: string;
  description: string;
  tags: ITag[];
}

export interface ITag {
  title: string;
  background_color: string;
  text_color: string;
}

export interface IContact {
  message: string;
}
