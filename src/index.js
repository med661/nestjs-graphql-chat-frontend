import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store'; // Import the store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the App component with Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
