import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { saveProduct, getProduct } from "../services/product";
import { getCategories } from "../services/category";

class ProductForm extends Form {
  state = {
    data: { name: "", categoryId: "", weight: 0, price: 0, amountAvailable: 0 },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(2).label("Name"),
    categoryId: Joi.string().required().label("Category"),
    weight: Joi.number().required().min(0).max(100).label("Weight"),
    price: Joi.number().required().min(0).label("Price"),
    amountAvailable: Joi.number().required().min(0).max(100).label("Available"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;
      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCategories();
    await this.populateProduct();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      name: product.name,
      categoryId: product.category._id,
      weight: product.weight,
      price: product.price,
      amountAvailable: product.amountAvailable,
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };

  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("weight", "Weight")}
          {this.renderInput("price", "Price")}
          {this.renderInput("amountAvailable", "Available")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
