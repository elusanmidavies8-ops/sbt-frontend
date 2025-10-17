import { TonClient, Address as TonAddress, beginCell, toNano } from '@ton/core';
import { CertificationNFT } from './CertificationNFT';
import type { ContractState, Token } from '@/types';
import { CONTRACT_ADDRESS, TESTNET_ENDPOINT, OPCODES, TX_CONFIG } from '../constants';

export class ContractService {
  private client: TonClient;
  private contractAddress: TonAddress;

  constructor() {
    this.client = new TonClient({
      endpoint: TESTNET_ENDPOINT,
    });
    this.contractAddress = TonAddress.parse(CONTRACT_ADDRESS);
  }

  /**
   * Fetch current contract state
   */
  async getState(): Promise<ContractState> {
    try {
      const contract = this.client.open(
        CertificationNFT.fromAddress(this.contractAddress)
      );

      const state = await contract.getState();
      
      return {
        owner: state.owner.toString(),
        total: state.total,
        nextId: state.nextId,
        base_uri: state.base_uri,
      };
    } catch (error) {
      console.error('Error fetching contract state:', error);
      throw new Error('Failed to fetch contract state');
    }
  }

  /**
   * Check if an address is an admin
   */
  async isAdmin(address: string): Promise<boolean> {
    try {
      const contract = this.client.open(
        CertificationNFT.fromAddress(this.contractAddress)
      );

      return await contract.getIsAdmin(TonAddress.parse(address));
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  /**
   * Get token data by ID
   */
  async getToken(id: bigint): Promise<Token | null> {
    try {
      const contract = this.client.open(
        CertificationNFT.fromAddress(this.contractAddress)
      );

      const token = await contract.getToken(id);
      
      if (!token) return null;

      return {
        student: token.student.toString(),
        metadata: token.metadata.toString(),
      };
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  }

  /**
   * Get token URI by ID
   */
  async getTokenUri(id: bigint): Promise<string> {
    try {
      const contract = this.client.open(
        CertificationNFT.fromAddress(this.contractAddress)
      );

      return await contract.getTokenUri(id);
    } catch (error) {
      console.error('Error fetching token URI:', error);
      throw new Error('Failed to fetch token URI');
    }
  }

  /**
   * Build mint transaction payload
   */
  buildMintTransaction(studentAddress: string) {
    const body = beginCell()
      .storeUint(OPCODES.MINT, 32)
      .storeAddress(TonAddress.parse(studentAddress))
      .storeRef(beginCell().endCell()) // Empty metadata cell (off-chain)
      .endCell();

    return {
      validUntil: Math.floor(Date.now() / 1000) + TX_CONFIG.validUntil,
      messages: [{
        address: CONTRACT_ADDRESS,
        amount: toNano(TX_CONFIG.mintValue).toString(),
        payload: body.toBoc().toString('base64'),
      }],
    };
  }

  /**
   * Build add admin transaction payload
   */
  buildAddAdminTransaction(adminAddress: string) {
    const body = beginCell()
      .storeUint(OPCODES.ADD_ADMIN, 32)
      .storeAddress(TonAddress.parse(adminAddress))
      .endCell();

    return {
      validUntil: Math.floor(Date.now() / 1000) + TX_CONFIG.validUntil,
      messages: [{
        address: CONTRACT_ADDRESS,
        amount: toNano(TX_CONFIG.addAdminValue).toString(),
        payload: body.toBoc().toString('base64'),
      }],
    };
  }
}

// Singleton instance
export const contractService = new ContractService();