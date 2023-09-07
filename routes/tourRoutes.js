const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.param('id', tourController.checkId);

router.route('/tour-stats').get(tourController.getTourStates);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// all routes
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.postTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
