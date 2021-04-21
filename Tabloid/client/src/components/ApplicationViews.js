import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import Hello from "./Hello";
import PostProvider from "../providers/PostProvider";
import PostList from "./Posts/PostList"
import MyPostList from "./Posts/MyPostList";
import PostDetails from "./Posts/PostDetails";
import CategoryList from "./Category/CategoryList";
import CategoryProvider from "../providers/CategoryProvider";
import CategoryForm from "./Category/CategoryForm";
import DeleteCategory from "./Category/DeleteCatForm"
import TagProvider from "../providers/TagProvider";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm.js"
import UserProfileList from "./Users/UserProfileList";
import PostForm from "./Posts/PostForm";



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

        <Route path="/tag" exact>
          <TagProvider>
            <TagList />
          </TagProvider>
        </Route>

        <Route path="/tag/create" exact>
          <TagProvider>
            <TagForm />
          </TagProvider>
        </Route>

        <Route exact path="/category">
          <CategoryProvider>
            <CategoryList />
          </CategoryProvider>
        </Route>


        <Route path="/userProfiles" exact>
          <UserProfileProvider>
            <UserProfileList />
          </UserProfileProvider>
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

        <Route exact path="/category/delete/:categoryId(\d+)">
          <CategoryProvider>
            <DeleteCategory />
          </CategoryProvider>
        </Route>

        <Route exact path="/category/edit/:categoryId(\d+)">

        </Route>

      </Switch>
    </main>
  );
};
