let porsche = new Object();
porsche.model = "911 Turbo S";
porsche.hp = 900;
porsche.nOfSeats = 2;
porsche.price = 100000;

porsche.getPrice = () => {
  return price;
};

porsche.setPrice = (p) => {
  price = p;
};

let showProps = (obj) => {
  var result = ``;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += `${i} : ${typeof obj[i]}\n`;
    }
  }
  return result;
};

console.log(showProps(porsche));
