import Link from "next/link";
import {
  CircleUser,
  CreditCard,
  LogOut,
  Star,
  Tractor,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";

export function AppHeader() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50 shadow-sm">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/farmer">
          <Logo />
        </Link>
        <Link
          href="/farmer"
          className="text-foreground transition-colors hover:text-foreground font-semibold"
        >
          Dashboard
        </Link>
        <Link
          href="/jobs/new"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Post a Job
        </Link>
      </nav>
      {/* Mobile Header would go here if needed */}
      <div className="flex w-full items-center justify-between md:justify-end gap-4 md:ml-auto">
        <div className="md:hidden">
          <Link href="/farmer">
            <Logo />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/payments"><CreditCard className="mr-2 h-4 w-4" />Payments</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/ratings"><Star className="mr-2 h-4 w-4" />Ratings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem asChild>
              <Link href="/"><LogOut className="mr-2 h-4 w-4" />Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
