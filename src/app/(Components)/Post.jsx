"use client";

import { useContext, useEffect, useState } from "react";
import { PostContext } from "../(context)/postsContext";
import { TokenContext } from "../(context)/tokenContext";
import { getPosts } from "../(utilies)/postsOpreations";
import PostItem from "./PostItme";
import UpdatePost from "./UpdatePost";


const Post = () => {
    /* Stats */
    const { posts, setPosts } = useContext(PostContext);
    const { token } = useContext(TokenContext)
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const fetchPosts = async () => {
        try {
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
        } catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {

        fetchPosts()

    }, [])


    /* =========   Handle Moda Of Update   =========  */

    const toggleUpdateModal = (postData) => {
        setShowUpdateModal({ show: !showUpdateModal.show, data: postData });
    };

    const hidenUpdateModal = () => {
        setShowUpdateModal(false);
    };


    return (
        <>
            <UpdatePost
                action={showUpdateModal.show}
                hiden={hidenUpdateModal}
                postData={showUpdateModal.data}
            />


            {posts?.map((post) => (
                <div key={post.id} className="mt-3 shadow-lg flex flex-col">
                    <PostItem
                        post={post}
                        toggleUpdateModal={toggleUpdateModal} />
                </div>
            ))}



        </>
    );
};

export default Post;
