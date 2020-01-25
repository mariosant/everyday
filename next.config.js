module.exports = {
  target: 'serverless',
  env: {
    token: process.env.TOKEN,
    categoryId: process.env.CATEGORY_ID
  }
}
