const translations = {
  en: {
    Shop: "Shop",
    Login: "Login",
    Register: "Register",
    Logout: "Logout",
    PhoneNumber: "Phone Number",
    Password: "Password",
    Name: "Name",
    AllCategories: "All Categories",
    Laptops: "Laptops",
    Smartphones: "Smartphones",
    Weight: "Weight",
    MyPurchases: "My purchases",
    Category: "Category",
    Date: "Date",
    Price: "Price",
    Buy: "Buy",
    Delete: "Delete",
    Available: "Available",
    NotEnoughMoney: "There is not enough money to purchase",
    Search: "Search ...",
    Save: "Save",
    AddProduct: "Add Product",
    Edit: "Edit",
  },
  rus: {
    Shop: "Магазин",
    Login: "Войти",
    Register: "Регистрация",
    Logout: "Выйти",
    PhoneNumber: "Номер телефона",
    Password: "Пароль",
    Name: "Имя",
    AllCategories: "Все категории",
    Laptops: "Ноутбуки",
    Smartphones: "Телефоны",
    Weight: "Маса",
    MyPurchases: "Мои покупки",
    Category: "Категория",
    Date: "Дата",
    Price: "Цена",
    Buy: "Купить",
    Delete: "Удалить",
    Available: "Доступно",
    NotEnoughMoney: "Недостаточно средств для покупки",
    Search: "Поиск ...",
    Save: "Сохранить",
    AddProduct: "Добавить продукт",
    Edit: "Pедактировать",
  },
  pl: {
    Shop: "Sklep",
    Login: "Zaloguj sie",
    Register: "Zarejestrować",
    Logout: "Wyloguj",
    PhoneNumber: "Numer telefonu",
    Password: "Hasło",
    Name: "Imię",
    AllCategories: "Wszystkie kategorie",
    Laptops: "Laptopy",
    Smartphones: "Smartfony",
    Weight: "Waga",
    MyPurchases: "Moje zakupy",
    Category: "Kategoria",
    Date: "Data",
    Price: "Cena",
    Buy: "Kup",
    Delete: "Usunąć",
    Available: "Dostępny",
    NotEnoughMoney: "Brakuje pieniędzy na zakup",
    Search: "Szukaj ...",
    Save: "Zapisać",
    AddProduct: "Dodaj Produkt",
    Edit: "Edytować",
  },
};

export function getTranslation(lang, text) {
  return translations[lang][text];
}