import { createClient } from "@/lib/supabase/server"
import { InboxList } from "@/components/rfq/inbox-list"
import { Header } from "@/components/layout/header"
import { Link } from "@/i18n/navigation"
import { redirect } from "@/i18n/navigation"
import { getLocale } from "next-intl/server"
import { SummaryCards } from "@/components/dashboard/summary-cards"

export default async function BuyerInboxPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const locale = await getLocale()

  if (!user) return redirect({ href: "/login", locale })

  // Fetch threads where user is buyer
  const { data: threads } = await supabase
    .from("rfq_threads")
    .select("*")
    .eq("buyer_id", user.id)
    .order("last_message_at", { ascending: false })
  
  const threadList = threads || []
  const totalThreads = threadList.length
  const unreadCount = threadList.reduce((acc, t) => acc + (t.buyer_unread_count || 0), 0)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Inbox</h1>
            <Link href="/marketplace" className="text-primary hover:underline">
                Browse More Products
            </Link>
        </div>
        
        <SummaryCards totalThreads={totalThreads} unreadCount={unreadCount} />

        <InboxList 
            threads={threadList} 
            currentUserId={user.id} 
            userRole="buyer" 
        />
      </main>
    </div>
  )
}

