import { logEvent } from "firebase/analytics";
import { analytics } from "./init";

export const sendEvent = <D extends Record<string, any>>(
  eventName: string,
  params?: D
) => {
  if (!analytics) {
    console.warn("[ Analytics ] Not initialized yet");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[ Analytics ] Event Name: ${eventName} - Params: ${JSON.stringify(
        params
      )}`
    );
    return;
  }

  logEvent(analytics, eventName, params);
};
