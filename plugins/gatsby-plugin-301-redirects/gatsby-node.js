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
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
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

const runQuery = (graphql, reporter) => {
  return graphql(query).then(res => {
    if (res.errors) {
      reporter.panic(
        '301 Redirects: Unable to run query. Check that your sheet has the correct title.',
        new Error(res.errors)
      );
    }

    const { redirects } = res.data.google301Redirects;

    reporter.info(`301 Redirects: Found ${redirects.length} additional redirects from Google Sheets.`);

    return redirects;
  });
};

exports.onPostBootstrap = async function onPostBuild({ graphql, reporter }, options) {
  try {
    const redirects = await runQuery(graphql, reporter);

    if (!redirects || !redirects.length) {
      return reporter.warn('301 Redirects: no redirects found');
    }

    const existingRedirects = await readFile(options.redirectsFilePath, reporter);
    const newRedirects = redirects.reduce((redirects, { to, from }) => `${redirects}\n${from} ${to}`, '');
    const data = `${newRedirects}\n${existingRedirects}`;

    return await writeFile(options.redirectsOutputPath, data, reporter);;
  } catch (error) {
    reporter.warn('301 Redirects: Something went wrong');
  }
};
