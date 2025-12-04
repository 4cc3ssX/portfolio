export interface INavLink {
  name: string;
  path: string;
}

export const navLinks: INavLink[] = [
  {
    name: "about",
    path: "/#about",
  },
  {
    name: "experience",
    path: "/#experience",
  },
  {
    name: "skills",
    path: "/#skills",
  },
  {
    name: "projects",
    path: "/projects",
  },
  {
    name: "blog",
    path: "/blog",
  },
];
