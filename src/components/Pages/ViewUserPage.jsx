import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import SwitchButtons from "../components/SwitchButtons";
import CustomDialog from "../components/UserDialog";
import ConfirmationDialog from "../components/ConfirmationDialog ";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUser } from "../features/User/userSlice";

export const ViewUser = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const user = state.data || [];

  const [list, setList] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!user.length) {
      dispatch(fetchUser());
    } else {
      setList(user);
    }
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    dispatch(deleteUser(id));
    setUserToDelete(null);
  };

  const openCustomDialog = (user) => {
    setSelectedUser(user);
  };

  const closeCustomDialog = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        className="min-w-fit"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
          Manage Users
        </h3>
        <div className="overflow-x-auto">
          <table className="mt-5 mb-5 w-full border-2">
            <thead>
              <tr className="bg-gray-100 p-2">
                <th className="p-2">No</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th colSpan="2" className="p-1">
                  View
                </th>
                <th colSpan="2" className="p-1">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((user, index) => (
                <tr key={user.userId} className="text-center">
                  <td className="p-2">{user.userId}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2" colSpan={2}>
                    <button onClick={() => openCustomDialog(user)}>
                      <CiViewBoard className="text-blue-600 font-bold text-xl" />
                    </button>
                  </td>
                  <td className="p-2" colSpan={2}>
                    <button onClick={() => setUserToDelete(user.userId)}>
                      <MdDelete className="text-red-600 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
      </div>
      <CustomDialog
        isOpen={!!selectedUser}
        onClose={closeCustomDialog}
        user={selectedUser}
        onDelete={handleDelete}
      />
      {userToDelete && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message="Are you sure you want to delete this user?"
          onCancel={() => setUserToDelete(null)}
          onConfirm={() => handleDelete(userToDelete)}
        />
      )}
    </>
  );
};

export default ViewUser;
