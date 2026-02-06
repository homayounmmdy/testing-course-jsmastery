import { render, screen } from "@testing-library/react";
import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema, SignUpSchema } from "@/lib/validations";

describe("AuthForm Component", () => {
  describe("Sign In Form", () => {
    describe("Rendering", () => {
      it("should display all required fields", () => {
        const onSubmit = jest.fn();
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            formType="SIGN_IN"
          />
        );

        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
        expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
      });
    });
  });

  describe("Sign Out Form", () => {
    it("should display all required fields", () => {
      const onSubmit = jest.fn();
      render(
        <AuthForm
          schema={SignUpSchema}
          defaultValues={{ username: "", name: "", email: "", password: "" }}
          onSubmit={onSubmit}
          formType="SIGN_UP"
        />
      );

      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
      expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    });
  });
});
