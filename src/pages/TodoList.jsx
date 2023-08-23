import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

const TodoList = ({ refresh, setRefresh }) => {
    const { user } = useContext(AuthContext);

    const { data: todos = [], refetch } = useQuery({
        queryKey: ['users', refresh],
        queryFn: async () => {
            const res = await fetch(`https://todo-app-server-siamcse.vercel.app/todos?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (id) => {
        fetch(`https://todo-app-server-siamcse.vercel.app/todos/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deleted Successfully.');
                    refetch();
                }
            })

    }

    const handleUpdate = (id) => {
        console.log(id);
        fetch(`https://todo-app-server-siamcse.vercel.app/todos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Thanks for done this todos.');
                    refetch();
                }
            })

    }

    const handleUndo = (id) => {
        console.log(id);
        fetch(`https://todo-app-server-siamcse.vercel.app/todos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: false })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Carefully do this work.');
                    refetch();
                }
            })

    }
    return (
        <div className='flex justify-start mt-10'>
            <ol className='list-decimal w-[700px] mx-auto shadow-md rounded p-3'>
                {
                    todos?.map((todo, i) => <li key={todo._id} className='p-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                        <p>{i + 1}. <span className={todo.status ? 'line-through' : ''}>{todo.todo}</span></p>
                        <div>
                            {
                                todo?.status ? <button onClick={() => handleUndo(todo._id)} className="btn btn-sm text-white btn-success mr-2">Undone</button>
                                    :
                                    <button onClick={() => handleUpdate(todo._id)} className="btn btn-sm text-white btn-success mr-2">Done</button>
                            }

                            <button onClick={() => handleDelete(todo._id)} className="btn btn-sm text-white btn-error">Remove</button>
                        </div>
                    </li>)
                }
            </ol>
        </div>
    );
};

export default TodoList;