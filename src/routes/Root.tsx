import Header from "../components/Navigation/Header";
import { Outlet} from "react-router";
import Footer from "../components/Navigation/Footer";
import { Provider } from "react-redux";
import { store,persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import NavigationLoadingBar from "../components/Navigation/NavigationLoadingBar";


const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
          <Header/>
          <NavigationLoadingBar/>
          <main className="font-pop min-h-screen lg:h-auto dark:bg-dark bg-white transition-all ">
              <Outlet />
          </main>
          <Footer/>
      </PersistGate>
    </Provider>
  );  
};

export default Root;
