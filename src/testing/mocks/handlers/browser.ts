import { testTodos } from "@/testing/testUtils";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/todos", () => {
    return HttpResponse.json(testTodos);
  })
];
