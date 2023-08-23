import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createUser, profileUpdate } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                profileUpdate(data.name)
                    .then(result => {
                        const currentUser = {
                            name: data.name,
                            email: data.email
                        }
                        saveUserDB(currentUser);
                        navigate('/todos')
                    })
            })
            .catch(e => console.log(e))
    }

    const saveUserDB = (user) => {
        fetch('https://todo-app-server-siamcse.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Signup Successful!');
                }
            })
    }
    return (
        <div className="container mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                            </div>
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

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>Already have an account? <Link className='text-emerald-600' to='/'>Please Login</Link></p>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SignUp;