

# 🧠 O que é “Overlapping Intervals”?

Imagine que cada *intervalo* é como um **pedaço de tempo** numa linha.
Por exemplo:

* Intervalo 1: **[1, 3]** → começa no 1 e termina no 3
* Intervalo 2: **[2, 4]** → começa no 2 e termina no 4

Agora pense assim:

👉 Esses intervalos *se sobrepõem* (“overlap”) quando um deles **invade** ou **entra** no espaço do outro.

No exemplo acima, o intervalo 1 vai de 1 a 3, e o 2 vai de 2 a 4.
Perceba que entre **2 e 3**, os dois estão “ocupando o mesmo espaço”.
Então eles **overlappam**, ou seja, **se sobrepõem**.

---

# 💡 Quando dois intervalos se sobrepõem?

Do jeito mais fácil possível:

> Dois intervalos se sobrepõem quando o início de um deles é **menor ou igual** ao final do outro **E** o fim dele é **maior ou igual** ao início do outro.

Mas podemos pensar ainda mais simples:

👉 Se um intervalo começa **antes** do outro terminar, então eles se sobrepõem.

---

# ✅ Exemplo super simples em JavaScript

Vamos criar uma função que recebe dois intervalos e diz se eles se sobrepõem ou não.

```js
function temOverlap(intervalo1, intervalo2) {
  const [inicio1, fim1] = intervalo1;
  const [inicio2, fim2] = intervalo2;

  // Checa se um intervalo invade o outro
  if (inicio1 <= fim2 && inicio2 <= fim1) {
    return true;  // Eles se sobrepõem
  }

  return false; // Não se sobrepõem
}

// Testando
console.log(temOverlap([1, 3], [2, 4])); // true (tem overlap)
console.log(temOverlap([1, 2], [3, 4])); // false (não tem overlap)
```

---

# 🟦 Explicando o código como se fosse para um iniciante:

* `[inicio1, fim1]` → pega o começo e o fim do primeiro intervalo
* `[inicio2, fim2]` → pega o começo e o fim do segundo intervalo

A lógica principal é:

```
inicio1 <= fim2  e  inicio2 <= fim1
```

Isso quer dizer:

* O primeiro intervalo começa **antes** do segundo terminar
* E o segundo intervalo começa **antes** do primeiro terminar

Se isso acontecer → **estão se sobrepondo!**

---

# 🎉 Resumo super simples

* Intervalos são como pedaços de tempo.
* Eles se sobrepõem quando algum pedaço deles ocupa a mesma parte.
* A regra em JavaScript é só comparar os inícios e fins.
* É um dos problemas mais básicos do LeetCode.

---

Se quiser, posso te mostrar:

✅ A versão onde você verifica **vários intervalos**
✅ A versão que serve pra **mesclar intervalos** (merge intervals)
✅ A forma como o LeetCode geralmente cobra isso
