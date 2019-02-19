let Reddit = require('./controllers/redditList')

module.exports = function(app) {
app.get('/api/test', Reddit.getListings)
};
