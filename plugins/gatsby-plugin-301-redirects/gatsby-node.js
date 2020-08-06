const fs = require('fs');
const path = require('path');

const split = require('split');


const writeFile = (file, data, reporter) => {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => {
    fs.writeFile(file, data, err => {
      if (err) {
        reporter.warn(`301 Redirects: Unable to write to redirects file - ${file}`);
      }

      reporter.success(`301 Redirects: Successfully wrote redirects to file - ${file}`);

      resolve();
    });
  });
};

const readFile = (file, reporter) => {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => {
    fs.readFile(file, 'utf8', (err, data = '') => {
      if (err) {
        reporter.warn(`301 Redirects: Unable to read existing redirects from file - ${file}`);

        resolve();
      }

      reporter.info(`301 Redirects: Found existing redirects file - ${file}`);

      resolve(data);
    });
  });
};

const countLines = filePath => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    let lineCount = 0;

    fs.createReadStream(filePath)
      .pipe(split())
      .on('data', line => {
        const isValidLine = /^[a-zA-Z/]/.test(line);

        if (isValidLine) lineCount++;
      })
      .on('end', () => resolve(lineCount))
      .on('error', error => reject(error));
  });
};

exports.onPostBuild = async function onPostBuild(helpers, options) {
  const { getNodesByType, reporter } = helpers;
  const { redirectsFilePath, redirectsOutputPath, nodeType = 'GoogleSpreadsheet301' } = options;
  const redirectNodes = getNodesByType(nodeType);

  try {
    if (!redirectNodes || !redirectNodes.length) {
      return reporter.warn('301 Redirects: no redirects found');
    }

    const existingRedirects = await readFile(redirectsFilePath, reporter);
    const newRedirects = redirectNodes.reduce((redirects, { to, from }) => `${redirects}\n${from} ${to}`, '');
    const data = `${newRedirects}\n${existingRedirects}`;

    const existingRedirectsCount = await countLines(redirectsFilePath);
    const newRedirectsCount = redirectNodes.length;

    reporter.info(`301 Redirects: Found ${existingRedirectsCount} existing redirects`);
    reporter.info(`301 Redirects: Found ${newRedirectsCount} new redirects`);
    reporter.info(`301 Redirects: Writing out ${existingRedirectsCount + newRedirectsCount} total redirects`);

    return await writeFile(redirectsOutputPath, data, reporter);;
  } catch (error) {
    reporter.warn('301 Redirects: Something went wrong');
  }
};
