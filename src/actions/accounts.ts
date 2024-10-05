'use server'

import { AccountResponse } from "@/data/types/account";
import { createAccount } from "@/services/account-service"

export async function createAccountAction(name: string): Promise<AccountResponse> {
    try {
        const result = await createAccount(name);
        return result;
    } catch (error) {
        return {
            id: 0,
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }
    }
}