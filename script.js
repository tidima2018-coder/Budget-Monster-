const STORAGE_KEY = "budgetMonsterOperations";
const SETTINGS_KEY = "budgetMonsterSettings";
const BUDGETS_KEY = "budgetMonsterCategoryBudgets";
const USERS_KEY = "budgetMonsterUsers";
const SESSION_KEY = "budgetMonsterSession";
const DEFAULT_CURRENCY = "KZT";

const CURRENCY_OPTIONS = {
  KZT: { label: "Казахстанский тенге", symbol: "₸", rate: 1, decimals: 0 },
  USD: { label: "Доллар США", symbol: "$", rate: 447.73, decimals: 2 },
  EUR: { label: "Евро", symbol: "€", rate: 502.98, decimals: 2 },
  RUB: { label: "Российский рубль", symbol: "₽", rate: 5.35, decimals: 2 },
  CNY: { label: "Китайский юань", symbol: "¥", rate: 66.78, decimals: 2 },
  GBP: { label: "Фунт стерлингов", symbol: "£", rate: 591.14, decimals: 2 },
  TRY: { label: "Турецкая лира", symbol: "₺", rate: 9.11, decimals: 2 },
  UZS: { label: "Узбекский сум", symbol: "сўм", rate: 0.038, decimals: 0 },
  KGS: { label: "Кыргызский сом", symbol: "сом", rate: 5.12, decimals: 2 },
  AED: { label: "Дирхам ОАЭ", symbol: "د.إ", rate: 121.91, decimals: 2 },
  AUD: { label: "Австралийский доллар", symbol: "A$", rate: 310.5, decimals: 2 },
  CAD: { label: "Канадский доллар", symbol: "C$", rate: 314.46, decimals: 2 },
  CHF: { label: "Швейцарский франк", symbol: "Fr", rate: 540.41, decimals: 2 },
  JPY: { label: "Японская иена", symbol: "¥", rate: 2.84, decimals: 0 },
  INR: { label: "Индийская рупия", symbol: "₹", rate: 4.65, decimals: 2 },
  BYN: { label: "Белорусский рубль", symbol: "Br", rate: 149.11, decimals: 2 },
  GEL: { label: "Грузинский лари", symbol: "₾", rate: 174.49, decimals: 2 },
  AZN: { label: "Азербайджанский манат", symbol: "₼", rate: 264.15, decimals: 2 },
  UAH: { label: "Украинская гривна", symbol: "₴", rate: 9.95, decimals: 2 },
  PLN: { label: "Польский злотый", symbol: "zł", rate: 114.96, decimals: 2 },
  SGD: { label: "Сингапурский доллар", symbol: "S$", rate: 349.79, decimals: 2 },
  THB: { label: "Тайский бат", symbol: "฿", rate: 13.34, decimals: 2 }
};

const CATEGORY_OPTIONS = {
  income: ["Зарплата", "Подработка", "Подарок", "Инвестиции", "Другое"],
  expense: [
    "Продукты",
    "Одежда",
    "Транспорт",
    "Техника",
    "Развлечения",
    "Здоровье",
    "Покупки",
    "Карманные расходы",
    "Накопления",
    "Дом",
    "Другое"
  ]
};

const ALL_CATEGORIES = [...new Set([...CATEGORY_OPTIONS.income, ...CATEGORY_OPTIONS.expense])];

const refs = {
  authScreen: document.getElementById("authScreen"),
  authEyebrow: document.getElementById("authEyebrow"),
  authHeading: document.getElementById("authHeading"),
  appShell: document.getElementById("appShell"),
  authForm: document.getElementById("authForm"),
  authTabs: document.querySelectorAll(".auth-tab"),
  authName: document.getElementById("authName"),
  authPhone: document.getElementById("authPhone"),
  authPassword: document.getElementById("authPassword"),
  authConfirmPassword: document.getElementById("authConfirmPassword"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  authError: document.getElementById("authError"),
  notificationStack: document.getElementById("notificationStack"),
  dialog: document.getElementById("operationDialog"),
  accountSwitcherDialog: document.getElementById("accountSwitcherDialog"),
  deleteOperationDialog: document.getElementById("deleteOperationDialog"),
  resetSpendingLimitDialog: document.getElementById("resetSpendingLimitDialog"),
  cancelResetSpendingLimitBtn: document.getElementById("cancelResetSpendingLimitBtn"),
  confirmResetSpendingLimitBtn: document.getElementById("confirmResetSpendingLimitBtn"),
  deleteOperationCategory: document.getElementById("deleteOperationCategory"),
  deleteOperationAmount: document.getElementById("deleteOperationAmount"),
  cancelDeleteOperationBtn: document.getElementById("cancelDeleteOperationBtn"),
  confirmDeleteOperationBtn: document.getElementById("confirmDeleteOperationBtn"),
  switcherAccountName: document.getElementById("switcherAccountName"),
  switcherAccountPhone: document.getElementById("switcherAccountPhone"),
  closeAccountSwitcherBtn: document.getElementById("closeAccountSwitcherBtn"),
  addAccountBtn: document.getElementById("addAccountBtn"),
  form: document.getElementById("operationForm"),
  formHeading: document.getElementById("formHeading"),
  formNotice: document.getElementById("formNotice"),
  operationNotification: document.getElementById("operationNotification"),
  operationNotificationMessages: document.getElementById("operationNotificationMessages"),
  operationNotificationOk: document.getElementById("operationNotificationOk"),
  toggleFormBtn: document.getElementById("toggleFormBtn"),
  cancelFormBtn: document.getElementById("cancelFormBtn"),
  closeFormBtn: document.getElementById("closeFormBtn"),
  typeButtons: document.querySelectorAll(".type-option"),
  amountInput: document.getElementById("amountInput"),
  categorySelect: document.getElementById("categorySelect"),
  operationBudgetField: document.getElementById("operationBudgetField"),
  operationBudgetSelect: document.getElementById("operationBudgetSelect"),
  dateInput: document.getElementById("dateInput"),
  commentInput: document.getElementById("commentInput"),
  incomeSummary: document.getElementById("incomeSummary"),
  incomeLimitNote: document.getElementById("incomeLimitNote"),
  expenseSummary: document.getElementById("expenseSummary"),
  balanceSummary: document.getElementById("balanceSummary"),
  emptyState: document.getElementById("emptyState"),
  operationsList: document.getElementById("operationsList"),
  typeFilter: document.getElementById("typeFilter"),
  categoryFilter: document.getElementById("categoryFilter"),
  navButtons: document.querySelectorAll(".mobile-nav-button"),
  views: document.querySelectorAll(".page-view"),
  categoryBreakdown: document.getElementById("categoryBreakdown"),
  analyticsIncome: document.getElementById("analyticsIncome"),
  analyticsIncomeLimitNote: document.getElementById("analyticsIncomeLimitNote"),
  analyticsExpense: document.getElementById("analyticsExpense"),
  analyticsBalance: document.getElementById("analyticsBalance"),
  analyticsOperationTotal: document.getElementById("analyticsOperationTotal"),
  analyticsOperationsCount: document.getElementById("analyticsOperationsCount"),
  allCategories: document.getElementById("allCategories"),
  currencySearch: document.getElementById("currencySearch"),
  currencyChoices: document.getElementById("currencyChoices"),
  currencyCurrent: document.getElementById("currencyCurrent"),
  currencyRateNote: document.getElementById("currencyRateNote"),
  clearOperationsBtn: document.getElementById("clearOperationsBtn"),
  currentAccountDetails: document.getElementById("currentAccountDetails"),
  logoutBtn: document.getElementById("logoutBtn"),
  switchAccountBtn: document.getElementById("switchAccountBtn"),
  savedAccountsList: document.getElementById("savedAccountsList"),
  noSavedAccounts: document.getElementById("noSavedAccounts"),
  spendingLimitForm: document.getElementById("spendingLimitForm"),
  budgetList: document.getElementById("categoryBudgetList"),
  budgetForm: document.getElementById("categoryBudgetForm"),
  budgetName: document.getElementById("categoryBudgetName"),
  budgetAmount: document.getElementById("categoryBudgetAmount"),
  budgetTotalLabel: document.getElementById("categoryBudgetTotalLabel"),
  budgetCurrency: document.getElementById("categoryBudgetCurrency"),
  budgetCurrencySymbol: document.getElementById("categoryBudgetCurrencySymbol"),
  budgetStart: document.getElementById("categoryBudgetStart"),
  budgetEnd: document.getElementById("categoryBudgetEnd"),
  budgetCategories: document.getElementById("categoryBudgetCategories"),
  budgetAllocated: document.getElementById("categoryBudgetAllocated"),
  budgetFormError: document.getElementById("categoryBudgetFormError"),
  budgetFormTitle: document.getElementById("categoryBudgetFormTitle"),
  budgetFormCancel: document.getElementById("categoryBudgetCancel"),
  budgetFormOpen: document.getElementById("categoryBudgetNew"),
  budgetDetail: document.getElementById("categoryBudgetDetail"),
  budgetDetailContent: document.getElementById("categoryBudgetDetailContent"),
  budgetDetailTitle: document.getElementById("categoryBudgetDetailTitle"),
  budgetDetailDates: document.getElementById("categoryBudgetDetailDates"),
  budgetDeleteDialog: document.getElementById("categoryBudgetDeleteDialog"),
  budgetDeleteCancel: document.getElementById("categoryBudgetDeleteCancel"),
  budgetDeleteConfirm: document.getElementById("categoryBudgetDeleteConfirm"),
  budgetDeleteError: document.getElementById("categoryBudgetDeleteError"),
  resetSpendingLimitBtn: document.getElementById("resetSpendingLimitBtn"),
  spendingLimitAmount: document.getElementById("spendingLimitAmount"),
  spendingDailyAmount: document.getElementById("spendingDailyAmount"),
  spendingLimitError: document.getElementById("spendingLimitError"),
  spendingLimitPeriod: document.getElementById("spendingLimitPeriod"),
  spendingLimitStatus: document.getElementById("spendingLimitStatus"),
  spendingLimitProgress: document.getElementById("spendingLimitProgress"),
  spendingLimitRemaining: document.getElementById("spendingLimitRemaining"),
  spendingLimitDays: document.getElementById("spendingLimitDays"),
  spendingLimitDaily: document.getElementById("spendingLimitDaily"),
  spendingLimitSpent: document.getElementById("spendingLimitSpent"),
  spendingLimitHint: document.getElementById("spendingLimitHint"),
  operationLimitHint: document.getElementById("operationLimitHint")
};

let operations = [];
let categoryBudgets = [];
let editingBudgetId = null;
let pendingBudgetDeleteId = null;
let selectedBudgetId = null;
let budgetEditorCurrency = DEFAULT_CURRENCY;
let operationPendingDelete = null;
let editingOperationId = null;
let deleteDialogTrigger = null;
let authEventsBound = false;
let currencyPickerBound = false;
let errorNotificationsBound = false;
let categoryBudgetEventsBound = false;

const state = {
  currentType: "income",
  currency: DEFAULT_CURRENCY,
  theme: "dark",
  layoutMode: "desktop",
  spendingLimit: { amount: 0, dailyAmount: 0, period: "month" },
  user: null,
  authMode: "register"
};

function showErrorNotification(message) {
  const text = String(message || "").trim();
  if (!text || !refs.notificationStack) return;
  const toast = document.createElement("div");
  toast.className = "notification-toast";
  toast.setAttribute("role", "alert");
  const icon = document.createElement("span");
  icon.className = "notification-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "!";
  const content = document.createElement("div");
  content.className = "notification-content";
  const title = document.createElement("strong");
  title.textContent = "Проверьте данные";
  const description = document.createElement("span");
  description.textContent = text;
  content.append(title, description);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "notification-close";
  close.setAttribute("aria-label", "Закрыть уведомление");
  close.textContent = "×";
  toast.append(icon, content, close);
  refs.notificationStack.append(toast);

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 220);
  };
  close.addEventListener("click", dismiss);
  window.setTimeout(dismiss, 4800);
}

function showOperationErrorNotification(message) {
  const text = String(message || "").trim();
  if (!text || !refs.operationNotification) return;
  const alreadyShown = [...refs.operationNotificationMessages.children]
    .some((item) => item.textContent === text);
  if (!alreadyShown) {
    const item = document.createElement("p");
    item.className = "operation-notification-message";
    item.textContent = text;
    refs.operationNotificationMessages.append(item);
  }
  refs.operationNotification.hidden = false;
  refs.operationNotification.classList.remove("is-visible");
  void refs.operationNotification.offsetWidth;
  refs.operationNotification.classList.add("is-visible");
}

function dismissOperationErrorNotification() {
  refs.operationNotification.hidden = true;
  refs.operationNotification.classList.remove("is-visible");
  refs.operationNotificationMessages.replaceChildren();
}

function bindErrorNotifications() {
  if (errorNotificationsBound || !refs.notificationStack) return;
  errorNotificationsBound = true;
  const selector = ".field-error, .form-notice, .spending-limit-error, .auth-error";
  const lastMessages = new WeakMap();
  const observer = new MutationObserver((mutations) => {
    const pending = new Map();
    mutations.forEach((mutation) => {
      const source = mutation.target.nodeType === Node.ELEMENT_NODE
        ? mutation.target
        : mutation.target.parentElement;
      if (!source?.matches(selector)) return;
      let lastMessage = lastMessages.get(source) || "";
      if (mutation.type === "childList") {
        if (mutation.removedNodes.length) lastMessage = "";
        const addedText = [...mutation.addedNodes].map((node) => node.textContent || "").join(" ").trim();
        if (addedText) {
          if (addedText !== lastMessage) pending.set(source, addedText);
          lastMessage = addedText;
        }
      } else {
        const currentText = source.textContent.trim();
        if (currentText && currentText !== lastMessage) pending.set(source, currentText);
        lastMessage = currentText;
      }
      lastMessages.set(source, lastMessage);
    });
    pending.forEach((message, source) => {
      if (source.matches(".field-error, .form-notice")) showOperationErrorNotification(message);
      else showErrorNotification(message);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function getActiveCurrency() {
  return CURRENCY_OPTIONS[state.currency] || CURRENCY_OPTIONS[DEFAULT_CURRENCY];
}

function formatMoney(value) {
  const number = Number(value) || 0;
  const currency = getActiveCurrency();
  const converted = number / currency.rate;
  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: currency.decimals === 0 ? 0 : 2,
    maximumFractionDigits: currency.decimals
  }).format(converted);

  return `${formatted.replace(/\u00a0/g, " ")} ${currency.symbol}`;
}

function accountStorageKey(key) {
  const accountId = state.user?.phone || "guest";
  return `${key}:${accountId}`;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(accountStorageKey(SETTINGS_KEY));
    const parsed = raw ? JSON.parse(raw) : {};
    const candidate = parsed.currency || DEFAULT_CURRENCY;
    state.currency = CURRENCY_OPTIONS[candidate] ? candidate : DEFAULT_CURRENCY;
    state.theme = parsed.theme === "light" ? "light" : "dark";
    state.layoutMode = parsed.layoutMode === "mobile" ? "mobile" : "desktop";
    const limit = parsed.spendingLimit || {};
    const period = ["week", "month", "2months", "3months", "year"].includes(limit.period) ? limit.period : "month";
    const legacyStart = getCalendarPeriodRange(period).start;
    state.spendingLimit = {
      amount: Number(limit.amount) > 0 ? Number(limit.amount) : 0,
      dailyAmount: Number(limit.dailyAmount) > 0 ? Number(limit.dailyAmount) : 0,
      period,
      startDate: /^\d{4}-\d{2}-\d{2}$/.test(limit.startDate || "") ? limit.startDate : legacyStart
    };
  } catch (error) {
    state.currency = DEFAULT_CURRENCY;
    state.theme = "dark";
    state.layoutMode = "desktop";
    state.spendingLimit = { amount: 0, dailyAmount: 0, period: "month", startDate: getTodayISO() };
  }
}

function saveSettings() {
  localStorage.setItem(accountStorageKey(SETTINGS_KEY), JSON.stringify({ currency: state.currency, theme: state.theme, layoutMode: state.layoutMode, spendingLimit: state.spendingLimit }));
}

function renderCurrencyPicker() {
  const selected = CURRENCY_OPTIONS[state.currency] || CURRENCY_OPTIONS[DEFAULT_CURRENCY];
  const selectedRate = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 4 }).format(selected.rate);
  refs.currencyRateNote.textContent = `Курс приложения · 1 ${state.currency} = ${selectedRate} ₸`;
  refs.currencyCurrent.replaceChildren();
  const symbol = document.createElement("span");
  symbol.className = "currency-current-symbol";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = selected.symbol;
  const details = document.createElement("span");
  details.className = "currency-current-details";
  const name = document.createElement("strong");
  name.textContent = `${state.currency} · ${selected.label}`;
  const hint = document.createElement("small");
  hint.textContent = "Валюта отображения";
  details.append(name, hint);
  refs.currencyCurrent.append(symbol, details);

  const query = refs.currencySearch.value.trim().toLocaleLowerCase("ru-RU");
  refs.currencyChoices.replaceChildren();
  Object.entries(CURRENCY_OPTIONS)
    .filter(([code, currency]) => `${code} ${currency.label} ${currency.symbol}`.toLocaleLowerCase("ru-RU").includes(query))
    .forEach(([code, currency]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "currency-choice";
      button.dataset.currency = code;
      button.setAttribute("aria-pressed", String(code === state.currency));
      const choiceSymbol = document.createElement("span");
      choiceSymbol.className = "currency-choice-symbol";
      choiceSymbol.setAttribute("aria-hidden", "true");
      choiceSymbol.textContent = currency.symbol;
      const choiceDetails = document.createElement("span");
      choiceDetails.className = "currency-choice-details";
      const choiceCode = document.createElement("strong");
      choiceCode.textContent = code;
      const choiceName = document.createElement("small");
      choiceName.textContent = currency.label;
      const choiceRate = document.createElement("small");
      choiceRate.className = "currency-choice-rate";
      choiceRate.textContent = `1 ${code} = ${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 4 }).format(currency.rate)} ₸`;
      choiceDetails.append(choiceCode, choiceName, choiceRate);
      button.append(choiceSymbol, choiceDetails);
      refs.currencyChoices.append(button);
    });
}

function bindCurrencyPicker() {
  if (currencyPickerBound) return;
  currencyPickerBound = true;
  refs.currencySearch.addEventListener("input", renderCurrencyPicker);
  refs.currencyChoices.addEventListener("click", (event) => {
    const button = event.target.closest("[data-currency]");
    if (!button || !CURRENCY_OPTIONS[button.dataset.currency]) return;
    state.currency = button.dataset.currency;
    saveSettings();
    renderCurrencyPicker();
    renderApp();
  });
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const button = document.getElementById("themeToggleBtn");
  if (!button) return;
  const light = state.theme === "light";
  button.setAttribute("aria-pressed", String(light));
  button.querySelector(".theme-toggle-icon").textContent = light ? "☀" : "☾";
  button.querySelector(".theme-toggle-label").textContent = light ? "Светлая" : "Тёмная";
}

function applyLayoutMode() {
  document.documentElement.dataset.layout = state.layoutMode;
  document.querySelectorAll("[data-layout-mode]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.layoutMode === state.layoutMode));
  });
}

function loadOperations() {
  try {
    const raw = localStorage.getItem(accountStorageKey(STORAGE_KEY));
    operations = raw ? JSON.parse(raw) : [];
  } catch (error) {
    operations = [];
  }

  if (!Array.isArray(operations)) {
    operations = [];
  }
}

function saveOperations() {
  localStorage.setItem(accountStorageKey(STORAGE_KEY), JSON.stringify(operations));
}

function loadCategoryBudgets() {
  try {
    const saved = JSON.parse(localStorage.getItem(accountStorageKey(BUDGETS_KEY)) || "[]");
    categoryBudgets = Array.isArray(saved) ? saved : [];
  } catch (error) {
    categoryBudgets = [];
  }
  selectedBudgetId = categoryBudgets[0]?.id ?? null;
}

function saveCategoryBudgets(nextBudgets = categoryBudgets) {
  try {
    localStorage.setItem(accountStorageKey(BUDGETS_KEY), JSON.stringify(nextBudgets));
    categoryBudgets = nextBudgets;
    return true;
  } catch (error) {
    return false;
  }
}

function currencyLabel(code) {
  const currency = CURRENCY_OPTIONS[code] || CURRENCY_OPTIONS[DEFAULT_CURRENCY];
  return currency.symbol;
}

function formatBudgetMoney(amount, code) {
  const currency = CURRENCY_OPTIONS[code] || CURRENCY_OPTIONS[DEFAULT_CURRENCY];
  const value = (Number(amount) || 0) / currency.rate;
  return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: currency.decimals }).format(value)} ${currency.symbol}`;
}

function normalizeBudgetDate(value) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = parseDateInput(text);
  return parsed || "";
}

function sameBudgetCategory(left, right) {
  return String(left || "").trim().toLocaleLowerCase("ru-RU")
    === String(right || "").trim().toLocaleLowerCase("ru-RU");
}

function getBudgetCategorySpent(budget, category, excludedOperationId = null) {
  const startDate = normalizeBudgetDate(budget.startDate);
  const endDate = normalizeBudgetDate(budget.endDate);
  if (!startDate || !endDate) return 0;
  return operations.reduce((sum, operation) => {
    if (excludedOperationId !== null && operation.id === excludedOperationId) return sum;
    if (operation.budgetId && String(operation.budgetId) !== String(budget.id)) return sum;
    const operationDate = normalizeBudgetDate(operation.date);
    if (operation.type !== "expense" || !sameBudgetCategory(operation.category, category)) return sum;
    if (!operationDate || operationDate < startDate || operationDate > endDate) return sum;
    const amount = Number(operation.amount);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}

function getBudgetSpent(budget) {
  return (budget.categories || []).reduce((sum, entry) => sum + getBudgetCategorySpent(budget, entry.name), 0);
}

function getBudgetTone(percent) {
  if (percent > 100) return "critical";
  if (percent >= 90) return "danger";
  if (percent > 70) return "warning";
  return "good";
}

function makeBudgetProgress(percent, label) {
  const progress = document.createElement("div");
  progress.className = `category-budget-progress is-${getBudgetTone(percent)}`;
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", label);
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.setAttribute("aria-valuenow", String(Math.min(Math.round(percent), 100)));
  const fill = document.createElement("span");
  fill.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
  progress.append(fill);
  return progress;
}

function renderCategoryBudgets() {
  if (!refs.budgetList) return;
  refs.budgetList.replaceChildren();
  if (!categoryBudgets.length) {
    const empty = document.createElement("p");
    empty.className = "category-budget-empty";
    empty.textContent = "Создайте бюджет и задайте лимиты по категориям расходов.";
    refs.budgetList.append(empty);
    refs.budgetDetail.hidden = true;
    return;
  }

  categoryBudgets.forEach((budget) => {
    const spent = getBudgetSpent(budget);
    const percent = budget.amount > 0 ? spent / budget.amount * 100 : 0;
    const card = document.createElement("article");
    card.className = `category-budget-card${budget.id === selectedBudgetId ? " is-selected" : ""}`;
    const heading = document.createElement("div");
    heading.className = "category-budget-card-heading";
    const title = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = budget.name;
    const dates = document.createElement("small");
    dates.textContent = `${formatDateForInput(budget.startDate)} — ${formatDateForInput(budget.endDate)}`;
    title.append(name, dates);
    const total = document.createElement("strong");
    total.textContent = `${formatBudgetMoney(spent, budget.currency)} / ${formatBudgetMoney(budget.amount, budget.currency)}`;
    heading.append(title, total);
    const bar = makeBudgetProgress(percent, `Использовано ${percent.toFixed(1)}% бюджета`);
    const footer = document.createElement("div");
    footer.className = "category-budget-card-footer";
    const remaining = document.createElement("span");
    remaining.textContent = `Осталось: ${formatBudgetMoney(budget.amount - spent, budget.currency)}`;
    const more = document.createElement("button");
    more.type = "button";
    more.className = "secondary-button";
    more.dataset.budgetDetails = String(budget.id);
    more.textContent = "Подробнее";
    footer.append(remaining, more);
    card.append(heading, bar, footer);
    refs.budgetList.append(card);
  });

  const selected = categoryBudgets.find((budget) => budget.id === selectedBudgetId) || categoryBudgets[0];
  if (selected) renderBudgetDetail(selected);
}

function renderBudgetDetail(budget) {
  refs.budgetDetail.hidden = false;
  refs.budgetDetail.dataset.budgetId = String(budget.id);
  refs.budgetDetailTitle.textContent = budget.name;
  refs.budgetDetailDates.textContent = `${formatDateForInput(budget.startDate)} — ${formatDateForInput(budget.endDate)}`;
  refs.budgetDetailContent.replaceChildren();
  const categoryStats = (budget.categories || []).map((entry) => {
    const categorySpent = getBudgetCategorySpent(budget, entry.name);
    return {
      ...entry,
      spent: categorySpent,
      remaining: entry.amount - categorySpent,
      percent: entry.amount > 0 ? categorySpent / entry.amount * 100 : 0
    };
  });
  const spent = categoryStats.reduce((sum, entry) => sum + entry.spent, 0);
  const percent = budget.amount > 0 ? spent / budget.amount * 100 : 0;
  const budgetOperations = operations.filter((operation) => {
    const operationDate = normalizeBudgetDate(operation.date);
    const startDate = normalizeBudgetDate(budget.startDate);
    const endDate = normalizeBudgetDate(budget.endDate);
    return operation.type === "expense"
      && (!operation.budgetId || String(operation.budgetId) === String(budget.id))
      && operationDate >= startDate && operationDate <= endDate
      && categoryStats.some((entry) => sameBudgetCategory(entry.name, operation.category));
  });
  const summary = document.createElement("div");
  summary.className = "category-budget-summary";
  const summaryValues = [
    ["Общий лимит", formatBudgetMoney(budget.amount, budget.currency)],
    ["Потрачено", formatBudgetMoney(spent, budget.currency)],
    ["Осталось", formatBudgetMoney(budget.amount - spent, budget.currency)]
  ];
  summaryValues.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "category-budget-summary-item";
    const caption = document.createElement("span");
    caption.textContent = label;
    const amount = document.createElement("strong");
    amount.textContent = value;
    item.append(caption, amount);
    summary.append(item);
  });
  const overall = document.createElement("div");
  overall.className = "category-budget-overall";
  overall.append(summary, makeBudgetProgress(percent, `Общий бюджет использован на ${percent.toFixed(1)}%`));
  const overallLabel = document.createElement("span");
  overallLabel.className = "category-budget-percent";
  overallLabel.textContent = `${percent.toFixed(1)}% использовано`;
  overall.append(overallLabel);
  refs.budgetDetailContent.append(overall);

  const insights = document.createElement("section");
  insights.className = "category-budget-insights";
  const insightsTitle = document.createElement("h4");
  insightsTitle.textContent = "Аналитика расходов";
  insights.append(insightsTitle);
  const insightGrid = document.createElement("div");
  insightGrid.className = "category-budget-insight-grid";
  const biggestCategory = [...categoryStats].sort((a, b) => b.spent - a.spent)[0];
  const nearLimitCategories = categoryStats.filter((entry) => entry.percent >= 70);
  const analytics = [
    ["Расходных операций", String(budgetOperations.length)],
    ["Средний расход", formatBudgetMoney(budgetOperations.length ? spent / budgetOperations.length : 0, budget.currency)],
    ["Самая затратная категория", biggestCategory && biggestCategory.spent > 0 ? `${getCategoryIcon(biggestCategory.name)} ${biggestCategory.name} · ${formatBudgetMoney(biggestCategory.spent, budget.currency)}` : "Пока нет расходов"]
  ];
  analytics.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "category-budget-insight-card";
    const caption = document.createElement("span");
    caption.textContent = label;
    const result = document.createElement("strong");
    result.textContent = value;
    card.append(caption, result);
    insightGrid.append(card);
  });
  insights.append(insightGrid);
  const insightNote = document.createElement("p");
  insightNote.className = nearLimitCategories.length ? "category-budget-insight-note is-alert" : "category-budget-insight-note";
  if (!budgetOperations.length) {
    insightNote.textContent = "За выбранный период пока нет расходов в категориях этого бюджета.";
  } else if (nearLimitCategories.length) {
    const exceeded = nearLimitCategories.filter((entry) => entry.percent > 100);
    const approaching = nearLimitCategories.filter((entry) => entry.percent >= 70 && entry.percent <= 100);
    insightNote.classList.toggle("is-critical", exceeded.length > 0);
    const parts = [];
    if (exceeded.length) parts.push(`Превышен лимит: ${exceeded.map((entry) => `${entry.name} на ${formatBudgetMoney(Math.abs(entry.remaining), budget.currency)}`).join(", ")}.`);
    if (approaching.length) parts.push(`Близко к лимиту: ${approaching.map((entry) => `${entry.name} (${entry.percent.toFixed(0)}%)`).join(", ")}.`);
    insightNote.textContent = parts.join(" ");
  } else {
    const top = [...categoryStats].sort((a, b) => b.spent - a.spent)[0];
    const share = spent > 0 ? top.spent / spent * 100 : 0;
    insightNote.textContent = `${top.name} — наибольшая статья расходов: ${formatBudgetMoney(top.spent, budget.currency)} (${share.toFixed(1)}% расходов бюджета). Все категории ниже 70% своих лимитов.`;
  }
  insights.append(insightNote);
  refs.budgetDetailContent.append(insights);

  const list = document.createElement("div");
  list.className = "category-budget-breakdown";
  categoryStats
    .sort((a, b) => b.spent - a.spent)
    .forEach((entry) => {
    const categorySpent = entry.spent;
    const categoryPercent = entry.percent;
    const row = document.createElement("article");
    row.className = `category-budget-breakdown-item is-${getBudgetTone(categoryPercent)}`;
    const head = document.createElement("div");
    head.className = "category-budget-breakdown-heading";
    const categoryName = document.createElement("h4");
    categoryName.textContent = `${getCategoryIcon(entry.name)} ${entry.name}`;
    const amounts = document.createElement("strong");
    amounts.textContent = `${formatBudgetMoney(categorySpent, budget.currency)} / ${formatBudgetMoney(entry.amount, budget.currency)}`;
    head.append(categoryName, amounts);
    const caption = document.createElement("p");
    const categoryShare = spent > 0 ? categorySpent / spent * 100 : 0;
    const remainderText = entry.remaining < 0
      ? `Лимит превышен на ${formatBudgetMoney(Math.abs(entry.remaining), budget.currency)}`
      : `Осталось: ${formatBudgetMoney(entry.remaining, budget.currency)}`;
    caption.textContent = `${remainderText} · ${categoryPercent.toFixed(1)}% лимита · ${categoryShare.toFixed(1)}% расходов`;
    row.append(head, caption, makeBudgetProgress(categoryPercent, `${entry.name}: использовано ${categoryPercent.toFixed(1)}%`));
    list.append(row);
    });
  refs.budgetDetailContent.append(list);
}

function getCategoryIcon(name) {
  const icons = { "Продукты": "🍔", "Одежда": "👕", "Транспорт": "🚕", "Техника": "💻", "Развлечения": "🎬", "Здоровье": "💊", "Покупки": "🛍️", "Карманные расходы": "👛", "Накопления": "🐷", "Дом": "🏠", "Другое": "📦" };
  return icons[name] || "📦";
}

function setBudgetEditorCurrency(nextCurrency) {
  if (!CURRENCY_OPTIONS[nextCurrency] || nextCurrency === budgetEditorCurrency) return;
  const previousRate = CURRENCY_OPTIONS[budgetEditorCurrency]?.rate || 1;
  const nextRate = CURRENCY_OPTIONS[nextCurrency].rate;
  const factor = previousRate / nextRate;
  refs.budgetAmount.value = refs.budgetAmount.value ? String(Number(refs.budgetAmount.value) * factor) : "";
  refs.budgetCategories.querySelectorAll("[data-budget-value]").forEach((input) => {
    const mode = refs.budgetCategories.querySelector(`[data-budget-mode="${input.dataset.budgetValue}"]`);
    if (mode?.value === "amount" && input.value !== "") input.value = String(Number(input.value) * factor);
    if (mode?.value === "amount") input.placeholder = currencyLabel(nextCurrency);
  });
  budgetEditorCurrency = nextCurrency;
  refs.budgetCurrency.value = nextCurrency;
  refs.budgetCurrencySymbol.textContent = currencyLabel(nextCurrency);
  refs.budgetTotalLabel.textContent = `Общий лимит (${currencyLabel(nextCurrency)})`;
  updateBudgetAllocation();
}

function renderBudgetCategoryFields(budget = null) {
  const existing = new Map((budget?.categories || []).map((entry) => [entry.name, entry]));
  refs.budgetCategories.replaceChildren();
  CATEGORY_OPTIONS.expense.forEach((name) => {
    const entry = existing.get(name);
    const row = document.createElement("div");
    row.className = "category-budget-editor-row";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.dataset.budgetCategory = name;
    check.checked = Boolean(entry);
    check.setAttribute("aria-label", `Включить категорию ${name}`);
    const label = document.createElement("span");
    label.className = "category-budget-editor-name";
    label.textContent = `${getCategoryIcon(name)} ${name}`;
    const mode = document.createElement("select");
    mode.dataset.budgetMode = name;
    mode.setAttribute("aria-label", `Способ задания лимита для категории ${name}`);
    [["percent", "%"], ["amount", "Сумма"]].forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      mode.append(option);
    });
    const valueInput = document.createElement("input");
    valueInput.type = "number";
    valueInput.min = "0";
    valueInput.step = "any";
    valueInput.placeholder = "%";
    valueInput.dataset.budgetValue = name;
    valueInput.value = entry && budget.amount > 0 ? String((entry.amount / budget.amount * 100).toFixed(2)) : "";
    valueInput.disabled = !entry;
    mode.disabled = !entry;
    valueInput.setAttribute("aria-label", `Лимит категории ${name}`);
    const computed = document.createElement("span");
    computed.className = "category-budget-computed";
    computed.dataset.budgetComputed = name;
    computed.textContent = "Лимит: —";
    check.addEventListener("change", () => {
      mode.disabled = !check.checked;
      valueInput.disabled = !check.checked;
      if (!check.checked) valueInput.value = "";
      updateBudgetAllocation();
    });
    mode.addEventListener("change", () => {
      const previousMode = valueInput.dataset.mode || "percent";
      const current = Number(valueInput.value);
      const total = Number(refs.budgetAmount.value) || 0;
      if (valueInput.value !== "") valueInput.value = String(previousMode === "percent" ? current * total / 100 : (total ? current / total * 100 : 0));
      valueInput.dataset.mode = mode.value;
      valueInput.placeholder = mode.value === "percent" ? "%" : currencyLabel(refs.budgetCurrency.value);
      updateBudgetAllocation();
    });
    valueInput.dataset.mode = "percent";
    valueInput.addEventListener("input", updateBudgetAllocation);
    row.append(check, label, mode, valueInput, computed);
    refs.budgetCategories.append(row);
  });
  updateBudgetAllocation();
}

function updateBudgetAllocation() {
  if (!refs.budgetAmount) return;
  const currencyCode = refs.budgetCurrency.value || DEFAULT_CURRENCY;
  const rate = CURRENCY_OPTIONS[currencyCode]?.rate || 1;
  const total = Number(refs.budgetAmount.value) || 0;
  const values = [...refs.budgetCategories.querySelectorAll("[data-budget-value]")]
    .filter((input) => !input.disabled && input.value !== "")
    .map((input) => {
      const mode = refs.budgetCategories.querySelector(`[data-budget-mode="${input.dataset.budgetValue}"]`);
      return mode.value === "amount" ? Number(input.value) : total * Number(input.value) / 100;
    });
  const allocatedAmount = values.reduce((sum, value) => sum + (Number.isFinite(value) && value > 0 ? value : 0), 0);
  [...refs.budgetCategories.querySelectorAll("[data-budget-computed]")].forEach((display) => {
    const valueInput = [...refs.budgetCategories.querySelectorAll("[data-budget-value]")]
      .find((input) => input.dataset.budgetValue === display.dataset.budgetComputed);
    const mode = refs.budgetCategories.querySelector(`[data-budget-mode="${display.dataset.budgetComputed}"]`);
    if (valueInput.disabled) display.textContent = "Лимит: —";
    else if (valueInput.value === "" || !Number.isFinite(Number(valueInput.value)) || Number(valueInput.value) < 0) display.textContent = "Укажите лимит";
    else {
      const value = mode.value === "amount" ? Number(valueInput.value) : total * Number(valueInput.value) / 100;
      display.textContent = `Лимит: ${formatBudgetMoney(value * rate, currencyCode)}`;
    }
  });
  refs.budgetAllocated.textContent = `Распределено: ${formatBudgetMoney(allocatedAmount * rate, currencyCode)} из ${formatBudgetMoney(total * rate, currencyCode)}`;
  refs.budgetAllocated.classList.toggle("is-over", allocatedAmount > total + 0.000001);
}

function openBudgetForm(budget = null) {
  editingBudgetId = budget?.id ?? null;
  refs.budgetForm.reset();
  refs.budgetFormError.hidden = true;
  refs.budgetFormError.textContent = "";
  refs.budgetFormTitle.textContent = budget ? "Изменить бюджет" : "Новый бюджет";
  refs.budgetName.value = budget?.name || "";
  const currency = budget?.currency || state.currency;
  budgetEditorCurrency = currency;
  refs.budgetCurrency.value = currency;
  refs.budgetTotalLabel.textContent = `Общий лимит (${currencyLabel(currency)})`;
  const rate = CURRENCY_OPTIONS[currency]?.rate || 1;
  refs.budgetAmount.value = budget ? String(budget.amount / rate) : "";
  refs.budgetStart.value = formatDateForInput(budget?.startDate || getTodayISO());
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  const localMonthEnd = `${monthEnd.getFullYear()}-${String(monthEnd.getMonth() + 1).padStart(2, "0")}-${String(monthEnd.getDate()).padStart(2, "0")}`;
  refs.budgetEnd.value = formatDateForInput(budget?.endDate || localMonthEnd);
  refs.budgetCurrencySymbol.textContent = currencyLabel(currency);
  renderBudgetCategoryFields(budget);
  refs.budgetForm.hidden = false;
  refs.budgetForm.scrollIntoView({ behavior: "smooth", block: "center" });
  refs.budgetName.focus();
}

function closeBudgetForm() {
  refs.budgetForm.hidden = true;
  editingBudgetId = null;
}

function setBudgetFormError(message) {
  refs.budgetFormError.textContent = message;
  refs.budgetFormError.hidden = !message;
}

function saveBudgetFromForm(event) {
  event.preventDefault();
  const name = refs.budgetName.value.trim();
  const amountInput = Number(refs.budgetAmount.value);
  const currency = refs.budgetCurrency.value;
  const rate = CURRENCY_OPTIONS[currency]?.rate || 1;
  if (!name) return setBudgetFormError("Введите название бюджета.");
  if (!Number.isFinite(amountInput) || amountInput <= 0) return setBudgetFormError("Общий лимит должен быть больше нуля.");
  const startDate = parseDateInput(refs.budgetStart.value);
  const endDate = parseDateInput(refs.budgetEnd.value);
  if (!startDate || !endDate) return setBudgetFormError("Введите корректные даты в формате ДД.ММ.ГГГГ.");
  if (endDate < startDate) return setBudgetFormError("Дата окончания должна быть не раньше даты начала.");
  const selected = [...refs.budgetCategories.querySelectorAll("[data-budget-category]:checked")];
  if (!selected.length) return setBudgetFormError("Выберите хотя бы одну категорию.");
  const categories = selected.map((check) => {
    const categoryName = check.dataset.budgetCategory;
    const valueInput = [...refs.budgetCategories.querySelectorAll("[data-budget-value]")]
      .find((input) => input.dataset.budgetValue === categoryName);
    const mode = refs.budgetCategories.querySelector(`[data-budget-mode="${categoryName}"]`)?.value || "percent";
    const value = valueInput?.value === "" ? NaN : Number(valueInput?.value);
    const categoryAmount = mode === "amount" ? value * rate : amountInput * value / 100 * rate;
    return { name: categoryName, amount: categoryAmount };
  });
  if (categories.some((entry) => !Number.isFinite(entry.amount) || entry.amount < 0)) return setBudgetFormError("Укажите корректный лимит для каждой выбранной категории.");
  const amount = amountInput * rate;
  const allocatedAmount = categories.reduce((sum, entry) => sum + entry.amount, 0);
  if (allocatedAmount > amount + 0.000001) return setBudgetFormError("Сумма лимитов категорий не может превышать общий лимит.");
  const budget = { id: editingBudgetId || `budget-${Date.now()}`, name, amount, currency, startDate, endDate, categories: categories.map(({ name: categoryName, amount: categoryAmount }) => ({ name: categoryName, amount: categoryAmount })) };
  const index = categoryBudgets.findIndex((entry) => entry.id === budget.id);
  const nextBudgets = [...categoryBudgets];
  if (index >= 0) nextBudgets[index] = budget;
  else nextBudgets.unshift(budget);
  if (!saveCategoryBudgets(nextBudgets)) return setBudgetFormError("Не удалось сохранить бюджет в этом браузере. Освободите место в хранилище или проверьте его настройки.");
  selectedBudgetId = budget.id;
  closeBudgetForm();
  renderCategoryBudgets();
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    return false;
  }
}

function setSessionUser(user) {
  state.user = user;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ phone: user.phone, name: user.name }));
  } catch (error) {
    // Keep the current login working if this browser cannot persist the session.
  }
  renderCurrentAccount();
}

function clearSessionUser() {
  state.user = null;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    // The authentication screen can still be shown if storage is unavailable.
  }
  renderCurrentAccount();
}

function renderCurrentAccount() {
  if (refs.currentAccountDetails) {
    refs.currentAccountDetails.textContent = state.user
      ? `${state.user.name} · ${formatPhoneInput(state.user.phone)}`
      : "";
  }
}

function getTodayISO() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateForInput(dateISO) {
  if (!dateISO) {
    return "";
  }

  const [year, month, day] = dateISO.split("-").map((part) => Number(part));
  if (!year || !month || !day) {
    return "";
  }

  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

function normalizeDateInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

function parseDateInput(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) {
    return "";
  }

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  if (month < 1 || month > 12 || day < 1 || day > 31 || year <= 0) {
    return "";
  }

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const maxDayInMonth = month === 2 && isLeapYear ? 29 : monthDays[month - 1];

  if (day > maxDayInMonth) {
    return "";
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function updateType(type) {
  state.currentType = type;
  if (refs.operationBudgetField) refs.operationBudgetField.hidden = type !== "expense";
  refs.formNotice.hidden = true;

  refs.typeButtons.forEach((button) => {
    const isActive = button.dataset.type === type;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  populateCategoryOptions(type);
  renderOperationLimitHint();
}

function populateCategoryOptions(type) {
  const options = CATEGORY_OPTIONS[type];
  refs.categorySelect.innerHTML = '<option value="">Выберите категорию</option>';

  options.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    refs.categorySelect.appendChild(option);
  });

  refs.categorySelect.setAttribute("aria-invalid", "false");
  refs.categorySelect.value = "";
}

function populateFilterCategoryOptions() {
  const type = refs.typeFilter.value;
  const options = type === "all" ? ALL_CATEGORIES : CATEGORY_OPTIONS[type];

  refs.categoryFilter.innerHTML = '<option value="all">Все категории</option>';

  options.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    refs.categoryFilter.appendChild(option);
  });
}

function clearFormErrors() {
  dismissOperationErrorNotification();
  document.querySelectorAll(".field-error").forEach((element) => {
    element.textContent = "";
  });

  refs.amountInput.setAttribute("aria-invalid", "false");
  refs.categorySelect.setAttribute("aria-invalid", "false");
  refs.dateInput.setAttribute("aria-invalid", "false");
}

function setFieldError(fieldName, message) {
  const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);
  const fieldMap = {
    amount: refs.amountInput,
    category: refs.categorySelect,
    date: refs.dateInput
  };

  if (errorNode) {
    errorNode.textContent = message;
  }

  const field = fieldMap[fieldName];
  if (field) {
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }
}

function validateDateField() {
  const value = refs.dateInput.value.trim();
  const errorNode = document.querySelector('[data-error-for="date"]');

  if (!value) {
    if (errorNode) {
      errorNode.textContent = "";
    }
    refs.dateInput.setAttribute("aria-invalid", "false");
    return true;
  }

  if (!value.includes(".")) {
    if (errorNode) {
      errorNode.textContent = "";
    }
    refs.dateInput.setAttribute("aria-invalid", "false");
    return true;
  }

  const isValid = Boolean(parseDateInput(value));

  if (isValid) {
    if (errorNode) {
      errorNode.textContent = "";
    }
    refs.dateInput.setAttribute("aria-invalid", "false");
    return true;
  }

  if (errorNode) {
    const message = "Укажите дату в формате ДД.ММ.ГГГГ";
    if (errorNode.textContent !== message) errorNode.textContent = message;
  }
  refs.dateInput.setAttribute("aria-invalid", "true");
  return false;
}

function validateForm() {
  clearFormErrors();
  refs.formNotice.hidden = true;
  refs.formNotice.textContent = "";

  let isValid = true;
  const amountValue = String(refs.amountInput.value).trim();
  const amount = Number(amountValue);
  const categoryValue = refs.categorySelect.value;
  const dateValue = parseDateInput(refs.dateInput.value);

  if (!amountValue || !Number.isFinite(amount) || amount <= 0) {
    setFieldError("amount", "Введите корректную положительную сумму");
    isValid = false;
  } else if (amount > 1000000000) {
    setFieldError("amount", "Максимальная сумма операции — 1 000 000 000");
    isValid = false;
  } else if (state.currentType === "expense" && amount > getCurrentBalance(editingOperationId) + 0.000001) {
    refs.formNotice.textContent = "Недостаточно средств на балансе для этого расхода.";
    refs.formNotice.hidden = false;
    isValid = false;
  }

  if (!categoryValue) {
    setFieldError("category", "Выберите категорию");
    isValid = false;
  }

  if (!dateValue) {
    setFieldError("date", "Укажите дату в формате ДД.ММ.ГГГГ");
    isValid = false;
  }

  const selectedBudget = refs.operationBudgetSelect?.value
    ? categoryBudgets.find((budget) => String(budget.id) === refs.operationBudgetSelect.value)
    : null;
  if (state.currentType === "expense" && selectedBudget && dateValue) {
    const startDate = normalizeBudgetDate(selectedBudget.startDate);
    const endDate = normalizeBudgetDate(selectedBudget.endDate);
    if (dateValue < startDate || dateValue > endDate) {
      refs.formNotice.textContent = `Дата расхода должна попадать в период бюджета «${selectedBudget.name}» (${formatDateForInput(startDate)} — ${formatDateForInput(endDate)}).`;
      refs.formNotice.hidden = false;
      isValid = false;
    }
  }

  if (state.currentType === "expense" && amountValue && Number.isFinite(amount) && amount > 0 && dateValue && state.spendingLimit.amount > 0) {
    const usage = getSpendingUsage(dateValue, editingOperationId);
    const daily = usage && getDailySpendingAllowance(usage, dateValue, editingOperationId);
    if (daily && amount > daily.remaining + 0.000001) {
      refs.formNotice.textContent = "Вы превышаете дневную сумму.";
      refs.formNotice.hidden = false;
      isValid = false;
    }
  }

  if (state.currentType === "expense" && amountValue && Number.isFinite(amount) && amount > 0 && categoryValue && dateValue) {
    const budgetsToCheck = selectedBudget ? [selectedBudget] : categoryBudgets;
    const overLimit = budgetsToCheck
      .filter((budget) => normalizeBudgetDate(budget.startDate) <= dateValue
        && normalizeBudgetDate(budget.endDate) >= dateValue)
      .flatMap((budget) => {
        const entry = (budget.categories || []).find((item) => sameBudgetCategory(item.name, categoryValue));
        if (!entry) return [];
        const exceededBy = getBudgetCategorySpent(budget, entry.name, editingOperationId) + amount - Number(entry.amount || 0);
        return exceededBy > 0.000001 ? [{ budget, exceededBy }] : [];
      });

    if (overLimit.length) {
      refs.formNotice.textContent = overLimit
        .map(({ budget, exceededBy }) => `Расход не добавлен: лимит категории «${categoryValue}» в бюджете «${budget.name}» будет превышен на ${formatBudgetMoney(exceededBy, budget.currency)}.`)
        .join(" ");
      refs.formNotice.hidden = false;
      isValid = false;
    }
  }

  renderOperationLimitHint();

  return isValid;
}

function getCurrentBalance(excludedOperationId = null) {
  const operationBalance = operations.reduce((balance, operation) => {
    if (excludedOperationId !== null && operation.id === excludedOperationId) return balance;
    const amount = Number(operation.amount) || 0;
    return balance + (operation.type === "income" ? amount : -amount);
  }, 0);
  return operationBalance + (Number(state.spendingLimit.amount) || 0);
}

const SPENDING_PERIOD_LABELS = {
  week: "неделю",
  month: "месяц",
  "2months": "2 месяца",
  "3months": "3 месяца",
  year: "год"
};

function getCalendarPeriodRange(period, dateISO = getTodayISO()) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  let start;
  let end;
  if (period === "week") {
    start = new Date(date);
    start.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
    end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);
  } else {
    const months = period === "2months" ? 2 : period === "3months" ? 3 : period === "year" ? 12 : 1;
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const startMonth = Math.floor(month / months) * months;
    start = new Date(Date.UTC(year, startMonth, 1));
    end = new Date(Date.UTC(year, startMonth + months, 1));
  }
  const toISO = (value) => value.toISOString().slice(0, 10);
  return { start: toISO(start), end: toISO(end) };
}

function addMonthsToAnchor(anchorISO, monthOffset) {
  const [anchorYear, anchorMonth, anchorDay] = anchorISO.split("-").map(Number);
  const absoluteMonth = anchorMonth - 1 + monthOffset;
  const year = anchorYear + Math.floor(absoluteMonth / 12);
  const month = ((absoluteMonth % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(anchorDay, lastDay))).toISOString().slice(0, 10);
}

function getSpendingPeriodRange(period, dateISO = getTodayISO()) {
  const anchorISO = state.spendingLimit.startDate || getTodayISO();
  if (dateISO < anchorISO) return null;

  if (period === "week") {
    const dayDifference = Math.floor((Date.parse(`${dateISO}T00:00:00Z`) - Date.parse(`${anchorISO}T00:00:00Z`)) / 86400000);
    const cycle = Math.floor(dayDifference / 7);
    const startDate = new Date(Date.parse(`${anchorISO}T00:00:00Z`) + cycle * 7 * 86400000).toISOString().slice(0, 10);
    const endDate = new Date(Date.parse(`${startDate}T00:00:00Z`) + 7 * 86400000).toISOString().slice(0, 10);
    return { start: startDate, end: endDate };
  }

  const monthsPerPeriod = period === "2months" ? 2 : period === "3months" ? 3 : period === "year" ? 12 : 1;
  const [anchorYear, anchorMonth] = anchorISO.split("-").map(Number);
  const [year, month] = dateISO.split("-").map(Number);
  const monthDifference = (year - anchorYear) * 12 + month - anchorMonth;
  let cycle = Math.max(0, Math.floor(monthDifference / monthsPerPeriod));
  let start = addMonthsToAnchor(anchorISO, cycle * monthsPerPeriod);
  if (dateISO < start && cycle > 0) {
    cycle -= 1;
    start = addMonthsToAnchor(anchorISO, cycle * monthsPerPeriod);
  }
  let end = addMonthsToAnchor(anchorISO, (cycle + 1) * monthsPerPeriod);
  while (dateISO >= end) {
    cycle += 1;
    start = end;
    end = addMonthsToAnchor(anchorISO, (cycle + 1) * monthsPerPeriod);
  }
  return { start, end };
}

function getSpendingUsage(dateISO = getTodayISO(), excludedOperationId = null) {
  const { amount, period } = state.spendingLimit;
  if (!amount) return null;
  const range = getSpendingPeriodRange(period, dateISO);
  if (!range) return null;
  const spent = operations
    .filter((operation) => operation.id !== excludedOperationId && operation.type === "expense" && operation.date >= range.start && operation.date < range.end)
    .reduce((sum, operation) => sum + (Number(operation.amount) || 0), 0);
  return { range, amount, spent, remaining: amount - spent };
}

function getDailySpendingAllowance(usage, dateISO, excludedOperationId = null) {
  if (!usage) return null;
  const periodDays = Math.max(1, (Date.parse(`${usage.range.end}T00:00:00Z`) - Date.parse(`${usage.range.start}T00:00:00Z`)) / 86400000);
  const dailyCap = state.spendingLimit.dailyAmount > 0
    ? state.spendingLimit.dailyAmount
    : usage.amount / periodDays;
  const spentThatDay = operations
    .filter((operation) => operation.id !== excludedOperationId && operation.type === "expense" && operation.date === dateISO
      && operation.date >= usage.range.start && operation.date < usage.range.end)
    .reduce((sum, operation) => sum + (Number(operation.amount) || 0), 0);
  return {
    cap: dailyCap,
    spent: spentThatDay,
    remaining: Math.max(0, Math.min(dailyCap - spentThatDay, usage.remaining))
  };
}

function renderOperationLimitHint() {
  if (!refs.operationLimitHint) return;
  const isExpense = state.currentType === "expense";
  const dateISO = parseDateInput(refs.dateInput.value);
  const category = refs.categorySelect.value;
  const amount = Number(refs.amountInput.value) || 0;
  const selectedBudgetId = refs.operationBudgetSelect?.value;
  const categoryBudgetsForOperation = isExpense && dateISO && category
    ? categoryBudgets.filter((budget) => (!selectedBudgetId || String(budget.id) === selectedBudgetId)
      && normalizeBudgetDate(budget.startDate) <= dateISO && normalizeBudgetDate(budget.endDate) >= dateISO
      && (budget.categories || []).some((entry) => sameBudgetCategory(entry.name, category)))
    : [];
  const active = isExpense && (state.spendingLimit.amount > 0 || categoryBudgetsForOperation.length > 0);
  refs.operationLimitHint.hidden = !active;
  refs.operationLimitHint.classList.remove("is-blocked");
  if (!active) return;

  const messages = [];
  categoryBudgetsForOperation.forEach((budget) => {
    const entry = budget.categories.find((item) => sameBudgetCategory(item.name, category));
    const spentAfterOperation = getBudgetCategorySpent(budget, category, editingOperationId) + amount;
    const remaining = entry.amount - spentAfterOperation;
    const percent = entry.amount > 0 ? spentAfterOperation / entry.amount * 100 : 0;
    const status = remaining < 0
      ? `после операции превышение ${formatBudgetMoney(Math.abs(remaining), budget.currency)}`
      : `останется ${formatBudgetMoney(remaining, budget.currency)}`;
    messages.push(`План «${budget.name}», ${category}: ${formatBudgetMoney(spentAfterOperation, budget.currency)} из ${formatBudgetMoney(entry.amount, budget.currency)} (${percent.toFixed(1)}%), ${status}.`);
  });

  if (state.spendingLimit.amount <= 0) {
    refs.operationLimitHint.textContent = messages.join(" ");
    return;
  }

  if (!dateISO) {
    messages.unshift("Лимит будет рассчитан после выбора даты операции.");
    refs.operationLimitHint.textContent = messages.join(" ");
    return;
  }
  const usage = getSpendingUsage(dateISO, editingOperationId);
  if (!usage) {
    messages.unshift(`Лимит начнет действовать с ${formatDateForInput(state.spendingLimit.startDate)}. Эта операция указана раньше срока.`);
    refs.operationLimitHint.textContent = messages.join(" ");
    return;
  }
  const daily = getDailySpendingAllowance(usage, dateISO, editingOperationId);
  if (amount > daily.remaining + 0.000001) {
    messages.unshift("Вы превышаете дневную сумму.");
    refs.operationLimitHint.classList.add("is-blocked");
  } else {
    messages.unshift(`На этот день доступно ${formatMoney(daily.remaining)} из ${formatMoney(daily.cap)}${amount > 0 ? `. После операции останется ${formatMoney(Math.max(0, daily.remaining - amount))}` : ""}.`);
  }
  refs.operationLimitHint.textContent = messages.join(" ");
}

function renderSpendingLimit() {
  const { amount, period } = state.spendingLimit;
  refs.spendingLimitAmount.value = amount || "";
  refs.spendingDailyAmount.value = state.spendingLimit.dailyAmount || "";
  refs.spendingLimitPeriod.value = period;
  if (!amount) {
    refs.spendingLimitStatus.textContent = "Установите лимит, чтобы отслеживать расходы за период.";
    refs.spendingLimitRemaining.textContent = "—";
    refs.spendingLimitDays.textContent = "—";
    refs.spendingLimitDaily.textContent = "—";
    refs.spendingLimitSpent.textContent = "—";
    refs.spendingLimitHint.textContent = "После установки общего лимита расходы сверх дневного или общего остатка будут отклоняться.";
    refs.spendingLimitProgress.style.width = "0%";
    refs.spendingLimitProgress.classList.remove("is-over-limit");
    refs.spendingLimitProgress.parentElement.setAttribute("aria-valuenow", "0");
    refs.spendingLimitProgress.parentElement.classList.remove("is-over-limit");
    renderOperationLimitHint();
    return;
  }
  const usage = getSpendingUsage();
  if (!usage) return;
  const { range, spent } = usage;
  const remaining = amount - spent;
  const percent = Math.max(0, Math.min((spent / amount) * 100, 100));
  const lastDay = new Date(`${range.end}T00:00:00Z`);
  lastDay.setUTCDate(lastDay.getUTCDate() - 1);
  const today = new Date(`${getTodayISO()}T00:00:00Z`);
  const daysLeft = Math.max(0, Math.ceil((lastDay.getTime() - today.getTime()) / 86400000) + 1);
  const available = Math.max(0, remaining);
  const dailyAllowance = getDailySpendingAllowance(usage, getTodayISO());
  refs.spendingLimitStatus.textContent = `Текущий период: ${formatDateForInput(range.start)}–${formatDateForInput(lastDay.toISOString().slice(0, 10))} · ${SPENDING_PERIOD_LABELS[period]}.`;
  refs.spendingLimitRemaining.textContent = formatMoney(available);
  refs.spendingLimitDays.textContent = String(daysLeft);
  refs.spendingLimitDaily.textContent = formatMoney(dailyAllowance.remaining);
  refs.spendingLimitSpent.textContent = formatMoney(spent);
  refs.spendingLimitHint.textContent = remaining < 0
    ? `Лимит превышен на ${formatMoney(-remaining)}. Новые расходы будут заблокированы.`
    : `Равномерный дневной лимит — ${formatMoney(dailyAllowance.cap)}. На сегодня осталось ${formatMoney(dailyAllowance.remaining)}; неиспользованная дневная сумма не переносится.`;
  refs.spendingLimitProgress.style.width = `${percent}%`;
  refs.spendingLimitProgress.classList.toggle("is-over-limit", remaining < 0);
  refs.spendingLimitProgress.parentElement.setAttribute("aria-valuenow", String(Math.round(percent)));
  refs.spendingLimitProgress.parentElement.classList.toggle("is-over-limit", remaining < 0);
  renderOperationLimitHint();
}

function validateSpendingLimitDraft() {
  const amount = Number(refs.spendingLimitAmount.value);
  const dailyText = refs.spendingDailyAmount.value.trim();
  const dailyAmount = Number(dailyText);
  let message = "";
  if (dailyText && (!Number.isFinite(dailyAmount) || dailyAmount <= 0)) {
    message = "Введите дневной лимит больше нуля или оставьте поле пустым.";
  } else if (dailyText && (!Number.isFinite(amount) || amount <= 0)) {
    message = "Сначала задайте общий лимит.";
  } else if (dailyText && dailyAmount > amount) {
    message = "Дневной лимит не может быть больше общего лимита.";
  }
  if (refs.spendingLimitError.textContent !== message) refs.spendingLimitError.textContent = message;
  refs.spendingLimitError.hidden = !message;
  return !message;
}

function calculateTotals() {
  const recordedIncome = operations
    .filter((operation) => operation.type === "income")
    .reduce((sum, operation) => sum + Number(operation.amount || 0), 0);
  const income = recordedIncome + (Number(state.spendingLimit.amount) || 0);

  const expense = operations
    .filter((operation) => operation.type === "expense")
    .reduce((sum, operation) => sum + Number(operation.amount || 0), 0);

  const balance = income - expense;

  refs.incomeSummary.textContent = formatMoney(income);
  refs.incomeLimitNote.hidden = !(state.spendingLimit.amount > 0);
  refs.expenseSummary.textContent = formatMoney(expense);
  refs.balanceSummary.textContent = formatMoney(balance);

  renderAnalytics({ income, expense, balance });
  renderCategories();
  renderCurrentAccount();
  renderSpendingLimit();

  return { income, expense, balance };
}

function renderAnalytics(totals) {
  refs.analyticsIncome.textContent = formatMoney(totals.income);
  refs.analyticsIncomeLimitNote.hidden = !(state.spendingLimit.amount > 0);
  refs.analyticsExpense.textContent = formatMoney(totals.expense);
  refs.analyticsBalance.textContent = formatMoney(totals.balance);
  refs.analyticsOperationTotal.textContent = String(operations.length);
  refs.analyticsOperationsCount.textContent = operations.length
    ? `Всего записей: ${operations.length} · Доходов: ${operations.filter((item) => item.type === "income").length} · Расходов: ${operations.filter((item) => item.type === "expense").length}`
    : "Пока нет операций. Добавьте первую запись на главной странице.";

  const expensesByCategory = operations
    .filter((operation) => operation.type === "expense")
    .reduce((totalsByCategory, operation) => {
      totalsByCategory.set(
        operation.category,
        (totalsByCategory.get(operation.category) || 0) + Number(operation.amount || 0)
      );
      return totalsByCategory;
    }, new Map());
  const sortedCategories = [...expensesByCategory.entries()].sort((a, b) => b[1] - a[1]);
  refs.categoryBreakdown.replaceChildren();

  if (!sortedCategories.length) {
    const empty = document.createElement("p");
    empty.className = "analytics-note";
    empty.textContent = "Расходов пока нет.";
    refs.categoryBreakdown.appendChild(empty);
    return;
  }

  const maxAmount = sortedCategories[0][1];
  sortedCategories.forEach(([category, amount]) => {
    const row = document.createElement("div");
    row.className = "category-row";

    const heading = document.createElement("div");
    heading.className = "category-row-heading";
    const name = document.createElement("span");
    name.textContent = category;
    const value = document.createElement("strong");
    value.textContent = formatMoney(amount);
    heading.append(name, value);

    const track = document.createElement("div");
    track.className = "category-track";
    const bar = document.createElement("span");
    bar.style.width = `${(amount / maxAmount) * 100}%`;
    track.appendChild(bar);
    row.append(heading, track);
    refs.categoryBreakdown.appendChild(row);
  });
}

function renderCategories() {
  const totalsByCategory = new Map();

  operations.forEach((operation) => {
    const key = `${operation.type}:${operation.category}`;
    const current = totalsByCategory.get(key) || {
      category: operation.category,
      type: operation.type,
      total: 0,
      count: 0
    };
    current.total += Number(operation.amount || 0);
    current.count += 1;
    totalsByCategory.set(key, current);
  });

  refs.allCategories.replaceChildren();
  const categoryRows = [...totalsByCategory.values()].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "expense" ? -1 : 1;
    }
    return b.total - a.total;
  });

  if (!categoryRows.length) {
    const empty = document.createElement("p");
    empty.className = "analytics-note";
    empty.textContent = "Категории появятся здесь после добавления операций.";
    refs.allCategories.appendChild(empty);
    return;
  }

  categoryRows.forEach((entry) => {
    const row = document.createElement("article");
    row.className = `category-card ${entry.type}`;

    const details = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = entry.category;
    const meta = document.createElement("p");
    meta.textContent = `${entry.type === "income" ? "Доход" : "Расход"} · ${entry.count} ${entry.count === 1 ? "операция" : "операции"}`;
    details.append(title, meta);

    const amount = document.createElement("strong");
    amount.textContent = `${entry.type === "income" ? "+ " : "− "}${formatMoney(entry.total)}`;
    row.append(details, amount);
    refs.allCategories.appendChild(row);
  });
}

function getFilteredOperations() {
  const typeFilter = refs.typeFilter.value;
  const categoryFilter = refs.categoryFilter.value;

  return [...operations]
    .filter((operation) => {
      const matchesType = typeFilter === "all" || operation.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || operation.category === categoryFilter;
      return matchesType && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderOperations() {
  const filteredOperations = getFilteredOperations();

  refs.operationsList.innerHTML = "";

  if (!filteredOperations.length) {
    refs.emptyState.hidden = false;
    return;
  }

  refs.emptyState.hidden = true;

  filteredOperations.forEach((operation) => {
    const item = document.createElement("li");
    item.className = `operation-item ${operation.type}`;

    const info = document.createElement("div");
    info.className = "operation-main";

    const title = document.createElement("h3");
    title.textContent = operation.category;

    const comment = document.createElement("p");
    comment.textContent = operation.comment ? operation.comment : "Комментарий отсутствует";

    const date = document.createElement("span");
    date.className = "operation-date";
    date.textContent = new Date(operation.date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    info.append(title, comment, date);

    const amount = document.createElement("div");
    amount.className = "amount-box";
    const sign = operation.type === "income" ? "+ " : "- ";
    amount.textContent = `${sign}${formatMoney(operation.amount)}`;

    const actions = document.createElement("div");
    actions.className = "operation-actions";
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "secondary-button operation-edit-button";
    editButton.textContent = "Изменить";
    editButton.setAttribute("aria-label", `Изменить операцию ${operation.category}`);
    editButton.addEventListener("click", () => openOperationForEdit(operation));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Удалить";
    deleteButton.setAttribute("aria-label", `Удалить операцию ${operation.category}`);
    deleteButton.addEventListener("click", () => {
      operationPendingDelete = operation.id;
      deleteDialogTrigger = deleteButton;
      refs.deleteOperationCategory.textContent = operation.category;
      refs.deleteOperationAmount.textContent = `${sign}${formatMoney(operation.amount)}`;
      refs.deleteOperationDialog.hidden = false;
      refs.cancelDeleteOperationBtn.focus();
    });

    actions.append(editButton, deleteButton);
    item.append(info, amount, actions);
    refs.operationsList.appendChild(item);
  });
}

function renderApp() {
  calculateTotals();
  renderOperations();
  renderCategoryBudgets();
}

function closeDeleteOperationDialog(restoreFocus = true) {
  refs.deleteOperationDialog.hidden = true;
  operationPendingDelete = null;

  if (restoreFocus && deleteDialogTrigger && deleteDialogTrigger.isConnected) {
    deleteDialogTrigger.focus();
  }
  deleteDialogTrigger = null;
}

function confirmDeleteOperation() {
  if (operationPendingDelete === null) {
    return;
  }

  operations = operations.filter((entry) => entry.id !== operationPendingDelete);
  saveOperations();
  closeDeleteOperationDialog(false);
  renderApp();
  const addOperationButton = document.querySelector("[data-open-form]");
  if (addOperationButton) {
    addOperationButton.focus();
  }
}

function showSection(sectionName) {
  const targetView = Array.from(refs.views).find((view) => view.id === `${sectionName}View`);
  const targetButton = Array.from(refs.navButtons).find((button) => button.dataset.section === sectionName);

  // Keep an invalid/stale navigation value from hiding every section.
  if (!targetView || !targetButton) return;

  refs.views.forEach((view) => {
    view.hidden = view !== targetView;
  });

  refs.navButtons.forEach((button) => {
    const isActive = button === targetButton;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delegate section changes from the application shell so navigation keeps
// working independently of the other form and dialog event bindings.
refs.appShell.addEventListener("click", (event) => {
  const button = event.target.closest(".mobile-nav-button[data-section]");
  if (!button || !refs.appShell.contains(button)) return;
  showSection(button.dataset.section);
});

function toggleForm(show) {
  if (show) {
    populateOperationBudgetOptions();
    if (!refs.dialog.open) {
      refs.dialog.showModal();
    }
    refs.amountInput.focus();
  } else if (refs.dialog.open) {
    refs.dialog.close();
  }
}

function populateOperationBudgetOptions() {
  if (!refs.operationBudgetSelect) return;
  const selectedBudgetId = refs.operationBudgetSelect.value;
  refs.operationBudgetSelect.replaceChildren();
  const automatic = document.createElement("option");
  automatic.value = "";
  automatic.textContent = "Определить по дате операции";
  refs.operationBudgetSelect.append(automatic);
  categoryBudgets.forEach((budget) => {
    const option = document.createElement("option");
    option.value = String(budget.id);
    option.textContent = `${budget.name} · ${formatDateForInput(normalizeBudgetDate(budget.startDate))} — ${formatDateForInput(normalizeBudgetDate(budget.endDate))}`;
    refs.operationBudgetSelect.append(option);
  });
  refs.operationBudgetSelect.value = categoryBudgets.some((budget) => String(budget.id) === selectedBudgetId)
    ? selectedBudgetId
    : "";
}

function clearForm() {
  refs.amountInput.value = "";
  refs.commentInput.value = "";
  refs.dateInput.value = formatDateForInput(getTodayISO());
  clearFormErrors();
  editingOperationId = null;
  refs.formHeading.textContent = "Добавить операцию";
  refs.form.querySelector('[type="submit"]').textContent = "Добавить";
  updateType("income");
  if (refs.operationBudgetSelect) refs.operationBudgetSelect.value = "";
}

function openOperationForEdit(operation) {
  clearForm();
  editingOperationId = operation.id;
  populateOperationBudgetOptions();
  updateType(operation.type);
  refs.amountInput.value = String(operation.amount);
  refs.categorySelect.value = operation.category;
  refs.dateInput.value = formatDateForInput(normalizeBudgetDate(operation.date));
  refs.commentInput.value = operation.comment || "";
  refs.operationBudgetSelect.value = operation.budgetId ? String(operation.budgetId) : "";
  refs.formHeading.textContent = "Изменить операцию";
  refs.form.querySelector('[type="submit"]').textContent = "Сохранить изменения";
  renderOperationLimitHint();
  toggleForm(true);
}

function resetForm() {
  clearForm();
  toggleForm(false);
}

function handleSubmit(event) {
  event.preventDefault();

  const normalizedDate = parseDateInput(refs.dateInput.value);
  refs.dateInput.value = normalizedDate ? formatDateForInput(normalizedDate) : refs.dateInput.value;

  if (!validateForm()) {
    return;
  }

  const editedOperation = editingOperationId !== null
    ? operations.find((operation) => operation.id === editingOperationId)
    : null;
  const newOperation = {
    id: editedOperation?.id ?? Date.now(),
    type: state.currentType,
    amount: Number(refs.amountInput.value),
    category: refs.categorySelect.value,
    date: parseDateInput(refs.dateInput.value),
    comment: refs.commentInput.value.trim()
  };
  const selectedBudgetId = refs.operationBudgetSelect?.value;
  if (state.currentType === "expense" && selectedBudgetId) newOperation.budgetId = selectedBudgetId;

  operations = editedOperation
    ? operations.map((operation) => operation.id === editingOperationId ? newOperation : operation)
    : [newOperation, ...operations];
  saveOperations();
  resetForm();
  renderApp();
}

function setAuthMode(mode) {
  state.authMode = mode;
  refs.authTabs.forEach((button) => {
    const isActive = button.dataset.authMode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  refs.authScreen.classList.toggle("register", mode === "register");
  refs.authScreen.classList.toggle("login", mode === "login");
  refs.authSubmitBtn.textContent = mode === "register" ? "Зарегистрироваться" : "Войти";
  refs.authError.textContent = "";

  refs.authName.value = refs.authName.value.trim();
  refs.authPhone.value = refs.authPhone.value.trim();
  refs.authPassword.value = refs.authPassword.value.trim();
  refs.authConfirmPassword.value = refs.authConfirmPassword.value.trim();
}

function getPhoneDigits(value) {
  const text = String(value || "").trim();
  let digits = text.replace(/\D/g, "");

  if (text.startsWith("+7")) {
    digits = digits.slice(1);
    if (digits.length > 10 && digits.startsWith("7")) digits = digits.slice(1);
  } else if (digits.length > 10 && digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  const localDigits = digits.slice(0, 10);
  return localDigits.length === 10 ? `7${localDigits}` : localDigits;
}

function formatPhoneInput(value) {
  const text = String(value || "").trim();
  let digits = text.replace(/\D/g, "");

  if (text.startsWith("+7")) {
    digits = digits.slice(1);
    if (digits.length > 10 && digits.startsWith("7")) digits = digits.slice(1);
  } else if (digits.length > 10 && digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);
  const areaCode = digits.slice(0, 3);
  const firstGroup = digits.slice(3, 6);
  const secondGroup = digits.slice(6, 10);

  let formatted = "+7";
  if (areaCode) {
    formatted += ` (${areaCode})`;
  }
  if (firstGroup) {
    formatted += ` ${firstGroup}`;
  }
  if (secondGroup) {
    formatted += ` ${secondGroup}`;
  }

  return formatted;
}

function getPhoneCaretPosition(value, digitCount) {
  if (digitCount <= 0) {
    return 3;
  }

  let digitsSeen = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (/\d/.test(value[index])) {
      digitsSeen += 1;
      if (digitsSeen === digitCount) {
        return index + 1;
      }
    }
  }

  return value.length;
}

function sanitizeName(value) {
  return String(value || "")
    .replace(/[0-9]/g, "")
    .replace(/^(\s*)(\p{L})/u, (_, leadingSpace, firstLetter) => (
      `${leadingSpace}${firstLetter.toLocaleUpperCase("ru-RU")}`
    ));
}

function validateAuthForm() {
  const name = refs.authName.value.trim();
  const phone = getPhoneDigits(refs.authPhone.value);
  const password = refs.authPassword.value.trim();
  const confirmPassword = refs.authConfirmPassword.value.trim();

  const requiredValues = state.authMode === "register"
    ? [name, phone, password, confirmPassword]
    : [phone, password];

  if (requiredValues.every((value) => !value)) {
    refs.authError.textContent = "Заполните поля.";
    return false;
  }

  if (state.authMode === "register") {
    if (!name) {
      refs.authError.textContent = "Введите имя.";
      return false;
    }
    if (name.length < 2) {
      refs.authError.textContent = "Имя должно содержать не менее 2 символов.";
      return false;
    }
  }

  if (!phone) {
    refs.authError.textContent = "Введите номер.";
    return false;
  }
  if (phone.length !== 11 || !phone.startsWith("7")) {
    refs.authError.textContent = "Введите корректный номер телефона.";
    return false;
  }

  if (!password) {
    refs.authError.textContent = "Введите пароль.";
    return false;
  }
  if (password.length < 6) {
    refs.authError.textContent = "Введите пароль (не менее 6 символов).";
    return false;
  }

  if (state.authMode === "register") {
    if (!confirmPassword) {
      refs.authError.textContent = "Подтвердите пароль.";
      return false;
    }
    if (password !== confirmPassword) {
      refs.authError.textContent = "Повторите пароль правильно.";
      return false;
    }
  }

  return true;
}

function handleAuthSubmit(event) {
  event.preventDefault();
  refs.authError.textContent = "";

  if (!validateAuthForm()) {
    return;
  }

  const users = getUsers();
  const name = refs.authName.value.trim();
  const phone = getPhoneDigits(refs.authPhone.value);
  const password = refs.authPassword.value.trim();

  if (state.authMode === "register") {
    const existingUser = users.find((user) => getPhoneDigits(user.phone) === phone);
    if (existingUser) {
      refs.authError.textContent = "Пользователь с таким номером уже существует.";
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      phone,
      password
    };

    users.push(newUser);
    if (!saveUsers(users)) {
      refs.authError.textContent = "Не удалось сохранить аккаунт в этом браузере. Проверьте настройки хранения данных и попробуйте снова.";
      return;
    }
    enterAppAfterAuthentication(newUser);
    return;
  }

  if (state.authMode === "login" && !users.some((item) => getPhoneDigits(item.phone) === phone)) {
    refs.authError.textContent = "Аккаунт с таким номером не найден. Зарегистрируйтесь.";
    return;
  }

  let user = users.find((item) => getPhoneDigits(item.phone) === phone && item.password === password);
  if (!user) {
    refs.authError.textContent = "Неверный номер или пароль.";
    return;
  }

  if (user.phone !== phone) {
    user = { ...user, phone };
    const migratedUsers = users.map((item) => item.id === user.id ? user : item);
    if (!saveUsers(migratedUsers)) {
      refs.authError.textContent = "Не удалось обновить номер аккаунта в хранилище браузера. Проверьте настройки хранения данных и попробуйте снова.";
      return;
    }
  }

  enterAppAfterAuthentication(user);
}

function enterAppAfterAuthentication(user) {
  setSessionUser(user);
  refs.authSubmitBtn.disabled = true;
  refs.authScreen.classList.add("is-exiting");

  window.setTimeout(() => {
    refs.authScreen.hidden = true;
    refs.authScreen.classList.remove("is-exiting");
    refs.appShell.hidden = false;
    refs.appShell.classList.add("is-entering");
    init();

    refs.appShell.addEventListener("animationend", () => {
      refs.appShell.classList.remove("is-entering");
    }, { once: true });
  }, 220);
}

function returnToAuthentication(mode, addingAccount = false) {
  bindAuthEvents();
  clearSessionUser();
  refs.appShell.hidden = true;
  refs.authScreen.classList.remove("is-exiting");
  refs.authScreen.hidden = false;
  refs.authScreen.classList.toggle("add-account-mode", addingAccount);
  refs.authForm.reset();
  refs.authError.textContent = "";
  refs.authSubmitBtn.disabled = false;
  setAuthMode(mode);
  refs.authEyebrow.textContent = addingAccount ? "УПРАВЛЕНИЕ АККАУНТАМИ" : "СЧЕТЧИК БЮДЖЕТА";
  refs.authHeading.textContent = addingAccount ? "Добавьте новый аккаунт" : "Budget Monster";
  if (addingAccount) {
    refs.authSubmitBtn.textContent = "Добавить аккаунт";
  }
}

function openAccountSwitcher() {
  if (!state.user) {
    return;
  }

  refs.switcherAccountName.textContent = state.user.name;
  refs.switcherAccountPhone.textContent = formatPhoneInput(state.user.phone);
  renderSavedAccounts();
  refs.accountSwitcherDialog.hidden = false;
  refs.closeAccountSwitcherBtn.focus();
}

function renderSavedAccounts() {
  const previousAccounts = getUsers().filter((user) => user.phone !== state.user?.phone);
  refs.savedAccountsList.replaceChildren();
  refs.noSavedAccounts.hidden = previousAccounts.length > 0;
  previousAccounts.forEach((user) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "saved-account-button";
    button.dataset.accountPhone = user.phone;
    const details = document.createElement("span");
    details.className = "saved-account-details";
    const name = document.createElement("strong");
    name.textContent = user.name;
    const phone = document.createElement("small");
    phone.textContent = formatPhoneInput(user.phone);
    details.append(name, phone);
    const arrow = document.createElement("span");
    arrow.className = "saved-account-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    button.append(details, arrow);
    refs.savedAccountsList.append(button);
  });
}

function bindAuthEvents() {
  if (authEventsBound) return;
  authEventsBound = true;

  document.querySelectorAll(".password-visibility-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordTarget);
      const showPassword = input.type === "password";

      input.type = showPassword ? "text" : "password";
      button.textContent = showPassword ? "Скрыть" : "Показать";
      button.setAttribute("aria-label", showPassword ? "Скрыть пароль" : "Показать пароль");
      button.setAttribute("aria-pressed", String(showPassword));
    });
  });

  refs.authName.addEventListener("input", () => {
    refs.authName.value = sanitizeName(refs.authName.value);
  });

  refs.authPhone.addEventListener("input", () => {
    const rawValue = refs.authPhone.value;
    const rawCaret = refs.authPhone.selectionStart || 0;
    const digitsBeforeCaret = rawValue.slice(0, rawCaret).replace(/\D/g, "").length;
    const formattedValue = formatPhoneInput(rawValue);

    refs.authPhone.value = formattedValue;
    const caretPosition = getPhoneCaretPosition(formattedValue, digitsBeforeCaret);
    refs.authPhone.setSelectionRange(caretPosition, caretPosition);
  });

  refs.authPhone.addEventListener("focus", () => {
    if (!refs.authPhone.value) {
      refs.authPhone.value = "+7 ";
    }
  });

  refs.authTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setAuthMode(button.dataset.authMode);
    });
  });

  refs.authForm.addEventListener("submit", handleAuthSubmit);
}

function bindEvents() {
  if (!categoryBudgetEventsBound) {
    categoryBudgetEventsBound = true;
    Object.entries(CURRENCY_OPTIONS).forEach(([code, option]) => {
      const currencyOption = document.createElement("option");
      currencyOption.value = code;
      currencyOption.textContent = `${code} · ${option.symbol} · ${option.label}`;
      refs.budgetCurrency.append(currencyOption);
    });
    refs.budgetCurrency.addEventListener("change", () => setBudgetEditorCurrency(refs.budgetCurrency.value));
    [refs.budgetStart, refs.budgetEnd].forEach((input) => {
      input.addEventListener("input", () => {
        const formatted = normalizeDateInput(input.value);
        if (input.value !== formatted) input.value = formatted;
        setBudgetFormError("");
      });
    });
    refs.budgetFormOpen.addEventListener("click", () => openBudgetForm());
    refs.budgetForm.addEventListener("submit", saveBudgetFromForm);
    refs.budgetFormCancel.addEventListener("click", closeBudgetForm);
    refs.budgetAmount.addEventListener("input", updateBudgetAllocation);
    refs.budgetList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-budget-details]");
      if (!button) return;
      selectedBudgetId = button.dataset.budgetDetails;
      renderCategoryBudgets();
      refs.budgetDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    refs.budgetDetail.addEventListener("click", (event) => {
      const budget = categoryBudgets.find((entry) => String(entry.id) === refs.budgetDetail.dataset.budgetId);
      if (!budget) return;
      if (event.target.closest("[data-budget-edit]")) openBudgetForm(budget);
      if (event.target.closest("[data-budget-delete]")) {
        pendingBudgetDeleteId = budget.id;
        refs.budgetDeleteError.hidden = true;
        refs.budgetDeleteError.textContent = "";
        refs.budgetDeleteDialog.hidden = false;
        refs.budgetDeleteCancel.focus();
      }
    });
    const closeBudgetDeleteDialog = () => {
      refs.budgetDeleteDialog.hidden = true;
      pendingBudgetDeleteId = null;
    };
    refs.budgetDeleteCancel.addEventListener("click", closeBudgetDeleteDialog);
    refs.budgetDeleteDialog.addEventListener("click", (event) => {
      if (event.target === refs.budgetDeleteDialog) closeBudgetDeleteDialog();
    });
    refs.budgetDeleteConfirm.addEventListener("click", () => {
      const nextBudgets = categoryBudgets.filter((entry) => entry.id !== pendingBudgetDeleteId);
      if (!saveCategoryBudgets(nextBudgets)) {
        refs.budgetDeleteError.textContent = "Не удалось обновить бюджеты в хранилище браузера.";
        refs.budgetDeleteError.hidden = false;
        return;
      }
      selectedBudgetId = categoryBudgets[0]?.id ?? null;
      closeBudgetDeleteDialog();
      renderCategoryBudgets();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !refs.budgetDeleteDialog.hidden) closeBudgetDeleteDialog();
    });
  }

  refs.resetSpendingLimitBtn.addEventListener("click", () => {
    refs.resetSpendingLimitDialog.hidden = false;
    refs.cancelResetSpendingLimitBtn.focus();
  });

  function closeResetSpendingLimitDialog() {
    refs.resetSpendingLimitDialog.hidden = true;
    refs.resetSpendingLimitBtn.focus();
  }

  refs.cancelResetSpendingLimitBtn.addEventListener("click", closeResetSpendingLimitDialog);
  refs.resetSpendingLimitDialog.addEventListener("click", (event) => {
    if (event.target === refs.resetSpendingLimitDialog) closeResetSpendingLimitDialog();
  });
  refs.confirmResetSpendingLimitBtn.addEventListener("click", () => {
    state.spendingLimit = { amount: 0, dailyAmount: 0, period: "month", startDate: getTodayISO() };
    refs.spendingLimitAmount.setCustomValidity("");
    refs.spendingDailyAmount.setCustomValidity("");
    refs.spendingLimitError.textContent = "";
    refs.spendingLimitError.hidden = true;
    saveSettings();
    renderApp();
    closeResetSpendingLimitDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.resetSpendingLimitDialog.hidden) closeResetSpendingLimitDialog();
  });

  refs.spendingLimitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(refs.spendingLimitAmount.value);
    const dailyAmountText = refs.spendingDailyAmount.value.trim();
    const dailyAmount = Number(dailyAmountText);
    if (!validateSpendingLimitDraft()) return;
    if (!Number.isFinite(amount) || amount <= 0) {
      refs.spendingLimitAmount.setCustomValidity("Введите сумму больше нуля.");
      refs.spendingLimitError.textContent = "Введите сумму общего лимита больше нуля.";
      refs.spendingLimitError.hidden = false;
      return;
    }
    refs.spendingLimitAmount.setCustomValidity("");
    refs.spendingDailyAmount.setCustomValidity("");
    state.spendingLimit = {
      amount,
      dailyAmount: dailyAmountText ? dailyAmount : 0,
      period: refs.spendingLimitPeriod.value,
      startDate: getTodayISO()
    };
    saveSettings();
    renderApp();
  });
  refs.spendingLimitAmount.addEventListener("input", () => {
    refs.spendingLimitAmount.setCustomValidity("");
    validateSpendingLimitDraft();
  });
  refs.spendingDailyAmount.addEventListener("input", () => {
    refs.spendingDailyAmount.setCustomValidity("");
    validateSpendingLimitDraft();
  });

  refs.cancelDeleteOperationBtn.addEventListener("click", closeDeleteOperationDialog);
  refs.confirmDeleteOperationBtn.addEventListener("click", confirmDeleteOperation);
  refs.deleteOperationDialog.addEventListener("click", (event) => {
    if (event.target === refs.deleteOperationDialog) {
      closeDeleteOperationDialog();
    }
  });
  refs.deleteOperationDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDeleteOperationDialog();
    }
  });

  refs.typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateType(button.dataset.type);
    });
  });

  refs.amountInput.addEventListener("input", renderOperationLimitHint);
  refs.categorySelect.addEventListener("change", renderOperationLimitHint);
  refs.operationBudgetSelect.addEventListener("change", () => {
    const budget = categoryBudgets.find((entry) => String(entry.id) === refs.operationBudgetSelect.value);
    if (budget) {
      const currentDate = parseDateInput(refs.dateInput.value);
      const startDate = normalizeBudgetDate(budget.startDate);
      const endDate = normalizeBudgetDate(budget.endDate);
      if (!currentDate || currentDate < startDate || currentDate > endDate) {
        refs.dateInput.value = formatDateForInput(startDate);
      }
    }
    renderOperationLimitHint();
  });

  refs.cancelFormBtn.addEventListener("click", () => {
    resetForm();
  });

  refs.closeFormBtn.addEventListener("click", () => {
    resetForm();
  });

  refs.dialog.addEventListener("click", (event) => {
    if (event.target === refs.dialog) {
      resetForm();
    }
  });

  refs.dialog.addEventListener("close", () => {
    clearForm();
  });

  if (refs.toggleFormBtn) {
    refs.toggleFormBtn.addEventListener("click", () => {
      toggleForm(true);
    });
  }

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleForm(true);
    });
  });

  refs.dateInput.addEventListener("input", () => {
    const nextValue = normalizeDateInput(refs.dateInput.value);
    refs.dateInput.value = nextValue;

    if (!nextValue) {
      const errorNode = document.querySelector('[data-error-for="date"]');
      if (errorNode) {
        errorNode.textContent = "";
      }
      refs.dateInput.setAttribute("aria-invalid", "false");
      renderOperationLimitHint();
      return;
    }

    if (nextValue.length >= 5) {
      validateDateField();
    } else {
      const errorNode = document.querySelector('[data-error-for="date"]');
      if (errorNode) {
        errorNode.textContent = "";
      }
      refs.dateInput.setAttribute("aria-invalid", "false");
    }
    renderOperationLimitHint();
  });

  refs.dateInput.addEventListener("blur", () => {
    validateDateField();
    renderOperationLimitHint();
  });

  refs.form.addEventListener("submit", handleSubmit);
  refs.operationNotificationOk.addEventListener("click", dismissOperationErrorNotification);

  refs.typeFilter.addEventListener("change", () => {
    populateFilterCategoryOptions();
    renderOperations();
  });

  refs.categoryFilter.addEventListener("change", () => {
    renderOperations();
  });

  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveSettings();
    applyTheme();
  });

  document.querySelectorAll("[data-layout-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.layoutMode = button.dataset.layoutMode;
      saveSettings();
      applyLayoutMode();
    });
  });

  refs.clearOperationsBtn.addEventListener("click", () => {
    if (!window.confirm("Удалить все аккаунты, операции, бюджеты и настройки Budget Monster на этом устройстве? Это действие нельзя отменить.")) {
      return;
    }

    const accountDataKeys = [STORAGE_KEY, SETTINGS_KEY, BUDGETS_KEY];
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (accountDataKeys.some((baseKey) => key === baseKey || key.startsWith(`${baseKey}:`))) {
        localStorage.removeItem(key);
      }
    }
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);

    operations = [];
    categoryBudgets = [];
    selectedBudgetId = null;
    state.currency = DEFAULT_CURRENCY;
    state.theme = "dark";
    state.layoutMode = "desktop";
    state.spendingLimit = { amount: 0, dailyAmount: 0, period: "month", startDate: getTodayISO() };
    applyTheme();
    applyLayoutMode();
    returnToAuthentication("register");
  });

  refs.logoutBtn.addEventListener("click", () => {
    returnToAuthentication("register");
  });

  refs.switchAccountBtn.addEventListener("click", () => {
    openAccountSwitcher();
  });

  refs.savedAccountsList.addEventListener("click", (event) => {
    const accountButton = event.target.closest("[data-account-phone]");
    if (!accountButton) return;
    const selectedUser = getUsers().find((user) => user.phone === accountButton.dataset.accountPhone);
    if (!selectedUser) return;
    refs.accountSwitcherDialog.hidden = true;
    returnToAuthentication("login");
    refs.authPhone.value = formatPhoneInput(selectedUser.phone);
    refs.authPassword.focus();
  });

  refs.closeAccountSwitcherBtn.addEventListener("click", () => {
    refs.accountSwitcherDialog.hidden = true;
  });

  refs.accountSwitcherDialog.addEventListener("click", (event) => {
    if (event.target === refs.accountSwitcherDialog) {
      refs.accountSwitcherDialog.hidden = true;
    }
  });

  refs.addAccountBtn.addEventListener("click", () => {
    refs.accountSwitcherDialog.hidden = true;
    returnToAuthentication("register", true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.accountSwitcherDialog.hidden) {
      refs.accountSwitcherDialog.hidden = true;
    }
  });

}

function init() {
  loadSettings();
  loadCategoryBudgets();
  applyTheme();
  applyLayoutMode();
  bindCurrencyPicker();
  renderCurrencyPicker();
  loadOperations();
  refs.dateInput.value = formatDateForInput(getTodayISO());
  updateType("income");
  populateFilterCategoryOptions();
  bindEvents();
  renderApp();
}

function initAuthFlow() {
  bindErrorNotifications();
  bindAuthEvents();
  try {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      const session = JSON.parse(savedSession);
      const users = getUsers();
      const user = users.find((item) => getPhoneDigits(item.phone) === getPhoneDigits(session.phone) && item.name === session.name);
      if (user) {
        state.user = user;
        refs.authScreen.hidden = true;
        refs.appShell.hidden = false;
        init();
        return;
      }
    }
  } catch (error) {
    clearSessionUser();
  }

  refs.appShell.hidden = true;
  refs.authScreen.hidden = false;
  setAuthMode("register");
}

initAuthFlow();
