import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="text-sm font-semibold text-text-muted hover:text-primary hover:cursor-pointer transition-colors duration-300">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
