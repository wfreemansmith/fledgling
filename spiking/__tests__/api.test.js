const { getPrompt } = require("../api");

describe("ChatGPT API", () => {
  test("should return an object", () => {
    return getPrompt().then((res) => {
      expect(typeof res === "object").toBe(true);
      expect(Array.isArray(res)).toBe(false);
    });
    // const res = await getPrompt("cat")
    // expect(typeof res === "object").toBe(true)
    // expect(Array.isArray(res)).toBe(false)
  });
  test("should return an object with all necessary properties", () => {
    return getPrompt().then((res) => {
      expect(res).toHaveProperty("prompt", expect.any(String))
      expect(res).toHaveProperty("description", expect.any(String))
      expect(res).toHaveProperty("title", expect.any(String))
      expect(res).toHaveProperty("keywords")
      expect(Array.isArray(res.keywords)).toBe(true)
    })
  });
});
