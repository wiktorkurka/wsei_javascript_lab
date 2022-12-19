const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 100)
  })
  return promise;
}

function addParams(...params) {
  return params.reduce((promise, param) =>
    promise.then(
      (result) => asyncAdd(result, param)
    ), Promise.resolve(0)
  );
}

async function benchmark(sampleSize, iterations = 10) {
  let tBenchmarkMs = 0;

  for (let i = 0; i < iterations; i++) {
    let sample = [...Array(sampleSize)].map(() => (Math.random() * 100));
    let tStart = performance.now();

    await addParams.apply(this, sample);

    let tTotalMs = performance.now() - tStart;
    console.log(`Execution took ${tTotalMs} ms`);

    tBenchmarkMs += tTotalMs;
  }

  let tAverage = tBenchmarkMs / iterations;
  console.log(`Benchmark done!\n\tSample size: ${sampleSize}\n\tSamlpes processed:${iterations}\n\tAverage time at ${tAverage} ms per sample`);
}