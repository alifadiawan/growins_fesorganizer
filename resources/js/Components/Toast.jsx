// resources/js/Components/Toast.jsx
export default function Toast({ success, error, message }) {
  if (!success && !error && !message) return null;  // Show only if there's a success, error, or custom message

  const displayMessage = message || success || error;  // Prioritize custom message first
  const bgColor = success ? 'bg-green-500' : error ? 'bg-red-500' : 'bg-yellow-500'; // Yellow for custom message

  return (
    <div
      className={`fixed top-5 right-5 text-white px-4 py-2 rounded shadow ${bgColor} z-50`}
      style={{ zIndex: 9999 }} // Ensures it's in front of other elements
    >
      {displayMessage}
    </div>
  );
}