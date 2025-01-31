import { setupWorker } from "msw/browser";

import { handlers } from "./handlers/browser";

// if (handlers.length !== 0) {
//   alert(`
//         현재 이 버전에서는 ${handlers.length}개의 API목업이 동작하고 있습니다.
//         배포전에 제거해야합니다.
//     `);
// }

export const worker = setupWorker(...handlers);

export default worker;
