import { IconName, icons } from "./icons";

export interface IconProps {
  name: IconName;
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
}

export const Icon = ({ name, size, width, height, ...rest }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.debug(`Icon ${name} not found`);
    return null;
  }

  return (
    <IconComponent width={width || size} height={height || size} {...rest} />
  );
};

export * from "./icons";
