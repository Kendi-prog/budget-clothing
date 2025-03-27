import './cart-dropdown';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItemsContainer } from './cart-dropdown';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const goToCheckoutHandler = useCallback(() => {
        if (!currentUser) {
            toast.warn("You must be signed in to access checkout!", {
                position: "top-center",
                autoClose: 2000, // Message disappears after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        }
        navigate('/checkout');
    }, [currentUser, navigate]);

    return(
        <CartDropdownContainer>
            <CartItemsContainer>
            {
                cartItems.length ? ( cartItems.map(item => 
                <CartItem key={item.id} cartItem={item}/>
                )) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
               
            }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>

    );
}

export default CartDropdown;