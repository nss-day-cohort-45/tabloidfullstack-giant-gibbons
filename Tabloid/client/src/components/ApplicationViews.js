import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostProvider from "../providers/PostProvider";
import PostList from "./PostList";
import CategoryList from "./CategoryList";
import CategoryProvider from "../providers/CategoryProvider";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/post">
          <PostProvider>
            <PostList />
          </PostProvider>
        </Route>

        <Route path="/category">
          <CategoryProvider>
            <CategoryList />
          </CategoryProvider>
        </Route>


      </Switch>
    </main>
  );
};
