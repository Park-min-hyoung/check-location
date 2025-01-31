import { GET } from "@/lib/axios";
import { BASE_PATH } from "./paths";

export function getTodos() {
  return GET({ url: BASE_PATH });
}
