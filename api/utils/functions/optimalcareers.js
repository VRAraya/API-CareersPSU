function calculateWeightedScore(nemRequired, rankingRequired, mathsRequired, languageRequired, scienceRequired, historyRequired, nem, ranking, maths, language, sciencie, history) {
  return nemRequired * nem + rankingRequired * ranking + mathsRequired * maths + languageRequired * language + scienceRequired * sciencie + historyRequired * history
}

function calculateTentativePosition(firstScoreLastYear, lastScoreLastYear, vacancies, weightedScore) {
  const quota = (firstScoreLastYear - lastScoreLastYear) / vacancies
  const gap = firstScoreLastYear - weightedScore
  if (gap < 0) {
    return 1
  }
  return Math.floor((gap) / quota) + 1
}

module.exports = function optimalcareers(careers, nem, ranking, maths, language, science, history) {
  let topCareers = []
  for (career of careers) {
    const weightedScore = calculateWeightedScore(career.nem, career.ranking, career.maths, career.language, career.science, career.history, nem, ranking, maths, language, science, history)
    const tentativePosition = calculateTentativePosition(career.firstscorelastyear, career.lastscorelastyear, career.vacancies, weightedScore)
    const quadCareerScore = {
      careerId: career.codeid,
      careerName: career.name,
      weightedScore: weightedScore,
      tentativePosition: tentativePosition
    }

    topCareers.push(quadCareerScore)
  }

  topCareers.sort(function (a, b) {
    if (a.weightedScore < b.weightedScore) {
      return 1
    }
    if (a.weightedScore > b.weightedScore) {
      return -1;
    }
    return 0
  })

  const topTenCareers = topCareers.slice(0, 10)

  return topTenCareers
}