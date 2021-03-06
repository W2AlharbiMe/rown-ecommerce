import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/home.page.jsx";
import Shop from "./pages/shop/shop.page";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.page.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>
          this.setState({
            currentUser: { id: snapshot.id, ...snapshot.data() }
          })
        );
      } else this.setState({ currentUser: null });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.currentUser} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/sign-in" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
