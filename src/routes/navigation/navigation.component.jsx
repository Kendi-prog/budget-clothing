import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as  CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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
                            <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
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