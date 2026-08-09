// icons
import Logo from "@/components/icons/Logo";
import Paragraph from "../Ui/paragraph";
//jsx
import LogoAndTitle from "@/components/sections/LogoAndTitle";
import InputWithTitle from "@/components/sections/InputWithTitle";
import Button from "@/components/Ui/Button";
import { Link } from "react-router-dom";
import useInput from "../hooks/Useinput.js";
//
import { auth } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Register() {
  const fullName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  //
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("u just clicked sign up");
    try {
      const userCridenial = await createUserWithEmailAndPassword(
        auth,
        // fullName.value,
        email.value,
        password.value,
      );
      console.log("waiting ...");
      console.log(userCridenial);
    } catch (err) {
      console.log(err);
    }
  }
  //
  return (
    <div className="px-6 pt-6 h-dvh">
      <LogoAndTitle
        logo={<Logo width="32" height="32" />}
        title="askanote"
        className="flex gap-2 items-center mb-24"
      />

      <div className="text-center">
        <Paragraph className="formTitle" text="create and account" />
      </div>

      <form action="" onSubmit={handleSubmit}>
        <InputWithTitle
          name="fullName"
          {...fullName}
          title="full name"
          type="text"
        />
        <InputWithTitle name="email" {...email} title="email" type="email" />
        <InputWithTitle
          name="password"
          {...password}
          title="password"
          type="password"
        />
        <InputWithTitle
          name="confirmPassword"
          {...confirmPassword}
          title="confirm password"
          type="password"
        />

        <Button
          className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
          text="sign up"
        />
      </form>

      <div className="text-center mt-4 flex items-center justify-center flex-wrap capitalize">
        <Paragraph text="already have an acoount?" className="" />
        <Link to="/login" className="text-orange-500 cursor-pointer ">
          sign in
        </Link>
      </div>
    </div>
  );
}
export default Register;
