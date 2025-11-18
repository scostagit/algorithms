const temOverlap = (intervalo1, intervalo2) => {
  const [inicio1, fim1] = intervalo1;
  const [inicio2, fim2] = intervalo2;


  /*
     A lógica principal é:

        inicio1 <= fim2  e  inicio2 <= fim1
        Isso quer dizer:

        O primeiro intervalo começa antes do segundo terminar
        E o segundo intervalo começa antes do primeiro terminar
  */
  // Checa se um intervalo invade o outro
  if (inicio1 <= fim2 && inicio2 <= fim1) {
    return true;  // Eles se sobrepõem
  }

  return false; // Não se sobrepõem
}

// Testando
console.log(temOverlap([1, 3], [2, 4])); // true (tem overlap)
console.log(temOverlap([1, 2], [3, 4])); // false (não tem overlap)