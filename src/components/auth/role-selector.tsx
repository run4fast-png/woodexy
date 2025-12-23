"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function RoleSelector() {
    const [role, setRole] = useState("buyer");

    return (
        <div className="grid gap-2">
            <Input type="hidden" name="role" value={role} />
            <Tabs defaultValue="buyer" onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buyer">Buyer</TabsTrigger>
                    <TabsTrigger value="supplier">Supplier</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
