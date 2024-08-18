// variables //
var oneButton = document.getElementById("oneButton");
var daysContainer = document.getElementById("daysContainer");
var totalCostContainer = document.getElementById("totalCost");
var planeInput = document.getElementById("plane");
var budgetInput = document.getElementById("budget");
var moneyMessage = document.getElementById("money");

if (oneButton) {
  oneButton.addEventListener("click", submit);
}

function submit() {
  var days = parseInt(document.getElementById("days").value); // days will be an integer
  daysContainer.innerHTML = ""; // clears div incase update of days

if (days < 367) {
  for (var i = 1; i <= days; i++) { 
    var daySection = createDaySection(i);
    daysContainer.appendChild(daySection);
  }

  costInputListener();
  calculate();
}
  else 
  console.log("Days cannot overexceed a (leap) year.")
    }

function createDaySection(dayNumber) { // creates sections for each day using another function
  var daySection = document.createElement("div");
  daySection.innerHTML = `
    <div class="start">
      <div class="question">
        <h3>Day ${dayNumber}</h3>
        <div class="labels">
          ${createCostInput("hotel", dayNumber, "Hotel")}
          ${createCostInput("transportation", dayNumber, "Transportation")}
          ${createCostInput("food", dayNumber, "Food")}
          ${createCostInput("shopping", dayNumber, "Shopping")}
          ${createCostInput("activities", dayNumber, "Activities")}
        </div>
      </div>
    </div>`;
  return daySection;
}

function createCostInput(name, dayNumber, label) { // arguments inputted into respective places
  return `
    <label for="${name}${dayNumber}">${label} Cost:</label>
    <input type="number" id="${name}${dayNumber}" class="cost-input" placeholder="Cost">`;
}

function costInputListener() { // function for event listeners 
  var costInputs = getCostInputs();
  costInputs.forEach(function(input) {
    input.addEventListener('input', calculate);
  });

  if (planeInput) {
    planeInput.addEventListener('input', calculate);
  }

  if (budgetInput) {
    budgetInput.addEventListener('input', calculate);
  }
  // entering/changing input -> calculate() done (so its dynamic)
}

function calculate() {
  var totalCost = 0;

  var planeCost = parseFloat(planeInput.value) || 0;
  totalCost += planeCost;

  var costInputs = getCostInputs();
  costInputs.forEach(function(input) {
    totalCost += parseFloat(input.value) || 0;
  }); // inputs added to total cost

  totalCostContainer.textContent = totalCost.toFixed(2); //dynamically updating total cost

  var budget = parseFloat(budgetInput.value) || 0;
  
  if (budget < totalCost) {
    moneyMessage.innerHTML = "You need to earn $" + (totalCost - budget).toFixed(2) + " more to afford the total cost.";
  } else {
    moneyMessage.innerHTML = "You are within your budget by $" + (budget - totalCost).toFixed(2) + ".";
  }
}

function getCostInputs() {
  return document.querySelectorAll('.cost-input'); // finds and returns all cost inputs
}