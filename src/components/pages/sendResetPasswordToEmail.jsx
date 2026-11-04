import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//jsx
import ResendBtnWithCountDown from "../sections/resendButtonWithCountDown";
//svgs or icons
import EmailIcon from "../icons/emailIcon";
//firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
//
import Paragraph from "../Ui/Paragraph";
import Svg from "../Ui/svg";
import Span from "../Ui/span";
//
function sendResetPasswordToEmail() {
  const navigate = useNavigate();
  //
  const location = useLocation();

  return (
    <>
      <div className="flex-1 px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="flex items-center justify-center">
          <Svg className="rounded-full bg-[rgba(4_2_19_/.1)] p-3">
            <EmailIcon width="40px" height="40px" />
          </Svg>
        </div>

        <div className="mt-4 text-center">
          <Paragraph className="formTitle" text="email verification" />
        </div>

        <div className="mx-auto mt-4 w-full max-w-lg">
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 text-center">
            <Paragraph
              className="normalParagraphStyle"
              text="we've sent a reset password link to your"
            />
            <Span
              className="break-all font-inter text-[#4F46E5]"
              text={location.state.email}
            />
            <Paragraph
              className="normalParagraphStyle"
              text="please check your inbox and click the link to reset your password."
            />
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-lg">
          <ResendBtnWithCountDown
            sendEmailToUser={() =>
              sendPasswordResetEmail(auth, location.state.email)
            }
          />
        </div>
      </div>
    </>
  );
}

export default sendResetPasswordToEmail;
