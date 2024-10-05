import { api } from "@/data/api"
import { Account, AccountResponse } from "@/data/types/account"
import { revalidateTag } from "next/cache"


export async function getAllAccounts(): Promise<Account[]> {
    const response = await api('/accounts', {
        cache: 'no-store',
        next: { 
            tags: ['all-accounts'],
        },
    })
    const { accounts }  = await response.json()
    return accounts
}

export async function getAccount(id: number): Promise<Account> {
    const response = await api(`/accounts/${id}`, {
        cache: 'no-store',
        next: { 
            tags: ['account'],
        },
    })
    const account = await response.json()
    return account
}

export async function createAccount(name: string): Promise<AccountResponse> {
    try {
        const response = await api('/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        if (response.ok) {
            const account = await response.json()
            revalidateTag('all-accounts')
            return {
                id: account.id,
                success: true,
                error: '',
            }
        } else {
            const { errorMessages } = await response.json()
            return {
                id: 0,
                success: false,
                error: errorMessages,
            }
        }
    } catch (error) {
        return {
            id: 0,
            success: false,
            error: error as string,
        }
    }
}