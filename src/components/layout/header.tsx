import Link from "next/link"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2, User } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { signout } from "@/app/(auth)/signout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch unread count if user exists
  let unreadCount = 0
  if (user) {
    // Determine which field to count based on role (simplistic check, ideally role is known)
    // For MVP, we check both - strictly you should know if user is buyer or supplier
    const { data: threads } = await supabase
        .from("rfq_threads")
        .select("buyer_unread_count, supplier_unread_count, buyer_id, supplier_id")
        .or(`buyer_id.eq.${user.id},supplier_id.eq.${user.id}`)
    
    if (threads) {
        unreadCount = threads.reduce((acc, thread) => {
            if (thread.buyer_id === user.id) return acc + (thread.buyer_unread_count || 0)
            if (thread.supplier_id === user.id) return acc + (thread.supplier_unread_count || 0)
            return acc
        }, 0)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Woodexy</span>
        </Link>
        <Link
          href="/marketplace"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Marketplace
        </Link>
        {user && (
            <>
                <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Dashboard
                </Link>
                <Link
                href="/orders"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Orders
                </Link>
            </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
             <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Woodexy</span>
            </Link>
            <Link
              href="/marketplace"
              className="hover:text-foreground"
            >
              Marketplace
            </Link>
             {user && (
                <>
                    <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground"
                    >
                    Dashboard
                    </Link>
                    <Link
                    href="/orders"
                    className="text-muted-foreground hover:text-foreground"
                    >
                    Orders
                    </Link>
                </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        <LanguageSwitcher />
        {user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full relative">
                    <User className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                            {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span>{user.email}</span>
                        {unreadCount > 0 && <span className="text-xs text-red-500 font-normal">{unreadCount} unread messages</span>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/buyer/inbox">
                        Inbox 
                        {unreadCount > 0 && <span className="ml-auto text-xs bg-red-100 text-red-600 px-1 rounded">{unreadCount}</span>}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form action={signout}>
                      <button type="submit" className="w-full text-left">
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
        ) : (
            <div className="flex gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                 </Button>
                 <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                 </Button>
            </div>
        )}
      </div>
    </header>
  )
}
