import React from "react";

export default function SettingsPanel({
  isDarkTheme,
  toggleTheme,
  headerColor,
  setHeaderColor,
  notificationsEnabled,
  toggleNotifications,
  soundNotificationsEnabled,
  toggleSoundNotifications,
  fontSize,
  setFontSize,
  chatBubbleColor,
  setChatBubbleColor,
  chatWindowSize,
  setChatWindowSize,
}) {
  return (
    <div
      className={`w-1/3 border-r p-4 animate-slide-in ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h4 className="text-sm font-semibold mb-4">Customization Panel</h4>
      <div className="space-y-4">
        <div className="text-sm">
          <p className="font-bold text-xl">Header</p>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="rounded"
              checked={isDarkTheme}
              onChange={toggleTheme}
            />
            <span>Dark Mode</span>
          </label>
          <label className="flex items-center gap-2 mt-2">
            <span>Header Color</span>
            <select
              value={headerColor}
              onChange={(e) => setHeaderColor(e.target.value)}
              className={`rounded ${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <option value="bg-gray-800">Gray</option>
              <option value="bg-blue-800">Blue</option>
              <option value="bg-green-800">Green</option>
              <option value="bg-red-800">Red</option>
            </select>
          </label>
        </div>
        <div className="text-sm">
          <p className="font-bold text-xl">Chat</p>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="rounded"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
            />
            <span>Notifications</span>
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="rounded"
              checked={soundNotificationsEnabled}
              onChange={toggleSoundNotifications}
            />
            <span>Sound Notifications</span>
          </label>
          <label className="flex items-center gap-2 mt-2">
            <span>Font Size</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className={`rounded ${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <option value="text-sm">Small</option>
              <option value="text-base">Medium</option>
              <option value="text-lg">Large</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mt-2">
            <span>Chat Bubble Color</span>
            <select
              value={chatBubbleColor}
              onChange={(e) => setChatBubbleColor(e.target.value)}
              className={`rounded ${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <option value="bg-blue-500">Blue</option>
              <option value="bg-green-500">Green</option>
              <option value="bg-purple-500">Purple</option>
              <option value="bg-red-500">Red</option>
            </select>
          </label>

          <label className="flex items-center gap-2 mt-2">
            <span>Chat Window Size</span>
            <select
              value={chatWindowSize}
              onChange={(e) => setChatWindowSize(e.target.value)}
              className={`rounded ${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <option value="small">Normal</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
