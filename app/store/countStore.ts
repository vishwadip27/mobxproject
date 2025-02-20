import { makeAutoObservable } from "mobx";

class CounterStore {
    count = 0;

    constructor(){
        makeAutoObservable(this);
    }
    
    increment(){
        this.count++;
    }
    decrement() {
        this.count--;
    }

    get doubleCountValue() {
        return this.count * 2;
    }
}

const counterStore = new CounterStore()
export default counterStore;