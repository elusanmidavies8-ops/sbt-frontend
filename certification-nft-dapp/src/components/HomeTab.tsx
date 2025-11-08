import { TonConnectButton } from "@tonconnect/ui-react";
import { Zap, Award, Shield, BookOpen, CheckCircle, ExternalLink } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/constants";

interface HomeTabProps {
  isDarkMode: boolean;
  isTransitioning: boolean;
  previousTab: string | null;
  handleTabChange: (tab: string) => void;
  courseProgress: {
    blockchain: boolean;
    ton: boolean;
    nfts: boolean;
  };
  handleMarkAsRead: (course: 'blockchain' | 'ton' | 'nfts') => void;
}

export function HomeTab({
  isDarkMode,
  isTransitioning,
  previousTab,
  handleTabChange,
  courseProgress,
  handleMarkAsRead
}: HomeTabProps) {
  return (
    <div className={`space-y-6 ${isTransitioning ? (previousTab === 'gallery' ? 'slide-in-left' : previousTab === 'admin' ? 'slide-in-left' : 'fade-in') : 'fade-in'}`}>
      {/* Hero Section */}
      <section className="text-center py-8">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
              : "bg-cyan-500/10 border-cyan-500/30 text-cyan-700"
          }`}>
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Professional NFT Certificates</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-[#14171a]"
          }`}>
            ALPHA DAO
            <span className="block bg-gradient-to-r from-[#1da1f2] to-[#17bf63] bg-clip-text text-transparent">
              Learning Platform
            </span>
          </h1>

          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-300 ${
            isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
          }`}>
            Transform your Web3 journey with ALPHA DAO — the ultimate gateway to blockchain mastery.
            Master decentralized technologies, earn prestigious NFT credentials, and become part of the next billion who shape the future of finance.
          </p>

          <div className="flex flex-col gap-4 justify-center mb-12">
            <button
              onClick={() => handleTabChange('gallery')}
              className="telegram-button px-8 py-4 bg-gradient-to-r from-[#008080] to-[#301934] hover:from-[#301934] hover:to-[#008080] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-[#008080]/30"
            >
              View Gallery
            </button>
            <div className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
              isDarkMode ? "ring-1 ring-gray-700" : "ring-1 ring-gray-200"
            }`}>
              <div className={`p-1 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}>
                <TonConnectButton />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className={`text-3xl font-black mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-purple-400" : "text-[#008080]"
              }`}>
                1,247
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Certificates Issued
              </div>
            </div>
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className={`text-3xl font-black mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-purple-400" : "text-[#008080]"
              }`}>
                892
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Verified Owners
              </div>
            </div>
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className={`text-3xl font-black mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-purple-400" : "text-[#008080]"
              }`}>
                99.9%
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TON Explorer Link */}
      <section className="mb-8">
        <div className={`p-6 rounded-xl border transition-all duration-300 ${
          isDarkMode ? "bg-[#192734] border-[#2f3336]" : "bg-white border-[#e1e8ed]"
        }`}>
          <div className="text-center">
            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-[#14171a]"
            }`}>
              Explore on TON Blockchain
            </h3>
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
            }`}>
              View ALPHA DAO certificates and transactions on the TON testnet explorer
            </p>
            <a
              href={`https://testnet.tonscan.org/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                  : "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              View Contract on TON Explorer
            </a>
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-[#14171a]"
          }`}>
            Learning Modules
          </h2>
          <p className={`text-base transition-colors duration-300 ${
            isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
          }`}>
            Master Web3 fundamentals through ALPHA DAO's elite curriculum. From blockchain basics to advanced DeFi strategies,
            earn verifiable NFT credentials that signal your expertise to the global crypto community.
          </p>
        </div>

        <div className="space-y-4">
          {/* Blockchain Fundamentals */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDarkMode ? "bg-[#192734] border-[#2f3336]" : "bg-white border-[#e1e8ed]"
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <BookOpen className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? "text-[#1da1f2]" : "text-[#1da1f2]"
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#14171a]"
                }`}>
                  Blockchain Fundamentals
                </h3>
                <p className={`text-sm mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}>
                  Discover the revolutionary technology powering Bitcoin, Ethereum, and beyond. Master consensus mechanisms, cryptographic security, and decentralized validation that make blockchain the future of trust.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#22303c] text-[#8899a6]" : "bg-[#f7f9fa] text-[#536471]"
                    }`}>
                      5 min read
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#17bf63]/20 text-[#17bf63]" : "bg-[#17bf63]/10 text-[#17bf63]"
                    }`}>
                      Beginner
                    </span>
                  </div>
                  <button
                    onClick={() => handleMarkAsRead('blockchain')}
                    disabled={courseProgress.blockchain}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      courseProgress.blockchain
                        ? `cursor-not-allowed ${
                            isDarkMode ? "bg-[#17bf63]/20 text-[#17bf63]" : "bg-[#17bf63]/10 text-[#17bf63]"
                          }`
                        : `hover:scale-105 ${
                            isDarkMode
                              ? "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                              : "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                          }`
                    }`}
                  >
                    {courseProgress.blockchain ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : (
                      "Mark as Read"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TON Overview */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDarkMode ? "bg-[#192734] border-[#2f3336]" : "bg-white border-[#e1e8ed]"
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <Zap className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? "text-[#1da1f2]" : "text-[#1da1f2]"
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#14171a]"
                }`}>
                  TON Overview
                </h3>
                <p className={`text-sm mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}>
                  Dive deep into TON's groundbreaking architecture — the fastest, most scalable blockchain designed for mass adoption. Learn how it achieves 100,000+ TPS while maintaining security and decentralization.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#22303c] text-[#8899a6]" : "bg-[#f7f9fa] text-[#536471]"
                    }`}>
                      7 min read
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#ffd400]/20 text-[#ffd400]" : "bg-[#ffd400]/10 text-[#ffd400]"
                    }`}>
                      Intermediate
                    </span>
                  </div>
                  <button
                    onClick={() => handleMarkAsRead('ton')}
                    disabled={courseProgress.ton}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      courseProgress.ton
                        ? `cursor-not-allowed ${
                            isDarkMode ? "bg-[#17bf63]/20 text-[#17bf63]" : "bg-[#17bf63]/10 text-[#17bf63]"
                          }`
                        : `hover:scale-105 ${
                            isDarkMode
                              ? "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                              : "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                          }`
                    }`}
                  >
                    {courseProgress.ton ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : (
                      "Mark as Read"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NFTs & Digital Ownership */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDarkMode ? "bg-[#192734] border-[#2f3336]" : "bg-white border-[#e1e8ed]"
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <Award className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? "text-[#1da1f2]" : "text-[#1da1f2]"
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#14171a]"
                }`}>
                  NFTs & Digital Ownership
                </h3>
                <p className={`text-sm mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}>
                  Unlock the power of digital ownership. Master NFT standards, smart contract interactions, and the technology behind billion-dollar digital economies on TON's lightning-fast network.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#22303c] text-[#8899a6]" : "bg-[#f7f9fa] text-[#536471]"
                    }`}>
                      6 min read
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode ? "bg-[#e0245e]/20 text-[#e0245e]" : "bg-[#e0245e]/10 text-[#e0245e]"
                    }`}>
                      Advanced
                    </span>
                  </div>
                  <button
                    onClick={() => handleMarkAsRead('nfts')}
                    disabled={courseProgress.nfts}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      courseProgress.nfts
                        ? `cursor-not-allowed ${
                            isDarkMode ? "bg-[#17bf63]/20 text-[#17bf63]" : "bg-[#17bf63]/10 text-[#17bf63]"
                          }`
                        : `hover:scale-105 ${
                            isDarkMode
                              ? "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                              : "bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90"
                          }`
                    }`}
                  >
                    {courseProgress.nfts ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : (
                      "Mark as Read"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Certificates Carousel */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Featured Certificates
          </h2>
          <p className={`text-lg transition-colors duration-300 ${
            isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
          }`}>
            Showcase of elite Web3 achievements and verified digital credentials earned by our community
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Featured Certificate 1 */}
          <div className={`telegram-card p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="aspect-square w-12 bg-gradient-to-br from-[#301934] to-[#008080] rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-1 transition-colors duration-300 ${
                  isDarkMode ? "text-black" : "text-[#14171a]"
                }`}>
                  Elite Blockchain Developer
                </h3>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}>
                  Certified: December 2024
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className={`font-mono transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                ID: #1247
              </span>
              <span className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Owner: 0x...a8b2
              </span>
            </div>
          </div>

          {/* Featured Certificate 2 */}
          <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="aspect-square w-12 bg-gradient-to-br from-[#301934] to-[#008080] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-1 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#14171a]"
                }`}>
                  DeFi Security Expert
                </h3>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? "text-[#8899a6]" : "text-[#536471]"
                }`}>
                  Certified: November 2024
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className={`font-mono transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                ID: #1189
              </span>
              <span className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Owner: 0x...c4d5
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}