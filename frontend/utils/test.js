const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
function generateAroundValue(x, n) {
    const variation = 0.1 * x;
    const values = [];
    for (let i = 0; i < n - 2; i++) {
      
      values.push(Math.floor(Math.random() * (variation * 2) + x - variation));
    }
    const resp = shuffle(values.slice());
    return [...resp,x]
  }
  const x = 2300;
  const n = 7;
  const result = generateAroundValue(x, n);
  console.log(result); 