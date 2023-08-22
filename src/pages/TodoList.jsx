
const TodoList = () => {
    return (
        <div className='flex justify-start mt-10'>
            <ol className='list-decimal w-[700px] mx-auto shadow-md rounded p-3'>
                <li className='p-2 flex justify-between items-center gap-3'>
                    <p>1. Abu Siam</p>
                    <div>
                        <button className="btn btn-sm text-white btn-success mr-2">Done</button>
                        <button className="btn btn-sm text-white btn-error">Remove</button>
                    </div>
                </li>
                <li className='p-2 flex justify-between items-center gap-3'>
                    <p>1. Abu Siam</p>
                    <div>
                        <button className="btn btn-sm text-white btn-success mr-2">Done</button>
                        <button className="btn btn-sm text-white btn-error">Remove</button>
                    </div>
                </li>
                <li className='p-2 flex justify-between items-center gap-3'>
                    <p>1. Abu Siam</p>
                    <div>
                        <button className="btn btn-sm text-white btn-success mr-2">Done</button>
                        <button className="btn btn-sm text-white btn-error">Remove</button>
                    </div>
                </li>
                
            </ol>
        </div>
    );
};

export default TodoList;