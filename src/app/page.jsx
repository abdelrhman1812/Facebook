"use cleint"

import AddPost from "./(Components)/AddPost";
import { NavBar } from "./(Components)/NavBar";
import Post from "./(Components)/Post";
import { SideBar } from "./(Components)/SideBar";
import ProtectedRoute from "./(ProtectedRoute)/ProtectedRoute";

const page = () => {


    return (
        <>
            <ProtectedRoute>

                <div className="flex overflow-hidden flex-wrap min-h-screen">

                    <SideBar />
                    <NavBar />
                    <div className=" flex-grow md:w-3/4 mt-20 md:mt-0  ">
                        <div className=" container mx-auto  p-5 md:px-12  antialiased">
                            <AddPost />
                            <Post />
                        </div>
                    </div>
                </div>

            </ProtectedRoute>

        </>
    );


};

export default page;
