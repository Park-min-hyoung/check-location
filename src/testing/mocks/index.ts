import { MODE } from "@/config/envs";

export const enableMocking = async () => {
  if (MODE !== "development") return;

  const { worker } = await import("./browser");
  return worker.start();
};
