function calculateWeightedScore(nemRequired, rankingRequired, mathsRequired, languageRequired, scienceRequired, historyRequired, nem, ranking, maths, language, sciencie, history) {
  return nemRequired * nem + rankingRequired * ranking + mathsRequired * maths + languageRequired * language + scienceRequired * sciencie + historyRequired * history
}

function calculateTentativePosition(firstScoreLastYear, lastScoreLastYear, vacancies, weightedScore) {
  let quota = (firstScoreLastYear - lastScoreLastYear) / vacancies

  return Math.ceil((firstScoreLastYear - weightedScore) / quota)
}

module.exports = function optimalcareers(careers, nem, ranking, maths, language, science, history) {
  let topCareers = []

  for (career in careers) {
    console.log(careers)
    let weightedScore = calculateWeightedScore(career.nem, career.ranking, career.maths, career.language, career.science, career.history, nem, ranking, maths, language, science, history)
    let tentativePosition = calculateTentativePosition(career.firstscorelastyear, career.lastscorelastyear, career.vacancies, weightedScore)
    let quadCareerScore = {
      careerId: career.codeid,
      careerName: career.name,
      weightedScore: weightedScore,
      tentativePosition: tentativePosition
    }
    topCareers.push(quadCareerScore)
  }

  topCareers.sort(function (a, b) {
    if (a.tentativePosition > b.tentativePosition) {
      return 1
    }
    if (a.tentativePosition < b.tentativePosition) {
      return -1;
    }
    return 0
  })

  let topTenCareers = topCareers.slice(0, 10)

  return topTenCareers
}