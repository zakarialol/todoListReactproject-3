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
import Paragraph from "../Ui/paragraph";
import Svg from "../Ui/svg";
import Span from "../Ui/span";
//
function sendResetPasswordToEmail() {
  const navigate = useNavigate();
  //
  const location = useLocation();
  return (
    <>
      <div className="flex-1 px-6 pt-6">
        <div className="flex items-center justify-center ">
          <Svg className="bg-[rgba(4_2_19_/.1)] rounded-full p-3">
            <EmailIcon width="40px" height="40px" />
          </Svg>
        </div>
        <div className="text-center">
          <Paragraph className="formTitle" text="email verification" />
        </div>
        <div>
          <div className="flex flex-wrap gap-1">
            <Paragraph
              className="normalParagraphStyle"
              text="we've sent a reset password link to your"
            />
            <Span
              className="text-[#4F46E5] font-inter"
              text={location.state.email}
            />
            <Paragraph
              className="normalParagraphStyle"
              text="please check your inbox and click the link to reset your password."
            />
          </div>
        </div>
        <ResendBtnWithCountDown
          sendEmailToUser={() =>
            sendPasswordResetEmail(auth, location.state.email)
          }
        />
      </div>
    </>
  );
}
export default sendResetPasswordToEmail;
