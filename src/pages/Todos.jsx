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
        fetch('https://todo-app-server-siamcse.vercel.app/todos', {
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
                <form onSubmit={handleSubmit(handleAddTodo)} className='flex flex-col sm:flex-row items-center justify-center mt-10 p-2 md:p-0 gap-4'>
                    <input {...register("todo", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" type="text" />
                    <input type="submit" className='btn btn-md  text-white btn-success' />
                </form>
            </div>
            <TodoList setRefresh={setRefresh} refresh={refresh} />
        </div>
    );
};

export default Todos;