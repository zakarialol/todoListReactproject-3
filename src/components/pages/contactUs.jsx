import { useState, useEffect } from "react";
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../Ui/Button";
//icons
//
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation";
//react
import { useNavigate } from "react-router-dom";
//
import { emailRegex, nameRegex, subjectRegex } from "../../js/regex";
//
import { livingInput } from "../../js/livingInput";
import livinTextArea from "../../js/livinTextArea";
import displayOrhideformErrors from "../../js/DispalyOrHideFormError";
//
import useInput from "../hooks/useinput";
//
function ContactUs() {
  const navigate = useNavigate();
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
  //!state
  const [userOrPasswordIncorretError, setuserOrPasswordIncorretError] =
    useState(false);
  const [loginAnimation, setloginAnimation] = useState(false);
  //
  const name = useInput({ initialValue: "", errors, setErrors });
  const email = useInput({ initialValue: "", errors, setErrors });
  const subject = useInput({ initialValue: "", errors, setErrors });
  const message = useInput({ initialValue: "", errors, setErrors });
  //hanlde sumbit
  async function handleSend(e) {
    e.preventDefault();
    //----------
    const hasInvalidInputs = validinputsfunc(
      name,
      email,
      subject,
      message,
      setErrors,
    );
    if (hasInvalidInputs) return;
    //---------
    setErrors((prev) => ({
      ...prev,
      ["email"]: {
        ...prev.email,
        showError: !emailisValid,
        touched: true,
      },
    }));
  }
  //
  // this when the user lives the input
  return (
    <>
      <div className="px-6 pt-6 flex-1">
        <div className="text-center">
          <Paragraph className="formTitle" text="contact us" />
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-500 font-inter text-red-500 bg-[rgba(239_68_68_/_.1)] w-fit mx-auto rounded-lg ${userOrPasswordIncorretError ? "max-h-10" : "max-h-0"}`}
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
                className={`${loginAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>
      </div>
    </>
  );
}
export default ContactUs;
