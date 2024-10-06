export interface Transaction {
    value: number
    operationType: number
    date: Date
    transferRecieved: boolean
}

export interface TransactionResponse {
    transactionId: number
    success: boolean
    error: string
}
  