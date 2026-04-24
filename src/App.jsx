import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import InviteView from "./pages/InviteView";
// Layout
import Header from "./components/layout/Header";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-100 text-gray-800">

        {/* 🔝 Header */}
        <Header />

        {/* 📦 Main Content */}
        <main className="px-4 md:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Auth />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/invite/:slug" element={<InviteView />} />
          </Routes>
        </main>

        {/* 🔻 Footer (optional for now) */}
        <footer className="text-center text-sm py-4 text-gray-500">
          © {new Date().getFullYear()} myINvitation
        </footer>

      </div>
    </BrowserRouter>
  );
}