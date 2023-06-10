const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const router = express.Router();

module.exports = (params) => {
  router.get('/', async (req, res, next) => {
    try {
      /*
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount += 1;
    console.log(`Number of visits: ${req.session.visitcount}`);
    */
      const { speakerService } = params;
      const topSpeakers = await speakerService.getList();
      const artWorks = await speakerService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artWorks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
