import Link from "next/link";
import { Flag } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { MobileNav } from "./mobile-nav";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="mr-4 flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <Flag className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline text-xl">Ahimsa House</span>
                    </Link>
                </div>
                <div className="hidden md:flex flex-1 justify-center">
                    <NavMenu />
                </div>
                <div className="flex items-center justify-end flex-1 md:flex-none">
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
