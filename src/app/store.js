import { createStore, applyMiddleware, compose } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import allReducer from "../reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const baseUrl = "https://thrifthouse.herokuapp.com";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["login", "checkout", "notif"],
};

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(baseUrl)))
);

const persistor = persistStore(store);

export { store, persistor };
