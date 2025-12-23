import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table" // Need to install Table
import { ArrowLeft, Share2, Heart } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { RequestQuoteModal } from "@/components/rfq/request-quote-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <Link href="/marketplace" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
        </Link>
        
        <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image Placeholder */}
            <div className="aspect-square relative bg-muted rounded-lg flex items-center justify-center text-2xl text-muted-foreground">
                {product.name} Image
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                <div>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="mb-2">{product.country}</Badge>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-xl text-muted-foreground">{product.species} • {product.grade}</p>
                        {product.supplier?.isVerified && (
                             <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-medium cursor-help">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                        Verified Supplier
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>This supplier is verified by Woodexy</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${product.price}</span>
                    <span className="text-muted-foreground">/ {product.unit}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                </p>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        {/* Dummy supplier ID for MVP - in real app, MOCK_PRODUCTS would have this */}
                         <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex-1">
                                     <RequestQuoteModal productId={product.id} productName={product.name} supplierId="dummy-supplier-uuid" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Negotiate directly with the supplier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button size="lg" variant="outline" className="flex-1">Contact Supplier</Button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                        Usually replies within 24h
                    </p>
                </div>

                {/* Specifications */}
                <div>
                    <h3 className="font-semibold mb-4">Specifications</h3>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Thickness</TableCell>
                                <TableCell>{product.specifications.thickness}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Width</TableCell>
                                <TableCell>{product.specifications.width}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Length</TableCell>
                                <TableCell>{product.specifications.length}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Moisture Content</TableCell>
                                <TableCell>{product.specifications.moisture}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Certifications</TableCell>
                                <TableCell>{product.certifications.join(", ")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
