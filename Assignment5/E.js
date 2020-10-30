class Student {
  constructor(first, last, id, grades) {
    this.firstName = first;
    this.lastName = last;
    this.id = id;
    this.grades = grades;
  }
  avg = () => {
    let sum = 0;
    this.grades.forEach((g) => {
      sum += g;
    });
    return sum / this.grades.length;
  };

  get getAvg() {
    return this.avg();
  }

  get getFullName() {
    return this.firstName + " " + this.lastName;
  }

  set setFirstName(firstName) {
    this.firstName = firstName;
  }

  set setLastName(lastName) {
    this.lastName = lastName;
  }

  print = () => {
    return `${this.firstName} ${this.lastName} : average - ${this.avg()}`;
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

let me = new Student("Artem", "Rymar", 18899, [4, 5, 4.5, 5, 4, 5]);
me.courses = ["PPJ", "MAD", "ASD", "TIN", "SBD"];
me.setFirstName = "John";
console.log(me.print());
console.log(createSubjectGroup(me));
