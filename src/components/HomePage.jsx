import React, { useState } from "react";
import { FaSun, FaMoon, FaArrowDown } from "react-icons/fa";
import ChatBot from "./ChatBot";

const HomePage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <header className="p-4 flex justify-end">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} mode`}
          title={`Switch to ${isDarkTheme ? "light" : "dark"} mode`}
          className="px-4 py-2 rounded-full flex items-center space-x-2 
            border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-yellow-400
            bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
            hover:bg-blue-50/50 dark:hover:bg-yellow-50/10
            transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {isDarkTheme ? (
            <FaSun className="text-xl text-yellow-400 transition-transform duration-300 hover:rotate-12" />
          ) : (
            <FaMoon className="text-xl text-gray-600 transition-transform duration-300 hover:rotate-12" />
          )}
          <span className="text-sm font-medium">
            {isDarkTheme ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </header>
      <main className="mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-6xl font-bold">Welcome to our platform</h1>
        <p className="mt-5 text-lg">Open the chat button in the bottom right to explore </p>
      </main>

   

        <div className="fixed bottom-24 right-8 flex flex-col items-center">
        <FaArrowDown height={80} className="text-6xl text-blue-500 animate-bounce" />
        <ChatBot /> 
      </div>
    </div>
  );
}

export default HomePage;