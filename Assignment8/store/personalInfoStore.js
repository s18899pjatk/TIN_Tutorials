var info = {
  name: "",
  surname: "",
  age: "",
};

const updateData = (name, surname, age) => {
  info.name = name;
  info.surname = surname;
  info.age = age;
};

exports.info = info;
exports.updateData = updateData;
