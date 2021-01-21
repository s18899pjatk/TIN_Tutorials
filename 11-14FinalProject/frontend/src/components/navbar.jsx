import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import LanguageSwitcher from "./common/languageSwitcher";
import LanguageContext from "../services/languageContext";
import { getTranslation } from "../services/vocabulary";

const Navbar = ({ user, balance }) => {
  const { language } = useContext(LanguageContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            {getTranslation(language, "Shop")}
          </Link>
        </div>
        <div className="nav navbar-nav navbar-left mr-auto">
          {!user && (
            <>
              <NavLink className="nav-item nav-link" to="/login">
                {getTranslation(language, "Login")}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                {getTranslation(language, "Register")}
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink className="nav-item nav-link" to="#">
                {user.name + ": " + balance + "$"}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/purchases">
                {getTranslation(language, "MyPurchases")}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                {getTranslation(language, "Logout")}
              </NavLink>
            </>
          )}
          <div className="switcher">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
