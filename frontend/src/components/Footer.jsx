export default function Footer() {
  return (
    <footer className="w-full mt-0 flex-shrink-0"> {/* Set margin-top to 0 */}
      {/* Blue Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 animate-gradientShift" />

      {/* Footer Content */}
      <div className="bg-black text-gray-300 text-center py-4 shadow-inner">
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">AI Trip Planner</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
