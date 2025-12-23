"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const signout = async () => {
  const supabase = await createClient();
  const locale = await getLocale();
  await supabase.auth.signOut();
  return redirect({ href: "/login", locale });
};
