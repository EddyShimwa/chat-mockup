import React from "react";

export default function Message({
  message,
  isDarkTheme,
  fontSize,
  chatBubbleColor,
}) {
  return (
    <div
      className={`flex ${
        message.isBot ? "justify-start items-center" : "justify-end"
      } mb-4`}
    >
      {message.isBot && (
        <img
          src="https://img.freepik.com/free-vector/redhaired-girl-with-pigtails_1308-176656.jpg"
          alt="Bot Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div>
        <div
          className={`max-w-xs p-3 rounded-lg ${fontSize} ${
            message.isBot
              ? isDarkTheme
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
              : `${chatBubbleColor} text-white`
          }`}
        >
          {message.text}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {!message.isBot && (
        <img
          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
          alt="User Avatar"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
}
