"use client";
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TodoItem } from '../../api';
import todoStore from '@/app/store/todoStore';

const Todo: React.FC = observer(() => {
    const [value, setValue] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const[dateTime, setDateTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await todoStore.loadTodos();
                console.log('Todos:', todoStore.todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(()=> {
       const interval = setInterval(() => {
            const date = new Date();
            const foratedDate = date.toLocaleDateString();
            const formatedTime  = date.toLocaleTimeString();
            setDateTime(`${foratedDate} - ${formatedTime}`);
        }, 1000);
        return () => clearInterval(interval);
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() !== '') {
            const newTodo: TodoItem = { id: Date.now().toString(), value };
            await todoStore.addTodo(newTodo);
            setValue('');
        }
    };

    const handleUpdate = async (id: string) => {
        if (editValue.trim() !== '') {
            const updatedTodo: TodoItem = { id, value: editValue };
            await todoStore.updateTodo(updatedTodo);
            setEditIndex(null);
            setEditValue('');
        }
    };

    const handleDelete = async (id: string) => {
        await todoStore.deleteTodo(id);
    };

    return (
        <div className='m-5'>
            <div className='mb-3'> {dateTime} </div>
            <form onSubmit={handleSubmit}>
                <InputText  type="text"  className='p-2'  placeholder="Enter Todo List"  value={value}  onChange={(e) => setValue(e.target.value)}  />
                <Button className='p-2 ml-2' label='Add Todo' type="submit" />
            </form>
            <div className=''>
                {todoStore.todos.map((todo, index) => (
                    <div key={todo.id} className='p-2 mt-3'>
                        {editIndex === index ? (
                            <div className='mt-3 mb-3'>
                                <InputText  type="text"  className='p-2'   value={editValue}   onChange={(e) => setEditValue(e.target.value)}  onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo.id)} />
                                <Button label='Save' className='p-2 ml-2'  onClick={() => handleUpdate(todo.id)}  />
                            </div>
                        ) : (
                            <>
                                <span>{todo.value}</span>
                                <div className='mt-2'>
                                    <Button   label='Edit'   className='mr-2 px-2 py-1' onClick={() => {  setEditIndex(index);  setEditValue(todo.value);  }}  />
                                    <Button  label='Delete'  className='mr-2 px-2 py-1' onClick={() => handleDelete(todo.id)} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Todo;
