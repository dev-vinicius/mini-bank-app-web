'use server'

import { TransactionResponse } from "@/data/types/transaction";
import { sendCreditTransaction, sendDebitTransaction, sendTransferTransaction } from "@/services/transaction-service";

export async function createCreditTransactionAction(accountId: number, value: number): Promise<TransactionResponse> {
    try {
        const result = await sendCreditTransaction(accountId, value);
        return result;
    } catch (error) {
        return {
            transactionId: 0,
            success: false,
            error: error as string
        };
    }
}

export async function createDebitTransactionAction(accountId: number, value: number): Promise<TransactionResponse> {
    try {
        const result = await sendDebitTransaction(accountId, value);
        return result;
    } catch (error) {
        return {
            transactionId: 0,
            success: false,
            error: error as string
        };
    }
}

export async function createTransferTransactionAction(accountId: number, destinationAccountId: number, value: number): Promise<TransactionResponse> {
    try {
        const result = await sendTransferTransaction(accountId, destinationAccountId, value);
        return result;
    } catch (error) {
        return {
            transactionId: 0,
            success: false,
            error: error as string
        };
    }
}