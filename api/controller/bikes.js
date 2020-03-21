
const bikes = {
  get: (req, res) => {
    console.log('in bikes.get', req.body)
    res.sendStatus(200)
  }
};



module.exports = bikes;