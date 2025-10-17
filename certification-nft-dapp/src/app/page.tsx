'use client';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { Award, Shield, User } from 'lucide-react';
import { ContractState } from '@/components/ContractState';
import { MintForm } from '@/components/MintForm';
import { AddAdminForm } from '@/components/AddAdminForm';
import { TokenViewer } from '@/components/TokenViewer';
import { useContractState } from '@/hooks/useContractState';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import { useState } from 'react';

export default function Home() {
  const userAddress = useTonAddress();
  const { isOwner, isAdmin, refetch } = useContractState();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTransactionSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
    // Refetch state after 3 seconds to allow blockchain confirmation
    setTimeout(refetch, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CertificationNFT</h1>
                <p className="text-sm text-gray-500">TON Testnet</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userAddress && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  {isOwner && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                      <Shield className="w-3 h-3" />
                      Owner
                    </span>
                  )}
                  {isAdmin && !isOwner && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      <User className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </div>
              )}
              <TonConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Contract State */}
        <div className="mb-8">
          <ContractState />
        </div>

        {/* Admin Controls */}
        {userAddress && (isAdmin || isOwner) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Controls</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isAdmin && (
                <MintForm
                  onSuccess={() =>
                    handleTransactionSuccess('Certificate minted successfully!')
                  }
                />
              )}
              {isOwner && (
                <AddAdminForm
                  onSuccess={() =>
                    handleTransactionSuccess('Admin added successfully!')
                  }
                />
              )}
            </div>
          </div>
        )}

        {/* Token Viewer */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificate Explorer</h2>
          <TokenViewer />
        </div>

        {/* Connection Notice */}
        {!userAddress && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 mb-4">
              Connect your TON wallet to mint certificates and manage admins
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-3">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Blockchain Certificates</h3>
            <p className="text-sm text-gray-600">
              Immutable, verifiable certificates stored on the TON blockchain
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Access</h3>
            <p className="text-sm text-gray-600">
              Role-based access control with owner and admin permissions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Student Ownership</h3>
            <p className="text-sm text-gray-600">
              Certificates are minted directly to student wallets
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Contract Address:</span>{' '}
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{CONTRACT_ADDRESS}</code>
            </p>
            <p className="text-sm text-gray-500">
              Powered by TON Blockchain • Testnet Deployment
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}