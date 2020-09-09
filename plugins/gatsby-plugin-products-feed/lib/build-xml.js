const fbcatalog = require('fbcatalog');


const buildXML = ({feedOptions, reporter}) => ({ feedCollection, feedItems }) => new Promise((resolve, reject) => {
  const { publicUrl } = feedOptions;

  if (!feedCollection) throw new Error('Missing [feedCollection] information');
  if (!feedItems) throw new Error('Missing [feedItems] data');

  const shopMeta = {
    name: feedCollection.title,
    description: feedCollection.description
  };

  try {
    const feed = fbcatalog.feed();

    const meta = {
      title: shopMeta.name,
      link: publicUrl,
      description: shopMeta.description,
    };

    feed.addItems(feedItems);

    const xml = feed.toRSS(meta, {
      pretty: false
    });

    resolve(xml);

  } catch (error) {
    reject(error);
  }
});

exports.buildXML = buildXML;