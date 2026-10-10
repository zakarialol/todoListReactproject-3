//react
import { useState, useEffect } from "react";
//firebase
import { sendEmailVerification } from "firebase/auth";
//
function resendBtnWithCountDown({ sendEmailToUser }) {
  const [count, setCount] = useState(30);
  const [runInterval, setRunInterval] = useState(true);
  useEffect(() => {
    if (!runInterval) return;
    const countDown = setInterval((prev) => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(countDown);
          setRunInterval(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countDown);
  }, [runInterval]);
  async function resend() {
    try {
      await sendEmailToUser();
    } catch (error) {
      console.log(error);
    }
    setRunInterval(true);
    setCount(30);
  }
  return (
    <div className="mt-5">
      <div className="flex gap-2">
        <p className="normalParagraphStyle">Didn't receive an email?</p>
        <button
          className={`font-inter ${count ? "text-[#717182] cursor-not-allowed underline" : "text-blue-600 hover:text-blue-700 cursor-pointer underline"}`}
          disabled={count ? true : false}
          onClick={resend}
        >
          resend
        </button>
        <p className="text-gray-700">
          {count !== null && (
            <>
              <span className="normalParagraphStyle">in </span>
              {`00:${String(count).padStart(2, 0)}`}
            </>
          )}
        </p>
      </div>
      <p className="normalParagraphStyle">
        if Didn't receive it? Check your spam folder.
      </p>
    </div>
  );
}
export default resendBtnWithCountDown;
