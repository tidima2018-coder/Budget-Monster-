const STORAGE_KEY = "budgetMonsterOperations";
const SETTINGS_KEY = "budgetMonsterSettings";
const DEFAULT_CURRENCY = "KZT";

const CURRENCY_OPTIONS = {
  KZT: { label: "Тенге", symbol: "₸", rate: 1, decimals: 0 },
  USD: { label: "Доллар", symbol: "$", rate: 450, decimals: 2 },
  EUR: { label: "Евро", symbol: "€", rate: 540, decimals: 2 },
  RUB: { label: "Рубль", symbol: "₽", rate: 6.6, decimals: 2 }
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
  dialog: document.getElementById("operationDialog"),
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
  analyticsExpense: document.getElementById("analyticsExpense"),
  analyticsBalance: document.getElementById("analyticsBalance"),
  analyticsOperationsCount: document.getElementById("analyticsOperationsCount"),
  allCategories: document.getElementById("allCategories"),
  settingsOperationCount: document.getElementById("settingsOperationCount"),
  currencySelect: document.getElementById("currencySelect"),
  clearOperationsBtn: document.getElementById("clearOperationsBtn")
};

let operations = [];

const state = {
  currentType: "income",
  currency: DEFAULT_CURRENCY
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

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const candidate = parsed.currency || DEFAULT_CURRENCY;
    state.currency = CURRENCY_OPTIONS[candidate] ? candidate : DEFAULT_CURRENCY;
  } catch (error) {
    state.currency = DEFAULT_CURRENCY;
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ currency: state.currency }));
}

function loadOperations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    operations = raw ? JSON.parse(raw) : [];
  } catch (error) {
    operations = [];
  }

  if (!Array.isArray(operations)) {
    operations = [];
  }
}

function saveOperations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(operations));
}

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
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

  let isValid = true;
  const amountValue = String(refs.amountInput.value).trim();
  const amount = Number(amountValue);
  const categoryValue = refs.categorySelect.value;
  const dateValue = parseDateInput(refs.dateInput.value);

  if (!amountValue || Number.isNaN(amount) || amount <= 0) {
    setFieldError("amount", "Введите корректную положительную сумму");
    isValid = false;
  } else if (state.currentType === "expense" && amount > getCurrentBalance() + 0.000001) {
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

  return isValid;
}

function getCurrentBalance() {
  return operations.reduce((balance, operation) => {
    const amount = Number(operation.amount) || 0;
    return balance + (operation.type === "income" ? amount : -amount);
  }, 0);
}

function calculateTotals() {
  const income = operations
    .filter((operation) => operation.type === "income")
    .reduce((sum, operation) => sum + Number(operation.amount || 0), 0);

  const expense = operations
    .filter((operation) => operation.type === "expense")
    .reduce((sum, operation) => sum + Number(operation.amount || 0), 0);

  const balance = income - expense;

  refs.incomeSummary.textContent = formatMoney(income);
  refs.expenseSummary.textContent = formatMoney(expense);
  refs.balanceSummary.textContent = formatMoney(balance);

  renderAnalytics({ income, expense, balance });
  renderCategories();
  refs.settingsOperationCount.textContent = String(operations.length);

  return { income, expense, balance };
}

function renderAnalytics(totals) {
  refs.analyticsIncome.textContent = formatMoney(totals.income);
  refs.analyticsExpense.textContent = formatMoney(totals.expense);
  refs.analyticsBalance.textContent = formatMoney(totals.balance);
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
      const confirmed = window.confirm("Удалить эту операцию?");
      if (!confirmed) {
        return;
      }

      operations = operations.filter((entry) => entry.id !== operation.id);
      saveOperations();
      renderApp();
    });

    item.append(info, amount, deleteButton);
    refs.operationsList.appendChild(item);
  });
}

function renderApp() {
  calculateTotals();
  renderOperations();
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

function bindEvents() {
  refs.typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateType(button.dataset.type);
    });
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
  });

  refs.dateInput.addEventListener("blur", () => {
    validateDateField();
  });

  refs.form.addEventListener("submit", handleSubmit);

  refs.typeFilter.addEventListener("change", () => {
    populateFilterCategoryOptions();
    renderOperations();
  });

  refs.categoryFilter.addEventListener("change", () => {
    renderOperations();
  });

  refs.currencySelect.addEventListener("change", () => {
    state.currency = refs.currencySelect.value;
    saveSettings();
    renderApp();
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

  refs.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
    });
  });
}

function init() {
  loadSettings();
  loadOperations();
  refs.dateInput.value = formatDateForInput(getTodayISO());
  refs.currencySelect.value = state.currency;
  updateType("income");
  populateFilterCategoryOptions();
  bindEvents();
  renderApp();
}

init();
