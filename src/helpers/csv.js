import papa from 'papaparse';

// eslint-disable-next-line no-unused-vars
const parse = (file) => new Promise((resolve, reject) => {
  papa.parse(file, {
    download: true,
    header: true,
    keepEmptyRows: false,
    skipEmptyLines: true,
    complete: ({ data, errors }) => {
      const len = errors.length;
      if (len) {
        reject(errors.splice(0, Math.min(len, 3)));
      }
      resolve(data);
    },
  });
});
export default { parse };
