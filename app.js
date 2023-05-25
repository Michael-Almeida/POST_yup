const express = require("express");
const yup = require("yup");

const app = express();

app.use(express.json());

const validarDados = async (dados) => {
  const schema = yup.object().shape({
    password: yup
      .string("Erro: Necessário preeencher o campo senha!")
      .required("Erro: Necessário preeencher o campo senha!")
      .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!")
      .test(
        "numero 1 a 5",
        "A senha deve conter pelo menos um caractere e um número!",
        (value) => {
          const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
          return regex.test(value);
        }
      ),
    email: yup
      .string("Erro: Necessário preencher o campo e-mail!")
      .required("Erro: Necessário preencher o campo e-mail!")
      .test(
        "valid-email",
        "Erro: Necessário preencher o campo e-mail com e-mail válido!",
        function (value) {
          if (value) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(value);
          }
          return true;
        }
      ),
    name: yup
      .string("Erro: Erro necessário preencher o campo nome!")
      .required("Erro: Erro necessário preencher o campo nome!"),
  });
  return await schema.validate(dados);
};

app.post("/adicionando", async (req, res) => {
  try {
    await validarDados(req.body);
    return res.json({
      mensagem: "Dados Corretos",
    });
  } catch (err) {
    return res.status(400).json({
      erro: true,
      mensagem: err.errors,
    });
  }
  /*
  Validar os campos junto
  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(6),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Necessário preencher todos os campos do formulário corretamente",
    });
  }
  return res.json({
    erro: false,
    mensagem: "Dados corretos",
  }); */
});

const porta = 3000;

app.listen(porta, () => {
  console.log(`Servicor iniciado na porta ${porta}`);
});
