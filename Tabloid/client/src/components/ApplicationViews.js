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
import PostForm from "./Posts/PostForm";
import CategoryList from "./Category/CategoryList";
import CategoryProvider from "../providers/CategoryProvider";
import CategoryForm from "./Category/CategoryForm";
import DeleteCategory from "./Category/DeleteCatForm";
import CategoryEditForm from "./Category/CategoryEditForm";
import TagProvider from "../providers/TagProvider";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm.js"
import TagDelete from "./Tags/TagDelete";
import TagEdit from "./Tags/TagEdit";
import UserProfileList from "./Users/UserProfileList";
import UserProfileDetails from "./Users/UserProfileDetails"
import CommentProvider from "../providers/CommentProvider"
import CommentList from "./Comment/CommentList"
import CommentForm from "./Comment/CommentForm"


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

        <Route path="/tag/edit/:id(\d+)" exact>
          <TagProvider>
            <TagEdit />
          </TagProvider>
        </Route>

        <Route path="/tag/delete/:id(\d+)" exact>
          <TagProvider>
            <TagDelete />
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

        <Route path="/userProfiles/:id(\d+)" exact>
          <UserProfileProvider>
            <UserProfileDetails />
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
          <CategoryProvider>
            <CategoryEditForm />
          </CategoryProvider>
        </Route>

        <Route path="/comment/:id(\d+)">
          <CommentProvider>
            <PostProvider>
              <CommentList />
            </PostProvider>
          </CommentProvider>
        </Route>

        <Route path="/comment/create/">
          <CommentProvider>

            <CommentForm />

          </CommentProvider>
        </Route>

      </Switch>
    </main>
  );
};
