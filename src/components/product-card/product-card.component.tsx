import { FC } from 'react';
import { toast } from 'react-toastify';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
    product : CategoryItem
}


const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectCurrentUser);
    
    const addProductToCart = () => {
        if (!currentUser) {
            toast.error("You must be signed in to place an order!", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        dispatch(addItemToCart(cartItems, product));

    }
    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to cart</Button>
        </ProductCardContainer>
    );

}

export default ProductCard;