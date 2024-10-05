import { Account } from "@/data/types/account";
import Image from "next/image";
import Link from "next/link";

interface AccountItemProps{
    account: Account
}
export function AccountItem({ account }: AccountItemProps ) {
    return (
        <div className="mt-1">
            <div className="flex justify-between ">
                <div className="flex gap-2 items-center">
                    <Image src={`https://i.pravatar.cc/300?img=${account.id}`} 
                        alt={account.name} 
                        width={40} 
                        height={40}
                        className="rounded-full" />
                    <p className="font-semibold">{account.name}</p>
                </div>
                <div className="">
                    <Link href={`/account/${account.id}`}
                        className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Acessar
                    </Link>
                </div>
            </div>
            <hr className="my-2" />
        </div>
    )
}