const router = require('express').Router();
const { Goal, User } = require('../models');
//const withAuth = require('../utils/auth');

//* Render the homepage
router.get('/', async (req, res) => {
    try {
        //* Get all goals and JOIN with user data
        const goalData = await Goal.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        //* Serialize data so the template can read it
        const goals = goalData.map((goal) => goal.get({ plain: true }));
    
        //* Pass serialized data and session flag into template
        res.render('homepage', {
          goals,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      }
  });


  module.exports = router;