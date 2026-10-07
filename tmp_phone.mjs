export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForSelector("#authForm", { timeout: 15000 });

  // Type the phone one digit at a time, the way a real user does.
  const phone = page.locator("#authPhone");
  await phone.click();
  await phone.type("7000000001", { delay: 30 });
  const afterTyping = await phone.inputValue();

  // Compare with setting the value programmatically.
  await phone.fill("");
  await phone.evaluate((el) => {
    el.value = "+7 (700) 000-00-01";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const afterFill = await phone.inputValue();

  return {
    typedValue: afterTyping,
    typedDigits: afterTyping.replace(/\D/g, ""),
    fillValue: afterFill,
    fillDigits: afterFill.replace(/\D/g, "")
  };
}