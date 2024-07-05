import { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { PostContext } from "../(context)/postsContext";
import { getPosts, updatePost } from "../(utilies)/postsOpreations";

const UpdatePost = ({ action, hiden, postData, posts, setPostss }) => {
    const { setPosts } = useContext(PostContext);
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");

    const notify = () => {
        toast.success('👍🏽 success Update', {
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
    useEffect(() => {
        if (postData) {
            setTitle(postData.title || "");
            setContent(postData.content || "");
        }
    }, [postData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            notify()
            await updatePost(postData.id, { title, content });
            if (location.href.includes("profile")) {
                const url = location.href;
                const userId = url.split('/profile/')[1];
                const data = await getPosts();
                const filterPost = data.filter((post) => post.userId === parseInt(userId, 10));
                setPosts(filterPost);
            } else {
                const data = await getPosts();
                setPosts(data);
            }

            hiden();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <>
            {action && (
                <div id="add-post-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-slate-400 opacity-85 flex  max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Post
                                </h3>
                                <button onClick={() => { hiden() }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-post-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the title" required />
                                    </div>
                                    <div>
                                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Content</label>
                                        <textarea name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post here" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
                                    </div>
                                    {error && <p className="text-red-500">{error.message}</p>} {/* Display error message if there is an error */}
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdatePost;
