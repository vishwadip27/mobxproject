import { makeAutoObservable } from 'mobx';
import { fetchTodos, addTodo, updateTodo, deleteTodo, TodoItem } from '../api';

class TodoStore {
  todos: TodoItem[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTodos() {
    this.loading = true;
    try {
      this.todos = await fetchTodos();
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      this.loading = false;
    }
  }

  async addTodo(todo: TodoItem) {
    try {
      const newTodo = await addTodo(todo);
      this.todos.push(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async updateTodo(updatedTodo: TodoItem) {
    try {
      const todo = await updateTodo(updatedTodo);
      this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async deleteTodo(id: string) {
    try {
      await deleteTodo(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
