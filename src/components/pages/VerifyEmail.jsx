import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
//svgs or icons
import EmailIcon from "../icons/emailIcon";
//
import Paragraph from "../Ui/paragraph";
import Svg from "../Ui/svg";
import Span from "../Ui/span";
//
function VerifyEmail() {
  const navigate = useNavigate();
  //
  const location = useLocation();
  //
  const user = auth.currentUser;
  console.log("user on render", user);
  useEffect(() => {
    async function tabChanged() {
      if (document.visibilityState !== "visible") return;
      await user.reload();
      if (user.emailVerified) {
        navigate("/home");
      }
    }
    document.addEventListener("visibilitychange", tabChanged);
    return () => {
      document.removeEventListener("visibilitychange", tabChanged);
    };
  }, []);
  return (
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
        <div className="flex gap-1">
          <Paragraph className="normalParagraphStyle" text="hi" />
          <Span
            className="font-inter text-[#137333]"
            text={location.state.fullName}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          <Paragraph
            className="normalParagraphStyle"
            text="we've sent a verification link to your"
          />
          <Span
            className="text-[#4F46E5] font-inter"
            text={location.state.email}
          />
          <Paragraph
            className="normalParagraphStyle"
            text="please check your inbox and click the link to activate your account."
          />
        </div>
      </div>
    </div>
  );
}
export default VerifyEmail;
