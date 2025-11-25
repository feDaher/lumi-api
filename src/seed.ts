import { prisma } from "./prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("Limpando dados anteriores...");

  await prisma.alertAuthorities.deleteMany();
  await prisma.alertContacts.deleteMany();
  await prisma.alertStatusRecord.deleteMany();
  await prisma.geolocation.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.riskTest.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.authority.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log("Criando usuário seed...");

  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Felipe",
      email: "felipe@example.com",
      password: passwordHash,
      cpf: "12345678901",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Usuário criado: ${user.id}`);

  console.log("Criando contatos padrão...");

  const contatos = await prisma.contact.createMany({
    data: [
      {
        userId: user.id,
        name: "Contato 1",
        ddd: "33",
        phone: "99990001",
      },
      {
        userId: user.id,
        name: "Contato 2",
        ddd: "33",
        phone: "99990002",
      },
    ],
  });

  console.log(`Contatos criados: ${contatos.count}`);

  console.log("Criando autoridade seed...");
  const authority = await prisma.authority.create({
    data: {
      agency: "Polícia Militar - 11º BPM",
      channel: "190",
      contact: "190",
    },
  });

  console.log(`Autoridade criada: ${authority.id}`);

  console.log("Criando Geolocation seed...");
  const geolocation = await prisma.geolocation.create({
    data: {
      street: "Rua Teste",
      district: "Centro",
      city: "Manhuaçu",
      number: "100",
      latitude: -20.3,
      longitude: -41.9,
    },
  });

  console.log(`Geolocation criada: ${geolocation.id}`);

  console.log("Criando alerta seed...");

  const alert = await prisma.alert.create({
    data: {
      userId: user.id,
      userCpf: user.cpf,
      notes: "Alerta gerado via seed.ts",
      geolocationId: geolocation.id,
      contacts: {
        create: [
          { contactId: (await prisma.contact.findFirst({ where: { phone: "99990001" } }))!.id },
          { contactId: (await prisma.contact.findFirst({ where: { phone: "99990002" } }))!.id },
        ],
      },
      authorities: {
        create: [{ authorityId: authority.id }],
      },
      statusHistory: {
        create: [
        {
            status: "OPEN",
            note: "Criado via seed inicial",
          },
        ],
      },
    },
    include: {
      geolocation: true,
      contacts: true,
      authorities: true,
      statusHistory: true,
    },
  });

  console.log(`Alerta criado: ${alert.id}`);

  console.log("Criando teste de risco...");
  await prisma.riskTest.create({
    data: {
      userId: user.id,
      score: 18,
      category: "MEDIUM",
      recommendations: [
        "Procure uma autoridade local.",
        "Notifique contatos de confiança.",
      ],
    },
  });

  console.log("SEED FINALIZADO!");
  console.log({
    user: user.id,
    alert: alert.id,
    authority: authority.id,
    geolocation: geolocation.id,
  });
}

main()
  .catch((e) => {
    console.error("Erro no seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
