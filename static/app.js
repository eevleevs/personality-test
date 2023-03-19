const maxQuestions = 5

export default {
  answers: {},
  question: '',
  questions: [],
  host: '',
  score: 0,

  async init() {
    this.numberOfQuestions = await (
      await fetch(this.host + '/questions/length')
    ).json()
  },

  async nextQuestion() {
    if (!this.questions.length) return false
    ;[this.question, this.answers] = await (
      await fetch(this.host + '/questions/' + this.questions.shift())
    ).json()
    return true
  },

  result() {
    const average = this.scores.reduce((a, b) => a + b) / this.scores.length
    return this.score / this.numberOfQuestions > average
      ? 'Extrovert'
      : 'Introvert'
  },

  scoreAnswer(answer) {
    this.score += this.answers[answer]
    Object.values(this.answers).forEach(s => this.scores.push(s))
  },

  async start() {
    this.questions = Array.from(Array(this.numberOfQuestions).keys()).sort(
      () => 0.5 - Math.random()
    )
    if (this.numberOfQuestions > maxQuestions) {
      this.questions.slice(0, maxQuestions)
      this.numberOfQuestions = maxQuestions
    }
    this.score = 0
    this.scores = []
  },
}
