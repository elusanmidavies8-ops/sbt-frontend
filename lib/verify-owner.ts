import { getTonClient, parseAddress } from "./ton-server";
import { Cell, beginCell } from "@ton/core";

export async function verifyOwner(contractAddress: string, callerAddress: string) {
  const client = await getTonClient();
  const addr = parseAddress(contractAddress);

  // Call getter: get_owner()
  const res = await client.runMethod(addr, "get_owner");

  const ownerCell = res.stack.readAddress();
  const owner = ownerCell.toString({ bounceable: false });

  if (owner !== callerAddress) {
    throw new Error("Unauthorized: only contract owner can perform this action.");
  }

  return true;
}
