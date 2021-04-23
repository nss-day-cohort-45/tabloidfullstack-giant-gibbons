import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";

export const PostForm = () => {

  const { addPost, editPost, getPost } = useContext(PostContext);
  const { categories, getAllCategories } = useContext(CategoryContext);

  const history = useHistory();
  const postId = parseInt(useParams().id);

  const [post, setPost] = useState({
    id: "",
    title: "",
    content: "",
    imageLocation: "",
    publishDateTime: null,
    categoryId: 0
  });

  const savePost = (e) => {
    e.preventDefault();
    if (postId) {
      editPost({
        id: post.id,
        title: post.title,
        content: post.content,
        imageLocation: post.imageLocation,
        publishDateTime: post.publishDateTime,
        categoryId: parseInt(post.categoryId)
      }).then(() => history.push(`/post/${postId}`));

    } else {
      addPost({
        title: post.title,
        content: post.content,
        categoryId: parseInt(post.categoryId),
        publishDateTime: post.publishDateTime,
        imageLocation: post.imageLocation,
      }).then(() => {
        history.push("/post");
      });
    }
  };


  const handleInputChange = (event) => {

    const newPost = { ...post }
    let selectedVal = event.target.value
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal)
    }
    newPost[event.target.id] = selectedVal
    setPost(newPost)
  }


  useEffect(() => {
    getAllCategories();
    if (postId) {
      getPost(postId).then((post) => {
        setPost(post);
      });
    }
  }, []);

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <h3 className="postForm__title">
              {postId ? <> Edit Post </> : <>New Post</>}
            </h3>
            <Form>
              <FormGroup>
                <Label for="imageLocation">Image URL</Label>
                <Input type="text"
                  id="imageLocation"
                  value={post.imageLocation}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="content">Content</Label>
                <br />
                <Input
                  type="textarea"
                  value={post.content}
                  rows="10"
                  id="content"
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="select"
                  value={post.categoryId}
                  name="categoryId"
                  id="categoryId"
                  onChange={handleInputChange}
                >
                  <option value="0">Select a Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
            <Button color="info" onClick={savePost}>
              {postId ? <> Save Changes </> : <>Add Post</>}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default PostForm;
