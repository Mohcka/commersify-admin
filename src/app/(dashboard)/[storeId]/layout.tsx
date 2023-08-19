import { redirect } from "next/navigation";
import serverAuth from "@/lib/serverAuth";

import Navbar from "@/components/navbar";
import { prisma } from "@/lib/db";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { currentUser } = await serverAuth();
  const userId = currentUser.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
