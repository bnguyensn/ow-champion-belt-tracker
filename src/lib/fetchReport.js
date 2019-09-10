export async function fetchReportLocal() {
  const { default: report } = await import(
    /* webpackChunkName: "report.json" */ '../data/report.json'
  );

  return report;
}

export default function fetchReport() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = 'http://localhost:3000/report';

      const res = await fetch(url);
      const data = await res.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
