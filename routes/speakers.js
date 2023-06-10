const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    try {
      const speakers = await speakerService.getList();
      const artWorks = await speakerService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'speakers',
        speakers,
        artWorks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.shortname);
      const artWorks = await speakerService.getArtworkForSpeaker(req.params.shortname);
      return res.render('layout', {
        pageTitle: 'Speaker',
        template: 'speaker-detail',
        speaker,
        artWorks,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
