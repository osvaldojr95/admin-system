# Desafio Técnico Fullstack - Painel Administrativo

## Como rodar o projeto localmente.

- OBS.: Foi utilizado o Docker Compose para criar os microserviços, portanto deverá ter o Docker instalado.

1. Clone o repositório:

```bash
git clone https://github.com/osvaldojr95/admin-system
cd admin-system
```

2. Execute o comando para rodar o docker com os containers:

```bash
docker-compose -f docker-compose.dev.yml up

(dependendo da versão instalada)
docker compose -f docker-compose.dev.yml up
```

## Como acessar o painel (login e senha).

URLs de acesso:

- URL de Produção: http://15.228.222.169
- URL Local: http://localhost:5040

Credenciais de acesso:

- Email: admin@codental.com
- Senha: 123456

## Explicação sobre as principais escolhas técnicas.

### Docker & docker-compose:

- Fácilidade para rodar os microserviços em qualquer ambiente.

### Microserviços:

- Separação das funcionalidades para facilitar a manutenção.

### Node.js/Express:

- Backend rápido e eficiente.

### React + Styled-Components:

- Frontend dinâmico e organizado e familiaridade com o styled-components

### CI/CD com AWS:

- Familiaridade com a ferramenta e ro.

### Joi e Moment.js:

- Validações de entradas e datas simplificadas.]

### PrismaORM:

- Manipulação de banco de dados simples e prevenção de SQL Injection automática.

### RabbitMQ:

- Comunicação entre serviços de forma rápida e assíncrona.

### Arquitetura em camadas:

- Código organizado e fácil de escalar.
