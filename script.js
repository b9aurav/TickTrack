const btn = document.querySelector("#btn");
const timerDiv = document.querySelector(".timer");
const timerLabel = document.querySelector("#timer");
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

function startTimer(hours, minutes, seconds) {
  var totalSeconds = hours * 3600 + minutes * 60 + seconds * 1;
  var timer = setInterval(() => {
    if (totalSeconds == 0) {
      clearInterval(timer);
      return;
    }

    totalSeconds--;
    var hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    var minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    var seconds = String(Math.floor((totalSeconds % 3600) % 60)).padStart(2, "0");
    timerLabel.textContent = `${hours}:${minutes}:${seconds}`;
    
    if (totalSeconds <= 5) {
      timerLabel.style.color = "red";
    }

    if (!isStarted) {
        clearInterval(timer);
        timerLabel.style.color = "white";
        timerLabel.textContent = "00:00:00";
    }
  }, 1000);
}

btn.addEventListener("click", () => {
  if (!validateValues()) return;
  if (isStarted) {
    btn.style.background = "#03C988";
    btn.innerHTML = "<b>START</b>";
    timerDiv.style.display = "none";
    valueInputs.forEach((inputBox) => {
      inputBox.removeAttribute("disabled");
      inputBox.value = "";
    });
} else {
    btn.style.background = "red";
    btn.innerHTML = "<b>RESET</b>";
    timerDiv.style.display = "flex";
    timerLabel.style.color = "white";
    valueInputs.forEach((inputBox) => {
        inputBox.setAttribute("disabled", "true");
    });
    var hours = String(valueInputs[0].value).padStart(2, "0");
    var minutes = String(valueInputs[1].value).padStart(2, "0");
    var seconds = String(valueInputs[2].value).padStart(2, "0");

    timer.textContent = `${hours}:${minutes}:${seconds}`
    startTimer(hours, minutes, seconds);
  }

  isStarted = !isStarted;
});
