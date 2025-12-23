"use client"

import { MOCK_FILTERS } from "@/lib/mock-data"
import { Label } from "@/components/ui/label" 
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function MarketplaceFilters() {
  const t = useTranslations("Marketplace")
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">{t('species')}</h3>
        <div className="space-y-2">
            {MOCK_FILTERS.species.map((species) => (
                <div key={species} className="flex items-center space-x-2">
                    <Checkbox id={`species-${species}`} />
                    <Label htmlFor={`species-${species}`}>{species}</Label>
                </div>
            ))}
        </div>
      </div>
      
      <div>
        <h3 className="mb-4 text-lg font-semibold">{t('origin')}</h3>
        <div className="space-y-2">
            {MOCK_FILTERS.countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                    <Checkbox id={`country-${country}`} />
                    <Label htmlFor={`country-${country}`}>{country}</Label>
                </div>
            ))}
        </div>
      </div>

       <div>
        <h3 className="mb-4 text-lg font-semibold">{t('price_range')}</h3>
        <Slider defaultValue={[50, 500]} max={1000} step={10} className="my-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
            <span>$50</span>
            <span>$1000</span>
        </div>
      </div>

      <Button className="w-full">{t('apply_filters')}</Button>
    </div>
  )
}
