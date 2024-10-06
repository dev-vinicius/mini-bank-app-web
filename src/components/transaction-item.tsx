import { Transaction } from "@/data/types/transaction";

interface TransactionItemProps {
    transaction: Transaction
}

export function TransactionItem({transaction}: TransactionItemProps) {
    function getOperationDescription(operationType: number) {
        switch (operationType) {
            case 0:
                return 'Crédito'
            case 1:
                return 'Débito'
            case 2:
                return 'Transferência'
            default:
                return 'Indefinido'
        }
    }
    return (
        <div className="flex justify-between border-[1px] rounded-lg p-2">
            <div className="flex items-center">
                <p>Operação: {getOperationDescription(transaction.operationType)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                
                {transaction.operationType !== 0 && !transaction.transferRecieved && 
                <p className="text-xl font-semibold text-red-600">
                    - {transaction.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                </p>}

                {(transaction.operationType === 0 || 
                 (transaction.operationType === 2 && transaction.transferRecieved)) &&
                <p className="text-xl font-semibold text-green-600">
                    + {transaction.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                </p>}
                
                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                    }).replace(',', '')}h</p>
            </div>
        </div>
    )
}