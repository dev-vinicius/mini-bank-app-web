'use client'

import { createAccountAction } from "@/actions/accounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"

export function FormNewAccount() {
    const { toast } = useToast()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        if (data.name === "") {
            toast({
                title: "Erro ao realizar cadastro",
                description: "Nome obrigatório",
                variant: "destructive",
            })
            return
        }

        const result = await createAccountAction(data.name.toString())
        if (result.success) {
            toast({
                title: "Conta criada com sucesso",
                description: `Sua conta foi criada com número: ${result.id}`,
                variant: "success",
            })
        } else {
            toast({
                title: "Erro ao realizar cadastro",
                description: result.error,
                variant: "destructive",
            })
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <p className="pl-1">Informe seu nome para criar uma nova conta e utilizar as transações</p>
            <Input type="text" 
                name="name" 
                placeholder="Informe seu nome..." 
                className="mt-2"/>

            <Button type="submit" className="max-w-[200px] bg-blue-400 hover:bg-blue-600 mt-2">Cadastrar</Button>
        </form>
    )
}