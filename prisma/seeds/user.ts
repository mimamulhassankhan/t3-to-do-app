import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const imamul = await prisma.user.upsert({
        where: { email: 'imamul.hassan@bjitgroup.com' },
        update: {},
        create: {
            email: 'imamul.hassan@bjitgroup.com',
            name: 'Imamul Hassan',
        },
    });

    const tanjila = await prisma.user.upsert({
        where: { email: 'tanjila.akter@bjitgroup.com' },
        update: {},
        create: {
            email: 'tanjila.akter@bjitgroup.com',
            name: 'Tanjila Shamima',
        },
    });
    console.log({ imamul, tanjila });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
