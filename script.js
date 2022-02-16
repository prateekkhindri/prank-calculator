// *****THOUGHT PROCESS*******
// 1. Press the button, to display number on the screen in order from left to right
// 2. Press = show the total result
// 3. Pressing the AC button to clear the screen
// 4. Pressing the C button will delete the last number/character

// 1. Press the button, to display number on the screen in order from left to right
// Array.forEach((anything) => {})
// Below we are selecting all the buttons together and then looping as all the buttons can be selected as arrays
const buttons = document.querySelectorAll("button");
const displayElement = document.querySelector("#result");

let textToDisplay = "";
// Listing the symbols

const symbols = ["/", "*", "-", "+"];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayElement.style.background = "";
    displayElement.style.color = "";
    const val = btn.innerText;

    if (textToDisplay.length < 1 && symbols.includes(val)) return;

    if (
      symbols.includes(val) &&
      symbols.includes(textToDisplay[textToDisplay.length - 1])
    ) {
      textToDisplay = textToDisplay.slice(0, -1) + val;
      return display(textToDisplay);
    }

    // When = Pressed/clicked

    if (val === "=") {
      if (!textToDisplay.length) return;

      if (symbols.includes(textToDisplay[textToDisplay.length - 1])) {
        textToDisplay = textToDisplay.slice(0, -1);
      }

      return onTotal();
    }

    if (val === "AC") {
      return resetDisplay();
    }

    // C button
    if (val === "C") {
      textToDisplay = textToDisplay.slice(0, -1);
      return display(textToDisplay);
    }

    if (val === "." && textToDisplay.includes(".")) return;

    textToDisplay = textToDisplay + val;
    display(textToDisplay);
  });
});

// Show clicked button to the screen

const display = (toDisplay) => {
  displayElement.innerText = toDisplay || "0.00";
};

// Calculate Total value

const onTotal = () => {
  const randVal = randomNumber();

  if (randVal > 0) {
    displayElement.style.background = "red";
    displayElement.style.color = "white";
    // Animation Control
    displayElement.classList.add("prank");
    displayElement.addEventListener("animationend", () => {
      displayElement.classList.remove("prank");
    });
  }
  const total = eval(textToDisplay) + randVal;
  display(total);
  textToDisplay = "";
};

// Reset the display area
const resetDisplay = () => {
  display("0.00");
  textToDisplay = "";
};

// Prank with a random number

const randomNumber = () => {
  const val = Math.floor(Math.random() * 10);
  return val < 5 ? val : 0;
};
