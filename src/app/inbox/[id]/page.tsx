import { createClient } from "@/lib/supabase/server"
import { ChatWindow } from "@/components/rfq/chat-window"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { redirect } from "@/i18n/navigation"
import { getLocale } from "next-intl/server"

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const locale = await getLocale()

  if (!user) return redirect({ href: "/login", locale })

  const { id } = await params

  // Fetch thread details
  const { data: thread } = await supabase
    .from("rfq_threads")
    .select("*, product:products(name, images)")
    .eq("id", id)
    .single()

  if (!thread) return <div>Thread not found</div>

  // Fetch messages
  const { data: messages } = await supabase
    .from("rfq_messages")
    .select("*")
    .eq("thread_id", id)
    .order("created_at", { ascending: true })

  // Verify access (handled by RLS too, but good for UX)
  const isParticipant = thread.buyer_id === user.id || thread.supplier_id === user.id
  if (!isParticipant) return <div>Access Denied</div>

  // Mark as read logic would go here (server action or effect)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
            <h1 className="text-2xl font-bold">{thread.subject}</h1>
            <p className="text-muted-foreground">Product: {thread.product?.name || "Unknown Product"}</p>
        </div>
        
        <ChatWindow 
            thread={thread} 
            initialMessages={messages || []} 
            currentUserId={user.id} 
        />
      </main>
      <Footer />
    </div>
  )
}
