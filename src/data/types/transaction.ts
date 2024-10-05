export interface Transaction {
    value: number
    operationType: number
    date: Date
}

export interface TransactionResponse {
    transactionId: number
    success: boolean
    error: string
}
  