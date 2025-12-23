import { RFQThread } from "@/types/rfq"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation" // Using next-intl link


interface InboxListProps {
  threads: RFQThread[]
  currentUserId: string
  userRole: "buyer" | "supplier"
}

export function InboxList({ threads, userRole }: InboxListProps) {
  if (!threads || threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-muted/10">
        <div className="h-10 w-10 text-muted-foreground mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        </div>
        <h3 className="text-lg font-medium">No messages yet</h3>
        <p className="text-muted-foreground text-center max-w-sm mt-1">
            {userRole === 'buyer' 
                ? "You haven't requested any quotes yet. Browse products to get started." 
                : "You don't have any incoming quote requests."}
        </p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'open': return 'default';
        case 'replied': return 'secondary'; // Blue-ish often
        case 'closed': return 'outline';
        case 'cancelled': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => {
        const isBuyer = userRole === "buyer"
        const unreadCount = isBuyer ? thread.buyer_unread_count : thread.supplier_unread_count

        return (
          <Link href={`/inbox/${thread.id}`} key={thread.id} className="block group">
            <Card className={`transition-colors hover:bg-muted/50 ${unreadCount > 0 ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                        {thread.subject || "No Subject"}
                        {unreadCount > 0 && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                    </CardTitle>
                    <CardDescription>
                        {/* In real app, fetch other party name via profile ID */}
                        With: {isBuyer ? "Supplier" : "Buyer"}
                    </CardDescription>
                </div>
                {unreadCount > 0 && <Badge variant="default" className="ml-2">{unreadCount} new</Badge>}
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>
                        Last activity: {new Date(thread.last_message_at).toLocaleDateString()}
                    </span>
                    <Badge variant={getStatusColor(thread.status) as "default" | "secondary" | "outline" | "destructive"}>
                        {thread.status.charAt(0).toUpperCase() + thread.status.slice(1)}
                    </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

