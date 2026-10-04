export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForSelector("#authForm", { timeout: 15000 });

  await page.locator("#authName").fill("Тест");
  await page.locator("#authPhone").click();
  await page.locator("#authPhone").type("7000000001", { delay: 25 });
  await page.locator("#authPassword").fill("secret1");
  await page.locator("#authConfirmPassword").fill("secret1");
  await page.locator("#authSubmitBtn").click();
  await page.waitForSelector("#appShell:not([hidden])", { timeout: 15000 });

  // Seed operations, then re-init the app so it renders them.
  await page.evaluate(() => {
    const ops = [];
    for (let i = 1; i <= 14; i += 1) {
      ops.push({
        id: 100 + i,
        type: i % 2 ? "income" : "expense",
        amount: 1000 + i * 250,
        category: i % 2 ? "Зарплата" : "Продукты",
        date: `2026-09-${String((i % 28) + 1).padStart(2, "0")}`,
        comment: i % 3 === 0
          ? "Очень длинный комментарий, который должен переноситься по словам и не вылезать за границы карточки операции"
          : "Тест"
      });
    }
    localStorage.setItem("budgetMonsterOperations", JSON.stringify(ops));
  });
  await page.reload();
  await page.waitForSelector("#operationsList li", { timeout: 15000 });
  await page.waitForTimeout(700);

  const panel = await page.locator(".list-panel").boundingBox();
  const list = await page.locator("#operationsList").boundingBox();
  const addBtn = await page.locator(".operations-add-action").boundingBox();
  const viewportH = page.viewportSize().height;
  const scrollable = await page.locator("#operationsList").evaluate((el) => ({
    overflowY: getComputedStyle(el).overflowY,
    maxHeight: getComputedStyle(el).maxHeight,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight
  }));

  await page.screenshot({ path: "tmp_desktop.png" });

  return {
    innerWidth: page.viewportSize().width,
    appGrid: await page.locator(".app-grid").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    panelBox: { x: Math.round(panel.x), w: Math.round(panel.width), h: Math.round(panel.height) },
    listBox: { w: Math.round(list.width), h: Math.round(list.height) },
    scrollable,
    addBtnFullyVisible: addBtn.y + addBtn.height <= viewportH,
    addBtnY: Math.round(addBtn.y),
    viewportH,
    docScrollable: await page.evaluate(() => document.documentElement.scrollHeight > window.innerHeight),
    firstItemCols: await page.locator(".operation-item").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    firstItemText: (await page.locator(".operation-item").first().innerText()).replace(/\s+/g, " ").slice(0, 90),
    overflowingItems: await page.locator(".operation-item").evaluateAll((els) =>
      els.filter((el) => el.scrollWidth > el.clientWidth + 1).length
    )
  };
}