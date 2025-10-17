import { useState, FormEvent } from 'react';
import { Search, Loader2, Award, ExternalLink } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';
import { parseTokenId } from '@/lib/utils/format';
import type { Token, NFTMetadata } from '@/types';

export const TokenViewer = () => {
  const [tokenId, setTokenId] = useState('');
  const [token, setToken] = useState<Token | null>(null);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const { fetchToken, loading, error } = useMetadata();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!tokenId || isNaN(Number(tokenId))) {
      return;
    }

    try {
      const result = await fetchToken(parseTokenId(tokenId));
      setToken(result.token);
      setMetadata(result.metadata);
    } catch {
      setToken(null);
      setMetadata(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">View Certificate</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="number"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Token ID"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
              min="0"
            />
            <button
              type="submit"
              disabled={loading || !tokenId}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {token && metadata && (
          <div className="border-t pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{metadata.name}</h3>
                  <p className="text-gray-600">{metadata.description}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Student Address</p>
                  <p className="text-xs text-gray-900 font-mono break-all">{token.student}</p>
                </div>

                {metadata.attributes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Attributes</p>
                    <div className="grid grid-cols-2 gap-3">
                      {metadata.attributes.map((attr, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">{attr.trait_type}</p>
                          <p className="text-sm font-medium text-gray-900">{attr.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {metadata.image ? (
                    <img
                      src={metadata.image}
                      alt={metadata.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Award className="w-24 h-24 text-gray-400" />
                  )}
                </div>
                {metadata.image && (
                  <a
                    href={metadata.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Full Image
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
      