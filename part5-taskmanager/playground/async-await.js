// async functions always returns a promise as you know
log = console.log;
const doMult = function (a, b) {
  //   add a promise inside this function so as to get the result with await
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a * b);
    }, 1000);
  });
};

const makeMul = async () => {
  const res = await doMult(4, 15);
  const res2 = await doMult(5, 15);
  const res3 = await doMult(44, 15);
  console.log("Before promise");
  console.log(res);
};

log(makeMul());
