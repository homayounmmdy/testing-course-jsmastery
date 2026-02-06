import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema, SignUpSchema } from "@/lib/validations";

const user = userEvent.setup();

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

    describe("Form Validation", () => {
      it("should show validation error for invalid email", async () => {
        const onSubmit = jest.fn();
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            formType="SIGN_IN"
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Sign In" });

        await user.type(emailInput, "test@invalid");
        await user.type(passwordInput, "123123123");
        await user.click(submitButton);

        expect(screen.getByText("Please provide a valid email address.")).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });

      it("should show validation error for short password", async () => {
        const onSubmit = jest.fn();
        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            formType="SIGN_IN"
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Sign In" });

        await user.type(emailInput, "valid@email.com");
        await user.type(passwordInput, "123");
        await user.click(submitButton);

        expect(screen.getByText("Password must be at least 6 characters long.")).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    describe("Submission", () => {
      it("should call onSubmit with valid data and proper loading state", async () => {
        const onSubmit = jest
          .fn()
          .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100)));

        render(
          <AuthForm
            schema={SignInSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            formType="SIGN_IN"
          />
        );

        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Sign In" });

        await user.type(emailInput, "test@valid.com");
        await user.type(passwordInput, "123123123");
        await user.click(submitButton);

        expect(screen.getByText("Signing In...")).toBeInTheDocument();
        expect(onSubmit).toHaveBeenCalledWith({
          email: "test@valid.com",
          password: "123123123",
        });
      });
    });
  });

  describe("Sign Out Form", () => {
    describe("Rendering", () => {
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
});
