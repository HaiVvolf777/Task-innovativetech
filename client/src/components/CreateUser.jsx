import { useSelector, useDispatch } from "react-redux";
import { createUser, resetFormData } from "../store/userSlice";

const CreateUser = ({ prevStep, nextStep }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.users.formData);

  const handleSubmit = async () => {
    try {
      await dispatch(createUser(formData)).unwrap();
      dispatch(resetFormData());
      alert("User Created Successfully!");
      nextStep(1);
    } catch (error) {
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <>
      <div className="w-[100%] py-[91px] px-5 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="w-[540px] border-[#20577D] min-h-[600px] border-[0.86px] rounded-[17px] px-6 py-8 bgcardGray flex flex-col gap-8">
              <h1 className="text-center text-white text-[40px] font-bold">
                Review Your Information
              </h1>
              <div className="space-y-4 text-white flex flex-col justify-between h-full">
                <p className="py-3">
                  <strong>First Name:</strong> {formData.firstName}
                </p>
                <p className="py-3">
                  <strong>Last Name:</strong> {formData.lastName}
                </p>
                <p className="py-3">
                  <strong>Age:</strong> {formData.age}
                </p>
                <p className="py-3">
                  <strong>Gender:</strong> {formData.gender}
                </p>
                <p className="py-3">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="py-3">
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
