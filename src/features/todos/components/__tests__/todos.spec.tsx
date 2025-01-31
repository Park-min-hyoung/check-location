describe("산술연산 테스트", () => {
  it("더하기", () => {
    const sum = (a, b) => a + b;

    expect(sum(1, 2)).toBe(3);
  });

  it("빼기", () => {
    const minus = (a, b) => a - b;

    expect(minus(3, 1)).toBe(2);
  });

  it("곱하기", () => {
    const multiply = (a, b) => a * b;

    expect(multiply(3, 1)).toBe(3);
  });

  it("나누기", () => {
    const divide = (a, b) => a / b;

    expect(divide(6, 2)).toBe(3);
  });
});
