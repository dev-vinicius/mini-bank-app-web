export interface Account {
    id: number
    name: string
    balance: number
  }
  
export interface AccountResponse {
  id: number
  success: boolean
  error: string
}