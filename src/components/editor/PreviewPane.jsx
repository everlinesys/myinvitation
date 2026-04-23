export default function PreviewPane({ children }) {
  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full flex justify-center">
      <div className="shadow-xl bg-white">
        {children}
      </div>
    </div>
  );
}