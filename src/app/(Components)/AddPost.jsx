"use client";

import { useFormik } from "formik";
import Image from "next/image";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import * as Yup from 'yup';
import { PostContext } from "../(context)/postsContext";
import { addPost, getPosts } from "../(utilies)/postsOpreations";

const AddPost = () => {
    const { setPosts } = useContext(PostContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(null);

    const notify = () => {
        toast.success('🤩 success post added', {
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

    const handleSubmit = async (values, formik) => {
        console.log(values);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);

        if (file) {
            formData.append('image', file);
        }

        setLoading(true);
        try {
            await addPost(formData);
            setLoading(false);

            formik.resetForm();
            notify();
            setFile(null);
            setImageUploaded(null);

            if (location.href.includes("profile")) {
                const url = location.href;
                const userId = url.split('/profile/')[1];

                const data = await getPosts();
                const filterPost = data.filter((post) => post.userId === parseInt(userId));
                setPosts(filterPost);
            } else {
                const data = await getPosts();
                setPosts(data);
            }

        } catch (err) {
            setLoading(false);
            console.error('Error adding post:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || err.message);
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required").min(5, "Title must be at least 5 characters"),
        content: Yup.string().required("Content is required").min(5, "Content must be at least 5 characters"),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImageUploaded(URL.createObjectURL(file));
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="bg-white border border-gray-300 p-4 shadow-lg rounded-lg">
                <div className="editor mx-auto w-full flex flex-col text-gray-800">
                    <input
                        className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded  focus:border-indigo-600"
                        spellCheck="false"
                        placeholder="Title"
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <p className="text-red-500 my-1">{formik.errors.title}</p>
                    ) : null}
                    <textarea
                        className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none rounded  focus:border-indigo-600"
                        spellCheck="false"
                        placeholder="Describe everything about this post here"
                        id="content"
                        name="content"
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    ></textarea>
                    {formik.errors.content && formik.touched.content ? (
                        <p className="text-red-500 my-1">{formik.errors.content}</p>
                    ) : null}
                    <div className="icons flex gap-4 text-gray-500 m-2">
                        <label htmlFor="image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </label>
                        {/* Other icons */}
                        {imageUploaded &&
                            <Image
                                height={30}
                                width={30}
                                src={imageUploaded || '/default-avatar.png'}
                                className=" rounded"
                                alt="content"
                            />}
                        <input type="file" onChange={handleFileChange} className="hidden" id="image" />
                    </div>
                    <div className="buttons flex">
                        <button
                            type="button"
                            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                            onClick={() => {
                                formik.resetForm()
                                setImageUploaded(null)
                            }}
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty) || loading}
                            className="btn border disabled:bg-indigo-300 disabled:border-indigo-300 border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                        >
                            {loading ? (
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
                            ) : (
                                'Post'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddPost;