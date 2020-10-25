function factorialRecursive(num) {
  if (num < 1) return -1;
  else if (num === 0 || num === 1) return 1;
  return (num *= factorialRecursive(num - 1));
}

const factorialIter = (num) => {
  if (num < 1) return -1;
  else if (num === 0 || num === 1) return 1;
  for (let i = num - 1; i > 0; i--) {
    num *= i;
  }
  return num;
};

console.log(factorialRecursive(6));
console.log(factorialIter(5));
