import { useState } from "react";
import { useSelector } from "react-redux";
import PersonalInfo from "../components/PersonalInfo";
import ContactInfo from "../components/ContactInfo";
import CreateUser from "../components/CreateUser";

const UserForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const formData = useSelector((state) => state.users.formData);

  const nextStep = (step = currentStep + 1) => setCurrentStep(step);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <>
      {currentStep === 1 ? (
        <PersonalInfo formData={formData} nextStep={nextStep} />
      ) : currentStep === 2 ? (
        <ContactInfo
          formData={formData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ) : currentStep === 3 ? (
        <CreateUser
          formData={formData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      ) : null}
    </>
    // Conditional rendering
  );
};

export default UserForm;
