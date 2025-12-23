"use client"

import { useEffect, useRef, useState } from "react"
import { RFQMessage, RFQThread } from "@/types/rfq"
import { createClient } from "@/lib/supabase/client"
import { sendMessage } from "@/app/actions/rfq"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ChatWindowProps {
    thread: RFQThread
    initialMessages: RFQMessage[]
    currentUserId: string
}

export function ChatWindow({ thread, initialMessages, currentUserId }: ChatWindowProps) {
    const [messages, setMessages] = useState<RFQMessage[]>(initialMessages)
    const [newMessage, setNewMessage] = useState("")
    const [sending, setSending] = useState(false)
    const endOfMessagesRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel(`rfq_messages:${thread.id}`)
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "rfq_messages",
                filter: `thread_id=eq.${thread.id}`
            }, (payload) => {
                setMessages((prev) => [...prev, payload.new as RFQMessage])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [thread.id, supabase])

    // Auto-scroll to bottom
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!newMessage.trim()) return

        setSending(true)
        const formData = new FormData()
        formData.append("threadId", thread.id)
        formData.append("message", newMessage)
        
        // Optimistic update
        // In a real app we'd construct a proper temp ID and status
        
        await sendMessage(formData)
        setNewMessage("")
        setSending(false)
    }

    return (
        <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                {messages.map((msg) => {
                    const isMe = msg.sender_id === currentUserId
                    return (
                        <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                            <div className={cn("max-w-[70%]", isMe && "order-2")}>
                                <div className={cn(
                                    "p-3 rounded-lg text-sm",
                                    isMe ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border rounded-tl-none"
                                )}>
                                    {msg.message}
                                </div>
                                <div className={cn("text-xs text-muted-foreground mt-1", isMe && "text-right")}>
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <Textarea 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..." 
                        className="resize-none min-h-[50px] max-h-[150px]"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                    />
                    <Button onClick={handleSend} disabled={sending || !newMessage.trim()}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}
