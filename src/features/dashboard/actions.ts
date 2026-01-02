"use server";

import { refresh, updateTag } from "next/cache";

import { dashboardTag } from "@/lib/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { orgSwitchSchema } from "@/lib/validations";

export async function setActiveOrgAction(formData: FormData) {
  const user = await requireUser();
  const parsed = orgSwitchSchema.safeParse({
    orgId: formData.get("orgId"),
  });

  if (!parsed.success) {
    return;
  }

  const membership = await prisma.membership.findUnique({
    where: {
      userId_orgId: {
        userId: user.id,
        orgId: parsed.data.orgId,
      },
    },
    select: { role: true },
  });

  if (!membership) {
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { activeOrgId: parsed.data.orgId },
  });

  updateTag(dashboardTag(user.id));
  refresh();
}
