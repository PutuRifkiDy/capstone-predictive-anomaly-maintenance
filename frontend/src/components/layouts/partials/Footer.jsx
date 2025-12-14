import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#081028] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-full mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/prevo-logo-with-text.png"
                alt="Prevo Logo"
                className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Solusi manajemen aset berbasis AI untuk industri Minyak & Gas.
              Mendeteksi risiko lebih awal, mengoptimalkan kinerja tim, dan
              mencegah{" "}
              <em>downtime</em> yang merugikan.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold tracking-wide mb-4">
              Fitur Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#predictive-maintenance"
                  className="hover:text-blue-400 transition-colors"
                >
                  Predictive Maintenance
                </a>
              </li>
              <li>
                <a
                  href="#tasks-assignment"
                  className="hover:text-blue-400 transition-colors"
                >
                  Tasks Assignment
                </a>
              </li>
              <li>
                <a
                  href="#ai-copilot"
                  className="hover:text-blue-400 transition-colors"
                >
                  AI Copilot
                </a>
              </li>
              <li>
                <a
                  href="#machine-learning"
                  className="hover:text-blue-400 transition-colors"
                >
                  Machine Learning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold tracking-wide mb-4">
              Perusahaan
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-blue-400 transition-colors"
                >
                  Karir & Engineer
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold tracking-wide mb-4">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Menara Sentra Energi, Lt. 8<br />
                  Jl. Rasuna Said Kav. X-5
                  <br />
                  Jakarta Selatan, 12950
                </span>
              </li>
              <li className="flex items-center gap-3">
                {/* Icon Email */}
                <svg
                  className="w-5 h-5 text-blue-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:hello@prevo.id"
                  className="hover:text-white transition-colors"
                >
                  hello@prevo.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; 2025 Prevo Energy Systems. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 3.808-.06h.63zm1.096 4.482a5.373 5.373 0 00-4.118 4.118 5.373 5.373 0 004.118 4.118 5.373 5.373 0 004.118-4.118 5.373 5.373 0 00-4.118-4.118zM12.315 15a3 3 0 110-6 3 3 0 010 6zm5.827-8.24a1.087 1.087 0 110 2.174 1.087 1.087 0 010-2.174z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
