function TemperatureConverter() {
  let val = document.getElementById("tempretureInput").value;
  val = parseFloat(val);
  if (!val) {
    document.getElementById("result").innerHTML =
      "please enter the correct number";
    return;
  }
  let option = document.querySelector('input[name="tempretureOption"]:checked')
    .value;
  if (option === "C") {
    document.getElementById("result").innerHTML =
      (val * 9) / 5 + 32 + " &#8457";
  } else {
    document.getElementById("result").innerHTML = (val - 32) / 1.8 + " &#8451";
  }
}
