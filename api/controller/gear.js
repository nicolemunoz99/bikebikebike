
const bikes = {
  get: (req, res) => {
    console.log('in gear.get')
    res.sendStatus(200)
  }
};



module.exports = bikes;