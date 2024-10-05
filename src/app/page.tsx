import { AccountItem } from "@/components/account-item";
import { FormNewAccount } from "@/components/form-new-account";
import { getAllAccounts } from "@/services/account-service";

export default async function Home() {
  const accounts = await getAllAccounts();
  return (
    <div>
        <div>
            <p className="text-2xl font-semibold">Bem vindo</p>
        </div>
        <div className="mt-6">
            <p className="text-3xl">Cadastre ou acesse uma conta</p>
        </div>
        <div className="mt-20 border-[1px] rounded-lg p-4">
            <FormNewAccount />
        </div>
        <div className="mt-20 max-h-[500px] overflow-auto">
            <h2 className="text-3xl font-semibold">Contas</h2>
            <div className="flex flex-col gap-2 mt-4">
                {accounts.length === 0 && <p>Nenhuma conta encontrada</p>}
                {accounts.map((account) => (
                    <AccountItem key={account.id} account={account} />
                ))}
            </div>
        </div>
    </div>
  );
}
