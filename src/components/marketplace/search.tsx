"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

export function MarketplaceSearch() {
  const t = useTranslations("Marketplace")
  return (
    <div className="relative w-full md:w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('search_placeholder')}
        className="w-full bg-background pl-8"
      />
    </div>
  )
}
