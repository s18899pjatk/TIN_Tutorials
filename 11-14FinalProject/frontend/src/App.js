import "./App.css";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Logout from "./views/logout";
import Login from "./views/login";
import Register from "./views/register";
import NotFound from "./views/notFound";
import Products from "./views/products";
import Purchases from "./views/purchases";

import auth from "./services/auth";
import AuthContext from "./services/authContext";
import BalanceContext from "./services/balanceContext";
import LanguageContext from "./services/languageContext";
import { getUser } from "./services/user";

import Navbar from "./components/navbar";
import ProductForm from "./views/productForm";

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    requestUser();
  }, []);

  const requestUser = async () => {
    const u = await auth.getCurrentUser();
    if (u !== null) {
      setUser(u);
      const { data: usr } = await getUser(u._id);
      setBalance(usr.balance);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BalanceContext.Provider value={setBalance}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <div className="App">
            <ToastContainer />
            <Navbar user={user} balance={balance} />
            <main className="container">
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route
                  path="/login"
                  render={(props) => <Login {...props} language={language} />}
                />
                <Route
                  path="/register"
                  render={(props) => (
                    <Register {...props} language={language} />
                  )}
                />
                <Route
                  path="/products/:id"
                  render={(props) => {
                    if (!user) {
                      // protecting route from non authorized user
                      return (
                        <Redirect
                          to={{
                            pathname: "/login",
                            state: { from: props.location },
                          }}
                        />
                      );
                    }
                    return <ProductForm {...props} language={language} />;
                  }}
                />
                <Route path="/purchases" component={Purchases} />
                <Route path="/products" component={Products} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/products" />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </div>
        </LanguageContext.Provider>
      </BalanceContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
