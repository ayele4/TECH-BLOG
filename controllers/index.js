const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/dahbpord', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use(( req, res ) => {
    res.status(400).end();
});

module.exports = router;