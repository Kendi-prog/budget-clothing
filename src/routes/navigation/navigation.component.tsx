import { Outlet, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as  CrwnLogo } from '../../assets/crown.svg';
import { signOutStart } from "../../store/user/user.action";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";


const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const navigate = useNavigate();

    const signOutUser = () => {
        dispatch(signOutStart());
        navigate('/auth');
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink className="nav-link" to='/shop' >
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <span  onClick={signOutUser}
                            style={{padding: '10px 15px', cursor:'pointer'}}> SIGN OUT</span>
                        ) : (
                            <NavLink to='/auth' >
                                SIGN IN
                            </NavLink>
                        )    
                    }
                    <CartIcon />
                </NavLinksContainer> 
                { isCartOpen && <CartDropdown/> }  
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;