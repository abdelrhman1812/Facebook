
const About = ({ user }) => {

    return <>
        <div className="  lg:w-1/4  px-4 pt-14 bg-gray-50 ">
            <div className="flex flex-col  font-semibold text-gray-900 leading-8">
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1"></h1>
                <p className="text-gray-600 font-lg text-semibold leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nostrum dignissimos, sed, ullam rerum corrupti, eligendi temporibus laborum amet quos tempora! Iste magni neque expedita commodi quidem quae officiis beatae?.</p>
                <div className="text-gray-700 flex flex-col  my-3 border-t  border-t-blue-300">
                    <p className=" font-semibold"> <span className="font-bold">Address</span> : Mansoura</p>
                    <p className=" font-semibold"><span className="font-bold">Contact</span> : 01008034761 </p>
                    <p className="  font-semibold"><span className="font-bold">Email</span> : {user?.email}  </p>
                </div>
            </div>
        </div>
    </>

}

export default About
