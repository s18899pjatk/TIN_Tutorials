const calculate = () => {
  sendRequest(getBody());
};

const getBody = () => {
  return {
    num1: Number.parseFloat(document.getElementById("num1").value),
    num2: Number.parseFloat(document.getElementById("num2").value),
    op: document.getElementById("operation").value,
  };
};

const sendRequest = (body) => {
  fetch("http://localhost:3000/calc.json", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((res) => res.json())
    .then(
      (data) => (document.getElementById("result").innerHTML = JSON.parse(data))
    );
};
