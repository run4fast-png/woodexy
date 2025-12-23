"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/navigation";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const locale = await getLocale();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect({ href: "/login?message=Could not authenticate user", locale });
  }

  return redirect({ href: "/marketplace", locale });
};

export const signup = async (formData: FormData) => {
  const origin = (await headers()).get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string; // 'buyer' or 'supplier'

  const supabase = await createClient();
  const locale = await getLocale();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }, // Save role in user metadata
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect({ href: "/signup?message=Could not authenticate user", locale });
  }

  return redirect({ href: "/login?message=Check email to continue sign in process", locale });
};

