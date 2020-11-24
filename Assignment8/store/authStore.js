var auth = {
  login: "",
  email: "",
  password: "",
};

const updateData = (login, email, password) => {
  auth.login = login;
  auth.email = email;
  auth.password = password;
};

exports.auth = auth;
exports.updateData = updateData;
