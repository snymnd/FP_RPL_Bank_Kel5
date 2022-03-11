const sum = (a, b) => a + b;

describe("Sum function", () => {
  test("1 + 2 should return 3", () => {
    const result = sum(1, 2);
    expect(result).toEqual(3);
  });
});
