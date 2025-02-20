import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx"

class UserStore {
    user = { name: 'John Doe', age: 30, email: 'john.doe@example.com'};
    loading = false;


    constructor() {
        makeAutoObservable(this);
    }

    async fetchUserData(){
        try{
            const response = await axios.get('http://localhost:5000/todos');
            runInAction(() => {
                this.user = { name: response.data.name, age: response.data.age , email: response.data.email};
                this.loading = false; // @action
            })
        }catch(error){
            runInAction(() => {
                this.loading = false; // @action
            });
            console.error('Error fetching user data:', error); 
        }
    }

    updateUSer(name: string, age: number,  email: string) {
        this.user = {  name, age , email}; // @action
    }
}

const userStore = new UserStore();
export default userStore;