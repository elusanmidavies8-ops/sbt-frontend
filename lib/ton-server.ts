import { TonClient, Address } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export async function getTonClient() {
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  return new TonClient({ endpoint });
}

export function parseAddress(addr: string) {
  try {
    return Address.parse(addr);
  } catch {
    throw new Error(`Invalid address: ${addr}`);
  }
}
