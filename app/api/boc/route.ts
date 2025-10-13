import { NextResponse } from "next/server";
import { beginCell, Cell, Address } from "ton-core";
import { verifyOwner } from "@/lib/verify-owner";
import { getTonClient } from "@/lib/ton-server";

const CONTRACT = process.env.NEXT_PUBLIC_CERT_NFT_CONTRACT || "";

// ✅ This endpoint verifies on-chain ownership before returning a BOC
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, callerAddress, studentAddress, adminAddress, metadataUrl } = body;

    if (!callerAddress) {
      return NextResponse.json({ error: "Missing callerAddress" }, { status: 400 });
    }

    // Step 1. Verify caller is contract owner
    await verifyOwner(CONTRACT, callerAddress);

    // Step 2. Build appropriate payload (BOC)
    let boc: string;

    if (action === "mint") {
      if (!studentAddress) throw new Error("studentAddress required");

      const meta = beginCell()
        .storeBuffer(Buffer.from(metadataUrl || "", "utf8"))
        .endCell();
      const student = Address.parse(studentAddress);
      const body = beginCell()
        .storeUint(0x0, 32) // opcode for mint
        .storeAddress(student)
        .storeRef(meta)
        .endCell();
      boc = body.toBoc().toString("base64");
    } else if (action === "addAdmin") {
      if (!adminAddress) throw new Error("adminAddress required");

      const admin = Address.parse(adminAddress);
      const body = beginCell().storeUint(0x1, 32).storeAddress(admin).endCell();
      boc = body.toBoc().toString("base64");
    } else {
      throw new Error("Invalid action");
    }

    return NextResponse.json({ boc });
  } catch (e: any) {
    console.error("BOC Error:", e);
    return NextResponse.json({ error: e.message || "Server Error" }, { status: 500 });
  }
}
