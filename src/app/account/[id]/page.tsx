import { TransactionItem } from "@/components/transaction-item";
import { getAccount } from "@/services/account-service";
import { getTransactions } from "@/services/transaction-service";
import { DialogCreditTransaction } from "@/components/dialog-credit-transaction";
import { DialogDebitTransaction } from "@/components/dialog-debit-transaction";
import { DialogTransferTransaction } from "@/components/dialog-transfer-transaction";

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
            <div className="flex gap-2 items-center">
                <div className="bg-gray-300 rounded-full w-10 h-10"></div>
                <p className="text-2xl font-semibold">Ola, {account.name}</p>
            </div>
            <div className="mt-6">
                <p className="text-3xl">Saldo atual: {account.balance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    })}</p>
            </div>
            <div className="flex justify-between mt-20">
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