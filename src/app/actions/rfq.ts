"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/navigation";
import { revalidatePath } from "next/cache";

export async function createThread(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
     return { error: "Unauthorized" };
  }

  const productId = formData.get("productId") as string;
  const supplierId = formData.get("supplierId") as string; // Ideally this comes from the product data
  const subject = formData.get("subject") as string;
  const initialMessage = formData.get("message") as string;

  // 1. Create Thread
  const { data: thread, error: threadError } = await supabase
    .from("rfq_threads")
    .insert({
      buyer_id: user.id,
      supplier_id: supplierId,
      product_id: productId,
      subject: subject,
      status: "open",
    })
    .select()
    .single();

  if (threadError) {
    console.error("Thread Error:", threadError);
    return { error: "Failed to create thread" };
  }

  // 2. Create Initial Message
  const { error: msgError } = await supabase
    .from("rfq_messages")
    .insert({
        thread_id: thread.id,
        sender_id: user.id,
        message: initialMessage
    });

  if (msgError) {
     console.error("Message Error:", msgError);
     // Note: Thread exists but message failed. In a real app we might want a transaction or cleanup.
     return { error: "Failed to send message" };
  }

  revalidatePath("/dashboard/buyer/inbox");
  return { success: true, threadId: thread.id };
}

export async function sendMessage(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const threadId = formData.get("threadId") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("rfq_messages").insert({
        thread_id: threadId,
        sender_id: user.id,
        message: message
    });

    if (error) return { error: "Failed to send" };

    // Update thread timestamp
    await supabase.from("rfq_threads").update({
        last_message_at: new Date().toISOString()
    }).eq("id", threadId);

    revalidatePath(`/inbox/${threadId}`);
    return { success: true };
}
