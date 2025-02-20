import { makeAutoObservable } from "mobx";

class WishListStore{
    wishListProducts: any[] = [];

    constructor(){
        makeAutoObservable(this);
    }

    addToWishlist(product: any){
        if(!this.wishListProducts.find((item) => item.id === product.id)){
            this.wishListProducts.push(product);
        }
    }

    removeFromWishlist(productId: number){
        this.wishListProducts = this.wishListProducts.filter((item) => item.id !== productId);
    }
}

const wishListStore = new WishListStore();
export default wishListStore;