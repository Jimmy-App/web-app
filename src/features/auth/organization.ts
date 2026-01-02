import { prisma } from "@/lib/db";

export async function createPersonalOrganization(userId: string, name: string) {
  const existing = await prisma.organization.findFirst({
    where: { ownerId: userId },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  const organizationName = name.trim().length ? `${name.trim()}'s Org` : "Personal";

  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: organizationName,
        ownerId: userId,
      },
    });

    await tx.membership.create({
      data: {
        userId,
        orgId: organization.id,
        role: "OWNER",
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { activeOrgId: organization.id },
    });

    return organization;
  });
}
