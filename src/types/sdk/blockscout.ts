import { TransactionFeeTokenName } from "../coins";

export interface BlockScoutNode {
    node: BlockScoutBlock
}

export interface BlockScoutBlock {
    blockNumber: number;
    celoTransfer: TransferEdge
    feeToken: TransactionFeeTokenName,
    gasPrice: string,
    gasUsed: string,
    gatewayFee: string,
    gatewayFeeRecipient: string,
    timestamp: string,
    transactionHash: string
}

export interface TransferEdge {
    edges: TransferNode[]
}

export interface TransferNode {
    node: TransferBlock
}

export interface TransferBlock {
    blockNumber: number,
    fromAddressHash: string,
    gasPrice: string,
    gasUsed: string,
    toAddressHash: string,
    transactionHash: string,
    value: string
}