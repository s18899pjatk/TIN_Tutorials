const { Product } = require("./models/product");
const { User } = require("./models/user");
const { Category } = require("./models/category");
const { Role } = require("./models/role");

const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const p = await bcrypt.hash(password, salt);
  return p;
};

async function seed() {
  await mongoose
    .connect(
      config.get("db", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
    )
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.error(err));

  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
  await Role.deleteMany({});

  const password12345 = await generatePassword("12345");

  const categories = [
    {
      name: "Laptops",
      products: [
        {
          name: "MacBook Air",
          price: 1200,
          weight: 1.2,
          amountAvailable: 5,
        },
        {
          name: "MacBook Pro",
          price: 1500,
          weight: 1,
          amountAvailable: 7,
        },
      ],
    },
    {
      name: "Smartphones",
      products: [
        {
          name: "Samsung Galaxy s20+",
          price: 800,
          weight: 0.5,
          amountAvailable: 3,
        },
        {
          name: "IPhone 12",
          price: 750,
          weight: 0.7,
          amountAvailable: 7,
        },
      ],
    },
  ];

  const roles = [
    {
      name: "Admin",
      users: [
        {
          name: "David",
          phoneNumber: "+51241244",
          password: password12345,
          balance: 0,
        },
      ],
    },
    {
      name: "Customer",
      users: [
        {
          name: "Simon",
          phoneNumber: "+12412422",
          password: password12345,
          balance: 123,
        },
        {
          name: "Johny",
          phoneNumber: "+42112421",
          password: password12345,
          balance: 1110,
        },
      ],
    },
    {
      name: "Guest",
      users: [
        {
          name: "Unknown",
          phoneNumber: "00000000",
          password: password12345,
          balance: 0,
        },
      ],
    },
  ];

  for (let category of categories) {
    const { _id: categoryId } = await new Category({
      name: category.name,
    }).save(); // adding category and retriewing it's id
    const products = category.products.map((product) => ({
      ...product,
      category: { _id: categoryId, name: category.name },
    }));
    await Product.insertMany(products);
  }

  for (let role of roles) {
    const { _id: roleId } = await new Role({ name: role.name }).save();
    const users = role.users.map((user) => ({
      ...user,
      role: { _id: roleId, name: role.name },
    }));
    await User.insertMany(users);
  }

  mongoose.disconnect();

  console.info("Seeded");
}

seed();
