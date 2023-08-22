import { useContext, useState } from 'react';
import TodoList from './TodoList';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Todos = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(true);

    const handleAddTodo = (data) => {
        console.log(data);
        const todoInfo = {
            email: user?.email,
            todo: data.todo
        }
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todoInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Todo added successfully.');
                    setRefresh((prev) => setRefresh(!prev));
                }
            })
        reset();
    }
    return (
        <div className='container mx-auto'>
            <div className='mt-16'>
                <h1 className='text-3xl md:text-5xl text-center'>Welcome {user?.displayName}!</h1>
                <form onSubmit={handleSubmit(handleAddTodo)} className='flex items-center justify-center mt-10 gap-4'>
                    <input {...register("todo", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" type="text" />
                    <input type="submit" className='btn  text-white btn-success' />
                    <button className="btn  text-white btn-error">Remove All</button>
                </form>
            </div>
            <TodoList setRefresh={setRefresh} refresh={refresh} />
        </div>
    );
};

export default Todos;