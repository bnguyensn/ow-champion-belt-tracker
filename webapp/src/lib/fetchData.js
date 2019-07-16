export default function fetchData() {
  return new Promise((resolve, reject) => {
    import('../data/report.json').then(
      ({ default: report }) => {
        resolve(report);
      },
      err => {
        reject(err);
      }
    );
  });
}
