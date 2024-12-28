import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const email = await prisma.config.findFirst({
        where: { key: 'email' },
    });
    if (!email) {
        await prisma.config.create({
            data: { key: 'email', value: 'admin@codental.com' },
        });
    }

    const password = await prisma.config.findFirst({
        where: { key: 'password' },
    });
    if (!password) {
        await prisma.config.create({
            data: { key: 'password', value: '123456' },
        });
    }

    console.log('Seed executado com sucesso!');
}

main()
    .catch((e) => {
        console.error('Erro ao executar o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });