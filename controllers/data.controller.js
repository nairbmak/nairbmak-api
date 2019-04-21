const property = global.property;

module.exports = {

  buy: function (req, res, next) {
    try {
      res.send({ data: JSON.parse(req.body.data) });
    }
    catch (err) {
      next({"status": 500, "message": err.message});
    }
  },
}