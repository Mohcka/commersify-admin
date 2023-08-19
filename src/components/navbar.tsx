import serverAuth from "@/lib/serverAuth";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/db";

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
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
