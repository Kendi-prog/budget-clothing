import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase.utils.js";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication";
import Shop from './routes/shop/shop.component.jsx';
import Checkout from "./routes/checkout/checkout.component.jsx";
import { setCurrentUser } from "./store/user/user.action.js";



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((user) => console.log(user)); 

  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={ <Navigation />}>
        <Route index element={ <Home />} />
        <Route path="shop/*" element={ <Shop />} />
        <Route path="auth" element={ <Authentication />} />
        <Route path="checkout" element={ <Checkout />} />
      
      </Route>
    </Routes>
   
  );
}

export default App;
