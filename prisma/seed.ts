import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: "demo-org" },
    update: {},
    create: {
      id: "demo-org",
      name: "Orbital UTM Coalition",
      domains: ["example.com"],
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: "demo-workspace" },
    update: {},
    create: {
      id: "demo-workspace",
      name: "Growth",
      organizationId: organization.id,
    },
  });

  await prisma.template.createMany({
    data: [
      {
        id: "tmpl-paid-social",
        scope: "workspace",
        name: "Paid social",
        schema: {
          required: ["source", "medium", "campaign"],
          defaults: {
            source: "fb",
            medium: "paid_social",
          },
        },
        version: 2,
        approved: true,
        workspaceId: workspace.id,
        createdBy: "demo-user",
      },
      {
        id: "tmpl-email",
        scope: "organization",
        name: "Lifecycle email",
        schema: {
          required: ["source", "medium", "campaign"],
          defaults: {
            medium: "email",
          },
        },
        version: 1,
        approved: true,
        organizationId: organization.id,
        createdBy: "demo-user",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.rule.createMany({
    data: [
      {
        id: "rule-case",
        scope: "organization",
        name: "Enforce lower_snake",
        definition: {
          type: "case",
          style: "lower_snake",
        },
        organizationId: organization.id,
      },
      {
        id: "rule-channel-facebook",
        scope: "workspace",
        name: "Facebook source alias",
        definition: {
          when: { channel: "facebook" },
          then: { utm_source: "fb", utm_medium: "paid_social" },
        },
        workspaceId: workspace.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.campaign.create({
    data: {
      id: "cmp-launch",
      name: "Spring launch",
      workspaceId: workspace.id,
      start: new Date(),
      notes: { summary: "Launch of new integrations" },
      links: {
        create: [
          {
            id: "lnk-1",
            baseUrl: "https://example.com/integrations",
            params: {
              utm_source: "fb",
              utm_medium: "paid_social",
              utm_campaign: "spring_launch",
            },
            finalUrl: "https://example.com/integrations?utm_source=fb&utm_medium=paid_social&utm_campaign=spring_launch",
            shortCode: "spr1",
            workspaceId: workspace.id,
            createdBy: "demo-user",
          },
        ],
      },
    },
  });

  console.log("Seed data ready");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
