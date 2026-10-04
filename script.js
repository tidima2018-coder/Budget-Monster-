const STORAGE_KEY = "budgetMonsterOperations";
const SETTINGS_KEY = "budgetMonsterSettings";
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
  dialog: document.getElementById("operationDialog"),
  accountSwitcherDialog: document.getElementById("accountSwitcherDialog"),
  deleteOperationDialog: document.getElementById("deleteOperationDialog"),
  resetAccountDialog: document.getElementById("resetAccountDialog"),
  cancelResetAccountBtn: document.getElementById("cancelResetAccountBtn"),
  confirmResetAccountBtn: document.getElementById("confirmResetAccountBtn"),
  deleteOperationCategory: document.getElementById("deleteOperationCategory"),
  deleteOperationAmount: document.getElementById("deleteOperationAmount"),
  cancelDeleteOperationBtn: document.getElementById("cancelDeleteOperationBtn"),
  confirmDeleteOperationBtn: document.getElementById("confirmDeleteOperationBtn"),
  switcherAccountName: document.getElementById("switcherAccountName"),
  switcherAccountPhone: document.getElementById("switcherAccountPhone"),
  closeAccountSwitcherBtn: document.getElementById("closeAccountSwitcherBtn"),
  addAccountBtn: document.getElementById("addAccountBtn"),
  form: document.getElementById("operationForm"),
  formNotice: document.getElementById("formNotice"),
  toggleFormBtn: document.getElementById("toggleFormBtn"),
  cancelFormBtn: document.getElementById("cancelFormBtn"),
  closeFormBtn: document.getElementById("closeFormBtn"),
  typeButtons: document.querySelectorAll(".type-option"),
  amountInput: document.getElementById("amountInput"),
  categorySelect: document.getElementById("categorySelect"),
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
  clearOperationsBtn: document.getElementById("clearOperationsBtn"),
  currentAccountDetails: document.getElementById("currentAccountDetails"),
  logoutBtn: document.getElementById("logoutBtn"),
  switchAccountBtn: document.getElementById("switchAccountBtn"),
  savedAccountsList: document.getElementById("savedAccountsList"),
  noSavedAccounts: document.getElementById("noSavedAccounts"),
  avatarFileInput: document.getElementById("avatarFileInput"),
  avatarStatus: document.getElementById("avatarStatus"),
  currentAvatar: document.getElementById("currentAvatar"),
  switcherAvatar: document.getElementById("switcherAvatar"),
  brandAvatar: document.getElementById("brandAvatar"),
  spendingLimitForm: document.getElementById("spendingLimitForm"),
  resetAccountDataBtn: document.getElementById("resetAccountDataBtn"),
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
let operationPendingDelete = null;
let deleteDialogTrigger = null;
let authEventsBound = false;
let currencyPickerBound = false;

const state = {
  currentType: "income",
  currency: DEFAULT_CURRENCY,
  theme: "dark",
  layoutMode: "desktop",
  spendingLimit: { amount: 0, dailyAmount: 0, period: "month" },
  user: null,
  authMode: "register"
};

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
  hint.textContent = "Текущая валюта";
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
      choiceDetails.append(choiceCode, choiceName);
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
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSessionUser(user) {
  state.user = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ phone: user.phone, name: user.name }));
  renderCurrentAccount();
}

function clearSessionUser() {
  state.user = null;
  localStorage.removeItem(SESSION_KEY);
  renderCurrentAccount();
}

function renderCurrentAccount() {
  if (refs.currentAccountDetails) {
    refs.currentAccountDetails.textContent = state.user
      ? `${state.user.name} · ${formatPhoneInput(state.user.phone)}`
      : "";
  }
  renderAvatar(refs.currentAvatar, state.user);
  renderAvatar(refs.switcherAvatar, state.user);
  renderAvatar(refs.brandAvatar, state.user);
}

function renderAvatar(element, user) {
  if (!element) return;
  const avatar = user?.avatar || "";
  const firstLetter = Array.from(user?.name?.trim() || "")[0]?.toLocaleUpperCase("ru-RU") || "?";
  element.textContent = avatar ? "" : firstLetter;
  element.style.backgroundImage = avatar ? `url("${avatar}")` : "";
  element.classList.toggle("has-avatar-image", Boolean(avatar));
}

function saveCurrentUserAvatar(dataUrl) {
  if (!state.user) return;
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.phone === state.user.phone);
  if (userIndex < 0) return;
  users[userIndex] = { ...users[userIndex], avatar: dataUrl };
  saveUsers(users);
  state.user = users[userIndex];
  renderCurrentAccount();
  renderSavedAccounts();
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
    errorNode.textContent = "Укажите дату в формате ДД.ММ.ГГГГ";
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

  if (!amountValue || Number.isNaN(amount) || amount <= 0) {
    setFieldError("amount", "Введите корректную положительную сумму");
    isValid = false;
  } else if (state.currentType === "expense" && amount > getCurrentBalance() + 0.000001) {
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

  if (state.currentType === "expense" && amountValue && Number.isFinite(amount) && amount > 0 && dateValue && state.spendingLimit.amount > 0) {
    const usage = getSpendingUsage(dateValue);
    const daily = usage && getDailySpendingAllowance(usage, dateValue);
    if (daily && amount > daily.remaining + 0.000001) {
      refs.formNotice.textContent = "Вы превышаете дневную сумму.";
      refs.formNotice.hidden = false;
      isValid = false;
    }
  }

  renderOperationLimitHint();

  return isValid;
}

function getCurrentBalance() {
  const operationBalance = operations.reduce((balance, operation) => {
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

function getSpendingUsage(dateISO = getTodayISO()) {
  const { amount, period } = state.spendingLimit;
  if (!amount) return null;
  const range = getSpendingPeriodRange(period, dateISO);
  if (!range) return null;
  const spent = operations
    .filter((operation) => operation.type === "expense" && operation.date >= range.start && operation.date < range.end)
    .reduce((sum, operation) => sum + (Number(operation.amount) || 0), 0);
  return { range, amount, spent, remaining: amount - spent };
}

function getDailySpendingAllowance(usage, dateISO) {
  if (!usage) return null;
  const periodDays = Math.max(1, (Date.parse(`${usage.range.end}T00:00:00Z`) - Date.parse(`${usage.range.start}T00:00:00Z`)) / 86400000);
  const dailyCap = state.spendingLimit.dailyAmount > 0
    ? state.spendingLimit.dailyAmount
    : usage.amount / periodDays;
  const spentThatDay = operations
    .filter((operation) => operation.type === "expense" && operation.date === dateISO
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
  const active = state.currentType === "expense" && state.spendingLimit.amount > 0;
  refs.operationLimitHint.hidden = !active;
  refs.operationLimitHint.classList.remove("is-blocked");
  if (!active) return;
  const dateISO = parseDateInput(refs.dateInput.value);
  if (!dateISO) {
    refs.operationLimitHint.textContent = "Лимит будет рассчитан после выбора даты операции.";
    return;
  }
  const usage = getSpendingUsage(dateISO);
  const amount = Number(refs.amountInput.value) || 0;
  if (!usage) {
    refs.operationLimitHint.textContent = `Лимит начнет действовать с ${formatDateForInput(state.spendingLimit.startDate)}. Эта операция указана раньше срока.`;
    return;
  }
  const daily = getDailySpendingAllowance(usage, dateISO);
  if (amount > daily.remaining + 0.000001) {
    refs.operationLimitHint.textContent = "Вы превышаете дневную сумму.";
    refs.operationLimitHint.classList.add("is-blocked");
  } else {
    refs.operationLimitHint.textContent = `На этот день доступно ${formatMoney(daily.remaining)} из ${formatMoney(daily.cap)}${amount > 0 ? `. После операции останется ${formatMoney(Math.max(0, daily.remaining - amount))}` : ""}.`;
  }
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
  refs.spendingLimitError.textContent = message;
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

    item.append(info, amount, deleteButton);
    refs.operationsList.appendChild(item);
  });
}

function renderApp() {
  calculateTotals();
  renderOperations();
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
  refs.views.forEach((view) => {
    view.hidden = view.id !== `${sectionName}View`;
  });

  refs.navButtons.forEach((button) => {
    const isActive = button.dataset.section === sectionName;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleForm(show) {
  if (show) {
    if (!refs.dialog.open) {
      refs.dialog.showModal();
    }
    refs.amountInput.focus();
  } else if (refs.dialog.open) {
    refs.dialog.close();
  }
}

function clearForm() {
  refs.amountInput.value = "";
  refs.commentInput.value = "";
  refs.dateInput.value = formatDateForInput(getTodayISO());
  clearFormErrors();
  updateType("income");
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

  const newOperation = {
    id: Date.now(),
    type: state.currentType,
    amount: Number(refs.amountInput.value),
    category: refs.categorySelect.value,
    date: parseDateInput(refs.dateInput.value),
    comment: refs.commentInput.value.trim()
  };

  operations = [newOperation, ...operations];
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

  if (text.startsWith("+7") || (digits.length > 10 && digits.startsWith("7"))) {
    digits = digits.slice(1);
  }

  const localDigits = digits.slice(0, 10);
  return localDigits.length === 10 ? `7${localDigits}` : localDigits;
}

function formatPhoneInput(value) {
  const text = String(value || "").trim();
  let digits = text.replace(/\D/g, "");

  if (text.startsWith("+7") || (digits.length > 10 && digits.startsWith("7"))) {
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
    const existingUser = users.find((user) => user.phone === phone);
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
    saveUsers(users);
    enterAppAfterAuthentication(newUser);
    return;
  }

  if (state.authMode === "login" && !users.some((item) => item.phone === phone)) {
    refs.authError.textContent = "Аккаунт с таким номером не найден. Зарегистрируйтесь.";
    return;
  }

  const user = users.find((item) => item.phone === phone && item.password === password);
  if (!user) {
    refs.authError.textContent = "Неверный номер или пароль.";
    return;
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
    const avatar = document.createElement("span");
    avatar.className = "saved-account-avatar";
    avatar.setAttribute("aria-hidden", "true");
    renderAvatar(avatar, user);
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
    button.append(avatar, details, arrow);
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
  refs.resetAccountDataBtn.addEventListener("click", () => {
    refs.resetAccountDialog.hidden = false;
    refs.cancelResetAccountBtn.focus();
  });

  function closeResetAccountDialog() {
    refs.resetAccountDialog.hidden = true;
    refs.resetAccountDataBtn.focus();
  }

  refs.cancelResetAccountBtn.addEventListener("click", closeResetAccountDialog);
  refs.resetAccountDialog.addEventListener("click", (event) => {
    if (event.target === refs.resetAccountDialog) closeResetAccountDialog();
  });
  refs.confirmResetAccountBtn.addEventListener("click", () => {
    localStorage.removeItem(accountStorageKey(STORAGE_KEY));
    localStorage.removeItem(accountStorageKey(SETTINGS_KEY));
    operations = [];
    state.currency = DEFAULT_CURRENCY;
    state.theme = "dark";
    state.layoutMode = "desktop";
    state.spendingLimit = { amount: 0, dailyAmount: 0, period: "month", startDate: getTodayISO() };
    applyTheme();
    applyLayoutMode();
    renderCurrencyPicker();
    renderApp();
    closeResetAccountDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.resetAccountDialog.hidden) closeResetAccountDialog();
  });

  refs.spendingLimitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(refs.spendingLimitAmount.value);
    const dailyAmountText = refs.spendingDailyAmount.value.trim();
    const dailyAmount = Number(dailyAmountText);
    if (!validateSpendingLimitDraft()) return;
    if (!Number.isFinite(amount) || amount <= 0) {
      refs.spendingLimitAmount.setCustomValidity("Введите сумму больше нуля.");
      refs.spendingLimitAmount.reportValidity();
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
    if (!operations.length) {
      return;
    }

    if (!window.confirm("Удалить все операции? Это действие нельзя отменить.")) {
      return;
    }

    operations = [];
    saveOperations();
    refs.typeFilter.value = "all";
    populateFilterCategoryOptions();
    renderApp();
  });

  refs.logoutBtn.addEventListener("click", () => {
    returnToAuthentication("register");
  });

  refs.switchAccountBtn.addEventListener("click", () => {
    openAccountSwitcher();
  });

  refs.avatarFileInput.addEventListener("change", () => {
    const file = refs.avatarFileInput.files?.[0];
    refs.avatarStatus.textContent = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      refs.avatarStatus.textContent = "Выберите файл изображения.";
      refs.avatarFileInput.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      refs.avatarStatus.textContent = "Размер изображения должен быть не больше 1 МБ.";
      refs.avatarFileInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") saveCurrentUserAvatar(reader.result);
    });
    reader.addEventListener("error", () => {
      refs.avatarStatus.textContent = "Не удалось загрузить изображение. Попробуйте ещё раз.";
    });
    reader.readAsDataURL(file);
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

  refs.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
    });
  });
}

function init() {
  loadSettings();
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
  bindAuthEvents();
  const savedSession = localStorage.getItem(SESSION_KEY);
  if (savedSession) {
    try {
      const session = JSON.parse(savedSession);
      const users = getUsers();
      const user = users.find((item) => item.phone === session.phone && item.name === session.name);
      if (user) {
        state.user = user;
        refs.authScreen.hidden = true;
        refs.appShell.hidden = false;
        init();
        return;
      }
    } catch (error) {
      clearSessionUser();
    }
  }

  refs.appShell.hidden = true;
  refs.authScreen.hidden = false;
  setAuthMode("register");
}

initAuthFlow();
