import React from "react"; 
import { useContext } from "react";
import { NavContext } from "../../contexts/NavProvider";
import { toast } from "react-hot-toast";

const Setting = () => {
  const { user, updateUserProfile } = useContext(NavContext);
  

  const updateUserHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.value;
    const profile = { displayName: name, photoURL: image };
    updateUserProfile(profile)
      .then(() => {
        toast.success("Update user account");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl text-center">Setting</h2>
      <form
        onSubmit={(e) => updateUserHandler(e)}
        className="flex flex-col w-96 mx-auto mt-10"
      >
        <label htmlFor="name">Name</label>
        <input
          className="mb-3 input input-sm input-bordered"
          id="name"
          name="name"
          type="text"
          defaultValue={user?.displayName}
        />
        <label htmlFor="email">Email</label>
        <input
          className="mb-3 input input-sm input-bordered"
          id="email"
          name="email"
          defaultValue={user?.email}
          readOnly
          type="text"
        />
        <label htmlFor="image">Image</label>
        <input
          className="mb-3 file-input file-input-bordered"
          id="image"
          name="image"
          type="file"
          accept="image/"
        />
        <div className="mx-auto">
          <button className="bg-gray-700 hover:bg-gray-600 duration-500 mt-5 px-4 py-2 text-white rounded">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
