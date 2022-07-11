import express from 'express';
import passport from 'passport';
import env from 'src/env.json';

const router = express.Router();

router.get('', passport.authenticate('github'));

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: `${env.CLIENT_HOST}/login`,
  }),
  (req, res) => {
    req.session.save(() => {
      return res.redirect(env.CLIENT_HOST);
    });
  }
);

export default router;
