'use client';
import About from '@/app/(Components)/About';
import AddPost from '@/app/(Components)/AddPost';
import { NavBar } from '@/app/(Components)/NavBar';
import Post from '@/app/(Components)/Post';
import { SideBar } from '@/app/(Components)/SideBar';
import { PostContext } from '@/app/(context)/postsContext';
import { TokenContext } from '@/app/(context)/tokenContext';
import { getPosts, getUser } from '@/app/(utilies)/postsOpreations';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [user, setUser] = useState(null);
    const { setPosts } = useContext(PostContext);
    const { token } = useContext(TokenContext);
    const decodedToken = token ? jwtDecode(token) : null;

    const userId = Number(params.id);

    const fetchUser = async () => {
        try {
            const data = await getUser(userId);
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchPostUser = async () => {
        try {
            const data = await getPosts();
            const filterPost = data.filter((post) => post.userId === userId);
            setPosts(filterPost);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchPostUser();



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <section className='flex overflow-hidden'>
                <SideBar />
                <NavBar />
                <section className="profile pb-14 flex-grow md:w-3/4 mt-20 md:mt-0">
                    <header className={`bg-gradient-to-r from-cyan-100 to-blue-100 h-[300px] container mx-auto relative rounded-br-md`}>
                        <div className="image overflow-hidden absolute bottom-0 left-0 translate-x-10 translate-y-10 w-[150px] h-[150px] rounded-[50%]">
                            {user && (
                                <Image
                                    src={user.profilePhoto || "data:image/jpeg;base64,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"}
                                    alt="User Avatar"
                                    height={150}
                                    width={150}
                                    className="rounded-full"
                                />
                            )}
                        </div>
                    </header>

                    {/* Posts */}
                    <section className="container mx-auto flex flex-wrap gap-3">
                        <About user={user} />
                        <div className="md:-mx-2 w-full p-2 lg:w-3/4">
                            {decodedToken?.userId === userId ? <AddPost /> : null}
                            <Post />
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
};

export default Page;
