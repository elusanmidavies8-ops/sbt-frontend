interface WelcomeModalProps {
  isDarkMode: boolean;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
}

export function WelcomeModal({
  isDarkMode,
  showWelcomeModal,
  setShowWelcomeModal
}: WelcomeModalProps) {
  if (!showWelcomeModal) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md transition-colors duration-300 ${
        isDarkMode ? "bg-black/95" : "bg-[#301934]/90"
      }`}
    >
      <div
        className={`p-8 rounded-3xl max-w-md mx-4 text-center border shadow-2xl transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-[#008080]/20"
        }`}
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#008080] to-[#301934] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img
              src="/Daologo.png"
              alt="Alpha DAO logo"
              className="w-10 h-10"
            />
          </div>
          <h2
                className={`text-3xl font-bold mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#14171a]"
                }`}
              >
                Welcome to ALPHA DAO
              </h2>
              <p
                className={`text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}
              >
                Join ALPHA DAO — the premier Web3 education platform empowering the next billion users to master blockchain technology.
                Complete our interactive learning journey and earn exclusive NFT certificates that showcase your Web3 expertise on the TON network.
              </p>
        </div>
        <button
          onClick={() => setShowWelcomeModal(false)}
          className="w-full relative bg-gradient-to-r from-[#008080] to-[#301934] hover:from-[#301934] hover:to-[#008080] text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-[#008080]/30 overflow-hidden group text-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          <span className="relative">Start Learning</span>
        </button>
      </div>
    </div>
  );
}