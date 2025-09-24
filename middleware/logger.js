import colors from 'colors';

const logger = (req, res, next) => {
    const colorMethods = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red'
    }
    const color = colorMethods[req.method] || white;

    console.log(`The Method is: ${req.method}`[color]);
    console.log(`The URL is: ${req.url}`[color]);
    console.log(`The Protocol is: ${req.protocol}`[color]);
    next();
};

export default logger;