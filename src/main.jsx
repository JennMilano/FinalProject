import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Log environment variables
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('All environment variables:', import.meta.env);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        
            <Provider store={store}>
                <App />
            </Provider>

    </StrictMode>
);