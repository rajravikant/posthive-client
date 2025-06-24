import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-dark  flex items-center justify-center">
            <div className="text-center">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#6366f1"
                >
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="2">
                            <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="1s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </g>
                    </g>
                </svg>
                <div className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                    Loading...
                </div>
            </div>
        </div>
    );
};

export default Loader;