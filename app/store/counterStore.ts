import { makeAutoObservable, reaction } from "mobx";

class Counterstore {
    count = 0;

    constructor(){
        makeAutoObservable(this);

        // load ffrom localstroage
        const savedCount = localStorage.getItem('counterstore');
        if(savedCount){
            this.count = JSON.parse(savedCount);
        }

        // auto save to locaslstorage when count changes
        reaction(
            () => this.count,
             (count) => {
            localStorage.setItem('counterstore', JSON.stringify(count));
        }
    )

    }
    increment() {
        this.count++;
    }
    
    decrement() {
        this.count--;
    }
}const counterStore = new Counterstore();

export default counterStore;