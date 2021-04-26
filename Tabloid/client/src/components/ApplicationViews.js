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
import DeactivateUserProfile from "./Users/UserDeactivateForm";
import PostDelete from "./Posts/PostDelete";




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
            {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
          </PostProvider>
        </Route>

        <Route path="/myPosts">
          <PostProvider>
            {isLoggedIn ? <MyPostList /> : <Redirect to="/login" />}
          </PostProvider>
        </Route>

        <Route path="/post/:id(\d+)" exact>
          <PostProvider>
            {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
          </PostProvider>
        </Route>

        <Route path="/tag" exact>
          <TagProvider>
            {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
          </TagProvider>
        </Route>

        <Route path="/tag/create" exact>
          <TagProvider>
            {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
          </TagProvider>
        </Route>

        <Route path="/tag/edit/:id(\d+)" exact>
          <TagProvider>
            {isLoggedIn ? <TagEdit /> : <Redirect to="/login" />}
          </TagProvider>
        </Route>

        <Route path="/tag/delete/:id(\d+)" exact>
          <TagProvider>
            <TagDelete />
          </TagProvider>
        </Route>

        <Route exact path="/category">
          <CategoryProvider>
            {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
            <CategoryList />
          </CategoryProvider>
        </Route>


        <Route path="/userProfiles" exact>
          <UserProfileProvider>
            {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
          </UserProfileProvider>
        </Route>

        <Route path="/userProfiles/:id(\d+)" exact>
          <UserProfileProvider>
            {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
          </UserProfileProvider>
        </Route>

        <Route exact path="/userProfile/deactivate/:userProfileId(\d+)">
          <UserProfileProvider>
            <DeactivateUserProfile />
          </UserProfileProvider>
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


        <PostProvider>
          <CategoryProvider>

            <Route path="/post/add" exact>
              {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/post/edit/:id(\d+)" exact>
              {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/post/delete/:id(\d+)">
              <PostDelete />
            </Route>

          </CategoryProvider>
        </PostProvider>

        <Route exact path="/category/edit/:categoryId(\d+)">
          <CategoryProvider>
            <CategoryEditForm />
          </CategoryProvider>
        </Route>

      </Switch>
    </main>
  );
};
