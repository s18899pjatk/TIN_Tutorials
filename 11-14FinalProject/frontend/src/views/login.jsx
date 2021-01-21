import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import authService, { login } from "../services/auth";
import { Redirect } from "react-router-dom";
import { getTranslation } from "../services/vocabulary";

class Login extends Form {
  state = {
    data: { phoneNumber: "", password: "" },
    errors: {},
  };

  schema = {
    phoneNumber: Joi.string().required().label("PhoneNumber"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.phoneNumber, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.phoneNumber = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    const { language } = this.props;
    return (
      <div>
        <h1> {getTranslation(language, "Login")}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("phoneNumber", "PhoneNumber", language)}
          {this.renderInput("password", "Password", "password", language)}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
