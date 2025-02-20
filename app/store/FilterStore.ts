import { makeAutoObservable } from "mobx";

class FilterStore {
    selectedCategories: string[] = [];

    constructor(){
        makeAutoObservable(this);
    }
    addCategory(category: string[]){
        this.selectedCategories = category;
    }
}

const filterStore =  new FilterStore();

export default filterStore;