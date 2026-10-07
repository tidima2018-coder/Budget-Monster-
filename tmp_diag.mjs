export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForSelector("#authForm", { timeout: 15000 });

  const read = () => page.evaluate(() => ({
    error: document.getElementById("authError").textContent,
    name: document.getElementById("authName").value,
    phone: document.getElementById("authPhone").value,
    pass: document.getElementById("authPassword").value,
    confirm: document.getElementById("authConfirmPassword").value,
    btnDisabled: document.getElementById("authSubmitBtn").disabled,
    users: localStorage.getItem("budgetMonsterUsers"),
    session: localStorage.getItem("budgetMonsterSession"),
    shellHidden: document.getElementById("appShell").hidden,
    authHidden: document.getElementById("authScreen").hidden,
    authClasses: document.getElementById("authScreen").className
  }));

  const before = await read();

  await page.locator("#authName").fill("Тест");
  const afterName = await read();
  await page.locator("#authPhone").fill("+7 (700) 000-00-01");
  const afterPhone = await read();
  await page.locator("#authPassword").fill("secret1");
  await page.locator("#authConfirmPassword").fill("secret1");
  const beforeSubmit = await read();

  await page.locator("#authSubmitBtn").click();
  await page.waitForTimeout(1500);
  const afterSubmit = await read();

  return { before, afterName, afterPhone, beforeSubmit, afterSubmit };
}