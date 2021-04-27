const Axios = require('axios');

const handler = async function (event) {
  try {
    const response = await Axios('https://type.fit/api/quotes', {
      headers: { Accept: 'application/json' },
    });
    if (response.status < 200 && response.status >= 300) {
      return { statusCode: response.status, body: response.statusText };
    }
    const { data } = await response;

    const length = parseInt(event.queryStringParameters.length) || 10;
    const randomStart = Math.floor(Math.random() * (data.length - length));

    const quotes = data.slice(randomStart, randomStart + length);

    return {
      statusCode: 200,
      body: JSON.stringify({ quotes, startIndex: randomStart, length }),
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
