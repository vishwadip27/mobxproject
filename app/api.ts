import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export interface TodoItem {
    id: string;
    value: string;
};

export const fetchTodos = async(): Promise<TodoItem[]> => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const addTodo = async(todo: TodoItem): Promise<TodoItem> => {
    try{
        const response =  await axios.post(API_URL, todo);
        return response.data; 
    }catch(error){
        console.error('Error adding todo:', error);
        throw error;
    }
};

export const updateTodo = async(todo: TodoItem): Promise<TodoItem> => {
    try{
        const response = await axios.put(`${API_URL}/${todo.id}`, todo);
        return response.data;
    }catch(error){
        console.error('Error updating todo:', error);
        throw error;
    }
};

export const deleteTodo = async(id: string): Promise<void> => {
    try{
         await axios.delete(`${API_URL}/${id}`);
    }catch(error){
        console.error('Error deleting todo:', error); 
        throw error;
    }
};