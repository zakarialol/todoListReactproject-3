import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
//
import { sendEmailVerification } from "firebase/auth";
//jsx
import ResendBtnWithCountDown from "../sections/resendButtonWithCountDown";
//svgs or icons
import EmailIcon from "../icons/emailIcon";
//
import Paragraph from "../Ui/Paragraph";
import Svg from "../Ui/svg";
import Span from "../Ui/span";
//
function VerifyEmail() {
  const navigate = useNavigate();
  //
  const location = useLocation();
  //
  const user = auth.currentUser;

  useEffect(() => {
    async function tabChanged() {
      if (document.visibilityState !== "visible") return;
      await user.reload();
      if (user.emailVerified) {
        navigate("/home", { replace: true });
      }
    }
    document.addEventListener("visibilitychange", tabChanged);
    return () => {
      document.removeEventListener("visibilitychange", tabChanged);
    };
  }, []);

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
          <div className="mb-2 flex flex-wrap justify-center gap-x-1 gap-y-1 text-center">
            <Paragraph className="normalParagraphStyle" text="hi" />
            <Span
              className="font-inter text-[#137333]"
              text={location.state.fullName}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 text-center">
            <Paragraph
              className="normalParagraphStyle"
              text="we've sent a verification link to your"
            />
            <Span
              className="break-all font-inter text-[#4F46E5]"
              text={location.state.email}
            />
            <Paragraph
              className="normalParagraphStyle"
              text="please check your inbox and click the link to activate your account."
            />
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-lg">
          <ResendBtnWithCountDown
            sendEmailToUser={() => sendEmailVerification(user)}
          />
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
