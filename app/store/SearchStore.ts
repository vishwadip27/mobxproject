import { makeAutoObservable } from "mobx";

class SearchStore{
    query: string = "";

    constructor(){
        makeAutoObservable(this);
    }

    setSearchQuery(query: string){
        this.query = query;
    }
}

const searchStore = new SearchStore();

export default searchStore;