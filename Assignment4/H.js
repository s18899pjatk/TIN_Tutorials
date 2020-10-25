const secondMinMax = (arr) => {
  const min = Math.min(...arr);
  const secondMin = arr.reduce(
    (pre, cur) => (cur < pre && cur !== min ? cur : pre),
    Infinity
  );

  const max = Math.max(...arr);
  const secondMax = arr.reduce(
    (pre, cur) => (cur > pre && cur !== max ? cur : pre),
    -Infinity
  );

  return secondMin + " " + secondMax;
};

console.log(secondMinMax([4, -5, 2, 1, 6, 6]));
