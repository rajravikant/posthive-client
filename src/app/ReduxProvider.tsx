import { PropsWithChildren } from 'react'
import { Provider } from "react-redux";
import { store,persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";


const ReduxProvider = ({children}:PropsWithChildren) => {
  return (
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider