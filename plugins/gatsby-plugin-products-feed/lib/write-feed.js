const util = require('util');
const path = require('path');

const fs = require('fs-extra');


const writeFeed = ({ feedOptions, reporter }) => async (feedXml) => {
  const writeFile = util.promisify(fs.writeFile);
  const { feedEndpoint } = feedOptions;
  const publicPath = path.resolve(process.cwd(), 'public/');
  const feedFilePath = `${publicPath}/${feedEndpoint}.xml`;
  return await writeFile(feedFilePath, feedXml);
};

exports.writeFeed = writeFeed;