const Axios = require('axios');

const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 400 };
  }
  try {
    const response = await Axios('https://type.fit/api/quotes', {
      headers: { Accept: 'application/json' },
    });
    if (response.status < 200 && response.status >= 300) {
      return { statusCode: response.status, body: response.statusText };
    }
    const { data } = await response;
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      body = { count: 10 };
    }

    const count = body.count || 10;
    const randomStart = Math.floor(Math.random() * (data.length - count));

    const quotes = data.slice(randomStart, randomStart + count);

    return {
      statusCode: 200,
      body: JSON.stringify({ quotes, startIndex: randomStart, count }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
