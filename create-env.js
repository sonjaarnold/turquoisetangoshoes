const fs = require('fs')
fs.writeFileSync('./.env', `CONTENTFUL_ACCESS_TOKEN=${process.env.CONTENTFUL_ACCESS_TOKEN}\n`)
fs.writeFileSync('./.env', `CONTENTFUL_SPACE_ID=${process.env.CONTENTFUL_SPACE_ID}\n`)
