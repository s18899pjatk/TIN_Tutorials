const alphabetOrder = (str) => {
  let arr = str.split("");
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < str.length; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr.join("");
};

// OR
// const alphabetOrder = (str) => {
//   return str.split("").sort().join("");
// };

console.log(alphabetOrder("webmaster"));
