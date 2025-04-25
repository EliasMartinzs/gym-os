const CHEST_EXERCISES = [
  // 1-10
  {
    name: "Supino reto com barra",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Deitado no banco plano, desça a barra até tocar o peito e empurre verticalmente.",
  },
  {
    name: "Supino inclinado com halteres",
    type: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Banco a 45°, empurre os halteres para cima até a extensão total dos braços.",
  },
  {
    name: "Crucifixo com halteres",
    type: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Deitado no banco, braços em arco. Una os halteres acima do peito.",
  },
  {
    name: "Flexão de braço tradicional",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Mãos na largura dos ombros, desça até o peito quase tocar o chão.",
  },
  {
    name: "Supino declinado com barra",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Banco declinado, desça a barra até a parte inferior do peito.",
  },
  {
    name: "Pullover com halter",
    type: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Deitado transversalmente no banco, desça o halter atrás da cabeça alongando o peitoral.",
  },
  {
    name: "Crossover na polia alta",
    type: "strength",
    muscle: "chest",
    equipment: "cable",
    difficulty: "advanced",
    instructions:
      "Una as alças das polias altas à frente do peito, mantendo contração máxima.",
  },
  {
    name: "Supino máquina Smith",
    type: "strength",
    muscle: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Barra guiada. Ideal para controle de movimento.",
  },
  {
    name: "Flexão diamante",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Mãos próximas formando um diamante. Foco no peitoral medial.",
  },
  {
    name: "Supino com pegada fechada",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Mãos na largura dos ombros. Ativa peitoral medial e tríceps.",
  },

  // 11-20
  {
    name: "Crucifixo invertido",
    type: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Banco declinado, crucifixo com ênfase na parte inferior do peito.",
  },
  {
    name: "Flexão com elevação de perna",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Pernas elevadas em banco. Maior carga no peitoral superior.",
  },
  {
    name: "Supino com elástico",
    type: "strength",
    muscle: "chest",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Elástico fixo atrás do banco. Resistência variável.",
  },
  {
    name: "Press peitoral máquina",
    type: "strength",
    muscle: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Sentado, empurre as alavancas para frente com controle.",
  },
  {
    name: "Flexão arqueada",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Quadris elevados (forma de 'V'). Foco no peitoral superior.",
  },
  {
    name: "Supino isométrico",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Segure a barra a 10cm do peito por 30 segundos.",
  },
  {
    name: "Flexão com rotação",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Após empurrar, gire o tronco levantando um braço para o teto.",
  },
  {
    name: "Supino com chains",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Correntes sobre a barra aumentam a resistência progressivamente.",
  },
  {
    name: "Flexão explosiva",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Empurre com força suficiente para as mãos saírem do chão.",
  },
  {
    name: "Supino com kettlebell",
    type: "strength",
    muscle: "chest",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions:
      "Segure um kettlebell em cada mão, execute o movimento como no supino tradicional.",
  },

  // 21-30
  {
    name: "Crucifixo na máquina pec deck",
    type: "strength",
    muscle: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Apoie os cotovelos nas almofadas e una os braços à frente.",
  },
  {
    name: "Flexão com apoio instável",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Mãos em bosu ou TRX para maior ativação do core.",
  },
  {
    name: "Supino com barra safety",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: "Barra especial com alças para reduzir impacto nos ombros.",
  },
  {
    name: "Press peitoral com corda",
    type: "strength",
    muscle: "chest",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Use corda nas polias baixas. Foco na contração máxima.",
  },
  {
    name: "Flexão Hindu",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Movimento fluido entre posição de cobra e cachorro olhando para baixo.",
  },
  {
    name: "Supino com faixas de resistência",
    type: "strength",
    muscle: "chest",
    equipment: "band",
    difficulty: "beginner",
    instructions:
      "Faixas presas na barra ou halteres para resistência adicional.",
  },
  {
    name: "Flexão Spiderman",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Ao descer, leve um joelho em direção ao cotovelo do mesmo lado.",
  },
  {
    name: "Supino com pausa",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Pause por 3 segundos com a barra a 5cm do peito antes de empurrar.",
  },
  {
    name: "Flexão com batida palmas",
    type: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Explosiva o suficiente para bater palmas antes de retornar.",
  },
  {
    name: "Supino com halteres rotacionados",
    type: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Gire os halteres durante o movimento para ativação total.",
  },
] as const;

const BACK_EXERCISES = [
  // 1-10
  {
    name: "Barra fixa pegada pronada",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Puxe o corpo até o queixo ultrapassar a barra, mantendo o tronco estável.",
  },
  {
    name: "Remada curvada com barra",
    type: "strength",
    muscle: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Tronco inclinado a 45°, puxe a barra até o umbigo, mantendo as costas retas.",
  },
  {
    name: "Pulldown na polia alta",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions: "Puxe a barra até o peito, contraindo as escápulas.",
  },
  {
    name: "Remada cavalinho",
    type: "strength",
    muscle: "back",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Apoie um joelho e uma mão no banco, puxe o halter para cima.",
  },
  {
    name: "Pull-up pegada supinada",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Mãos na barra com palmas viradas para você. Foco no latíssimo do dorso.",
  },
  {
    name: "Remada serrote",
    type: "strength",
    muscle: "back",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Uma mão de cada vez, puxe o halter como se estivesse serrando madeira.",
  },
  {
    name: "Remada máquina",
    type: "strength",
    muscle: "back",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Sentado, puxe as alças para trás, mantendo as costas retas.",
  },
  {
    name: "Hiperextensão lombar",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado de bruços no banco, eleve o tronco contraindo a lombar.",
  },
  {
    name: "Pulldown pegada neutra",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Use a barra em V. Puxe até o peito, mantendo os cotovelos próximos.",
  },
  {
    name: "Remada TRX",
    type: "strength",
    muscle: "back",
    equipment: "trx",
    difficulty: "intermediate",
    instructions: "Inclinado para trás, puxe o corpo em direção às alças.",
  },

  // 11-20
  {
    name: "Deadlift",
    type: "strength",
    muscle: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Levante a barra do chão até a cintura, mantendo as costas neutra.",
  },
  {
    name: "Remada invertida",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado sob uma barra fixa baixa, puxe o peito em direção à barra.",
  },
  {
    name: "Pulldown unilateral",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Puxe uma alça de cada vez, focando na contração unilateral.",
  },
  {
    name: "Superman",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Deitado de bruços, levante braços e pernas simultaneamente.",
  },
  {
    name: "Remada com elástico",
    type: "strength",
    muscle: "back",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Puxe o elástico em direção à cintura, simulando remada.",
  },
  {
    name: "Pull-up com peso",
    type: "strength",
    muscle: "back",
    equipment: "weighted",
    difficulty: "advanced",
    instructions:
      "Execute barra fixa com cinto de pesos ou halter entre os pés.",
  },
  {
    name: "Remada baixa na polia",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Puxe a barra em direção ao abdômen, mantendo o peito erguido.",
  },
  {
    name: "Good morning",
    type: "strength",
    muscle: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Barra sobre os ombros, incline o tronco para frente mantendo a lombar reta.",
  },
  {
    name: "Remada máquina hammer",
    type: "strength",
    muscle: "back",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Use o aparelho de remada sentada com pegada neutra.",
  },
  {
    name: "Pulldown com corda",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Puxe a corda para baixo, separando as mãos no final do movimento.",
  },

  // 21-30
  {
    name: "Barra fixa pegada larga",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Mãos mais afastadas que os ombros para ênfase no latíssimo.",
  },
  {
    name: "Remada curvada unilateral",
    type: "strength",
    muscle: "back",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Uma mão de cada vez, com apoio do joelho oposto no banco.",
  },
  {
    name: "Pulldown frontal pronado",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Puxe a barra para o peito com as palmas viradas para frente.",
  },
  {
    name: "Remada T-bar",
    type: "strength",
    muscle: "back",
    equipment: "machine",
    difficulty: "intermediate",
    instructions: "Puxe a barra em T em direção ao peito, mantendo a postura.",
  },
  {
    name: "Pull-up australiano",
    type: "strength",
    muscle: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Barra baixa, corpo inclinado. Puxe o peito em direção à barra.",
  },
  {
    name: "Remada com kettlebell",
    type: "strength",
    muscle: "back",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions: "Segure o kettlebell com ambas as mãos, puxe para cima.",
  },
  {
    name: "Pulldown invertido",
    type: "strength",
    muscle: "back",
    equipment: "cable",
    difficulty: "advanced",
    instructions:
      "De costas para a polia, puxe a barra para baixo atrás da cabeça.",
  },
  {
    name: "Remada máquina unilateral",
    type: "strength",
    muscle: "back",
    equipment: "machine",
    difficulty: "intermediate",
    instructions: "Trabalhe um lado de cada vez para corrigir desequilíbrios.",
  },
  {
    name: "Barra fixa assistida",
    type: "strength",
    muscle: "back",
    equipment: "assisted",
    difficulty: "beginner",
    instructions:
      "Use faixas ou máquina de assistência para facilitar o movimento.",
  },
  {
    name: "Remada com pegada martelo",
    type: "strength",
    muscle: "back",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Pegue os halteres com as palmas viradas uma para a outra.",
  },
] as const;

const LEG_EXERCISES = [
  // 1-10
  {
    name: "Agachamento livre",
    type: "strength",
    muscle: "quadriceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Barra nas costas, pés na largura dos ombros. Desça até as coxas ficarem paralelas ao chão.",
  },
  {
    name: "Leg press 45°",
    type: "strength",
    muscle: "quadriceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Empurre a plataforma com os pés na largura dos ombros, sem travar os joelhos.",
  },
  {
    name: "Afundo com halteres",
    type: "strength",
    muscle: "quadriceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Dê um passo largo à frente, desça até o joelho traseiro quase tocar o chão.",
  },
  {
    name: "Cadeira extensora",
    type: "strength",
    muscle: "quadriceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Estenda as pernas contra a resistência, mantendo o movimento controlado.",
  },
  {
    name: "Stiff",
    type: "strength",
    muscle: "hamstrings",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Barra à frente do corpo, incline o tronco mantendo as pernas semi-estendidas.",
  },
  {
    name: "Agachamento búlgaro",
    type: "strength",
    muscle: "quadriceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Pé traseiro apoiado em banco, desça até o joelho da frente formar 90°.",
  },
  {
    name: "Cadeira flexora",
    type: "strength",
    muscle: "hamstrings",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Flexione os joelhos contra a resistência, focando nos posteriores de coxa.",
  },
  {
    name: "Elevação de gêmeos em pé",
    type: "strength",
    muscle: "calves",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Eleve os calcanhares o máximo possível, contraindo as panturrilhas.",
  },
  {
    name: "Passada com barra",
    type: "strength",
    muscle: "glutes",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Barra nas costas, dê passadas longas mantendo o tronco ereto.",
  },
  {
    name: "Agachamento sumô",
    type: "strength",
    muscle: "adductors",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions:
      "Pés mais afastados que os ombros, desça mantendo os joelhos alinhados com os pés.",
  },

  // 11-20
  {
    name: "Leg press unilateral",
    type: "strength",
    muscle: "quadriceps",
    equipment: "machine",
    difficulty: "intermediate",
    instructions:
      "Faça o movimento com uma perna de cada vez para equilíbrio muscular.",
  },
  {
    name: "RDL com halteres",
    type: "strength",
    muscle: "hamstrings",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Incline o tronco à frente com halteres, mantendo as costas retas.",
  },
  {
    name: "Agachamento frontal",
    type: "strength",
    muscle: "quadriceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Barra apoiada na frente dos ombros. Desça mantendo os cotovelos altos.",
  },
  {
    name: "Extensão de panturrilha sentado",
    type: "strength",
    muscle: "calves",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Trabalhe a porção medial da panturrilha com joelhos flexionados.",
  },
  {
    name: "Hack squat",
    type: "strength",
    muscle: "quadriceps",
    equipment: "machine",
    difficulty: "intermediate",
    instructions: "Máquina inclinada. Agache com os pés à frente do corpo.",
  },
  {
    name: "Flexão nórdica",
    type: "strength",
    muscle: "hamstrings",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Ajoelhado, incline o corpo à frente controlando com os posteriores.",
  },
  {
    name: "Agachamento pistola",
    type: "strength",
    muscle: "quadriceps",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Agache com uma perna estendida à frente, mantendo o equilíbrio.",
  },
  {
    name: "Abdução de quadril na máquina",
    type: "strength",
    muscle: "abductors",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Empurre as almofadas para fora contra a resistência.",
  },
  {
    name: "Agachamento com salto",
    type: "plyometric",
    muscle: "quadriceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Agache e exploda em um salto vertical, amortecendo a queda.",
  },
  {
    name: "Cadeira adutora",
    type: "strength",
    muscle: "adductors",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Una as almofadas contra a resistência, trabalhando a parte interna da coxa.",
  },

  // 21-30
  {
    name: "Step-up com halteres",
    type: "strength",
    muscle: "glutes",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Suba em um banco alternando as pernas, mantendo o tronco ereto.",
  },
  {
    name: "Agachamento wall sit",
    type: "isometric",
    muscle: "quadriceps",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Apoiado na parede, mantenha a posição de agachamento estático.",
  },
  {
    name: "Ponte de glúteo",
    type: "strength",
    muscle: "glutes",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Deitado de costas, eleve o quadril contraindo os glúteos.",
  },
  {
    name: "Agachamento terra",
    type: "strength",
    muscle: "quadriceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Barra no chão. Agarre e levante em um movimento fluido.",
  },
  {
    name: "Elevação de gêmeos no leg press",
    type: "strength",
    muscle: "calves",
    equipment: "machine",
    difficulty: "intermediate",
    instructions: "Use o leg press para elevar apenas as pontas dos pés.",
  },
  {
    name: "Agachamento búlgaro com barra",
    type: "strength",
    muscle: "quadriceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Versão mais desafiadora com barra nas costas.",
  },
  {
    name: "Flexão de perna em pé",
    type: "strength",
    muscle: "hamstrings",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Flexione o joelho contra a polia baixa, mantendo o quadril estável.",
  },
  {
    name: "Agachamento goblet",
    type: "strength",
    muscle: "quadriceps",
    equipment: "kettlebell",
    difficulty: "beginner",
    instructions: "Segure o kettlebell próximo ao peito durante o agachamento.",
  },
  {
    name: "Prancha com elevação de perna",
    type: "strength",
    muscle: "glutes",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Em posição de prancha, eleve uma perna de cada vez.",
  },
  {
    name: "Agachamento com banda elástica",
    type: "strength",
    muscle: "quadriceps",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Banda ao redor das coxas para resistência adicional.",
  },
] as const;

const SHOULDER_EXERCISES = [
  // 1-10
  {
    name: "Desenvolvimento militar com barra",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Em pé, empurre a barra sobre a cabeça até a extensão completa dos braços.",
  },
  {
    name: "Elevação lateral com halteres",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Braços estendidos, eleve os halteres até a altura dos ombros.",
  },
  {
    name: "Desenvolvimento Arnold",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Comece com halteres em rotação interna e gire durante o movimento.",
  },
  {
    name: "Remada alta com barra",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Puxe a barra até a altura do queixo, mantendo os cotovelos altos.",
  },
  {
    name: "Elevação frontal com halter",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Eleve um halter de cada vez à frente do corpo até a altura dos olhos.",
  },
  {
    name: "Desenvolvimento máquina Smith",
    type: "strength",
    muscle: "shoulders",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Versão mais segura com barra guiada.",
  },
  {
    name: "Crucifixo inverso na máquina",
    type: "strength",
    muscle: "shoulders",
    equipment: "machine",
    difficulty: "intermediate",
    instructions: "Trabalhe os deltoides posteriores afastando as alavancas.",
  },
  {
    name: "Elevação lateral inclinada",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Inclinado a 45°, eleve os halteres com ênfase no deltoide medial.",
  },
  {
    name: "Desenvolvimento com kettlebells",
    type: "strength",
    muscle: "shoulders",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions: "Empurre os kettlebells acima da cabeça com pegada neutra.",
  },
  {
    name: "Face pull com corda",
    type: "strength",
    muscle: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Puxe a corda em direção à testa, separando as mãos no final.",
  },

  // 11-20
  {
    name: "Elevação lateral na polia baixa",
    type: "strength",
    muscle: "shoulders",
    equipment: "cable",
    difficulty: "advanced",
    instructions: "Mantenha tensão constante durante todo o movimento.",
  },
  {
    name: "Desenvolvimento halteres sentado",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Costas apoiadas no banco para focar apenas nos ombros.",
  },
  {
    name: "Rotação externa com banda",
    type: "strength",
    muscle: "shoulders",
    equipment: "band",
    difficulty: "beginner",
    instructions:
      "Fortalecimento do manguito rotador com resistência elástica.",
  },
  {
    name: "Shrug com barra",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "beginner",
    instructions: "Eleve os ombros contraindo os trapézios.",
  },
  {
    name: "Desenvolvimento push press",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Use impulso das pernas para ajudar no movimento.",
  },
  {
    name: "Elevação lateral declinada",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions: "Deitado de lado no banco declinado para maior amplitude.",
  },
  {
    name: "Crucifixo inverso com halteres",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Inclinado à frente, braços abertos em 'T' para trabalhar posteriores.",
  },
  {
    name: "Desenvolvimento unilateral",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Trabalhe um braço de cada vez para corrigir desequilíbrios.",
  },
  {
    name: "Elevação frontal na polia",
    type: "strength",
    muscle: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Mantenha tensão constante nos deltoides anteriores.",
  },
  {
    name: "Handstand push-up",
    type: "strength",
    muscle: "shoulders",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Flexione os braços na posição de pino (contra a parede para iniciantes).",
  },

  // 21-30
  {
    name: "Desenvolvimento com barra frontal",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: "Barra à frente do corpo com pegada mais aberta.",
  },
  {
    name: "Elevação lateral isométrica",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions: "Segure os halteres a 90° por 30-60 segundos.",
  },
  {
    name: "Remada alta com halteres",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Cotovelos altos durante todo o movimento.",
  },
  {
    name: "Desenvolvimento Arnold sentado",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Versão com maior estabilidade para focar nos ombros.",
  },
  {
    name: "Elevação lateral com cabo cruzado",
    type: "strength",
    muscle: "shoulders",
    equipment: "cable",
    difficulty: "advanced",
    instructions: "Polia baixa, cruze o cabo à frente do corpo.",
  },
  {
    name: "Shrug com halteres",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions: "Maior amplitude de movimento comparado à barra.",
  },
  {
    name: "Desenvolvimento militar máquina",
    type: "strength",
    muscle: "shoulders",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Trajetória guiada para segurança.",
  },
  {
    name: "Elevação frontal com barra",
    type: "strength",
    muscle: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: "Barra à frente do corpo com pegada pronada.",
  },
  {
    name: "Rotação interna com cabo",
    type: "strength",
    muscle: "shoulders",
    equipment: "cable",
    difficulty: "beginner",
    instructions: "Fortalecimento do manguito rotador.",
  },
  {
    name: "Desenvolvimento com bandas elásticas",
    type: "strength",
    muscle: "shoulders",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Resistência variável para treino funcional.",
  },
] as const;

const BICEPS_EXERCISES = [
  // 1-10
  {
    name: "Rosca direta com barra",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Em pé, pés na largura dos ombros. Flexione os cotovelos levando a barra aos ombros.",
  },
  {
    name: "Rosca alternada com halteres",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Alternar os braços, girando os punhos durante a subida (supinação).",
  },
  {
    name: "Rosca martelo",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Mantenha as palmas viradas uma para a outra durante todo o movimento.",
  },
  {
    name: "Rosca concentrada",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Cotovelo apoiado na parte interna da coxa, isolando o bíceps.",
  },
  {
    name: "Rosca Scott",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: "Braços apoiados no banco Scott, evitando balanço do corpo.",
  },
  {
    name: "Rosca inversa com barra",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Pegada pronada para enfatizar o braquial e antebraços.",
  },
  {
    name: "Rosca na polia baixa",
    type: "strength",
    muscle: "biceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Mantenha tensão constante durante todo o movimento.",
  },
  {
    name: "Rosca spider",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Deitado de bruços no banco inclinado, isolando o pico do bíceps.",
  },
  {
    name: "Rosca com corda",
    type: "strength",
    muscle: "biceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Separe as pontas da corda no topo do movimento para maior contração.",
  },
  {
    name: "Rosca isométrica",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions: "Segure o halter a 90° por 30-60 segundos.",
  },

  // 11-20
  {
    name: "Rosca Zottman",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Suba com supinação e desça com pronação para trabalhar todo o braço.",
  },
  {
    name: "Rosca bancada inclinada",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Banco a 45°, braços estendidos atrás do corpo para maior amplitude.",
  },
  {
    name: "Rosca punho reverso",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Pegada fechada e pronada para ênfase no braquiorradial.",
  },
  {
    name: "Rosca simultânea com halteres",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions: "Ambos os braços simultaneamente com controle total.",
  },
  {
    name: "Rosca no banco Scott com halteres",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Versão unilateral para corrigir desequilíbrios.",
  },
  {
    name: "Rosca 21",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "7 repetições parciais inferiores + 7 superiores + 7 completas.",
  },
  {
    name: "Rosca com elástico",
    type: "strength",
    muscle: "biceps",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Resistência variável para treino em casa ou aquecimento.",
  },
  {
    name: "Rosca inclinada alternada",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Banco levemente inclinado para alongar o bíceps na fase negativa.",
  },
  {
    name: "Rosca concentrada martelo",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Combinação da rosca concentrada com pegada neutra.",
  },
  {
    name: "Rosca na máquina",
    type: "strength",
    muscle: "biceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Trajetória fixa para iniciantes ou final de treino com falha.",
  },

  // 21-30
  {
    name: "Rosca crossover",
    type: "strength",
    muscle: "biceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Polia baixa, cruze o cabo à frente do corpo para pico de contração.",
  },
  {
    name: "Rosca isométrica na barra fixa",
    type: "strength",
    muscle: "biceps",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Segure-se na barra com os cotovelos a 90° por tempo máximo.",
  },
  {
    name: "Rosca reversa na polia",
    type: "strength",
    muscle: "biceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Pegada pronada na barra reta para ênfase no antebraço.",
  },
  {
    name: "Rosca com toalha",
    type: "strength",
    muscle: "biceps",
    equipment: "towel",
    difficulty: "beginner",
    instructions:
      "Use uma toalha presa em um ponto fixo para treino funcional.",
  },
  {
    name: "Rosca banco 90°",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Apoie as costas na parede em posição de cadeira para isolar o bíceps.",
  },
  {
    name: "Rosca punho aberto",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Segure o halter apenas com os dedos para maior ativação neural.",
  },
  {
    name: "Rosca alternada martelo",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Alternar os braços mantendo pegada neutra durante todo o movimento.",
  },
  {
    name: "Rosca isométrica na porta",
    type: "strength",
    muscle: "biceps",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Segure o batente da porta com os cotovelos flexionados por tempo.",
  },
  {
    name: "Rosca com kettlebell",
    type: "strength",
    muscle: "biceps",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions: "Pegada especial para desafiar a estabilização do punho.",
  },
  {
    name: "Rosca bíceps unilateral na polia",
    type: "strength",
    muscle: "biceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Trabalhe um braço de cada vez com tensão constante.",
  },
] as const;

const TRICEPS_EXERCISES = [
  // 1-10
  {
    name: "Tríceps testa com barra",
    type: "strength",
    muscle: "triceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Deitado no banco, desça a barra até a testa e estenda os braços verticalmente.",
  },
  {
    name: "Tríceps corda na polia alta",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Separe as pontas da corda no final do movimento para ênfase na contração.",
  },
  {
    name: "Mergulho entre bancos",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Apoie as mãos em um banco atrás do corpo, desça até os cotovelos formarem 90°.",
  },
  {
    name: "Tríceps francês",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Deitado, desça o halter atrás da cabeça mantendo os cotovelos fixos.",
  },
  {
    name: "Kickback com halteres",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Inclinado à frente, estenda o braço para trás mantendo o cotovelo alto.",
  },
  {
    name: "Tríceps pulley",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Barra reta na polia alta, empurre para baixo mantendo os cotovelos colados.",
  },
  {
    name: "Flexão diamante",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Mãos próximas formando um diamante, foco total no tríceps.",
  },
  {
    name: "Tríceps banco",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "De costas para um banco, apoie as mãos e desça o corpo flexionando os cotovelos.",
  },
  {
    name: "Tríceps unilateral na polia",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Uma mão de cada vez com alça individual para corrigir desequilíbrios.",
  },
  {
    name: "Extensão de tríceps com elástico",
    type: "strength",
    muscle: "triceps",
    equipment: "band",
    difficulty: "beginner",
    instructions:
      "Elástico fixo acima da cabeça, estenda os braços para baixo.",
  },

  // 11-20
  {
    name: "Tríceps testa com halteres",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Versão com maior amplitude e controle muscular.",
  },
  {
    name: "Mergulho na paralela",
    type: "strength",
    muscle: "triceps",
    equipment: "parallel bars",
    difficulty: "advanced",
    instructions:
      "Corpo vertical, desça até os ombros ficarem na altura dos cotovelos.",
  },
  {
    name: "Tríceps invertido na polia",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "advanced",
    instructions:
      "De costas para a polia, empurre a corda para frente com pegada neutra.",
  },
  {
    name: "Extensão de tríceps sentado",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Halter atrás da cabeça, cotovelos apontando para frente.",
  },
  {
    name: "Tríceps coice na máquina",
    type: "strength",
    muscle: "triceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Apoio peitoral para isolar completamente o tríceps.",
  },
  {
    name: "Flexão fechada",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Mãos próximas sob o peito, cotovelos colados ao corpo.",
  },
  {
    name: "Extensão de tríceps declinada",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions: "Banco declinado para maior alongamento muscular.",
  },
  {
    name: "Tríceps corda unilateral",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: "Uma mão de cada vez com pegada em rotação externa.",
  },
  {
    name: "Mergulho com peso",
    type: "strength",
    muscle: "triceps",
    equipment: "weighted",
    difficulty: "advanced",
    instructions:
      "Cinto de pesos ou halter entre os pés para resistência adicional.",
  },
  {
    name: "Extensão de tríceps com kettlebell",
    type: "strength",
    muscle: "triceps",
    equipment: "kettlebell",
    difficulty: "intermediate",
    instructions: "Segure o kettlebell pelas alças durante o movimento.",
  },

  // 21-30
  {
    name: "Tríceps testa pegada invertida",
    type: "strength",
    muscle: "triceps",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: "Pegada supinada para ênfase na cabeça longa do tríceps.",
  },
  {
    name: "Extensão de tríceps com banda",
    type: "strength",
    muscle: "triceps",
    equipment: "band",
    difficulty: "beginner",
    instructions: "Banda presa em ponto fixo acima da cabeça.",
  },
  {
    name: "Tríceps banco com elevação de pernas",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Pernas elevadas em banco para maior intensidade.",
  },
  {
    name: "Tríceps francês em pé",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Versão que exige maior estabilização do core.",
  },
  {
    name: "Flexão de tríceps inclinada",
    type: "strength",
    muscle: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Pés elevados em banco para maior carga no tríceps.",
  },
  {
    name: "Extensão de tríceps com barra W",
    type: "strength",
    muscle: "triceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: "Barra especial com pegada neutra para conforto articular.",
  },
  {
    name: "Tríceps testa unilateral",
    type: "strength",
    muscle: "triceps",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions: "Trabalhe um braço de cada vez para focar na simetria.",
  },
  {
    name: "Mergulho na máquina",
    type: "strength",
    muscle: "triceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Versão assistida para quem não consegue o peso corporal.",
  },
  {
    name: "Extensão de tríceps com toalha",
    type: "strength",
    muscle: "triceps",
    equipment: "towel",
    difficulty: "beginner",
    instructions: "Use uma toalha presa em porta para resistência isométrica.",
  },
  {
    name: "Tríceps corda com rotação",
    type: "strength",
    muscle: "triceps",
    equipment: "cable",
    difficulty: "advanced",
    instructions: "Gire as mãos no final do movimento para contração máxima.",
  },
] as const;

const ABDOMINAL_EXERCISES = [
  // 1-10
  {
    name: "Crunch tradicional",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado de costas, flexione o tronco elevando apenas as escápulas do chão.",
  },
  {
    name: "Prancha frontal",
    type: "isometric",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Apoie-se nos antebraços e pontas dos pés, mantendo o corpo alinhado.",
  },
  {
    name: "Elevação de pernas suspenso",
    type: "strength",
    muscle: "abs",
    equipment: "pull-up bar",
    difficulty: "advanced",
    instructions:
      "Suspenso na barra, eleve os joelhos até o peito mantendo o controle.",
  },
  {
    name: "Russian twist",
    type: "strength",
    muscle: "obliques",
    equipment: "medicine ball",
    difficulty: "intermediate",
    instructions:
      "Sentado com torso inclinado, gire o tronco de um lado para o outro.",
  },
  {
    name: "Abdominal supra",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Mãos atrás da cabeça, eleve o tronco contraindo o abdômen.",
  },
  {
    name: "Prancha lateral",
    type: "isometric",
    muscle: "obliques",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Apoie-se em um antebraço e na lateral do pé, mantendo o corpo reto.",
  },
  {
    name: "Bicicleta no solo",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Alterne cotovelo e joelho opostos em movimento de pedalada.",
  },
  {
    name: "Abdominal infra",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado, eleve as pernas estendidas a 90° e desça com controle.",
  },
  {
    name: "Mountain climber",
    type: "plyometric",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Posição de prancha, alterne joelhos em direção ao peito rapidamente.",
  },
  {
    name: "Toe touch",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado, eleve tronco e pernas estendidas tentando tocar os pés.",
  },

  // 11-20
  {
    name: "Prancha com elevação de braço",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Em prancha, alterne a elevação dos braços à frente.",
  },
  {
    name: "Abdominal canivete",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Deitado, eleve simultaneamente tronco e pernas formando um 'V'.",
  },
  {
    name: "Rotação com cabo",
    type: "strength",
    muscle: "obliques",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Puxe o cabo com rotação do tronco, mantendo os quadris fixos.",
  },
  {
    name: "Prancha reversa",
    type: "isometric",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Apoiado nos calcanhares e mãos, mantenha o corpo reto e elevado.",
  },
  {
    name: "Abdominal na bola suíça",
    type: "strength",
    muscle: "abs",
    equipment: "swiss ball",
    difficulty: "intermediate",
    instructions:
      "Pés no chão, role a bola para trás enquanto flexiona o tronco.",
  },
  {
    name: "Flutter kicks",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Deitado, pernas estendidas a 30cm do chão, alterne pequenos chutes.",
  },
  {
    name: "Hanging knee raise twist",
    type: "strength",
    muscle: "obliques",
    equipment: "pull-up bar",
    difficulty: "advanced",
    instructions:
      "Suspenso, eleve joelhos com rotação para trabalhar oblíquos.",
  },
  {
    name: "Dead bug",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Deitado, estenda braço e perna opostos mantendo a lombar no chão.",
  },
  {
    name: "Abdominal com peso",
    type: "strength",
    muscle: "abs",
    equipment: "weight plate",
    difficulty: "intermediate",
    instructions:
      "Segure um peso no peito durante o crunch para resistência extra.",
  },
  {
    name: "Prancha dinâmica",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Alterne entre prancha baixa e alta mantendo o alinhamento.",
  },

  // 21-30
  {
    name: "V-up",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Deitado, eleve tronco e pernas simultaneamente formando um 'V'.",
  },
  {
    name: "Prancha com toque no ombro",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Em prancha alta, alterne toques nos ombros com as mãos.",
  },
  {
    name: "Abdominal declinado",
    type: "strength",
    muscle: "abs",
    equipment: "decline bench",
    difficulty: "intermediate",
    instructions: "Banco declinado, execute o crunch com maior amplitude.",
  },
  {
    name: "Dragon flag",
    type: "strength",
    muscle: "abs",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions: "Deitado, eleve o corpo mantendo apenas os ombros no chão.",
  },
  {
    name: "Prancha com elevação de perna",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: "Em prancha, alterne a elevação das pernas estendidas.",
  },
  {
    name: "Abdominal oblíquo com halter",
    type: "strength",
    muscle: "obliques",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Deitado de lado, eleve o tronco com halter próximo ao quadril.",
  },
  {
    name: "Bear crawl",
    type: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Ande para frente em posição de quadrúpede mantendo o abdômen contraído.",
  },
  {
    name: "Abdominal na máquina",
    type: "strength",
    muscle: "abs",
    equipment: "machine",
    difficulty: "beginner",
    instructions: "Trajetória guiada para iniciantes ou carga pesada.",
  },
  {
    name: "Prancha com rotação",
    type: "strength",
    muscle: "obliques",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Em prancha lateral, gire o torso levando o braço para o teto.",
  },
  {
    name: "Hollow hold",
    type: "isometric",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Deitado, pernas e braços elevados, mantenha a posição de 'barco'.",
  },
] as const;

const ALL_EXERCISES = [
  ...CHEST_EXERCISES,
  ...BACK_EXERCISES,
  ...LEG_EXERCISES,
  ...SHOULDER_EXERCISES,
  ...BICEPS_EXERCISES,
  ...TRICEPS_EXERCISES,
  ...ABDOMINAL_EXERCISES,
];

const EXERCISE_TYPES = [
  "Força",
  "Cardio",
  "Flexibilidade",
  "Equilíbrio",
  "Pliometria",
  "Levantamento de Peso Olímpico",
  "Funcional",
  "Calistenia",
  "Mobilidade",
] as const;

const EXERCISE_MUSCLES = [
  "Abdominais",
  "Bíceps",
  "Panturrilhas",
  "Peitoral",
  "Antebraços",
  "Glúteos",
  "Posteriores de Coxa",
  "Dorsais",
  "Lombar",
  "Costas Médias",
  "Pescoço",
  "Quadríceps",
  "Ombros",
  "Trapézios",
  "Tríceps",
  "Corpo Inteiro",
  "Core",
] as const;

const EXERCISE_EQUIPMENT = [
  "Barra",
  "Halter",
  "Máquina",
  "Cabo",
  "Kettlebell",
  "Peso Corporal",
  "Elásticos",
  "Medicine Ball",
  "Bola Suíça",
  "Barra W",
  "TRX",
  "Outros",
] as const;

const EXERCISE_DIFFICULTY_LEVELS = [
  "Iniciante",
  "Intermediário",
  "Avançado",
  "Expert",
] as const;

type ExerciseType = typeof EXERCISE_TYPES;
type ExerciseMuscle = typeof EXERCISE_MUSCLES;
type ExerciseEquipment = typeof EXERCISE_EQUIPMENT;
type ExerciseDifficulty = typeof EXERCISE_DIFFICULTY_LEVELS;

export {
  CHEST_EXERCISES,
  LEG_EXERCISES,
  SHOULDER_EXERCISES,
  BICEPS_EXERCISES,
  TRICEPS_EXERCISES,
  ABDOMINAL_EXERCISES,
  ALL_EXERCISES,
  EXERCISE_TYPES,
  EXERCISE_MUSCLES,
  EXERCISE_EQUIPMENT,
  EXERCISE_DIFFICULTY_LEVELS,
};

export type {
  ExerciseType,
  ExerciseMuscle,
  ExerciseEquipment,
  ExerciseDifficulty,
};
