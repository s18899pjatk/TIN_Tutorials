const dumbValidation = () => {
  const phone = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const error = document.getElementById("error");
  const rgx = /^.+@[a-z]+.[a-z]+$/;
  let err = "";

  if (isNaN(phone.value)) {
    err += "Phone number is not valid ";
    error.innerHTML = err;
    phone.setAttribute("class", "wrongInput");
    return false;
  } else if (!rgx.test(String(email.value).toLowerCase())) {
    err += "Email is not valid ";
    error.innerHTML = err;
    email.setAttribute("class", "wrongInput");
    return false;
  } else {
    err += "";
    error.innerHTML = err;
    phone.setAttribute("class", "correctInput");
    email.setAttribute("class", "correctInput");
    return true;
  }
};
