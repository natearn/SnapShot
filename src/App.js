import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import CategoryContextProvider from "./context/CategoryContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <CategoryContextProvider>
        <PhotoContextProvider>
          <HashRouter basename="/SnapScout">
            <div className="container">
              <Route
                render={props => (
                  <Header
                    handleSubmit={this.handleSubmit}
                    history={props.history}
                  />
                )}
              />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/mountain" />
                </Route>
                <Route
                  path="/search/:searchInput"
                  render={({ match }) => <Search searchTerm={match.params.searchInput} />}
                />
                <Route
                  path="/:category"
                  render={({ match }) => <Item searchTerm={match.params.category} />}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </HashRouter>
        </PhotoContextProvider>
      </CategoryContextProvider>
    );
  }
}

export default App;
