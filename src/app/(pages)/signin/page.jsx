"use client";
import { InverseProtectedRoute } from '@/app/(InverseProtectedRoute)/InverseProtectedRoute';
import { TokenContext } from '@/app/(context)/tokenContext';
import { login } from '@/app/(utilies)/auth';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import * as Yup from 'yup';
const Page = () => {

    let router = useRouter()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false);
    let { setToken } = useContext(TokenContext)

    const notify = () => {
        toast.success('🤩 success Login', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const signin = async (values) => {
        setLoading(true);
        try {
            const result = await login(values);
            console.log(result)
            setLoading(false);

            if (result.message === "success") {

                notify();
                router.push('/');
                localStorage.setItem('tokenArtical', result.token);
                setToken(result.token)
                setSuccess(result.message);
            }
        } catch (error) {
            setLoading(false);
            console.log('Error ===> ', error.response.data.error);
            setError(error.response.data.error);
        }
    };





    const validationSchema = Yup.object({
        email: Yup.string().email("Enter Email vaild").required("Email must be required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,15}$/, "Password Start With uppercase letter and Must be More then 3 characters Like this User123").required("Enter Your Password"),

    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema, validate: function () {
            setError(null)
            setSuccess(null)
        }, onSubmit: signin
    })





    return (
        <>
            <InverseProtectedRoute >
                <Head>
                    <title>Sign In</title>
                </Head>
                <div className="h-screen flex">
                    <div className="hidden relative lg:flex w-full lg:w-1/2 justify-around items-center   bg-cover bg-blend-lighten">
                        <div className="absolute inset-0 bg-black opacity-30"></div>

                        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                            <h1 className="font-bold text-4xl font-sans text-indigo-700">Facebook</h1>
                            <p className="mt-1 text-indigo-500">Sign In Now</p>
                            <div className="flex justify-center lg:justify-start mt-6">
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-100 w-full lg:w-1/2 justify-center items-center space-y-8">
                        <div className="w-full px-8 md:px-32 lg:px-24">
                            <form onSubmit={formik.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
                                {error ? <p className='text-red-500 text-center font-bold text-xl animate-pulse'>{error}</p> : null}
                                {success ? <p className='text-green-500 text-center font-bold text-xl animate-pulse'>{success}</p> : null}
                                <h2 className="text-gray-800 font-bold text-2xl mb-1">Sign In</h2>
                                <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>

                                {/* Email */}
                                <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    <input className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder=" Email " id="email" value={formik.values.email} onChange={formik.handleChange} />

                                </div>
                                {formik.errors.email && formik.touched.email ? <p className="text-red-500 my-1">{formik.errors.email}</p> : null}



                                {/* password */}
                                <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} placeholder="password" />

                                </div>
                                {formik.errors.password && formik.touched.password ? <p className="text-red-500 my-1">{formik.errors.password}</p> : null}

                                {/* Button */}
                                <button type="submit" className="block w-full md:w-1/2 mx-auto disabled:bg-indigo-300  bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                                    {loading ? <>

                                        <svg
                                            aria-hidden="true"
                                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>

                                    </> : "Sign In"}


                                </button>
                                <Link href="/signup" className="text-sm my-2 text-center block hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Create a new account ?</Link>
                            </form>
                        </div>
                    </div>
                </div>



            </InverseProtectedRoute>
        </>
    );
};

export default Page;
