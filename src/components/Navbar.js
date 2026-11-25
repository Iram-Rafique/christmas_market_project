import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">

          {/* Logo / Site Name */}
          <a
            href="/"
            className="text-sm font-medium text-gray-800"
          >
            Paisley Christmas Markets
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-gray-800 hover:text-red-600 transition"
            >
              Home
            </a>

            <a
              href="/traders"
              className="text-sm text-gray-800 hover:text-red-600 transition"
            >
              Traders
            </a>

            <a
                href="/wherepaisley"
                className="text-sm text-gray-800 hover:text-red-600 transition"
            >
              Where
            </a>

            <a
              href="/apply"
              className="text-sm text-gray-800 hover:text-red-600 transition"
            >
              Apply
            </a>

            <a
              href="/login"
              className="text-sm px-6 py-3 bg-green-900 text-gray-100 font-medium rounded-md hover:bg-green-700 transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">

              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-800 hover:text-red-600"
              >
                Home
              </a>

              <a
                href="/traders"
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-800 hover:text-red-600"
              >
                Traders
              </a>

              <a
                  href="/wherepaisley"
                  className="text-sm text-gray-800 hover:text-red-600 transition"
              >
                Where
              </a>

              <a
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-800 hover:text-red-600"
              >
                Apply
              </a>

              <a
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm px-6 py-3 bg-red-900 text-gray-100 font-medium rounded-md hover:bg-gray-100 transition"
              >
                Login
              </a>

              {/* <button
                type="button"
                className="flex items-center gap-2 text-sm text-gray-800 hover:text-red-600 text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.05 6.05a7.5 7.5 0 0 0 10.6 10.6Z"
                  />
                </svg>
                Search
              </button> */}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;