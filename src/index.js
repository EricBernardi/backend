import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = express();
server.use(express.json());
const port = 3380;

server.listen(port, () => {
  console.log(
    `Servidor está rodando na porta ${port}... http://localhost:3380`
  );
});

server.use(cors());

server.get("/empresas", async (req, res) => {
  try {
    const empresa = await prisma.empresa.findMany();
    return res.send(empresa);
  } catch (error) {
    return res
      .status(500)
      .json({"Ocorreu um erro ao buscar as empresas: ": error});
  }
});

server.get("/licencas", async (req, res) => {
  try {
    const licencas = await prisma.licenca.findMany();
    return res.send(licencas);
  } catch (error) {
    return res
      .status(500)
      .json({"Ocorreu um erro ao buscar as licenças: ": error});
  }
});

server.get("/licenca/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const licenca = await prisma.licenca.findFirst({
        where: {
            id: parseInt(id),
        }
      });
      return res.send(licenca);
    } catch (error) {
      return res
        .status(500)
        .json({"Ocorreu um erro ao buscar a licença específica: ": error});
    }
  });

server.post("/empresa", async (req, res) => {
  const data = req.body;

  try {
    const empresa = await prisma.empresa.create({
      data: {
        razaoSocial: data.razaoSocial,
        cnpj: data.cnpj,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        bairro: data.bairro,
        complemento: data.complemento,
        licencas: { create: data.licencas },
      },
    });
    return res.status(200).json(empresa);
  } catch (error) {
    return res
      .status(500)
      .json({ "Ocorreu um erro ao cadastrar a empresa: ": error });
  }
});

server.post("/licenca", async (req, res) => {
  const data = req.body;

  try {
    const licenca = await prisma.licenca.create({
      data: {
        numero: data.numero,
        orgaoAmbiental: data.orgaoAmbiental,
        validade: data.validade,
        emissao: data.emissao,
        empresa: {
          connect: {
            id: parseInt(data.empresa),
          },
        },
        empresaId: data.empresaId,
      },
    });
    return res.status(200).json(licenca);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ "Ocorreu um erro ao cadastrar a licença: ": error });
  }
});

server.put("/empresa/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const empresa = await prisma.empresa.update({
      where: {
        id: parseInt(id),
      },
      data: {
        razaoSocial: data.razaoSocial,
        cnpj: data.cnpj,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        bairro: data.bairro,
        complemento: data.complemento,
        licencas: { create: data.licencas },
      },
    });

    return res.status(200).json(empresa);
  } catch (error) {
    return res
      .status(500)
      .json({ "Ocorreu um erro ao atualizar a empresa: ": error });
  }
});

server.put("/licenca/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const licenca = await prisma.licenca.update({
      where: {
        id: parseInt(id),
      },
      data: {
        numero: data.numero,
        orgaoAmbiental: data.orgaoAmbiental,
        emissao: data.emissao,
        validade: data.validade,
        empresa: data.empresa,
        empresaId: data.empresaId,
      },
    });

    return res.status(200).json(licenca);
  } catch (error) {
    return res
      .status(500)
      .json({ "Ocorreu um erro ao atualizar a licença: ": error });
  }
});

server.get("/", (req, res) => {
  try {
    return res.send(`Servidor está rodando...`);
  } catch (err) {
    return res.send(err);
  }
});

server.delete("/delete-empresa/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const licencas = await prisma.licenca.deleteMany({
      where: {
        empresaId: parseInt(id),
      },
    });
    const empresa = await prisma.empresa.delete({
      where: {
        id: parseInt(id),
      },
    });

    const message = `A empresa foi excluída com sucesso!`;
    return res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ "Ocorreu um erro ao tentar excluir a empresa: ": error });
  }
});

server.delete("/delete-licenca/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const licencas = await prisma.licenca.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      const message = `A licença foi excluída com sucesso!`;
      return res.status(200).json({ message });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ "Ocorreu um erro ao tentar excluir a licença: ": error });
    }
  });
