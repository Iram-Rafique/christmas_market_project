function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* about */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              Paisley Christmas Markets
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-sm">
              Discover local traders, festive gifts and a magical
              Christmas atmosphere in the heart of Paisley.
            </p>
          </div>

          {/* quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              Quick Links
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="/"
                className="text-sm hover:text-white transition"
              >
                Home
              </a>

              <a
                href="/traders"
                className="text-sm hover:text-white transition"
              >
                Traders
              </a>

              <a
                href="/apply"
                className="text-sm hover:text-white transition"
              >
                Apply to Trade
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              Contact
            </h2>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>
                Paisley, Renfrewshire
              </p>

              <p>
                Email: info@paisleychristmasmarkets.co.uk
              </p>
            </div>
          </div>

        </div>

        {/* bottom */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © 2026 Paisley Christmas Markets. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Christmas in the heart of Paisley
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;