
# Refit, Polly E Circuite Brank

As bibliotecas **Refit** e **Polly** são muito usadas em projetos **.NET (C#)**, especialmente quando você trabalha com **requisições HTTP para APIs**. Elas servem para **facilitar e tornar mais robusta** a comunicação entre serviços.

Vamos ver o papel de cada uma 👇

---

### 🧩 **Refit**

O **Refit** é uma biblioteca que **simplifica o consumo de APIs REST** em C#.
Ele cria automaticamente a implementação de **interfaces** que descrevem os endpoints HTTP.

#### 💡 Ideia principal:

Você escreve uma **interface** que representa sua API, e o Refit gera o código que faz as requisições HTTP para você.

#### 🧠 Exemplo:

```csharp
using Refit;

public interface IMeuServicoApi
{
    [Get("/usuarios/{id}")]
    Task<Usuario> ObterUsuarioAsync(int id);

    [Post("/usuarios")]
    Task CriarUsuarioAsync([Body] Usuario usuario);
}
```

Depois, em tempo de execução, você cria uma instância:

```csharp
var api = RestService.For<IMeuServicoApi>("https://minhaapi.com");
var usuario = await api.ObterUsuarioAsync(1);
```

✅ **Vantagens:**

* Evita código repetitivo de `HttpClient`.
* Leitura mais limpa e declarativa.
* Integra-se bem com **Polly**, **DI**, e **testes unitários**.

---

### 🛡️ **Polly**

O **Polly** é uma biblioteca de **resiliência e tolerância a falhas**.
Ele te permite definir **políticas** como:

* **Retry** (tentar novamente em caso de falha)
* **Circuit breaker** (abrir o circuito para evitar sobrecarregar o serviço)
* **Timeout**
* **Fallback** (usar resposta alternativa)
* **Bulkhead** (limitar concorrência)

#### 💡 Exemplo:

```csharp
using Polly;
using Polly.Retry;

var politicaDeRetry = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, tentativa => TimeSpan.FromSeconds(tentativa));

await politicaDeRetry.ExecuteAsync(async () =>
{
    // Sua chamada HTTP ou lógica que pode falhar
    await ChamarApiAsync();
});
```

✅ **Vantagens:**

* Melhora a **resiliência** de chamadas externas.
* Evita falhas em cascata em sistemas distribuídos.
* Integra-se facilmente com o **HttpClientFactory**.

---

### ⚙️ **Usando Refit + Polly juntos**

Você pode combinar os dois para criar um cliente de API **resiliente e fácil de usar**:

```csharp
services.AddRefitClient<IMeuServicoApi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://minhaapi.com"))
    .AddPolicyHandler(Policy
        .Handle<HttpRequestException>()
        .WaitAndRetryAsync(3, tentativa => TimeSpan.FromSeconds(tentativa)));
```

Assim, o Refit gera o cliente automaticamente, e o Polly garante que, se algo falhar, ele tenta novamente.

---

### 🧾 Resumo

| Biblioteca | Função Principal                                        | Exemplo de Uso                             |
| ---------- | ------------------------------------------------------- | ------------------------------------------ |
| **Refit**  | Facilita o consumo de APIs REST via interfaces          | `RestService.For<IMeuServicoApi>("url")`   |
| **Polly**  | Fornece políticas de resiliência (retry, timeout, etc.) | `Policy.Handle<Exception>().RetryAsync(3)` |
| **Juntas** | Cliente HTTP resiliente e simples                       | `.AddRefitClient().AddPolicyHandler(...)`  |

---

Se quiser, posso te mostrar um **exemplo completo** com Refit + Polly + HttpClientFactory configurados em um projeto ASP.NET Core. Quer que eu monte esse exemplo?

## Circuit Breaker
 o **Circuit Breaker** é um dos recursos mais interessantes do **Polly** e muito usado em sistemas distribuídos (microserviços, APIs externas etc.).

Vamos entender e depois ver um **exemplo prático** 👇

---

## 🧠 O que é o Circuit Breaker?

Imagine que seu sistema chama uma API externa, mas ela está fora do ar.
Se você continuar tentando insistentemente, vai:

* desperdiçar recursos (threads, conexões);
* piorar o problema (mais carga na API já instável);
* e atrasar respostas para o usuário.

O **Circuit Breaker** resolve isso:
Ele **“abre o circuito”** depois de um certo número de falhas consecutivas.
Enquanto o circuito está aberto, **nenhuma requisição é feita** — ele falha imediatamente.
Depois de um tempo configurado, o circuito **“meia-abre”**, testa uma nova tentativa e, se der certo, **fecha** de novo (voltando ao normal).

---

## ⚙️ Exemplo prático com Polly

```csharp
using Polly;
using Polly.CircuitBreaker;

var politicaCircuitBreaker = Policy
    .Handle<HttpRequestException>()            // Tipo de exceção que ativa o circuito
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 3,    // Abre o circuito após 3 falhas consecutivas
        durationOfBreak: TimeSpan.FromSeconds(10), // Mantém o circuito aberto por 10 segundos
        onBreak: (ex, tempo) =>
        {
            Console.WriteLine($"Circuito aberto por {tempo.TotalSeconds}s devido a: {ex.Message}");
        },
        onReset: () =>
        {
            Console.WriteLine("Circuito fechado novamente. Tudo normal!");
        },
        onHalfOpen: () =>
        {
            Console.WriteLine("Circuito em estado HALF-OPEN. Testando nova tentativa...");
        }
    );

for (int i = 0; i < 10; i++)
{
    try
    {
        await politicaCircuitBreaker.ExecuteAsync(async () =>
        {
            Console.WriteLine($"Tentando requisição #{i + 1}");
            
            // Simula uma falha
            throw new HttpRequestException("Erro ao chamar API externa");
        });
    }
    catch (BrokenCircuitException)
    {
        Console.WriteLine("Circuito está ABERTO — requisição bloqueada imediatamente!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro: {ex.Message}");
    }

    await Task.Delay(1000); // espera 1s entre tentativas
}
```

---

## 🔍 O que acontece nesse código:

1. **Primeiras 3 tentativas:**
   Dão erro → o Polly conta as falhas.

2. **Na 4ª tentativa:**
   O circuito **abre** e **interrompe chamadas por 10 segundos**.
   O código nem tenta chamar a API, lança imediatamente uma `BrokenCircuitException`.

3. **Depois de 10 segundos:**
   O circuito vai para o estado **"half-open"** (meia-aberto) e tenta novamente **uma requisição teste**:

   * Se der certo → o circuito **fecha** (volta ao normal).
   * Se falhar → o circuito **reabre** por mais 10 segundos.

---

## 🧩 Integrando com `HttpClientFactory` (modo real de uso)

Em projetos ASP.NET Core, normalmente você registra isso assim:

```csharp
services.AddHttpClient<IMeuServicoApi, MeuServicoApi>()
    .AddPolicyHandler(Policy
        .Handle<HttpRequestException>()
        .CircuitBreakerAsync(
            exceptionsAllowedBeforeBreaking: 3,
            durationOfBreak: TimeSpan.FromSeconds(15)
        ));
```

Dessa forma, o **HttpClient** do seu serviço automaticamente usa o **Circuit Breaker** —
sem precisar colocar lógica manual em cada chamada.

# Polly Tutorial

Perfect — let’s build a **step-by-step tutorial** for adding **Polly** to a **C# .NET Core Web API** project that already uses **Refit** to call an external API (in this case: [https://api.restful-api.dev](https://api.restful-api.dev)).

We'll cover:

1. What Polly is and why to use it
2. Setting up a .NET Web API with Refit and Polly
3. Implementing retry and circuit breaker policies
4. Testing and validating fault handling

---

## 🧠 1. What Is Polly and Why Use It?

**Polly** is a .NET **resilience and transient-fault-handling** library that lets you handle temporary failures (like network hiccups, timeouts, or API downtime) gracefully using *policies* such as:

* **Retry** – Automatically retry failed requests a set number of times.
* **Circuit Breaker** – Stop sending requests for a cooldown period if too many failures occur.
* **Timeout** – Cancel requests that take too long.
* **Fallback** – Return a default response if an operation fails.
* **Bulkhead Isolation** – Limit concurrent requests to prevent overload.

👉 Why use Polly?

* Improves reliability and user experience.
* Protects your app from transient external API failures.
* Reduces downtime and cascading failures in microservices.

---

## ⚙️ 2. Setup a .NET 8 Web API with Refit and Polly

### Step 1 – Create a Web API Project

```bash
dotnet new webapi -n PollyRefitDemo
cd PollyRefitDemo
```

### Step 2 – Add Required NuGet Packages

```bash
dotnet add package Refit
dotnet add package Microsoft.Extensions.Http.Polly
```

### Step 3 – Define a Refit Interface for the External API

Create a new file: `Services/IRestfulApi.cs`

```csharp
using Refit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PollyRefitDemo.Services
{
    public interface IRestfulApi
    {
        [Get("/objects")]
        Task<List<object>> GetObjectsAsync();

        [Get("/objects/{id}")]
        Task<object> GetObjectByIdAsync(string id);
    }
}
```

The API we’re calling is: [https://api.restful-api.dev/objects](https://api.restful-api.dev/objects)

---

## 🧩 3. Integrate Refit + Polly in the Dependency Injection Container

Edit `Program.cs`:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using PollyRefitDemo.Services;
using Refit;

var builder = WebApplication.CreateBuilder(args);

// Configure a resilience policy using Polly
static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy() =>
    HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => !msg.IsSuccessStatusCode)
        .WaitAndRetryAsync(
            retryCount: 3,
            sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)), // exponential backoff
            onRetry: (outcome, timespan, retryAttempt, context) =>
            {
                Console.WriteLine($"Retrying ({retryAttempt}) after {timespan.TotalSeconds}s due to: {outcome.Result?.StatusCode}");
            });

// Optional: Add a Circuit Breaker policy
static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy() =>
    HttpPolicyExtensions
        .HandleTransientHttpError()
        .CircuitBreakerAsync(
            handledEventsAllowedBeforeBreaking: 3,
            durationOfBreak: TimeSpan.FromSeconds(15)
        );

// Register Refit client with Polly
builder.Services
    .AddRefitClient<IRestfulApi>()
    .ConfigureHttpClient(c =>
    {
        c.BaseAddress = new Uri("https://api.restful-api.dev");
    })
    .AddPolicyHandler(GetRetryPolicy())
    .AddPolicyHandler(GetCircuitBreakerPolicy());

var app = builder.Build();

app.MapGet("/objects", async (IRestfulApi api) =>
{
    return await api.GetObjectsAsync();
});

app.MapGet("/objects/{id}", async (IRestfulApi api, string id) =>
{
    return await api.GetObjectByIdAsync(id);
});

app.Run();
```

---

## 🧪 4. Testing the Polly Behavior

Run the API:

```bash
dotnet run
```

Endpoints:

* `GET https://localhost:5001/objects`
* `GET https://localhost:5001/objects/1`

### To Test Retry Behavior:

1. Temporarily disconnect your internet or block the external API in your firewall.
2. Call your endpoint — you’ll see the console logging retry attempts with exponential backoff.

### To Test Circuit Breaker:

1. Force multiple failed calls (e.g., by using an invalid base URL).
2. After 3 failed attempts, the circuit will open, and subsequent requests will immediately fail for 15 seconds.

---

## ✅ 5. Summary

| Concept             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| **Retry**           | Automatically re-attempt transient failures |
| **Circuit Breaker** | Stop hitting a failing API temporarily      |
| **Timeout**         | Prevent long waits                          |
| **Fallback**        | Return a safe default                       |
| **Bulkhead**        | Isolate failures and limit concurrent calls |

**Polly + Refit** provides a powerful combination for resilient microservices, letting you easily apply best-practice patterns for external API reliability.

---

## Fallback

