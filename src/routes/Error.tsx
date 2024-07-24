import { Link, useRouteError,isRouteErrorResponse,Navigate } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  
  if (isRouteErrorResponse(error)) {
    return (
      <section className="bg-white dark:bg-dark">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-rose-600 dark:text-rose-500">{error.status}</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{error.statusText}</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{error.data}</p>
                <Link to="/" className="inline-flex text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-rose-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
      </section>
    );
  }

  else { 
    return (
      <Navigate to="/" />
    );
  }
  

};

export default Error;
