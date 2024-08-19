import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../store/userSlice";

const PersonalInfo = ({ formData, nextStep }) => {
  const dispatch = useDispatch();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    age: formData.age || "",
    gender: formData.gender || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!personalInfo.firstName) errors.firstName = "First Name is required";
    if (!personalInfo.lastName) errors.lastName = "Last Name is required";
    if (!personalInfo.age || personalInfo.age <= 0)
      errors.age = "Age is required and must be greater than 0";
    if (!personalInfo.gender) errors.gender = "Gender is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(updateFormData(personalInfo));
      nextStep();
    }
  };

  return (
    <>
      <div className="w-[100%] py-[91px] px-5 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="w-[540px] border-[#20577D] min-h-[600px] border-[0.86px] rounded-[17px] px-6 py-8 bgcardGray flex flex-col justify-between gap-8">
              <h1 className="text-center text-white text-[40px] font-bold">
                Personal Informtion
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-white"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-white"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="last name"
                    value={personalInfo.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-white"
                  >
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={personalInfo.age}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.age && (
                    <div className="text-red-500 text-sm">{errors.age}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-white"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" label="Select gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </select>
                  {errors.gender && (
                    <div className="text-red-500 text-sm">{errors.gender}</div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
