import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useContext, useRef, useState } from 'react';
import { Bounce, toast } from "react-toastify";
import { PostContext } from "../(context)/postsContext";
import { TokenContext } from "../(context)/tokenContext";
import { addComment, deleteComment, getPosts, updateComment } from "../(utilies)/postsOpreations";

const Comments = ({ comments, postId }) => {
    const [contentComments, setContentComments] = useState('');
    const [editCommentId, setEditCommentId] = useState(null); // State to store the ID of the comment being edited
    const [editCommentContent, setEditCommentContent] = useState(''); // State to store the content of the comment being edited
    const commentInput = useRef(null);
    const { token } = useContext(TokenContext);
    const decodedToken = token ? jwtDecode(token) : null;

    const { setPosts } = useContext(PostContext);

    const notify = () => {
        toast.success('🤩 success Add Commenet', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            cssTransition: Bounce,
        });
    };

    const getTextDirection = (text) => {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text) ? 'rtl' : 'ltr';
    };

    const handleAddComment = async () => {
        if (!contentComments.trim()) return;

        await addComment({ postId, content: contentComments });
        setContentComments('');
        notify()
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

    };

    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id);
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
            console.error('Error deleting Comment:', err);
        }
    };

    const handleUpdateComment = async (id) => {
        try {
            await updateComment(id, { content: editCommentContent });
            console.log(editCommentContent)
            setEditCommentId(null);
            setEditCommentContent('');
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            console.error('Error updating Comment:', err);
        }
    };

    const handleEditClick = (id, content) => {
        setEditCommentId(id);
        setEditCommentContent(content);
    };

    return (
        <div>
            <p className="text-gray-800 font-semibold my-3">Comments</p>

            {/* Input and btn add comment */}
            <div className="relative my-2">
                <input
                    ref={commentInput}
                    type="text"
                    placeholder="Add a comment"
                    className="w-full py-2 px-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-300"
                    value={contentComments}
                    onChange={(e) => setContentComments(e.target.value)}
                />
                <button
                    disabled={!contentComments.trim()}
                    onClick={handleAddComment}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-indigo-500 text-xl font-semibold cursor-pointer hover:scale-110 transition-all duration-700 disabled:text-gray-500">
                    Add
                </button>
            </div>

            {/* Displaying existing comments */}
            {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center gap-5">
                    <Image
                        src={comment.user.profilePhoto}
                        height={30}
                        width={30}
                        loading="lazy"
                        alt={comment.user.userName}
                        className="rounded-lg"
                    />
                    <div className="bg-gray-100 p-2 rounded-lg my-3 flex-grow">
                        <p className="text-gray-500 text-lg">{comment.user.userName}</p>
                        {editCommentId === comment.id ? (
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                            />
                        ) : (
                            <p className="text-gray-500 text-lg font-bold" style={{ direction: getTextDirection(comment.content) }}>{comment.content}</p>
                        )}
                        <div className="btn flex justify-end gap-2">
                            {editCommentId === comment.id ? (
                                <button className="text-indigo-400" onClick={() => handleUpdateComment(comment.id)}>Update</button>
                            ) : (
                                <>                {decodedToken?.userId === comment.user.id && (

                                    <button className="text-indigo-400" onClick={() => handleEditClick(comment.id, comment.content)}>Edit</button>
                                )}
                                </>
                            )}
                            <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500">Delete</button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
