const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jen";
    const text = "Some message";
    const message = generateMessage(from, text);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    const from = "Admin";
    const latitude = 15;
    const longitude = 19;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, url });
  });
});
