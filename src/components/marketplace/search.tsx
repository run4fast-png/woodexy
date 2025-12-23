"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function MarketplaceSearch() {
  return (
    <div className="relative w-full md:w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search species, origin..."
        className="w-full bg-background pl-8"
      />
    </div>
  )
}
