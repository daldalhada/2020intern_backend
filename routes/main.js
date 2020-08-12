const express = require('express');
const router = express.Router();
const keywordController = require('../controllers/main/keywordController');
const mentorListController = require('../controllers/main/mentorListController');

router.get('/keyword', keywordController.getKeywordListController);
router.post('/list', mentorListController.getMentorListController);
router.post('/listing', mentorListController.getMentorListController);  // 새로 만든 맨도 리스트의 부르는 방법
module.exports = router;
