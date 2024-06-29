import type { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";

export default function customAdapter(p: PrismaClient): Adapter {
    return {
        ...PrismaAdapter(p),
        async createUser(user: Omit<AdapterUser, "id">) {
            let _data = {
                data: {
                  ...user,
                  password: "",
                  username: user.email,
                  firstName: (user.name != "undefined") ? user.name.split(' ').slice(0, -1).join(' ') : "",
                  lastName: (user.name != "undefined") ? user.name.split(' ').slice(-1).join(' '):"",
                },
            };

            delete _data.data.name;
            const created = await p.user.create(_data);
    
            return created as AdapterUser;
        },
    };
}