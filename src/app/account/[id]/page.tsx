import { TransactionItem } from "@/components/transaction-item";
import { getAccount } from "@/services/account-service";
import { getTransactions } from "@/services/transaction-service";
import { DialogCreditTransaction } from "@/components/dialog-credit-transaction";
import { DialogDebitTransaction } from "@/components/dialog-debit-transaction";
import { DialogTransferTransaction } from "@/components/dialog-transfer-transaction";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface AccountParams {
    params: {
        id: number
    }
}

export default async function AccountPage({params}: AccountParams) {
    const account = await getAccount(params.id)
    const transactions = await getTransactions(params.id)
    return (
        <div>
            <div>
                <Link href="/"
                    className="bg-blue-400 hover:bg-blue-600 text-white font-semibold p-2 rounded w-28 flex justify-center items-center gap-2">
                        <ArrowLeft />
                        <span>Voltar</span>
                </Link>
            </div>
            <div className="flex gap-2 items-center mt-6">
                <Image src={`https://i.pravatar.cc/300?img=${account.id}`} 
                    alt={account.name} 
                    width={60} 
                    height={60}
                    className="rounded-full" />
                <p className="text-2xl font-semibold">Ola, {account.name}</p>
            </div>
            <div className="mt-6">
                <p className="text-3xl">Saldo atual: {account.balance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    })}</p>
            </div>
            <div className="flex flex-wrap justify-center mt-20 gap-6 md:gap-0 md:justify-between">
                <DialogCreditTransaction accountId={params.id}/>
                <DialogDebitTransaction accountId={params.id}/>
                <DialogTransferTransaction accountId={params.id}/>
            </div>
            <div className="mt-20 max-h-[500px] overflow-auto">
                <h2 className="text-3xl font-semibold">Transações</h2>
                <div className="flex flex-col gap-2 mt-4">
                {transactions.length === 0 && <p>Nenhuma transação encontrada</p>}
                {transactions.map((transaction, i) => (
                    <TransactionItem transaction={transaction} key={i} />
                ))}
                </div>
            </div>
        </div>
    );
}