import { api } from "@/data/api"
import { Transaction, TransactionResponse } from "@/data/types/transaction"
import { revalidateTag } from "next/cache"

export async function getTransactions(accountId: number): Promise<Transaction[]> {
    const response = await api(`/accounts/${accountId}/transactions`, {
        cache: 'no-store',
        next: { 
            tags: ['transactions'], 
        },
    })
    const { transactions } = await response.json()
    return transactions
}

export async function sendCreditTransaction(accountId: number, value: number): Promise<TransactionResponse> {
    const response = await api(`/accounts/${accountId}/transactions/transaction-credit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
    })
    if (response.ok){
        const { id } = await response.json()
        revalidateTag('transactions')
        revalidateTag('account')
        return {
            transactionId: id,
            success: true,
            error: ''
        }
    } else {
        const { errorMessages } = await response.json()
        return {
            transactionId: 0,
            success: false,
            error: errorMessages
        }
    }
}

export async function sendDebitTransaction(accountId: number, value: number): Promise<TransactionResponse> {
    const response = await api(`/accounts/${accountId}/transactions/transaction-debit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
    })
    if (response.ok){
        const { id } = await response.json()
        revalidateTag('transactions')
        revalidateTag('account')
        return {
            transactionId: id,
            success: true,
            error: ''
        }
    } else {
        const { errorMessages } = await response.json()
        return {
            transactionId: 0,
            success: false,
            error: errorMessages
        }
    }
}

export async function sendTransferTransaction(accountId: number, destinationAccountId: number, value: number): Promise<TransactionResponse> {
    const response = await api(`/accounts/${accountId}/transactions/transaction-transfer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destinationAccountId, value }),
    })
    if (response.ok){
        const { id } = await response.json()
        revalidateTag('transactions')
        revalidateTag('account')
        return {
            transactionId: id,
            success: true,
            error: ''
        }
    } else {
        const { errorMessages } = await response.json()
        return {
            transactionId: 0,
            success: false,
            error: errorMessages
        }
    }
}