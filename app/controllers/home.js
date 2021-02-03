const Dataset = require('../models/dataset')

exports.index = async function(req, res) {
  const datasets = await Dataset.count({})
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate',
    datasets 
})
};
