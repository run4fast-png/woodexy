"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createThread } from "@/app/actions/rfq"
import { useRouter } from "@/i18n/navigation"

interface RequestQuoteModalProps {
    productId: string
    productName: string
    supplierId: string // In a real app, products have supplier_id
}

export function RequestQuoteModal({ productId, productName, supplierId }: RequestQuoteModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    formData.append("productId", productId)
    formData.append("supplierId", supplierId)
    formData.append("subject", `Quote Request: ${productName}`)
    
    const result = await createThread(formData)
    setLoading(false)

    if (result.success) {
        setSent(true)
        // Redirect after a short delay so user sees success
        setTimeout(() => {
            setOpen(false)
            setSent(false)
            router.push(`/inbox/${result.threadId}`)
        }, 1500)
    } else {
        alert("Failed to send request: " + result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
        setOpen(val)
        if (!val) setSent(false) // Reset on close
    }}>
      <DialogTrigger asChild>
         <Button size="lg" className="flex-1">Request Quote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {sent ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Request Sent!</h3>
                    <p className="text-muted-foreground">Redirecting to your inbox...</p>
                </div>
            </div>
        ) : (
            <>
                <DialogHeader>
                <DialogTitle>Request Quote for {productName}</DialogTitle>
                <DialogDescription>
                    Send a message to the supplier to start the negotiation process.
                </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="I am interested in..."
                            defaultValue={`Hi, I'm interested in ${productName}. Can you provide a quote for...`}
                            rows={4}
                            required
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Request"}
                    </Button>
                    </DialogFooter>
                </form>
            </>
        )}
      </DialogContent>
    </Dialog>
  )
}

