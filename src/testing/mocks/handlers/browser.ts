import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/todos", () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "박지성"
      },
      {
        id: "2",
        title: "손흥민"
      },
      {
        id: "3",
        title: "Angular"
      },
      {
        id: "4",
        title: "Svelte"
      }
    ]);
  })
];
