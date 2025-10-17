import { useState, FormEvent } from 'react';
import { Award, Loader2 } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { validateAddress } from '@/lib/utils/address';

interface MintFormProps {
  onSuccess?: () => void;
}

export const MintForm = ({ onSuccess }: MintFormProps) => {
  const [address, setAddress] = useState('');
  const [validationError, setValidationError] = useState('');
  const { mint, loading, error } = useContract();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!address.trim()) {
      setValidationError('Please enter a student address');
      return;
    }

    if (!validateAddress(address)) {
      setValidationError('Invalid TON address format');
      return;
    }

    const result = await mint(address);
    
    if (result.success) {
      setAddress('');
      onSuccess?.();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mint Certificate</h2>
            <p className="text-sm text-gray-500">Admin only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="student-address" className="block text-sm font-medium text-gray-700 mb-2">
              Student Address
            </label>
            <input
              id="student-address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setValidationError('');
              }}
              placeholder="EQ..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              disabled={loading}
            />
            {validationError && (
              <p className="mt-1 text-sm text-red-600">{validationError}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <Award className="w-5 h-5" />
                Mint Certificate
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};