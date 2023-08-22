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
    return (
        <div className='flex justify-start mt-10'>
            <ol className='list-decimal w-[700px] mx-auto shadow-md rounded p-3'>
                {
                    todos?.map((todo, i) => <li key={todo._id} className='p-2 flex justify-between items-center gap-3'>
                        <p>{i + 1}. {todo.todo}</p>
                        <div>
                            <button className="btn btn-sm text-white btn-success mr-2">Done</button>
                            <button onClick={() => handleDelete(todo._id)} className="btn btn-sm text-white btn-error">Remove</button>
                        </div>
                    </li>)
                }
            </ol>
        </div>
    );
};

export default TodoList;