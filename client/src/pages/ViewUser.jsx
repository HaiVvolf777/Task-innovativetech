import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../store/userSlice";
import {
  AiTwotoneDelete,
  AiFillCaretRight,
  AiFillCaretLeft,
  AiTwotoneEdit,
} from "react-icons/ai";
import EditUserModal from "../components/EditUserModal";
import MiniLoader from "../loader/MiniLoader";

const ViewUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [page, setPage] = useState(1);
  const usersPerPage = 8;
  const [userToEdit, setUserToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        await dispatch(fetchUsers({ page, limit: usersPerPage })).unwrap();
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch failed:", error);
        }
      }
    };

    fetchData();
    return () => {
      abortController.abort();  
    //   Clean up function
    };
  }, [page, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleNextPage = () => {
    if (users.length === usersPerPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  return (
    <>
      <div className="w-[100%] py-[91px] px-5  flex items-center justify-center text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="w-[640px] h-[450px] min-h-[600px] border-[#20577D] border-[0.86px] rounded-[17px] px-6 py-8 bgcardGray flex flex-col justify-start gap-8">
              <h1 className="text-center text-white text-[40px] font-bold">
                Users List
              </h1>
              <div className="flex flex-col justify-between h-full">
                {userStatus === "loading" && <MiniLoader/>}
                {userStatus === "failed" && <p>{error}</p>}
                <ul>
                  {users.map((user) => (
                    <li
                      key={user._id}
                      className="flex justify-between items-center mb-4"
                    >
                      <span>
                        {user.firstName} {user.lastName} - {user.email} -{" "}
                        {user.age} - {user.gender} - {user.phone}
                      </span>
                      <div className="flex gap-x-2 ">
                        <button
                          className="bg-blue-500 p-2 rounded-md"
                          onClick={() => handleEdit(user)}
                        >
                          <AiTwotoneEdit className="text-white" />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded-md"
                          onClick={() => handleDelete(user._id)}
                        >
                          <AiTwotoneDelete className="text-white" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`bg-gray-500 text-white px-4 py-2 rounded ${
                      page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <AiFillCaretLeft />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={users.length < usersPerPage}
                    className={`bg-gray-500 text-white px-4 py-2 rounded ${
                      users.length < usersPerPage
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <AiFillCaretRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userToEdit={userToEdit}
      />
    </>
  );
};

export default ViewUser;
