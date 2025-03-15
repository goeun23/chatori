import React from "react";

export const AuthHeader = () => {
  return (
    <div className="text-center p-5 border-b">
      {/* 메신저 로고 */}
      <div className="flex justify-center mb-2">
        <svg
          className="w-12 h-12 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">ChatDori</h1>
      <p className="mt-2 text-gray-600">성장하는 AI, 당신의 챗톨이 :)</p>
    </div>
  );
};
