import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from '../loader/Loader';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user, login, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user)

    useEffect(() => {
        if (user?.email) {
            navigate('/todos');
        }
    }, [user, navigate])

    const handleLogin = (data) => {
        console.log(data);
        login(data.email, data.password)
            .then(result => {
                navigate('/todos');
            })
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Login' className="btn btn-primary" />
                            </div>
                            <p>Are you new user? <Link className='text-emerald-600' to='/signup'>Please Signup</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;