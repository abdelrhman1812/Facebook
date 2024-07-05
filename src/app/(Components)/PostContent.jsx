// components/PostContent.js
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PostContext } from '../(context)/postsContext';
import { TokenContext } from '../(context)/tokenContext';
import { deletePost, getPosts } from '../(utilies)/postsOpreations';

const PostContent = ({ post, toggleUpdateModal }) => {
    const { token } = useContext(TokenContext);
    const { setPosts } = useContext(PostContext);

    const decodedToken = token ? jwtDecode(token) : null;

    const getTextDirection = (text) => {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text) ? 'rtl' : 'ltr';
    };

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const data = await deletePost(id);

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


        } catch (error) {
            console.error(`Error deleting post`, error.response.data.message);
        }
    }




    return (
        <>
            <div className="flex items-center space-x-2 my-4 relative">
                {decodedToken?.userId === post.userId && (
                    <>
                        <div className='flex absolute right-0 cursor-pointer'>

                            <svg onClick={() => toggleUpdateModal(post)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-indigo-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <svg onClick={() => handleDelete(post.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                    </>
                )}



                {/* Img Profile */}

                {post &&
                    <Image
                        src={post?.user?.profilePhoto ? post.user.profilePhoto : '/default-avatar.png'}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                }
                {/* User Name And date */}
                <div>
                    <Link href={`../profile/${post.user?.id}`}>
                        <p className="text-gray-800 font-semibold">{post.user?.userName || 'Unknown User'}</p>
                    </Link>
                    <p className="text-gray-500 text-sm">
                        {post.createdAt ? new Date(post.createdAt).toLocaleTimeString('en-US', { weekday: 'long', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' }) : 'some time ago'}
                    </p>
                </div>

            </div>

            {/* Content Post */}
            <div className="mb-4" style={{ direction: getTextDirection(post.title) }}>
                <p className="text-gray-800 font-semibold">{post.title}</p>
                <p className="text-gray-800">{post.content}</p>
                <div className="overflow-hidden mt-5 flex justify-center">
                    {post.postPhoto && (
                        <Image
                            src={post.postPhoto}
                            height={500}
                            loading="lazy"
                            className="rounded-lg"
                            width={500}
                            alt={post.title}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default PostContent;