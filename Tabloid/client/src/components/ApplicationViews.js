import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostProvider from "../providers/PostProvider";
import PostList from "./PostList";
import PostDetails from "./PostDetails";

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

        <Route path="/post" exact>
          <PostProvider>
            <PostList />
          </PostProvider>
        </Route>

        <Route path="/post/:id(\d+)" exact>
          <PostProvider>
            <PostDetails />
          </PostProvider>
        </Route>


      </Switch>
    </main>
  );
};
