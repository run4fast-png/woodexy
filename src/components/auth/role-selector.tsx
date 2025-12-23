"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function RoleSelector() {
    const [role, setRole] = useState("buyer");
    const t = useTranslations("Auth");

    return (
        <div className="grid gap-2">
            <Input type="hidden" name="role" value={role} />
            <Tabs defaultValue="buyer" onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buyer">{t("role_buyer")}</TabsTrigger>
                    <TabsTrigger value="supplier">{t("role_supplier")}</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
