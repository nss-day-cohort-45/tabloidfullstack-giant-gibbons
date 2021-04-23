import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Category } from './Category';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './category.css';

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <h2>Categories</h2>
            <div className="createNewBtnDiv">

                <Button>
                    <Link className="a" to={`/category/create/`}>Create Category</Link>
                </Button>

            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        {categories.map((category) => (

                            <Category key={category.id} category={category} />

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;