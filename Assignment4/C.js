const isPalindrome = (str) => {
  str = str.trim().toLowerCase();
  let strRev = "";
  for (let i = str.length - 1; i >= 0; i--) {
    strRev += str[i];
  }
  return str === strRev;
};

console.log(isPalindrome("tenet"));
console.log(isPalindrome("text"));
