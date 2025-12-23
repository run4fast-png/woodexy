import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { ProductCard } from "@/components/marketplace/product-card"
import { MarketplaceFilters } from "@/components/marketplace/filters"
import { MarketplaceSearch } from "@/components/marketplace/search"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 md:flex-row">
            {/* Desktop Filters */}
            <aside className="hidden w-[250px] flex-col gap-6 md:flex">
                <MarketplaceFilters />
            </aside>

            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                    <div className="flex items-center gap-2">
                        <MarketplaceSearch />
                        {/* Mobile Filters */}
                         <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <VisuallyHidden.Root>
                                  <SheetTitle>Filters</SheetTitle>
                                </VisuallyHidden.Root>
                                <div className="mt-6">
                                    <MarketplaceFilters />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
