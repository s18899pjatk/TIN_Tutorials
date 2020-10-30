function Student(first, last, id, grades) {
  this.firstName = first;
  this.lastName = last;
  this.id = id;
  this.grades = grades;

  this.avg = () => {
    let sum = 0;
    this.grades.forEach((g) => {
      sum += g;
    });
    return sum / this.grades.length;
  };

  this.getAvg = () => {
    return this.avg();
  };

  this.getName = () => {
    return this.firstName + " " + this.lastName;
  };

  this.setName = (firstName, lastName) => {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  this.print = () => {
    return `${this.firstName} ${this.lastName} : average : ${this.avg()}`;
  };
}
let createSubjectGroup = (student) => {
  const courses = [];
  student.courses.forEach((c) =>
    courses.push({
      name: c,
      students: {
        name: student.firstName,
        lastName: student.lastName,
        id: student.id,
      },
    })
  );
  return courses;
};

Student.prototype.courses = ["PPJ", "MAD", "ASD", "TIN", "SBD"];
let me = new Student("Artem", "Rymar", 18899, [4, 5, 4.5, 5, 4, 5]);
console.log(me.print());
console.log(createSubjectGroup(me));
