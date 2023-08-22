import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TodoList = ({ refresh, setRefresh }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [refresh])

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deleted Successfully.');
                    setRefresh((prev) => setRefresh(!prev));
                }
            })

    }

    const handleUpdate = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/todos/${id}`, {
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
                    setRefresh((prev) => setRefresh(!prev));
                }
            })

    }

    const handleUndo = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/todos/${id}`, {
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
                    setRefresh((prev) => setRefresh(!prev));
                }
            })

    }
    return (
        <div className='flex justify-start mt-10'>
            <ol className='list-decimal w-[700px] mx-auto shadow-md rounded p-3'>
                {
                    todos?.map((todo, i) => <li key={todo._id} className='p-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                        <p>{i + 1}. <span className={todo.status && 'line-through'}>{todo.todo}</span></p>
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