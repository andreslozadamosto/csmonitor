
/*
 * GET stats listing.
 */

exports.save = function(req, res) {
  res.send("stats gets");
  console.log(res.req.body);
};
