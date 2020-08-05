exports.getMentorList = `
SELECT DISTINCT 
	USN, 
	userName, 
	email, 
	image_url, 
	description, 
	company 
FROM get_mentor_list`;

exports.getAllCareer = `
SELECT 
	career, 
	career_USN 
FROM Career 
ORDER BY career_USN;`;