import { createContext, useContext } from "react";
import cartStore from "./cartstore";
import productStore from "./ProductStore";
import searchStore from "./SearchStore";
import filterStore from "./FilterStore";
import WishlistStore from "./WishlistStore";

export const StoreContext = createContext({
  cartStore,
  WishlistStore,
  productStore,
  searchStore,
  filterStore,
});

export const useStore = () => useContext(StoreContext);
