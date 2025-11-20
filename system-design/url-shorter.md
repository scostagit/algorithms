Em uma **System Design Interview**, um **encurtador de URL** (URL shortener) é um sistema parecido com serviços como *bit.ly* ou *tinyurl*, usado como exemplo clássico para avaliar sua capacidade de projetar sistemas distribuídos.

## 💡 O que é um encurtador de URL?

É um serviço que:

1. Recebe uma URL longa
   → `https://meusite.com/algum/endpoint/muito/grande/12345`
2. Gera uma URL curta única
   → `https://sho.rt/abc123`
3. Redireciona quem acessa a URL curta para o destino original.

## ⭐ Por que aparece tanto em system design?

Porque envolve vários conceitos importantes avaliados em entrevistas de arquitetura:

### 1. **Geração de IDs únicos**

Como gerar o “código curto” da URL?

* Hashing (MD5, SHA-1 → base62)
* Geração incremental distribuída
* UUIDs + encoding
* Prevenção de colisões

### 2. **Escalabilidade**

O sistema pode ter:

* **Altíssimo volume de leitura** (bilhões de redirecionamentos)
* **Volume moderado de escrita** (criação de URLs)

Tem que lidar com cache, load balancers, particionamento etc.

### 3. **Banco de dados**

Escolher entre:

* SQL vs NoSQL
* Sharding por ID curto
* Replicação
* Armazenamento chave-valor

### 4. **Caching**

Uso de CDN, Redis, etc. para acelerar redirecionamentos.

### 5. **Redirecionamento eficiente**

Resolver rápido:

```
short_code → long_url
```

### 6. **Alta disponibilidade e tolerância a falhas**

O sistema não pode ficar fora do ar.

### 7. **Recursos extra (opcional)**

* Expiração de links
* Estatísticas de cliques
* Prevenção de abuso/links maliciosos
* Rate limiting

---

## 🎯 Exemplo de como você descreve em uma interview:

> "Um encurtador de URLs é essencialmente um serviço **read-heavy** baseado em **key-value storage**, onde o short code é a chave e a URL original o valor. Ele precisa ser altamente escalável no volume de leituras, ter baixa latência de redirecionamento, fornecer geração de IDs únicos, e ser resiliente. Usaria cache para otimizar redirecionamentos e particionaria o banco por prefixo do código curto."





A seguir está um **design completo e detalhado** de um **sistema de encurtamento de URLs (URL Shortener)** no estilo de **system design interview**, incluindo:

* Visão geral
* Requisitos funcionais e não funcionais
* Estimativa de capacidade (capacity planning)
* Modelagem de dados
* Definição das APIs (com verbos HTTP)
* Componentes da arquitetura
* Fluxos principais
* Trade-offs

---

# ✅ 1. Visão Geral do Sistema

O sistema converte uma URL longa em uma URL curta única e, ao acessar a curta, redireciona o usuário para a original.

```
Long URL  →  [Shortener Service] → Short URL
Short URL →  [Redirect Service]  → Long URL
```

---

# ✅ 2. Requisitos

## **2.1 Funcionais**

* Criar URLs curtas baseadas em uma URL longa.
* Redirecionar URLs curtas rapidamente.
* Permitir expiração opcional.
* Suportar estatísticas (cliques, origem, país) — opcional.

## **2.2 Não Funcionais**

* **Alta disponibilidade**.
* **Baixa latência** de redirecionamento (< 10 ms no servidor).
* **Escalabilidade horizontal** (bilhões de redirecionamentos/dia).
* **Consistência eventual** é aceitável.
* **Tolerante a falhas**.

---

# ✅ 3. Capacity Planning (Plano de capacidade)

Vamos assumir uma carga realista de algo parecido com bit.ly.

### **Suposições**

* Criação de URLs: **100 milhões por mês**
  ≈ 40 req/s (write)
* Redirecionamentos: **2 bilhões por dia**
  ≈ 23k req/s (read peak ≈ 30k req/s)
* Tamanho médio:

  * URL longa: **500 bytes**
  * URL curta: **~10 bytes**
* Retenção: **5 anos**

### **Cálculo de armazenamento**

URLs curtas criadas em 5 anos:

```
100M / mês × 12 × 5 = 6 bilhões de URLs
```

### **Espaço ocupado**

```
6B × 500 bytes ≈ 3 TB
```

Armazenamento replicado (x3):

```
9 TB total
```

### **Tráfego**

* Writes: leve
* Reads: pesados (99% do tráfego)

### **Conclusão**

* Banco chave-valor distribuído (Cassandra, DynamoDB, Bigtable).
* Cache agressivo (Redis, Memcached, CDNs).

---

# ✅ 4. Geração de IDs (Short Codes)

### Opções

1. **Hash da URL (SHA-1 → Base62)**

   * Simples
   * Possível colisão → precisa de verificação.

2. **ID incremental global + Base62**

   * Ex:  `1 → "b"`, `125 → "cb"`
   * Precisa de gerador distribuído.

3. **Snowflake IDs** (Twitter)

   * Alta disponibilidade
   * Escalável
   * Sem colisão

👉 **Recomendado em entrevista:**
**Snowflake ID + Base62** → curto, único, escalável.

---

# ✅ 5. Modelagem do Banco (Data Modeling)

Como é um sistema read-heavy, usamos **Key-Value Store distribuída**.

## **Tabela principal: url_map**

| Partition Key | Column     | Tipo     | Descrição        |
| ------------- | ---------- | -------- | ---------------- |
| short_code    | long_url   | string   | URL original     |
|               | created_at | datetime | Data criação     |
|               | expires_at | datetime | Opcional         |
|               | user_id    | string   | Se houver contas |

**Chave primária**: `short_code`

### Alternativa (SQL)

Se for SQL:

```sql
CREATE TABLE url_map (
  short_code VARCHAR PRIMARY KEY,
  long_url TEXT NOT NULL,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  user_id VARCHAR
);
```

---

# ✅ 6. APIs (HTTP + JSON)

## **1. Criar URL curta**

### **POST /api/v1/shorten**

**Body**

```json
{
  "long_url": "https://exemplo.com/abc",
  "expires_at": "2026-01-01T00:00:00Z"
}
```

**Response**

```json
{
  "short_url": "https://sho.rt/abc123"
}
```

---

## **2. Obter detalhes de uma URL curta**

### **GET /api/v1/url/{short_code}**

**Response**

```json
{
  "short_code": "abc123",
  "long_url": "https://exemplo.com/abc",
  "created_at": "2025-01-01T10:00:00Z"
}
```

---

## **3. Redirecionamento**

### **GET /{short_code}**

* Sem JSON
* Retorna **HTTP 302 Found** ou **301 Moved Permanently**
* Header:

```
Location: https://exemplo.com/abc
```

🔎 *Isso passa pelo CDN + Cache.*

---

# ✅ 7. Componentes da Arquitetura

```
                    ┌────────────┐
User ───► CDN/Edge ─► Load Balancer ─► API Servers ─► Cache (Redis)
                    └────────────┘                    │
                                                      ▼
                                              Distributed DB
                                                (Cassandra)
                                                      │
                                                      ▼
                                             Analytics Pipeline
```

### **1. CDN / Edge Network**

* Responde redirecionamentos já cacheados.
* Reduz latência global.

### **2. Load Balancer**

* Distribui tráfego para múltiplas instâncias.

### **3. API Servers**

* Implementam lógica de:

  * geração do código curto
  * validação
  * registro no banco

### **4. Cache (Redis/Memcached)**

* Armazena mapping:

```
short_code → long_url
```

* TTL ~ 24h
* Hits: 90%+

### **5. Banco de Dados Distribuído**

* Cassandra / DynamoDB / Bigtable
* Partition key: short_code

### **6. Componentes Assíncronos**

* Kafka / Pulsar / PubSub para:

  * estatísticas de cliques
  * spam detection

---

# ✅ 8. Fluxos Principais

## **Fluxo de criação**

1. Cliente chama `POST /shorten`
2. API valida a URL
3. Gera o short_code via Snowflake
4. Salva no DB
5. Retorna short_url

---

## **Fluxo de redirecionamento**

1. Navegador acessa: `https://sho.rt/ab12c`
2. CDN verifica cache:

   * Se hit → retorna redirecionamento
3. Se miss → pede ao backend
4. Backend consulta Redis

   * Se hit → devolve e atualiza CDN
5. Se miss → consulta banco distribuído
6. Armazena no cache
7. Retorna `302 Location: long_url`

---

# ✅ 9. Considerações e Trade-offs

### **Consistência x Disponibilidade**

* Preferimos **alta disponibilidade** → eventual consistency.

### **Bottlenecks**

* Leitura: resolvido com **cache + CDN**
* Escrita: pouco relevante (baixo volume)

### **Segurança**

* Detecção de URLs maliciosas → checagem assíncrona
* Rate limiting para evitar abuso
* Auditoria (logs + analytics)

---

# 🎁 Quer que eu gere também:

* Diagrama visual (ASCII ou desenhado)
* Respostas prontas para entrevista
* Alternativas de design (SQL, NoSQL, in-memory)
* Plano de sharding mais profundo

