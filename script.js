const btn = document.querySelector("#btn");
const timerDiv = document.querySelector(".timer");
const valueInputs = document.querySelectorAll("input[type=number]");
var isStarted = false;

function validateValues() {
  var status = true;
  valueInputs.forEach((inputBox) => {
    if (inputBox.id == "hour" && inputBox.value >= 0) return;
    if (inputBox.value > 59 || inputBox.value < 0 || inputBox.value == "") {
      inputBox.classList.add("invalid-value");
      status = false;
    } else {
      inputBox.classList.remove("invalid-value");
    }
  });
  return status;
}

btn.addEventListener("click", () => {
  if (!validateValues()) return;
  if (isStarted) {
    btn.style.background = "#03C988";
    btn.textContent = "START";
    timerDiv.style.display = "none";
    valueInputs.forEach((inputBox) => {
      inputBox.removeAttribute("disabled");
      inputBox.value = "";
    });
  } else {
    btn.style.background = "red";
    btn.textContent = "RESET";
    timerDiv.style.display = "flex";
    valueInputs.forEach((inputBox) => {
      inputBox.setAttribute("disabled", "true");
    });
  }

  isStarted = !isStarted;
});
