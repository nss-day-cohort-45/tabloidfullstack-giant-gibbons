import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    textarea
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";

export const PostForm = () => {
    const { addPost, editPost, getPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageLocation, setImageLocation] = useState("");

    const history = useHistory();
    const { postId } = useParams();

    const submit = (e) => {
        e.preventDefault();
        if (postId) {
            editPost({
                id: post.id,
                title: post.title,
                content: post.content,
                imageLocation: post.imageLocation
            })
                .then(() => history.push(`/api/post/${postId}`))
        } else {
            addPost({

                title,
                content,
                categoryId,
                imageLocation,

            }).then(() => {
                history.push("/post");
            });
        }
    };

    useEffect(() => {
        getAllCategories()
        if (postId) {
            getPost(postId)
                .then(post => {
                    setPost(post)
                })
        }
    }, []);


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">

                    <CardBody>
                        <h3 className="postForm__title">{postId ? <> Edit Post </> : <>New Post</>}</h3>
                        <Form>
                            <FormGroup>
                                <Label for="imageLocation">Image URL</Label>
                                <Input
                                    id="imageLocation"
                                    onChange={(e) => setImageLocation(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="content">Content</Label>
                                <br />
                                <Input type="textarea" rows="10"
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>


                            <FormGroup>
                                <Input type="select" value={categoryId} name="categoryId" id="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="0">Select a Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit}>{postId ? <> Save Changes </> : <>Add Post</>}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default PostForm;