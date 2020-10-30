class Person {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
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
}

class Student extends Person {
  constructor(first, last, id, grades) {
    super(first, last);
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
  print = () => {
    return `${this.firstName} ${this.lastName} : average - ${this.avg()}`;
  };
}
let me = new Student("Artem", "Rymar", 18899, [4, 5, 4.5, 5, 4, 5]);
me.firstName = "Mike";
console.log(me.print());
