import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../store/userSlice";

const ContactInfo = ({ formData, nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    email: formData.email || "",
    phone: formData.phone || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!contactInfo.email) errors.email = "Email is required";
    if (!contactInfo.phone) errors.phone = "Phone number is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(updateFormData(contactInfo));
      nextStep();
    }
  };

  return (
    <>
      <div className="w-[100%] py-[91px] px-5 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="w-[540px] border-[#20577D] min-h-[600px] border-[0.86px] rounded-[17px] px-6 py-8 bgcardGray flex flex-col  gap-8">
              <h1 className="text-center text-white text-[40px] font-bold">
                Contact Information
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white"
                  >
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="number"
                    placeholder="Phone Number"
                    value={contactInfo.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-sm">{errors.phone}</div>
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-2 rounded"
                  >
                    Back
                  </button>
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

export default ContactInfo;
