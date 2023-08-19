import { redirect } from 'next/navigation';
import serverAuth from "@/lib/serverAuth";

import { prisma } from '@/lib/db';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentUser } = await serverAuth();
const userId = currentUser.id;

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
