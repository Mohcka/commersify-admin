import serverAuth from "@/lib/serverAuth";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/db";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const { currentUser } = await serverAuth();
  const userId = currentUser.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          {/* Signout button */}
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
