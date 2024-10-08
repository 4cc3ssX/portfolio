import { useState, useEffect } from "react";

export enum DeviceType {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
}

export const useDeviceDetection = () => {
  const [device, setDevice] = useState<DeviceType>(DeviceType.MOBILE);

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice(DeviceType.MOBILE);
      } else if (isTablet) {
        setDevice(DeviceType.TABLET);
      } else {
        setDevice(DeviceType.DESKTOP);
      }
    };

    handleDeviceDetection();

    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
};
