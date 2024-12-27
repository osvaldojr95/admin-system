import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.config.createMany({
        data: [
            { key: 'email', value: 'admin@codental.com' },
            { key: 'password', value: '123456' },
        ],
    });

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