// src/seed.ts
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

async function main() {
  // limpar em ordem segura (tabelas de junção e dependentes antes)
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

  const passwordHash = await bcrypt.hash('123456', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Felipe',
      email: 'felipe@example.com',
      password: passwordHash,
      cpf: '12345678901',
      status: 'ACTIVE',
    },
  });

  const contact1 = await prisma.contact.create({
    data: { userId: user.id, name: 'Contato 1', phone: '+55 33 99999-0001' },
  });
  const contact2 = await prisma.contact.create({
    data: { userId: user.id, name: 'Contato 2', phone: '+55 33 99999-0002' },
  });

  const authority = await prisma.authority.create({
    data: { agency: 'Military Police - 11th BPM', channel: '190', contact: '190' },
  });

  const geo = await prisma.geolocation.create({
    data: {
      street: 'Rua Exemplo',
      district: 'Centro',
      city: 'Manhuaçu',
      number: '100',
      latitude: -20.3,
      longitude: -41.9,
    },
  });

  const alert = await prisma.alert.create({
    data: {
      userId: user.id,
      userCpf: user.cpf,
      notes: 'Alerta seed',
      geolocationId: geo.id,
      contacts: {
        create: [
          { contactId: contact1.id },
          { contactId: contact2.id },
        ],
      },
      authorities: {
        create: [{ authorityId: authority.id }],
      },
      statusHistory: {
        create: [{ status: 'OPEN', note: 'Criado via seed' }],
      },
    },
    include: { geolocation: true },
  });

  await prisma.riskTest.create({
    data: {
      userId: user.id,
      score: 18,
      category: 'MEDIUM',
      recommendations: [
        'Procure uma autoridade',
        'Avise um contato de confiança',
      ],
    },
  });

  console.log('Seed concluída!', { user: user.id, alert: alert.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
