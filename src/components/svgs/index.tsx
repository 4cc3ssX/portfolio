"use client";

import { IconName, icons } from "./icons";

export interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, ...rest }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.debug(`Icon ${name} not found`);
    return null;
  }

  return <IconComponent {...rest} />;
};

export * from "./icons";
