import { CustomEventName, logEvent } from "firebase/analytics";
import { analytics } from "./init";

export const sendEvent = <T extends string>(
  eventName: CustomEventName<T>,
  params: Record<string, string> = {}
) => {
  if (!analytics) {
    console.warn("Analytics is not initialized");
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Analytics event:", eventName, params);
    return;
  }

  logEvent(analytics, eventName, params);
};
