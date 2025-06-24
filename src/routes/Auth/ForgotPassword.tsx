import { AxiosError, isAxiosError } from "axios";
import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { forgotPassword } from "../../service/auth";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await forgotPassword(identifier);
      toast.success(response.data.message);
      setIsSuccess(true);
      setNewPassword(response.data.newPassword);
    } catch (error:AxiosError | any) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.error)
        } else {
            toast.error("Failed to reset password. Please try again.");
        }
     
    } finally {
        setIsSubmitting(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      
      {!isSuccess ? (
        <>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <LockIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <h2 className="text-2xl dark:text-white font-bold mb-2">Forgot Password</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your username or email to reset your password. 
              A new temporary password will be generated and sent to you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="email_or_username"
                name="email_or_username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                required
                className="pl-10 block w-full rounded-lg border border-gray-300 bg-transparent p-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder="Enter your username or email"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3.5 text-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
            <div className="text-center mt-2">
              <Link to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Remember your password? Log in
              </Link>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <svg className="h-12 w-12 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl dark:text-white font-bold mb-4">Success</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your temporary password is <span className="font-medium text-blue-600 dark:text-blue-400">{ newPassword }</span>{" "}
             Please use this temporary password to log in, then go to your profile page to set a new password.
          </p>
          
          <div className="mt-8 flex flex-col space-y-3">
            <Link to="/login" className="w-full inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Go to Login 
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
