const longestWord = (str) => {
  let arr = str.split(" ");
  let mx = arr[0];
  arr.forEach((element) => {
    if (element.length > mx.length) {
      mx = element;
    }
  });
  return mx;
};

console.log(longestWord("DASd csdasaca aff asdasdad"));
