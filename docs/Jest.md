# Jest

## 테스트 파일 위치

테스트 대상위치에 `__tests__`폴더를 만들고, `${테스트 파일명}.spec.tsx?$` 를 생성한다. 더블 언더바 표기를 사용한 이유는 폴더 가장 상단으로 올려 찾기 쉽게 하기 위함이다.

| 타겟                                     | 테스트 파일 경로                                            |
| ---------------------------------------- | ----------------------------------------------------------- |
| /src/features/todos/components/todos.tsx | /src/features/todos/components/\_\_tests\_\_/todos.spec.tsx |
| /src/components/ui/toastify/toastify.tsx | src/components/ui/toastify/\_\_tests\_\_/toastify.spec.tsx  |

## Component Test Convention

```tsx
//Type
//Target
import TEST_TARGET,{TEST_TARGET_2} from "../TEST_TARGET";
//TestUtils
import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";


// MOCKUP

describe("TEST_TARGET", () => {
  describe("PROPS_1", () => {
    it("TEST_1", async () => {
      const mutationFn = jest.fn().mockResolvedValue("");
      render(<TEST_TARGET mutationFn={mutationFn} />);

      const confirmBtn = screen.getByText("적용");
      fireEvent.click(confirmBtn);
      await waitFor(() => {
        expect(mutationFn).toHaveBeenCalled();
      });
    });


  describe("PROPS_2", () => {
    ...
  });
});

describe("TEST_TARGET_2", () => {
    ...
    describe("PROPS_2", () => {
    ...
  });
})

```

## Utility Test Convention

```tsx
//Type
//Target
import { TEST_TARGET, TEST_TARGET_2 } from "../TEST_TARGET.ts";

//TestUtils

// MOCKUP

describe("TEST_TARGET", () => {
  // BEFORE EACH
  // AFTER EACH
  describe("PARAM1", () => {
    it("TEST_1", () => {
      const result = TEST_TARGET(1, 1); // TEST_TARGET = (a,b) => a + b;
      const expectedResult = 2;

      expect(result).toBe(expectedResult);
    });
  });
});

describe("TEST_TARGET_2", () => {
  //...
});
```

## Hook Test Convention

```tsx
//Type
//Target

//TestUtils
import { act, renderHook } from "@testing-library/react";

import TEST_TARGET, { TEST_TARGET_2 } from "../TEST_TARGET.ts";

// MOCKUP

describe("TEST_TARGET", () => {
  // BEFORE EACH
  // AFTER EACH
  describe("props1", () => {
    it("TEST_1", () => {
      const { result } = renderHook(() => TEST_TARGET({}));

      const expectedResult = "hi";
      act(() => result.current.setState("hi"));
      expect(result.current.state).toBe(expectedResult);
    });
  });
});

describe("TEST_TARGET_2", () => {
  // ...
});
```

## 유닛 테스트 목적

유닛 테스트의 목적은 프로그램의 각 부분을 고립 시켜서 각각의 부분이 정확하게 동작하는지 확인하는 것이다. 즉, 프로그램을 작은 단위로 쪼개서 각 단위가 정확하게 동작하는지 검사하고 이를 통해 문제 발생 시 정확하게 어느 부분이 잘못되었는지를 재빨리 확인할 수 있게 해준다.

코드를 수정시 기존의 스펙을 통과하지 못한다면 이는 기존 컴포넌트와 호환이 되지 않는다는 의미이다.

## 테스트 Tip

1. 모든 것을 테스트 할 필요는 없다.
2. 컴포넌트의 경우 주요 Props에 대해서만 테스트 코드를 주로 짜고, 스타일링과 같은 props는 안해도 된다.
3. testingLibrary로 엘리먼트를 선택하기 매우 어려운 경우 주저하지 말고 testid를 요소에 전달하라.

## TEMPLATE

### jest-template

```tsx
// TYPES
// TARGET
import TEST_TARGET from "../index";

// import { TEST_TARGET } from "../index";
// TEST UTILS
// import _ from "lodash"
// import { fireEvent, render, waitFor, renderHook } from "@testing-library/react";
// import { screen } from "@testing-library/dom";

// MOCK
// jest.mock("",() => {})

describe("TEST_TARGET", () => {
  describe("PROPS_1", () => {
    it("test_1", async () => {
      //
    });
    // it("test_2", async () => {});
    // it("test_3", async () => {});
  });
});
```
