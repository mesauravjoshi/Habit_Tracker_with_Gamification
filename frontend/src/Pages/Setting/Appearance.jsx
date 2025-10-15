export default function Appearance() {

  return (
    <div className="flex flex-col items-end p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-yellow-600">
        Change Theme
      </h2>
      <p className="text-sm">
        {/* write here content for change themeg */}
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
}
