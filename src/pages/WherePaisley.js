function WherePaisley() {
    return (
        <main>
            {/* Hero Section */}
            <section
                className="relative min-h-[550px] bg-cover bg-center flex items-center"
                style={{
                    backgroundImage: "url('/images/paisley.jpg')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10">
                    <div className="max-w-xl text-white">

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Where to
                            <br />
                            find Paisley?
                        </h1>

                        <p className="mt-6 text-lg md:text-xl leading-relaxed">
                            Welcome to Scotland, come to our historic town.
                            <br className="hidden sm:block" />
                            A history of royalty and radicalism.
                        </p>
                    </div>
                </div>
            </section>
            {/* Map Section */}
            <section className="bg-white py-16">
                <div className="mx-auto px-6 lg:px-10">
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight m-1.5">The Heart of Paisley</h2>
                    <iframe className="w-full h-[450px] p-3"
                            src="https://www.openstreetmap.org/export/embed?bbox=-4.426653385162354%2C55.8448059552492%2C-4.421439170837403%2C55.84675151621501&amp;layer=mapnik"></iframe>
                    <button
                        className="inline-flex justify-center items-center px-6 py-3 bg-gray-800 text-gray-200 font-medium rounded-md hover:bg-gray-600 transition"
                        onClick={() => window.open('https://maps.app.goo.gl/62NHj7zLd2enaFUKA', '_blank')}>
                        Open in Google Maps
                    </button>
                </div>
            </section>
            {/* How to get here Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">

                    {/* Section Heading */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            How to Get Here?
                        </h2>

                        <p className="mt-3 text-gray-600">
                            It is so easy, you have unlimited choices!
                        </p>
                    </div>

                    {/* Bus Cards */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

                            {/* Public Transport, Bus */}
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                                    <img
                                        src="/images/bus.png"
                                        alt="Public Transport, Bus"
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>

                                <h2 className="text-xl font-semibold text-gray-900">
                                    Bus
                                </h2>

                                <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                                    There are buses running through Paisley. These McGill's services are:
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Service 38 / 38A
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Service X21
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Service 26
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Service 9 / 9A (First Bus)
                                </p>
                            </div>

                            {/* Festive Atmosphere */}
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                                    <img
                                        src="/images/train.png"
                                        alt="Celebrations"
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>


                                <h2 className="text-xl font-semibold text-gray-900">
                                    Train
                                </h2>

                                <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                                    There are trains running through Paisley Gilmore Street, right in the heart of Paisley. These services are:
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Glasgow Central
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Gourock
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Wemyss Bay
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Ayr
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Largs
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Ardrossan Harbour
                                </p>
                            </div>


                            {/* Local traders */}
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                                    <img
                                        src="/images/car.png"
                                        alt="Local Traders"
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>

                                <h2 className="text-xl font-semibold text-gray-900">
                                    Car Parks
                                </h2>

                                <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                                    If your driving up, there a load of car parks for you to choose from.
                                </p>
                                <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                                    There prices may vary:
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    0-2 hours £1.50
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    2-3 hours £2.00
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    3-4 hours £2.50
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    4hrs – full day £5.00
                                </p>
                                <p className="mt-3 text-gray-900 leading-relaxed max-w-sm">
                                    Overnight £15.00
                                </p>
                                <p className="mt-3 text-gray-300 leading-relaxed max-w-sm">
                                    Availability vary per car park
                                </p>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 m-1.5">Just Landed at Glasgow Airport?</h2>
                        <p className="text-gray-600 m-1.5">Welcome, you're already here. Take the Service 757 bus to get into town!</p>
                    </div>
                </div>
            </section>
            <section className="bg-white py-16">
                <section className="bg-red-900 py-14 mt-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                            {/* Text */}
                            <div className="text-white">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    WONDERING WHAT TO DO?
                                </h2>

                                <p className="mt-3 text-lg text-red-100">
                                    See all the different activities you can do here in Paisley
                                </p>
                            </div>

                            {/* Button */}
                            <div>
                                <a
                                    href="/Apply"
                                    className="inline-flex justify-center items-center px-6 py-3 border border-white bg-white text-gray-900 font-medium rounded-md hover:bg-gray-200 transition">
                                    Explore Paisley
                                </a>
                                <div className="p-2"/>
                                <a
                                    href="/Traders"
                                    className="inline-flex justify-center items-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition">
                                    Explore Traders
                                </a>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </main>

    );
}

export default WherePaisley