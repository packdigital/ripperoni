const fs = require('fs');


const query = `{
  google301Redirects: allGoogleSpreadsheetRedirects301 {
    redirects: nodes {
      to
      from
    }
  }
}`;

const writeFile = (file, data, reporter) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reporter.warn(`301 Redirects Error: Unable to write file - ${file}`);
      }

      resolve();
    });
  });
};

const readFile = (file, reporter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data = '') => {
      if (err) {
        reporter.warn(`301 Redirects Error: Unable to read file - ${file}`);
      }

      resolve(data);
    });
  });
};

const runQuery = (graphql, reporter) => {
  return graphql(query).then(res => {
    if (res.errors) {
      reporter.warn('301 Redirects Error: Unable to run query. Check that your sheet has the correct title.');
    }

    return res.data.google301Redirects.redirects;
  });
};

exports.onPostBuild = async function onPostBuild({ graphql, reporter }, options) {
  try {
    const result = await runQuery(graphql, reporter);
    const newRedirects = result.reduce((redirects, { to, from }) => `${redirects}\n${from} ${to}`, '');
    const existingRedirects = await readFile(options.redirectsFilePath, reporter);
    const data = `${newRedirects}\n${existingRedirects}`;

    return await writeFile(options.redirectsOutputPath, data, reporter);
  } catch (error) {
    reporter.warn('301 Redirects Error: Something went wrong');
  }
};
