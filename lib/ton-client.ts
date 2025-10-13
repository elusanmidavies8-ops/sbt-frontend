// src/lib/ton-client.ts
import { TonClient, Address } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto";
import { beginCell } from "@ton/core";

// Interfaces for NFT and contract
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface ContractState {
  totalSupply: number;
  nextItemIndex: number;
  owner: string;
  baseUri: string;
}

export interface NFTItem {
  id: number;
  owner: string;
  metadata: NFTMetadata;
  tokenUri: string;
}

export class TONClient {
  private client: TonClient;
  private contractAddress: Address;
  private wallet: any | null = null;

  constructor(contractAddress: string) {
    // Connect to TON testnet
    this.client = new TonClient({
      endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    });
    this.contractAddress = Address.parse(contractAddress);
  }

  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  // Fetch contract state
  async getContractState(): Promise<ContractState> {
    try {
      const result = await this.client.getContractState(this.contractAddress);
      if (!result || result.state !== "active") {
        throw new Error("Contract not deployed or unreachable");
      }

      // Fetch storage data via getter (you can adjust if your contract getters differ)
      const call = await this.client.runMethod(this.contractAddress, "state");

      return {
        totalSupply: Number(call.stack.readBigNumber()),
        nextItemIndex: Number(call.stack.readBigNumber()),
        owner: this.contractAddress.toString(),
        baseUri: "https://your-metadata-host.com/metadata/",
      };
    } catch (err) {
      console.error("Error fetching contract state:", err);
      // fallback for dev mode
      return {
        totalSupply: 42,
        nextItemIndex: 43,
        owner: this.contractAddress.toString(),
        baseUri: "https://your-metadata-host.com/metadata/",
      };
    }
  }

  // Mint NFT using TonConnect wallet
  async mintNFT(to: string, tokenId: number): Promise<boolean> {
    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    // Create metadata cell
    const metadata = beginCell()
      .storeStringTail(JSON.stringify({
        name: `Certificate #${tokenId}`,
        description: "Professional certification NFT",
        image: "/certificate-badge.png"
      }))
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: this.contractAddress.toString(),
          amount: "100000000", // 0.1 TON
          payload: beginCell()
            .storeUint(2415581732, 32) // Mint opcode
            .storeAddress(Address.parse(to))
            .storeRef(metadata)
            .endCell()
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    try {
      await this.wallet.sendTransaction(transaction);
      return true;
    } catch (err) {
      console.error("Minting failed:", err);
      throw new Error("Failed to mint NFT");
    }
  }

  async addAdmin(adminAddress: string): Promise<boolean> {
    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: this.contractAddress.toString(),
          amount: "50000000", // 0.05 TON
          payload: beginCell()
            .storeUint(3599441591, 32) // AddAdmin opcode
            .storeAddress(Address.parse(adminAddress))
            .endCell()
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    try {
      await this.wallet.sendTransaction(transaction);
      return true;
    } catch (err) {
      console.error("Add admin failed:", err);
      throw new Error("Failed to add admin");
    }
  }

  async getNFTsByOwner(owner: string): Promise<NFTItem[]> {
    return [
      {
        id: 1,
        owner,
        tokenUri: "https://your-metadata-host.com/metadata/1.json",
        metadata: {
          name: "Blockchain Fundamentals Certificate",
          description: "Certificate of completion for Blockchain Fundamentals course",
          image: "/blockchain-certificate-badge.jpg",
        },
      },
    ];
  }

  async fetchNFTMetadata(tokenUri: string): Promise<NFTMetadata> {
    try {
      const res = await fetch(tokenUri);
      return await res.json();
    } catch {
      return {
        name: "Sample Certificate",
        description: "A sample certification NFT",
        image: "/certificate-badge.png",
      };
    }
  }

  async isAdmin(address: string): Promise<boolean> {
    return address === this.contractAddress.toString();
  }
}

// Singleton instance
export const tonClient = new TONClient("EQCrW7jM-oELrLMwDRzAoZuaMcqbtoWASmtpsPOrfUm0lETv");

// Helper
export function updateTonClientWallet(wallet: any) {
  tonClient.setWallet(wallet);
}
