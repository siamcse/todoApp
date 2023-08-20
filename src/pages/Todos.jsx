import TodoList from './TodoList';
import { useForm } from 'react-hook-form';

const Todos = () => {
    const { register, handleSubmit, reset } = useForm();
    const handleTodo = (data) => {
        console.log(data);
        reset();
    }
    return (
        <div className='container mx-auto'>
            <div className='mt-16'>
                <h1 className='text-5xl text-center'>Welcome Abu Siam!</h1>
                <form onSubmit={handleSubmit(handleTodo)} className='flex items-center justify-center mt-10 gap-4'>
                    <input {...register("todo", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" type="text" />
                    <input type="submit" className='btn btn-success' />
                    <button className="btn btn-error">Remove All</button>
                </form>
            </div>
            <TodoList />
        </div>
    );
};

export default Todos;