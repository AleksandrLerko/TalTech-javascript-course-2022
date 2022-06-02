import { data } from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { ICategory } from '../../domain/ICategory';
import "../../App.css";
import { CategoryService } from '../../services/CategoryService';
import { Link } from 'react-router-dom';
import { IServiceResult } from '../../domain/IServiceResult';
import './Category.css';

let initialState: IServiceResult<ICategory[]>;

const CategoryIndex = () => {

    const categoryService = new CategoryService();

    const [categories, setCategories] = useState(initialState)

    useEffect(() => {
        categoryService.getAll().then(data => setCategories(data));
    }, [])

    if (!categories) {
        return null;
    }
    return (
        <>
            <div className="container testimonial-group">
                <div className="row text-center">
                    {categories.data!.map(item => {
                        return (
                            <div key={item.id} className="col-3">
                                <Link
                                    to={`/category/products`}
                                    style={
                                        {
                                            color: "black",
                                            textDecoration: 'none'
                                        }
                                    }
                                    state={item.id}>{item.categoryName}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>

    );

};

export default CategoryIndex;