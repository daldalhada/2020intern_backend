const matching = require('../../models/user/mathcingDAO');
const lib = require('../../lib/lib');
const logger = require('../../logger');

exports.getMatchingLists = async (req, res, next) => {
  let usn  = parseInt(req.params.usn, 10);
  let userType = parseInt(req.params.userType, 10);
  let state = parseInt(req.params.state, 10);
  if(Number.isNaN(usn) || Number.isNaN(userType) || Number.isNaN(state)) {
      return res.status(200).json({ statusCode: 500, message: '잘못된 매개변수 타입' });
  }

  try {
    let matching_data = userType ? await matching.getMenteeMatchingList(usn, state) : await matching.getMentorMatchingList(usn, state);
    return res.status(200).json(lib.createMatchingList(userType, state, matching_data[0]));
      // return res.render('user', {user: users[0]});
      // res.json(users[0][0]);
  } catch (err) {
      return res.status(500).json(err)
  }
}