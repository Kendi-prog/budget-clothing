import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication"));



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(checkUserSession());

  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle />
      <ToastContainer />
        <Routes>
          <Route path="/" element={ <Navigation />}>
            <Route index element={ <Home />} />
            <Route path="shop/*" element={ <Shop />} />
            <Route path="auth" element={ <Authentication />} />
            <Route path="checkout" element={ <Checkout />} />
          </Route>
        </Routes>
      
    </Suspense>
   
  );
}

export default App;
