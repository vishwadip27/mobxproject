import { makeAutoObservable } from "mobx";
import { fetchTodos } from "../api";

class ProductStore {
    products: any[] = [];
    filterData: any[] = [];
    loading: false | undefined;
    error: string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    async fetchProducts() {
        // this.loading = true;
        try{
            const data = await fetchTodos()
        }catch(error){
            this.error= "Error Fectching Products"
        }finally{
            this.loading = false;
        }
    }

    setFilteredProducts(filteredProducts: any[]) {
        this.filterData = filteredProducts;
    }
}

const productStore = new ProductStore();

export default productStore;