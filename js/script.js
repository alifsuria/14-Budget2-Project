const budgetForm = document.querySelector("#budget-form");
const expenseForm = document.querySelector("#expense-form");
const expenseList = document.querySelector("#expense-list");

class Input {
  constructor() {
    this.budgetInput = document.querySelector("#budget-input");
    this.expenseName = document.querySelector("#expense-name");
    this.expenseAmount = document.querySelector("#expense-amount");
    this.budgetDisplay = document.querySelector("#budget-display");
    this.expenseDisplay = document.querySelector("#expense-display");
    this.balanceDisplay = document.querySelector("#balance-display");
    this.expenseList = document.querySelector("#expense-list");
    this.itemList = [];
  }

  validation() {
    const topFeedback = document.querySelector(".top-feedback");
    const btmFeedback = document.querySelector(".btm-feedback");

    let targetInput = event.target;
    console.log(targetInput);
    if (targetInput.classList.contains("budget-form")) {
      topFeedback.classList.remove("hide");
    } else if (targetInput.classList.contains("expense-form")) {
      btmFeedback.classList.remove("hide");
    }

    setTimeout(function() {
      if (!topFeedback.classList.contains("hide")) {
        topFeedback.classList.add("hide");
      } else if (!btmFeedback.classList.contains("hide")) {
        btmFeedback.classList.add("hide");
      }
    }, 3000);
  }
  showBalance() {
    let expense = this.totalExpense();
    let totalBalance = parseInt(this.budgetDisplay.textContent) - expense;

    this.balanceDisplay.textContent = totalBalance;
  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function(acc, curr) {
        acc += curr.amount;
        return acc;
      }, 0);
    }
console.log("total"+total)
    this.expenseDisplay.textContent = total;
    return total;
  }

  addExpense(expense) {
    let div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `<div class="expense-item d-flex justify-content-between text-center">
    <h6 class="expense-title mb-0 list-item">${expense.name}</h6>
    <h5 class="mb-0 list-item">RM<span class="expense-amount">${expense.amount}</span></h5>
    <div class="expense-icon list-item">
        <a href=""><i class="fas fa-edit text-primary"></i></a>
        <a href=""><i class="fas fa-trash text-danger"></i></a>
    </div>
</div>`;
    this.expenseList.appendChild(div);
  }
  editExpense(element){
    let name =element.parentElement.parentElement.parentElement.firstElementChild.textContent;
    let amount = element.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    console.log(parent)
    this.expenseName.value = name;
    this.expenseAmount.value = amount;

    //remove from dom
    this.expenseList.removeChild(parent);
    //remove from the list
    let temp = this.itemList.filter(function(item){
      return item.name !== name
    })

    this.itemList =temp;
    this.showBalance()
    console.log(this.itemList)

  }
  deleteExpense(element) {
    let target =
      element.parentElement.parentElement.parentElement.parentElement;
    let targetName =
      element.parentElement.parentElement.previousElementSibling
        .previousElementSibling;
    //remove from dom
    this.expenseList.removeChild(target);
    //remove from list
    let temp = this.itemList.filter(function(item) {
      return item.name !== targetName.textContent;
    });
    this.itemList = temp;
    this.showBalance();
    console.log(this.itemList);
  }
}

const input = new Input();
budgetForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let budgetValue = input.budgetInput.value;
  if (budgetValue === "" || budgetValue < 0) {
    input.validation();
  } else {
    input.budgetDisplay.textContent = budgetValue;
    input.budgetInput.value = "";
    input.showBalance();
  }
});

expenseForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let expenseName = input.expenseName.value;
  let expenseAmount = input.expenseAmount.value;

  if (expenseName === "" || expenseAmount === "" || expenseAmount <= 0) {
    input.validation();
  } else {
    for (let i = 0; i < input.itemList.length; i++) {
      alert("OK")
      if (expenseName === input.itemList[i].name) {
        return input.validation();
      }
    }
    let amount = parseInt(expenseAmount);
    input.expenseName.value = "";
    input.expenseAmount.value = "";

    let expense = {
      name: expenseName,
      amount: amount
    };

    input.itemList.push(expense);
    console.log(input.itemList)
    input.totalExpense();
    input.addExpense(expense);
    input.showBalance();
  }
});

expenseList.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(event.target)
  if(event.target.classList.contains("fa-trash")){
    input.deleteExpense(event.target);
  } else if(event.target.classList.contains("fa-edit")){
input.editExpense(event.target);
  }
});
