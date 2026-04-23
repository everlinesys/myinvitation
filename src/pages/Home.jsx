import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-10 py-10">
      
      {/* 🔥 Hero Section */}
      <section className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Create Beautiful Kerala Wedding Invitations
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Traditional. Elegant. Ready in minutes.  
          Design your perfect <span className="font-medium">Kalyanam card</span> and share instantly.
        </p>

        {/* CTA */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/editor"
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Start Creating
          </Link>

          <a
            href="#templates"
            className="px-6 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            View Templates
          </a>
        </div>
      </section>

      {/* 🎨 Template Preview Section */}
      <section id="templates" className="w-full max-w-5xl">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Choose Your Style
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg p-4 hover:scale-105 transition">
            <div className="h-40 bg-red-900 rounded mb-3"></div>
            <p className="text-sm font-medium">Hindu Classic</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg p-4 hover:scale-105 transition">
            <div className="h-40 bg-white border rounded mb-3"></div>
            <p className="text-sm font-medium">Christian Floral</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg p-4 hover:scale-105 transition">
            <div className="h-40 bg-green-900 rounded mb-3"></div>
            <p className="text-sm font-medium">Muslim Elegant</p>
          </div>

        </div>
      </section>

      {/* ⚡ Features Section */}
      <section className="max-w-4xl grid md:grid-cols-3 gap-6 text-left">
        
        <div>
          <h3 className="font-semibold">⚡ Instant Preview</h3>
          <p className="text-sm text-gray-600">
            See your invitation update live as you type.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">🎨 Beautiful Templates</h3>
          <p className="text-sm text-gray-600">
            Designed for Kerala weddings with elegance.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">📤 Easy Sharing</h3>
          <p className="text-sm text-gray-600">
            Download or share directly on WhatsApp.
          </p>
        </div>

      </section>

      {/* 🚀 Final CTA */}
      <section className="mt-10">
        <Link
          to="/editor"
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Create Your Invitation
        </Link>
      </section>

    </div>
  );
}