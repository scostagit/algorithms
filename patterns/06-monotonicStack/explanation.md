
# Monotonic Stack

Absolutely! Let's break down the **Monotonic Stack** pattern using **easy English** and simple examples. You don’t need to be a coding expert to get this — I’ll explain it like you're brand new to this idea.

---

## 🧠 First, What is a Stack?

A **stack** is like a pile of plates:

* You **add** to the top (this is called **push**).
* You **remove** from the top (this is called **pop**).

So it's a **Last In, First Out** (LIFO) structure.

---

## 🧩 Now, What is a *Monotonic* Stack?

"Monotonic" just means **always going in one direction** — either always increasing or always decreasing.

So a **Monotonic Stack** is a stack where:

* The values inside are always going **up** (increasing) OR
* Always going **down** (decreasing)

👉 We use this to **quickly find the next bigger or smaller element** in an array.

---

## 🛠️ Why Use It?

Imagine you have a list of numbers and you want to know:

* "For each number, what is the **next bigger number** to the right?"
* Or: "What is the **next smaller number**?"

Doing this **without** a stack would be slow. With a **Monotonic Stack**, it’s much faster!

---

## 🧪 Example 1: Next Greater Element

Let's say we have this list:

```
[3, 1, 4, 2]
```

We want to know, for each number:

* What’s the **next greater number** to its right?

We'll use a **Monotonic Decreasing Stack** (stack goes down), which helps us find the next bigger number.

---

### 🔁 Step by Step:

We go from **right to left**, keeping the stack with numbers in **decreasing** order (big to small).

Start with an empty stack and go backwards:

1. **Start with 2**

   * Stack: empty → No greater number → Result: `-1`
   * Push 2 onto the stack → Stack: `[2]`

2. **Now look at 4**

   * 4 > 2 → pop 2
   * Stack is empty → No greater number → Result: `-1`
   * Push 4 → Stack: `[4]`

3. **Now look at 1**

   * 1 < 4 → 4 is next greater → Result: `4`
   * Push 1 → Stack: `[4, 1]`

4. **Now look at 3**

   * 3 > 1 → pop 1
   * 3 < 4 → 4 is next greater → Result: `4`
   * Push 3 → Stack: `[4, 3]`

✅ Final result:

```
[4, 4, -1, -1]
```

---

## 🎯 Key Rules:

* **Push** numbers on the stack while keeping the order you want (increasing or decreasing).
* **Pop** when the current number **breaks** that order (e.g., it's bigger than the top).
* After popping, if the stack still has something, that’s your answer!

---

## ⛓ Common Uses:

* Next Greater Element
* Daily Temperatures (next warmer day)
* Stock Span
* Histogram Largest Rectangle

---

## 🧵 In Simple Words:

> A **Monotonic Stack** is like a smart memory helper. As you look at each number, it tells you “Hey! Remember that number you were wondering about? I found what it was looking for!”

---

Absolutely! Let's write a **simple and fully commented JavaScript example** using the **Monotonic Stack** pattern to solve the "**Next Greater Element**" problem.

---

## 🧪 Problem:

Given an array, for each element, find the next greater element to its **right**.
If there is no greater element, return `-1` for that position.

### 🧾 Example Input:

```js
[3, 1, 4, 2]
```

### ✅ Expected Output:

```js
[4, 4, -1, -1]
```

---

## 💻 JavaScript Code with Simple Comments

```javascript
function nextGreaterElement(nums) {
  // Create an array to store the result, filled with -1 initially
  let result = new Array(nums.length).fill(-1);

  // This stack will store indexes of elements in nums
  let stack = [];

  // Loop through the array from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    // Remove elements from the stack that are smaller or equal to nums[i]
    // because they can't be the "next greater" for current element
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }

    // If stack is not empty, then the top element is the next greater
    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }

    // Push the current index onto the stack
    stack.push(i);
  }

  return result;
}

// 👉 Try it with an example
let input = [3, 1, 4, 2];
let output = nextGreaterElement(input);

console.log("Input: ", input);     // [3, 1, 4, 2]
console.log("Output: ", output);   // [4, 4, -1, -1]
```

---

## 🧠 What's Happening in Simple Words:

* We go from **right to left** because we're looking for the **next** greater element.
* We use a **stack to remember candidates** for being "greater".
* If the current number is **smaller than what's on the stack**, the top of the stack is the next greater number.
* If not, we **pop** from the stack until we find a bigger number (or the stack is empty).

---

## 🧺 Stack Values Example Walkthrough (for `[3, 1, 4, 2]`):

| i | nums\[i] | Stack             | Result |
| - | -------- | ----------------- | ------ |
| 3 | 2        | \[] → \[3]        | -1     |
| 2 | 4        | \[3] → \[] → \[2] | -1     |
| 1 | 1        | \[2]              | 4      |
| 0 | 3        | \[2,1] → \[2]     | 4      |

---


# Portuguese

Claro! Vamos explicar esse código passo a passo, **em português e de forma bem simples**, como se você fosse um iniciante total em programação.

---

## 🤔 O que essa função faz?

Dada uma lista de números, ela responde:

> “Para cada número, qual é o **próximo número maior** que aparece à **direita** dele?”

Se não tiver nenhum número maior depois dele, colocamos `-1`.

---

### 🧪 Exemplo:

Se a entrada for:

```js
[3, 1, 4, 2]
```

A resposta será:

```js
[4, 4, -1, -1]
```

#### Por quê?

* Depois do **3**, o próximo número maior é **4**
* Depois do **1**, o próximo número maior também é **4**
* Depois do **4**, não tem nenhum número maior → `-1`
* Depois do **2**, também não tem → `-1`

---

## 🧠 Conceito importante: **Pilha (Stack)**

Uma **pilha** funciona como uma pilha de pratos:

* Você **coloca** um prato no topo (push)
* Você **tira** sempre o prato do topo (pop)

Neste algoritmo, usamos a pilha para **lembrar os candidatos a serem os próximos maiores números**.

---

## 📃 Explicando o código em português simples

```js
function nextGreaterElement(nums) {
```

👉 Criamos uma função que recebe uma lista chamada `nums`.

---

```js
  let result = new Array(nums.length).fill(-1);
```

👉 Criamos uma nova lista do mesmo tamanho da original, preenchida com `-1`, que vai guardar os resultados.

---

```js
  let stack = [];
```

👉 Criamos uma pilha (chamada `stack`) para nos ajudar a lembrar os próximos números.

---

```js
  for (let i = nums.length - 1; i >= 0; i--) {
```

👉 Vamos olhar os números **da direita para a esquerda**.

---

```js
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
```

👉 Enquanto:

* A pilha **não estiver vazia**
* E o número que está no topo da pilha **for menor ou igual** ao número atual...

Então **removemos** esse número da pilha (com `pop()`), pois ele não serve mais como “próximo maior”.

---

```js
    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }
```

👉 Se a pilha **ainda tiver algo** depois de limpar os menores, o número que está no topo da pilha é o **próximo maior** → guardamos ele no `result`.

---

```js
    stack.push(i);
```

👉 Agora, colocamos o **índice do número atual** na pilha, para talvez ele servir como próximo maior para os números anteriores.

---

```js
  return result;
}
```

👉 No final, devolvemos a lista de respostas.

---

## ✅ Teste com exemplo:

```js
let input = [3, 1, 4, 2];
let output = nextGreaterElement(input);
console.log("Input: ", input);     // [3, 1, 4, 2]
console.log("Output: ", output);   // [4, 4, -1, -1]
```

---

## 🔄 Resumo visual do funcionamento:

Para cada número, a função:

1. **Remove da pilha os números menores** do que ele (porque não servem como "próximo maior").
2. Vê se tem **algum número maior** na pilha — se tiver, guarda.
3. **Adiciona o número atual** à pilha (pode ser útil para os próximos).

---

Se quiser, posso te mostrar uma **versão com `console.log()` dentro do `for`** para ver o que está acontecendo a cada passo. Quer?


## Logic CODE 

**Increasing Memory**
```
create an empty stack
for each element in the array:
    while stack is not empty AND top of the stack is greater than the current element:
        pop the stack
    push the current element to stack
```


**Decreasing Memory**
```
create an empty stack
for each element in the array:
    while stack is not empty AND top of the stack is smaller than the current element:
        pop the stack
    push the current element to stack
```


[Good explaination](https://www.designgurus.io/course-play/grokking-the-coding-interview/doc/introduction-to-monotonic-stack?gad_source=2&gad_campaignid=21052024757&gclid=EAIaIQobChMI8LeFucrxjwMVCJKDBx0TSQdYEAEYASAAEgKspfD_BwE)