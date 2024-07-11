export function chunkArray<T>(
  ar: T[] | T[][],
  n: number,
  spread: boolean = false
): Array<T[]> {
  if (
    ar.length === 1 &&
    ar[0] instanceof Object &&
    Object.values(ar[0]).length > 0
  )
    ar = ar.map(value => Object.values(value as any));
  const chkAr: Array<T[]> = [];
  let cicles = 0;
  if (spread && Array.isArray(ar[0])) {
    cicles = ar[0].length;
    for (let i = 0; i < cicles; i += n) {
      chkAr.push(ar[0].slice(i, i + n));
    }
  } else {
    cicles = ar.length;
    for (let i = 0; i < cicles; i += n) chkAr.push((ar as T[]).slice(i, n));
  }
  return chkAr;
}

export function shuffle(
  ar: any[],
  rep: boolean = false
): Array<any> | Set<any> {
  const copyAr = ar.slice();
  const shuffled = rep ? [] : new Set();
  while (copyAr.length > 0) {
    const re = copyAr.splice(Math.floor(Math.random() * copyAr.length), 1)[0];
    rep ? (shuffled as Array<any>).push(re) : (shuffled as Set<any>).add(re);
  }
  return shuffled;
}
