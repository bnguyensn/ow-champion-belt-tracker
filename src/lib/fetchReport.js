export default function fetchReport() {
  return new Promise(async (resolve, reject) => {
    try {
      const url =
        'https://us-central1-ow-champion-cloud-fn.cloudfunctions.net/getReport';

      const res = await fetch(url);
      const data = await res.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
