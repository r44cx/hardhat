import { Block } from "@ethereumjs/block";
import { BlockchainInterface } from "@ethereumjs/blockchain";
import { BN } from "ethereumjs-util";

import { EmptyBlockRange, FilterParams } from "../node-types";
import { RpcLogOutput, RpcReceiptOutput } from "../output";

export interface HardhatBlockchainInterface extends BlockchainInterface {
  addBlock(block: Block): Promise<Block>;
  addTransactionReceipts(receipts: RpcReceiptOutput[]): void;
  addEmptyBlockRange(r: EmptyBlockRange): void;
  deleteLaterBlocks(block: Block): void;
  getBlockByTransactionHash(transactionHash: Buffer): Promise<Block | null>;
  getLatestBlock(): Promise<Block>;
  getLogs(filterParams: FilterParams): Promise<RpcLogOutput[]>;
  getTotalDifficulty(blockHash: Buffer): Promise<BN>;
  getTransactionReceipt(
    transactionHash: Buffer
  ): Promise<RpcReceiptOutput | null>;
  getBaseFee(): Promise<BN>;
}
