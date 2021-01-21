import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import * as userService from "../services/user";
import auth from "../services/auth";
import { getTranslation } from "../services/vocabulary";

class Register extends Form {
  state = {
    data: { phoneNumber: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    phoneNumber: Joi.string().required().label("PhoneNumber"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.phoneNumber = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>{getTranslation(this.props.language, "Register")}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("phoneNumber", "PhoneNumber")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
