import {
  AccessListEIP2930Transaction,
  FeeMarketEIP1559Transaction,
  TxData,
} from "@nomicfoundation/ethereumjs-tx";
import { Address } from "@nomicfoundation/ethereumjs-util";

import { createNonCryptographicHashBasedIdentifier } from "../../../util/hash";

// Produces a signature with r and s values taken from a hash of the inputs.
export function makeFakeSignature(
  tx: TxData | AccessListEIP2930Transaction | FeeMarketEIP1559Transaction,
  sender: Address
): {
  v: number;
  r: number;
  s: number;
} {
  const hashInputString = [
    sender,
    tx.nonce,
    tx.gasLimit,
    tx.value,
    tx.to,
    tx.data,
    "gasPrice" in tx ? tx.gasPrice : "",
    "chainId" in tx ? tx.chainId : "",
    "maxPriorityFeePerGas" in tx ? tx.maxPriorityFeePerGas : "",
    "maxFeePerGas" in tx ? tx.maxFeePerGas : "",
    // note: accessList omitted because it doesn't serialize readily.
  ]
    .map((a) => a?.toString() ?? "")
    .join();

  const hashDigest = createNonCryptographicHashBasedIdentifier(
    Buffer.from(hashInputString)
  );

  return {
    v: 1,
    r: hashDigest.readUInt32LE(),
    s: hashDigest.readUInt32LE(4),
  };
}
