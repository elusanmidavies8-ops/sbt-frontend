import { useState, FormEvent } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { validateAddress } from '@/lib/utils/address';

interface AddAdminFormProps {
  onSuccess?: () => void;
}

export const AddAdminForm = ({ onSuccess }: AddAdminFormProps) => {
  const [address, setAddress] = useState('');
  const [validationError, setValidationError] = useState('');
  const { addAdmin, loading, error } = useContract();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!address.trim()) {
      setValidationError('Please enter an admin address');
      return;
    }

    if (!validateAddress(address)) {
      setValidationError('Invalid TON address format');
      return;
    }

    const result = await addAdmin(address);
    
    if (result.success) {
      setAddress('');
      onSuccess?.();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Admin</h2>
            <p className="text-sm text-gray-500">Owner only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-address" className="block text-sm font-medium text-gray-700 mb-2">
              New Admin Address
            </label>
            <input
              id="admin-address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setValidationError('');
              }}
              placeholder="EQ..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
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
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding Admin...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Add Admin
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};