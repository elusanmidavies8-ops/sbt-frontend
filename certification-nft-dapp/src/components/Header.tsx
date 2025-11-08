import { TonConnectButton } from "@tonconnect/ui-react";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#192734]/95 border-[#2f3336]"
          : "bg-white/95 border-[#e1e8ed]"
      } px-4 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-lg blur-md opacity-40 transition-colors duration-300 ${
                isDarkMode ? "bg-[#1da1f2]" : "bg-[#1da1f2]"
              }`}
            ></div>
            <div
              className={`relative rounded-lg shadow-md transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#192734] p-1.5"
                  : "bg-white p-1.5 border border-[#e1e8ed]"
              }`}
            >
              <img
                src="/Daologo.png"
                alt="TON Certificates logo"
                className="w-4 h-4"
              />
            </div>
          </div>
          <div>
            <h1
              className={`text-lg font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-[#14171a]"
              }`}
            >
              ALPHA DAO
            </h1>
            <p
              className={`text-xs transition-colors duration-300 ${
                isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
              }`}
            >
              Web3 Onboarding
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "text-[#1da1f2] hover:text-[#1da1f2] hover:bg-[#22303c]"
                : "text-[#536471] hover:text-[#1da1f2] hover:bg-[#f7f9fa]"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Wallet Connection */}
          <div
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
              isDarkMode ? "ring-1 ring-[#2f3336]" : "ring-1 ring-[#e1e8ed]"
            }`}
          >
            <div
              className={`p-0.5 transition-colors duration-300 ${
                isDarkMode ? "bg-[#192734]" : "bg-[#f7f9fa]"
              }`}
            >
              <TonConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}