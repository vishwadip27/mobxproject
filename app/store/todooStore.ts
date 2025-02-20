import axios from "axios";
import { makeAutoObservable } from "mobx";

const API_URL = 'http://localhost:5000/todos';

class TodooStore {
    todos: {id: string; value: string;}[] = [];

    constructor(){
        makeAutoObservable(this);
    }
    
    async fetchTodos(){
       try{
        const response =  await axios.get(API_URL);
        this.todos = response.data;
       }catch(err){
        console.error('Error fetching todos:', err);
       }
    }

    async addTodo(value: string){
        const newTodo = { id: Date.now().toString(), value };
        try{
            await axios.post(API_URL, newTodo);
            this.todos.push(newTodo);
        }catch(error){
            console.error('Error adding todo', error);
        }
    }
}

const todoStore = new TodooStore();

export default todoStore;