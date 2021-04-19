import React, { useState, useContext } from "react";
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
import { UserProfileContext } from "../providers/UserProfileProvider";

import { useHistory } from "react-router-dom";

const PostForm = () => {
    const { addPost } = useContext(PostContext);

    const userProfile = sessionStorage.getItem("userProfile");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [publishDateTime, setPublishDateTime] = useState("");

    const history = useHistory();

    const submit = (e) => {
        const post = {
            userProfile,
            title,
            content,
            categoryId,
            imageLocation,
            publishDateTime,

        };
        addPost(post).then((p) => {
            history.push("/post/:id(\d+)");
        });
    };
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
                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <Input
                                    id="categoryId"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="publishDateTime">Publication Date</Label>
                                <Input
                                    id="publishDateTime"
                                    onChange={(e) => setPublishDateTime(e.target.value)}
                                />
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