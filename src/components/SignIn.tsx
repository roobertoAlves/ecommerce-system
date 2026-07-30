import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
