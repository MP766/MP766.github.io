import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function Nav() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-semibold tracking-tight">
          Home
        </Link>

        <nav className="flex gap-4 text-sm text-zinc-300">
          <Link className="hover:text-white" to="/projects">
            Projects
          </Link>
          <a className="hover:text-white" href="/resume.pdf">
            Resume
          </a>
          <a className="hover:text-white" href="mailto:you@email.com">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Nav />

        <main className="mx-auto max-w-5xl px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </main>

        <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Mark Perez
        </footer>
      </div>
    </BrowserRouter>
  );
}