import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <PropagateLoader
                color="#36d7b7"
                size={20}
            />
        </div>
    );
};

export default Loader;