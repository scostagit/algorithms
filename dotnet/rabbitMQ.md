## 1️⃣ RabbitMQ



Imagine um **Correio** 📦:



* Alguém **envia uma carta** (mensagem)

* O Correio **organiza**

* Outra pessoa **recebe a carta**



No RabbitMQ:



* Quem envia = **Producer**

* Quem recebe = **Consumer**

* O correio = **RabbitMQ**

* A carta = **Mensagem**



Ele serve para **sistemas conversarem entre si sem ficarem acoplados**.



---



## 2️⃣ O que é AMQP?



**AMQP (Advanced Message Queuing Protocol)** é o **idioma/regras** que o RabbitMQ usa.



👉 Ele define:



* Como a mensagem é enviada

* Para onde ela vai

* Quem pode recebê-la

* O formato do caminho



📌 Pense assim:



> AMQP é como as **regras dos Correios**

> RabbitMQ é a **empresa que segue essas regras**



---



## 3️⃣ Conceito de Fila (Queue)



Uma **fila** é literalmente uma fila de espera 🧍🧍🧍



* Mensagens entram no final

* Saem pela frente

* Normalmente **FIFO** (First In, First Out)



📦 Exemplo:



* Pedido 1

* Pedido 2

* Pedido 3



👉 O consumidor pega **um por vez**



---



## 4️⃣ Exchange (muito importante)



No RabbitMQ, **mensagens nunca vão direto para a fila**.



Elas passam antes por um **Exchange**.



📬 Analogia:



> Exchange é o **funcionário dos Correios** que decide para qual caixa a carta vai.



O **tipo de exchange** define **como essa decisão é feita**.



---



## 5️⃣ Tipos de Exchange (os principais)



### 🔹 1. Fanout



**Fanout = espalhar para todos**



* Ignora regras

* Ignora routing key

* Envia a mensagem para **todas as filas conectadas**



📣 Analogia:



> Um alto-falante anunciando algo para todo mundo



📌 Uso comum:



* Notificações

* Broadcast

* Eventos gerais



---



### 🔹 2. Direct



**Direct = entrega exata**



* A mensagem tem uma **routing key**

* A fila só recebe se a chave for **exatamente igual**



📦 Exemplo:



* Routing key: `pedido.criado`

* Fila aceita: `pedido.criado` ✅

* Fila aceita: `pedido.*` ❌



📌 Uso comum:



* Processos específicos

* Um tipo de mensagem → uma fila



---



### 🔹 3. Topic (o mais usado)



**Topic = padrões com curinga**



Aqui entra o que você citou: **topic, routing key**



📌 A routing key é como um **endereço com categorias**



Exemplo de routing key:



```

pedido.pagamento.aprovado

```



A fila pode escutar:



* `pedido.*.aprovado`

* `pedido.#`

* `pedido.pagamento.*`



#### Curingas:



* `*` → exatamente **uma palavra**

* `#` → **zero ou mais palavras**



📬 Analogia:



> Como filtros de e-mail por assunto



📌 Uso comum:



* Sistemas grandes

* Eventos

* Microsserviços



---



### 🔹 4. Headers (menos comum)



* Não usa routing key

* Usa **headers** (tipo metadados)

* Mais flexível, mas mais pesado



📌 Uso:



* Casos muito específicos



---



## 6️⃣ Routing Key (bem simples)



A **routing key** é só uma **string** que diz:



> “Essa mensagem é sobre o quê?”



📌 Exemplo:



```

log.error.api

```



Ela é usada pelo exchange para decidir **quem recebe**.



---



## 7️⃣ Ciclo de vida de uma mensagem



Vamos passo a passo:



### 🔁 1. Producer cria a mensagem



* Texto, JSON, evento, comando



### 📤 2. Producer envia para um Exchange



* Informa:



&nbsp; * Exchange

&nbsp; * Routing key

&nbsp; * Conteúdo



### 📬 3. Exchange analisa



* Olha o tipo (fanout, topic, etc)

* Decide quais filas recebem



### 📥 4. Mensagem entra na fila



* Fica armazenada

* Espera alguém consumir



### 👷 5. Consumer pega a mensagem



* Processa

* Diz “ok” (ACK)



### 🗑️ 6. Mensagem é removida



* Se ACK → some da fila

* Se erro → pode voltar ou ir para DLQ



---



## 8️⃣ ACK, NACK e DLQ (bem resumido)



* **ACK** ✅ → mensagem processada

* **NACK** ❌ → erro

* **Requeue** 🔄 → volta para fila

* **DLQ (Dead Letter Queue)** ☠️

&nbsp; → mensagens que falharam muitas vezes



📌 Analogia:



> Cartas que ninguém consegue entregar vão para um setor especial



---



## 9️⃣ Tipos de mensagens (conceito)



RabbitMQ não impõe tipo, mas na prática:



* **Evento** → algo aconteceu

* **Comando** → faça algo

* **Mensagem de log**

* **Notificação**



Normalmente em:



* JSON

* Texto

* Binário



---



## 🔟 Resumo ultra-simples



* **AMQP** = regras

* **RabbitMQ** = sistema

* **Producer** = envia

* **Exchange** = decide para onde vai

* **Routing key** = assunto

* **Fila** = espera

* **Consumer** = processa

* **Fanout** = todos recebem

* **Direct** = correspondência exata

* **Topic** = padrões com curinga





\# RabbitMQ X Kafka



## 1️⃣ Ideia central (bem simples)



### 🐇 RabbitMQ



👉 **Entrega de mensagens**



Pense em:



> “Alguém precisa fazer isso agora”



* Focado em **processar tarefas**

* Mensagem vai, alguém consome, acabou

* Muito usado para **orquestração de sistemas**



---



### 🐘 Kafka



👉 **Registro de eventos (histórico)**



Pense em:



> “Algo aconteceu e queremos guardar isso”



* Focado em **eventos**

* Mensagens ficam guardadas

* Vários consumidores podem ler **quando quiserem**



---



## 2️⃣ Analogia simples



### RabbitMQ = Correios



* Você manda uma carta

* Uma pessoa recebe

* Pronto



### Kafka = Diário / Log



* Você escreve no diário

* Qualquer pessoa pode ler

* Hoje, amanhã, de novo



---



## 3️⃣ Diferença MAIS importante



### ❗ RabbitMQ



* A mensagem **some** depois de consumida (ACK)

* Ideal para **trabalho imediato**



### ❗ Kafka



* A mensagem **não some**

* Fica armazenada por dias, meses

* Ideal para **histórico e replay**



---



## 4️⃣ Quadro comparativo



| Conceito            | RabbitMQ           | Kafka                  |

| ------------------- | ------------------ | ---------------------- |

| Modelo              | Fila / Mensageria  | Log distribuído        |

| Mensagem            | Transitória        | Persistente            |

| Consumo             | Uma vez            | Releitura possível     |

| Vários consumidores | Sim (fanout)       | Sim (consumer groups)  |

| Ordem               | Garantida por fila | Garantida por partição |

| Performance         | Boa                | **Altíssima**          |

| Latência            | Muito baixa        | Baixa                  |

| Escalabilidade      | Média              | **Muito alta**         |

| Reprocessamento     | Difícil            | **Nativo**             |

| Complexidade        | Mais simples       | Mais complexo          |

| Casos comuns        | Tarefas, comandos  | Eventos, streaming     |



---



## 5️⃣ Quando usar RabbitMQ



Use RabbitMQ quando:



✅ Você precisa que **alguém faça algo**



* Enviar e-mail

* Processar pagamento

* Gerar PDF

* Executar job



✅ Você quer:



* ACK / NACK

* Retry

* DLQ

* Garantia de entrega



📌 Exemplo:



> “Quando um pedido for criado, **envie um e-mail**”



---



## 6️⃣ Quando usar Kafka



Use Kafka quando:



✅ Você quer **guardar eventos**



* Auditoria

* Logs

* Analytics

* Data Lake



✅ Você precisa:



* Reprocessar dados

* Ter vários sistemas lendo o mesmo evento

* Alto volume (milhões por segundo)



📌 Exemplo:



> “Um pedido foi criado”

> (vários sistemas vão reagir, cada um no seu tempo)



---



## 7️⃣ Exemplo prático (e-commerce)



### 🐇 RabbitMQ



```

Pedido criado → fila → serviço de e-mail

```



➡️ E-mail enviado → mensagem descartada



---



### 🐘 Kafka



```

Pedido criado → tópico → histórico

```



* Sistema de e-mail lê

* Sistema de BI lê

* Sistema de fraude lê

* Amanhã outro sistema lê de novo



---



## 8️⃣ Erros comuns



❌ Usar Kafka como fila de tarefa

❌ Usar RabbitMQ como histórico de eventos

❌ Achar que um substitui o outro (não substitui!)



👉 Em sistemas grandes, **eles convivem**.



---



## 9️⃣ Regra de ouro (bem simples)



> 🧠 **Pergunta-chave:**

>

> 🔹 “Preciso que alguém faça algo agora?”

> → RabbitMQ

>

> 🔹 “Preciso guardar o que aconteceu?”

> → Kafka





\# Diagrama visual 







## 🐇 RabbitMQ — Diagrama de Fila (mensagem “some”)



```

┌──────────┐

│ Producer │

└────┬─────┘

&nbsp;    │  mensagem

&nbsp;    ▼

┌──────────┐

│ Exchange │  ← decide para qual fila vai

└────┬─────┘

&nbsp;    │ routing key

&nbsp;    ▼

┌──────────┐

│  Queue   │  ← fila de espera

└────┬─────┘

&nbsp;    │

&nbsp;    ▼

┌──────────┐

│ Consumer │

└──────────┘

&nbsp;    │

&nbsp;    ▼

&nbsp;  \[ ACK ]

&nbsp;    │

&nbsp;    ▼

(mensagem removida da fila)

```



### O que está acontecendo aqui:



* A mensagem é **entregue uma vez**

* Um consumidor processa

* Dá **ACK**

* A mensagem **desaparece**



📌 Ideal para:



* Jobs

* Comandos

* Processos imediatos



---



## 🐘 Kafka — Diagrama de Log de Eventos (mensagem fica)



```

┌──────────┐

│ Producer │

└────┬─────┘

&nbsp;    │ evento

&nbsp;    ▼

┌───────────────────────────┐

│         Kafka Topic       │

│ ┌────────┬────────┬────┐ │

│ │ Part 0 │ Part 1 │ P2 │ │

│ └────────┴────────┴────┘ │

└───────────┬──────────────┘

&nbsp;           │

&nbsp;  ┌────────┼─────────┐

&nbsp;  ▼        ▼         ▼

┌──────┐ ┌──────┐ ┌──────┐

│Cons A│ │Cons B│ │Cons C│

└──────┘ └──────┘ └──────┘

```



### O que está acontecendo aqui:



* O evento é **gravado**

* Fica armazenado

* Vários consumidores podem ler

* Cada consumidor lê **no seu ritmo**

* Pode reler eventos antigos



📌 Ideal para:



* Eventos

* Auditoria

* Analytics

* Streaming



---



## 🔁 Comparação lado a lado (visual)



```

RabbitMQ                    Kafka

─────────                   ─────

Producer                    Producer

&nbsp;  │                           │

&nbsp;  ▼                           ▼

&nbsp;Exchange                   Topic

&nbsp;  │                           │

&nbsp;  ▼                           ▼

&nbsp;Queue                   Log (partições)

&nbsp;  │                           │

&nbsp;  ▼                           ▼

Consumer                  Consumer Group

&nbsp;  │                           │

&nbsp; ACK                     Offset salvo

&nbsp;  │                           │

Mensagem some          Mensagem permanece

```



---



## 🧠 Diferença-chave (em uma frase)



* **RabbitMQ**:



&nbsp; > “Faça isso e esqueça”



* **Kafka**:



&nbsp; > “Isso aconteceu, guarde”



---



## 📌 Regra mental rápida



```

Preciso executar algo? → RabbitMQ

Preciso registrar algo? → Kafka

```





