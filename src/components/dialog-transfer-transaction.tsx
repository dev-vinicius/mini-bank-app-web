'use client'
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { createTransferTransactionAction } from "@/actions/transactions"
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"

interface DialogTransferTransactionProps {
    accountId: number
}

export function DialogTransferTransaction({accountId}: DialogTransferTransactionProps) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        if (data.value == "" || Number(data.value) <= 0) {
            toast({
                title: "Erro ao realizar transação",
                description: "O valor da transação deve ser maior que 0",
                variant: "destructive",
            })
            return;
        }

        if (data.destinationAccountId == "" || Number(data.destinationAccountId) <= 0) {
            toast({
                title: "Erro ao realizar transação",
                description: "O número da conta de destino é inválido",
                variant: "destructive",
            })
            return;
        }

        const result = await createTransferTransactionAction(accountId, Number(data.destinationAccountId), Number(data.value))
        if (result.success) {
            toast({
                title: "Transação realizada com sucesso",
                description: "Sua transação foi realizada com sucesso",
                variant: "success",
            })
            setOpen(false)
        } else {
            toast({
                title: "Erro ao realizar transação",
                description: result.error,
                variant: "destructive",
            })
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <button className="w-48 flex flex-col gap-2 items-center p-4 bg-blue-400 rounded-xl hover:bg-blue-600">
                <span className="text-white font-semibold">Transferência</span>
                <span className="text-white font-semibold">-</span>
            </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Transferência entre contas</DialogTitle>
                <DialogDescription>
                    <form onSubmit={handleSubmit}>
                        <label className="block mt-4 font-semibold">Informe a conta de destino</label>
                        <Input name="destinationAccountId" 
                            type="number"
                            placeholder="Informe o número da conta"
                            className="mt-1"/>

                        <label className="block mt-4 font-semibold">Valor</label>
                        <Input name="value" 
                            type="number"
                            placeholder="0,00"
                            className="mt-1"/>

                        <Button type="submit"
                            className="mt-4 bg-blue-400 hover:bg-blue-600">
                            Transferir
                        </Button>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}