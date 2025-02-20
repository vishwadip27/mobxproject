"use client";
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import productStyle from "./products.module.scss";
import navStyle from "../components/Header/header.module.scss";
import { useStore } from "@/app/store/StoreContext";

const Products = observer(() => {
  const { productStore, searchStore, filterStore, WishlistStore, cartStore } = useStore();
  const { products, filterData, fetchProducts, setFilteredProducts } = productStore;
  const { query, setSearchQuery } = searchStore;
  const { selectedCategories } = filterStore;
  const { wishListProducts, addToWishlist, removeFromWishlist } = WishlistStore;
  const { addToCart } = cartStore;

  const router = useRouter();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = filterData;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (query.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  }, [query, filterData, selectedCategories]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWishlistToggle = (product: any) => {
    const isWishlisted = wishListProducts.some((item) => item.id === product.id);
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.current?.show({ severity: "warn", summary: "Removed from Wishlist", detail: `${product.name} removed!`, life: 2000 });
    } else {
      addToWishlist(product);
      toast.current?.show({ severity: "success", summary: "Added to Wishlist", detail: `${product.name} added!`, life: 2000 });
    }
  };

  const handleViewDetails = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className={productStyle.productMainPage}>
      <Toast ref={toast} />
      <h1 className="text-center my-4">Our Products</h1>
      <div className="flex">
        <div className="w-3 p-4">
          <InputText
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
            className={navStyle.searchBar}
          />
          {/* <Filter /> */}
        </div>
        <div className="flex flex-wrap gap-2 w-9 p-4">
          {products.map((product) => (
            <div key={product.id} className={productStyle.productDetail}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <Button label="View Details" onClick={() => handleViewDetails(product.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Products;
