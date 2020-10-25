const amountTocoins = (amm, coins) => {
  let count = 0;
  let temp = 0;
  let out = [];
  for (let i = 0; i < coins.length; i++) {
    temp = 0;
    while (temp <= amm) {
      temp = count + coins[i];
      if (temp <= amm) {
        count = temp;
        out.push(coins[i]);
      }
    }
  }
  return out;
};

console.log(amountTocoins(46, [25, 10, 5, 2, 1]));
console.log(amountTocoins(73, [20, 15, 5, 1]));
