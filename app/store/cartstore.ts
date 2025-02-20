import { makeAutoObservable } from "mobx";

class CartStore{
    items: { product: any; quntity: number } [] = [];

    constructor(){
        makeAutoObservable(this);
    }

    addToCart(product: any){
        const existingItem = this.items.find((item) => item.product.id === product.id);
        if(existingItem){
            existingItem.quntity++;
        }else{
            this.items.push({ product, quntity: 1 });
        }
    }

    removeFromCart(productId: number){
        this.items = this.items.filter((item) => item.product.id !== productId);
    }
    
    incementQuntity(productId: number){
        const item = this.items.find((item) => item.product.id = productId);
    }

    decrementQuntity(productId: number){
        const item = this.items.find((item) => item.product.id === productId);
        if(item && item.quntity > 1){
            item.quntity--;
        }else{
            this.removeFromCart(productId);
        }
    }
}

const cartStore = new CartStore();
export default cartStore;