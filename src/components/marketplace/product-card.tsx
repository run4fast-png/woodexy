"use client"

import { Product } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // We need to install Badge
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-muted relative">
         {/* Placeholder for real image */}
         <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-100 dark:bg-gray-800">
           {product.species} Image
         </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{product.species} • {product.grade}</p>
                    {product.supplier?.isVerified && (
                         <div className="flex items-center text-blue-600" title="Verified Supplier">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <Badge variant="outline">{product.country}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold ml-1">${product.price}/{product.unit}</span>
            </div>
            <div>
                <span className="text-muted-foreground">Dims:</span>
                <span className="ml-1">{product.specifications.thickness}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
            <Link href={`/marketplace/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
