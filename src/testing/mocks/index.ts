import { isDevelopment } from "@/config/envs";

export const enableMocking = async () => {
  if (!isDevelopment) return;

  const { worker } = await import("./browser");
  return worker.start();
};
