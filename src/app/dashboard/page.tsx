import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // TODO: Add logic to check user role from DB if needed.
  // For MVP, since we only have buyer inbox implemented:
  redirect("/dashboard/buyer/inbox");
}
