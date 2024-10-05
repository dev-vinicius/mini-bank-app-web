import { Account } from "@/data/types/account";
import Link from "next/link";

interface AccountItemProps{
    account: Account
}
export function AccountItem({ account }: AccountItemProps ) {
    return (
        <div className="flex gap-2 items-center">
            <div>
                <div className="bg-gray-300 rounded-full w-10 h-10"></div>
                <p>{account.name}</p>
            </div>
            <div>
                <Link href={`/account/${account.id}`}>Acessar</Link>
            </div>
        </div>
    )
}