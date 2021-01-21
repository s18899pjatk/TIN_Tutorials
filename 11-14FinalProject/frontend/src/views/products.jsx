import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";

import ListGroup from "../components/common/listGroup";
import { getCategories } from "../services/category";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../services/product";
import { purchase } from "../services/purchase";
import { updateUser, getUser } from "../services/user";
import ProductBlock from "../components/productBlock";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductException from "../ProductException";
import Pagination from "../components/common/pagination";
import SearchBox from "../components/common/searchBox";

import BalanceContext from "../services/balanceContext";
import LanguageContext from "../services/languageContext";
import AuthContext from "../services/authContext";

import { getTranslation } from "../services/vocabulary";
import { Link } from "react-router-dom";

const Products = () => {
  const pageSize = 3;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const setBalance = useContext(BalanceContext);
  const { language } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    retrieveCategories();
    retrieveProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { data, totalCount } = getPageData();
    setFilteredProducts(data);
    setTotalCount(totalCount);
    if (user !== null) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, selectedCategory, currentPage, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedCategory(null);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const getPageData = () => {
    let filtered = products;

    if (selectedCategory && selectedCategory._id) {
      filtered = products.filter(
        (p) => p.category._id === selectedCategory._id
      );
    } else if (searchQuery) {
      filtered = products.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const prods = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: prods };
  };

  const retrieveCategories = async () => {
    let { data: c } = await getCategories();
    setCategories([{ _id: "", name: "AllCategories" }, ...c]);
    return c;
  };

  const retrieveProducts = async () => {
    let { data: p } = await getProducts();
    setProducts(p);
    setSelectedCategory(categories[0]);
    return p;
  };

  const handleDelete = async (product) => {
    const originalProds = products;
    const prods = originalProds.filter((p) => p._id !== product._id);
    setProducts(prods);

    try {
      await deleteProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This product has already been deleted.");
      }
      setProducts(originalProds);
    }
  };

  const handlePurchase = async (user, product) => {
    const { data: u } = await getUser(user._id);
    const { data: p } = await getProduct(product._id);
    const newBalance = u.balance - p.price;

    if (u.balance < p.price) {
      toast.error(getTranslation(language, "NotEnoughMoney"));
      throw new ProductException("There is not enough money to purchase");
    }

    try {
      await updateProduct({
        _id: p._id,
        name: p.name,
        price: p.price,
        weight: p.weight,
        amountAvailable: p.amountAvailable - 1,
        categoryId: p.category._id,
      });

      await updateUser({
        _id: u._id,
        name: u.name,
        phoneNumber: u.phoneNumber,
        password: u.password,
        balance: u.balance - p.price,
        roleId: u.role._id,
      });

      await purchase(u._id, product._id);
      setBalance(newBalance);
    } catch (ex) {
      toast.error(ex);
      throw new ProductException(ex);
    }
  };

  return (
    <div className="row">
      <div className="col-4">
        {user && (
          <div>
            {user.role.name === "Admin" && (
              <Link className="btn btn-dark mb-3" to="/products/new">
                {getTranslation(language, "AddProduct")}
              </Link>
            )}
          </div>
        )}
        <ListGroup
          items={categories}
          onItemSelect={handleCategorySelect}
          selectedItem={selectedCategory ? selectedCategory : categories[0]}
        />
      </div>
      <div className="col-8">
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <ProductBlock
          products={filteredProducts}
          onDelete={handleDelete}
          onPurchase={handlePurchase}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Products;
