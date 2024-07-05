import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { TokenContext } from '../(context)/tokenContext';
import { UserContext } from '../(context)/userData';
import { getUser, profilePhotoUpload } from '../(utilies)/postsOpreations';

const ProfilePhotoUploader = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const { token } = useContext(TokenContext);


    const [file, setFile] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(null); // Initialize to null or a placeholder image URL

    const getUserData = async () => {
        try {
            if (!token) {
                return;
            }

            const id = jwtDecode(token)?.userId;
            const data = await getUser(id);
            console.log(data)
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user data:', error); run
        }
    };
    const notify = () => {
        toast.success("🎀 success Upload Image ", {
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
    // Function to update profile photo
    const updateProfile = async () => {
        const formData = new FormData();

        if (file) {
            formData.append('image', file);
        }

        console.log(file)
        try {
            await profilePhotoUpload(formData);
            await getUserData()
            notify()
        } catch (err) {
            console.error('Error updating profile photo:', err);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImageUploaded(URL.createObjectURL(file));
    };



    useEffect(() => {


        getUserData();
    }, [token, setUserInfo]);


    return (
        <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
            {/* Photo File Input */}
            <input
                type="file"
                className="hidden"
                id='photo'
                onChange={handleFileChange}
            />
            <div className="text-center">
                {/* Current Profile Photo */}
                <div className="mt-2">

                    <Image
                        src={imageUploaded || userInfo?.user.profilePhoto
                        }
                        height={80}
                        width={80}
                        className="w-10 md:w-16 rounded-full mx-auto"
                        alt="Profile picture of the user"
                    />

                </div>

                <div className='flex items-center justify-center gap-4 mt-5'>
                    <button
                        onClick={updateProfile}
                        type="button"
                        className={`px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 ${!file && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!file}
                    >
                        Upload
                    </button>
                    <button
                        type="button"
                        className="px-9 py-1 flex items-center bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                    >
                        <label className="block cursor-pointer text-gray-700 text-sm font-bold text-center" htmlFor="photo">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>
                        </label>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoUploader;
