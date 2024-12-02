import { useParams } from 'react-router-dom';
import { Fragment, useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);

    }, [categoriesMap, category]);

    return(
        <Fragment>
             <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
             <CategoryContainer>
                {products && products.map((product) => <ProductCard  key={products.id} product={product} />)}
            </CategoryContainer>
        </Fragment>
          
    );
}

export default Category;