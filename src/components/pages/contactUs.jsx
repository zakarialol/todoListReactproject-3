import { useState, useEffect } from "react";
//jsx ------------------
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../Ui/Button";
//jsx animation ---------
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation";
//react ----------
import { useNavigate } from "react-router-dom";
//
import { emailRegex, nameRegex, subjectRegex } from "../../js/regex";
//js functions ----------------
import { livingInput } from "../../js/livingInput";
import livinTextArea from "../../js/livinTextArea";
import displayOrhideformErrors from "../../js/DispalyOrHideFormError";
//costome hook ---------------
import useInput from "../hooks/useinput";
//emailjs libary
import emailjs, { send } from "@emailjs/browser";

//
function ContactUs() {
  const navigate = useNavigate();
  //*states ---------------
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendAnimation, setSendAnimation] = useState(false);
  const [succesfullyMsgSent, setSuccesfullyMsgSent] = useState(false);
  //
  const [errors, setErrors] = useState({
    name: {
      msg: "name not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
    email: {
      msg: "email not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
    subject: {
      msg: "subjet not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
    message: {
      msg: "message not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });
  //reset the contact form inputs -----------
  function resetFormInputs() {
    setNameValue("");
    setEmailValue("");
    setSubjectValue("");
    setMessageValue("");
  }
  //
  const { setValue: setNameValue, ...name } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setEmailValue, ...email } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setSubjectValue, ...subject } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setMessageValue, ...message } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  // valid inputs function -------------
  function validinputsfunc(name, email, subject, message, setErrors) {
    const FormInputsErrorsObj = {};
    if (!nameRegex.test(name.value.trim())) {
      FormInputsErrorsObj.name = true;
    } else {
      FormInputsErrorsObj.name = false;
    }

    if (!emailRegex.test(email.value.trim())) {
      FormInputsErrorsObj.email = true;
    } else {
      FormInputsErrorsObj.email = false;
    }
    if (!subjectRegex.test(subject.value.trim())) {
      FormInputsErrorsObj.subject = true;
    } else {
      FormInputsErrorsObj.subject = false;
    }

    if (
      message.value.trim().length >= 10 &&
      message.value.trim().length <= 3000
    ) {
      FormInputsErrorsObj.message = false;
    } else {
      FormInputsErrorsObj.message = true;
    }
    displayOrhideformErrors(FormInputsErrorsObj, setErrors);
    return Object.values(FormInputsErrorsObj).some((value) => value === true);
  }
  //hanlde sumbit
  async function handleSend(e) {
    e.preventDefault();
    const hasInvalidInputs = validinputsfunc(
      name,
      email,
      subject,
      message,
      setErrors,
    );
    //reset the inputs touched --------------------
    setErrors((prev) => ({
      ...prev,
      name: { ...prev.name, touched: true },
      email: { ...prev.email, touched: true },
      subject: { ...prev.subject, touched: true },
      message: { ...prev.message, touched: true },
    }));
    if (hasInvalidInputs) return;
    //setting the values to the form
    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
    };
    //sending the email ---------
    try {
      setSendAnimation(true);

      //showing succes msg ------
      setSuccesfullyMsgSent(true);
      setTimeout(() => {
        setSuccesfullyMsgSent(false);
      }, 3000);
      //clear the form ----------------
      resetFormInputs();
    } catch (err) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 2000);
      console.log(err);
    } finally {
      setSendAnimation(false);
    }
  }
  //
  // this when the user lives the input
  return (
    <>
      <div className="px-6 pt-6 flex-1 relative">
        <p
          role="status"
          className={` transition-[right] duration-1000 font-inter text-white bg-[#2E7D32] rounded-lg py-1 px-3 absolute  -top-5 ${succesfullyMsgSent ? "right-[4px]" : "-right-full"}`}
        >
          message send succesfully
        </p>
        <div className="text-center">
          <Paragraph className="formTitle" text="contact us" />
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-500 font-inter text-red-500 bg-[rgba(239_68_68_/_.1)] w-fit mx-auto rounded-lg ${formSubmitted ? "max-h-10" : "max-h-0"}`}
        >
          <p className="px-2 py-1 ">email didn't sent try again</p>
        </div>
        {/* //*form ----------------------------------------- */}
        <form action="" onSubmit={handleSend}>
          <InputWithTitle
            title="name"
            name="name"
            type="text"
            error={errors.name["msg"]}
            showError={errors.name.showError}
            {...name}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
          />
          {/* //#########3 */}
          <InputWithTitle
            title="email"
            name="email"
            type="email"
            placeholder="nn@example.com"
            error={errors.email["msg"]}
            showError={errors.email.showError}
            {...email}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
          />
          {/* //###### */}
          <InputWithTitle
            title="subject"
            name="subject"
            type="text"
            error={errors.subject["msg"]}
            showError={errors.subject.showError}
            {...subject}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
          />
          {/* //###### */}
          <InputWithTitle
            title="message"
            name="message"
            type="textarea"
            error={errors.message["msg"]}
            showError={errors.message.showError}
            {...message}
            onblur={(e) => {
              livinTextArea(e, setErrors);
            }}
          />
          {/* end of form ------------------------------- */}
          <Button
            type="send"
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3 flex items-center justify-center gap-1"
            text="send"
            animation={
              <BounceLoadingAnimation
                className={`${sendAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>
      </div>
    </>
  );
}
export default ContactUs;
