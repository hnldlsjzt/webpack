

// build的时候会把环境自动设置为production
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/large-number.min.js')
} else {
    module.exports = require('./dist/large-number')
}