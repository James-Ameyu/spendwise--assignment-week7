
let budget = 0;
let expenses = [];

const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");
const budgetInput = document.getElementById("budgetInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const budgetOutput = document.getElementById("budgetOutput");
const expensesOutput = document.getElementById("expensesOutput");
const balanceOutput = document.getElementById("balanceOutput");
const expenseList = document.getElementById("expenseList");
const budgetStatus = document.getElementById("budgetStatus");
const message = document.getElementById("message");
const clearButton = document.getElementById("clearButton");

function money(amount) {
    return "KSh " + amount.toFixed(2);
}

function calculateExpenses() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

function updateDashboard() {
    const total = calculateExpenses();
    const balance = budget - total;

    budgetOutput.textContent = money(budget);
    expensesOutput.textContent = money(total);
    balanceOutput.textContent = money(balance);

    if (budget <= 0) {
        budgetStatus.textContent = "Please set your budget.";
    } else if (balance < 0) {
        budgetStatus.textContent =
            "Warning! You have exceeded your budget.";
    } else if (balance === 0) {
        budgetStatus.textContent =
            "You have used your entire budget.";
    } else if (balance <= budget * 0.2) {
        budgetStatus.textContent =
            "Careful! Your remaining budget is low.";
    } else {
        budgetStatus.textContent =
            "Good job! You are within your budget.";
    }

    displayExpenses();
}

function displayExpenses() {
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.textContent = "No expenses added yet.";
        return;
    }

    expenses.forEach(function(expense, index) {
        const item = document.createElement("div");
        item.className = "expense-item";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = expense.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + expense.category;

        const amount = document.createElement("p");
        amount.textContent = money(expense.amount);

        details.append(name, category, amount);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.dataset.index = index;

        item.append(details, deleteButton);
        expenseList.appendChild(item);
    });
}

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget <= 0) {
        message.textContent = "Enter a valid budget.";
        return;
    }

    budget = newBudget;
    message.textContent = "Budget updated successfully.";

    updateDashboard();
    budgetForm.reset();
});

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (budget <= 0) {
        message.textContent = "Please set your budget first.";
        return;
    }

    if (!name || !category || !Number.isFinite(amount) || amount <= 0) {
        message.textContent = "Enter valid expense details.";
        return;
    }

    expenses.push({
        name: name,
        amount: amount,
        category: category
    });

    message.textContent = "Expense added successfully.";

    updateDashboard();
    expenseForm.reset();
});

expenseList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const index = Number(event.target.dataset.index);

        expenses.splice(index, 1);

        message.textContent = "Expense deleted.";
        updateDashboard();
    }
});

clearButton.addEventListener("click", function() {
    expenses = [];
    message.textContent = "All expenses cleared.";
    updateDashboard();
});

updateDashboard();
