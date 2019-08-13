const url = 'http://localhost:3000/report';

export default function fetchReport() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
