"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => (
  <AuthForm
    formType="SIGN_UP"
    schema={SignUpSchema}
    defaultValues={{ username: "", name: "", email: "", password: "" }}
    onSubmit={signUpWithCredentials}
  />
);

export default SignUp;
