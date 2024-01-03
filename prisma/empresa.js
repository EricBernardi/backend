import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient()

// app.get('/feed', async (req, res) => {
//     const posts = await prisma.post.findMany({
//       where: { published: true },
//       include: { author: true },
//     })
//     res.json(posts)
//   })

async function main() {
    console.log(`Iniciando o projeto...`);
    try {
        const licencas = await prisma.licenca.findMany();

        console.log(licencas);
        // const empresa = await prisma.empresa.create({
        //     data: {
        //         razaoSocial: 'Empresa 1',
        //         cnpj: '002-774-414/0001-74',
        //         cep: '8942-299',
        //         cidade: 'Blumenau',
        //         estado: 'Santa Catarina',
        //         bairro: 'Das bandeiras',
        //         complemento: 'Atrás da casa',
        //         licencaId: 1,
        //         licencas: {
        //             create: {
        //                 emissao: new Date(),
        //                 validade: new Date(),
        //                 numero: '45754',
        //                 orgaoAmbiental: 'ABEPA',
                        
        //             }
        //         }
        //     }
        // })
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
    }  finally {
        await prisma.$disconnect();
      }
}

main();