const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = null;
let previousInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    const value = button.textContent;

    if (!action) {
      currentInput = currentInput === "0" ? value : currentInput + value;
    } else if (action === "clear") {
      currentInput = "";
      previousInput = "";
      operator = null;
    } else if (action === "backspace") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (action === "operator") {
      if (currentInput && previousInput && operator) {
        previousInput = calculate(previousInput, currentInput, operator);
        currentInput = "";
      } else if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
      }
      operator = value;
      currentInput = `${previousInput} ${operator} `; 
    } else if (action === "equal") {
      if (currentInput && previousInput && operator) {
        currentInput = calculate(previousInput, currentInput.split(" ")[2], operator);
        previousInput = "";
        operator = null;
      }
    } else if (action === "percent") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }

    updateScreen();
  });
});

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") return b !== 0 ? a / b : "Error";

  return 0;
}

function updateScreen() {
  screen.textContent = currentInput || previousInput || "0";
}
