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
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageLocation, setImageLocation] = useState("");

    const history = useHistory();

    const submit = (e) => {
        const post = {

            title,
            content,
            categoryId,
            imageLocation,

        };
        addPost(post).then(() => {
            history.push("/post");
        });
    };

    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
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
                                <Input
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>

                            {/* <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <Input
                                    id="categoryId"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                />
                            </FormGroup> */}

                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <select value={categoryId} name="categoryId" id="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="0">Select a Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit}>
                            SAVE POST
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default PostForm;