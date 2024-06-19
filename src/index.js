import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";
import App from './App';
import { AppProvider } from "./context/productcontext";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const persistedStore = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  <React.StrictMode>
    
   <BrowserRouter>
   <AuthProvider>
    <Provider store={store}>
     
  <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>

    <AppProvider>
   
      
  
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
       

  
      </AppProvider>

      </PersistGate>
          </Provider>
          </AuthProvider>
          </BrowserRouter>
     
  </React.StrictMode>,
);  
