### Projeto: Gestão para Personal Trainers  

Este projeto foi criado como um teste para aplicar algumas coisas que estava aprendendo. Projeto simples na teoria, o webapp ajuda personal trainers a gerenciar alunos, treinos, horários e a criação de tabelas de treino de forma eficiente.  

---  

### Funcionalidades  

**Dashboard Completa**  
- Exibe dados úteis para o personal trainer, como:  
  - Quantidade total de alunos.  
  - Distribuição por tipo de treino.  
  - Exercícios mais prescritos.
  - Quantidade de alunos por objetivo de treino.  

**Gestão de Alunos**  
- Cadastro de alunos (o envio automático de login e senha por e-mail foi removido devido a custos com bibliotecas externas).  
- Tabela com todos os alunos registrados.  
- Gráfico mostrando o status dos alunos (ativos, pendentes, inativos).  
- Tempo de relacionamento com cada aluno.  
- Notificação de aniversariantes do dia.  

**Templates de Treinos Reutilizáveis**  
- Permite a criação de planos de treino genéricos (ex.: "Iniciantes") que podem ser aplicados a múltiplos alunos.  
- Opção de personalizar treinos individualmente ou disponibilizá-los para grupos selecionados.  

**Agenda Básica e Funcional**  
- Controle de horários de aulas (diárias, semanais ou mensais).  

###

- Temas, escuro e claro
- Multiplataforma
- Charts interativos
- Formulários avançados
- Rich text (Markdown - Pequenas funcionalidades do Word)

---  

### Estou trabalhando na parte do aluno no momento

### Objetivo  
Simplificar a rotina do personal trainer, automatizando tarefas repetitivas e proporcionando uma visão clara sobre o desempenho e acompanhamento dos alunos.


### 🛠 Stack Tecnológica

As principais tecnologias utilizadas neste projeto:

- [Next.js](https://nextjs.org/) - Framework React para produção
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [Clerk.dev](https://clerk.dev/) - Autenticação e gerenciamento de usuários
- [HonoJS](https://hono.dev/) - Framework web rápido para Edge
- [Prisma](https://www.prisma.io/) - ORM para Node.js e TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário


## 🔐 Variáveis de Ambiente

O projeto requer as seguintes variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione:

### Autenticação Clerk
```env
# Chaves da API Clerk (obtenha no Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_chave_publica_aqui
CLERK_PUBLISHABLE_KEY=sua_chave_publica_aqui
CLERK_SECRET_KEY=sua_chave_secreta_aqui

# Segurança de Webhooks
SIGNING_SECRET=seu_signing_secret_aqui
WEBHOOK_SECRET=seu_webhook_secret_aqui

# URLs de redirecionamento
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/personal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/personal
```

### URL da API
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Conexão via pool (para a aplicação)
```
DATABASE_URL="postgresql://usuario:senha@host:porta/banco?pgbouncer=true"
```

### Conexão direta (para migrações)
```
DIRECT_URL="postgresql://usuario:senha@host:porta/banco"
```

Recomendações adicionais:
- Para desenvolvimento local, você pode usar um arquivo `.env.local`
- Em produção, configure as variáveis diretamente no painel do seu serviço de hospedagem
- Considere usar um gerenciador de segredos para ambientes profissionais

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
