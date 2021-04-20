import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostProvider from "../providers/PostProvider";
import PostList from "./PostList";
import MyPostList from "./MyPostList";
import PostDetails from "./PostDetails";
import CategoryList from "./Category/CategoryList";
import CategoryProvider from "../providers/CategoryProvider";
import CategoryForm from "../components/Category/CategoryForm";
import TagProvider from "../providers/TagProvider";
import TagList from "./TagList";
import PostForm from "./PostForm";


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

        <Route path="/myPosts">
          <PostProvider>
            <MyPostList />
          </PostProvider>
        </Route>

        <Route path="/post/:id(\d+)" exact>
          <PostProvider>

            <PostDetails />

          </PostProvider>
        </Route>


        <Route path="/tagManagement" exact>
          <TagProvider>
            <TagList />
          </TagProvider>
        </Route>

        <Route exact path="/category">
          <CategoryProvider>
            <CategoryList />
          </CategoryProvider>
        </Route>

        <Route path="/post/add" exact>
          <PostProvider>
            <CategoryProvider>
              <PostForm />
            </CategoryProvider>
          </PostProvider>
        </Route>

        <Route exact path="/category/create">
          <CategoryProvider>
            <CategoryForm />
          </CategoryProvider>
        </Route>

      </Switch>
    </main>
  );
};
