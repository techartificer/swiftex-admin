cat ./deploy/stage.json > .vercel/project.json
cat ./deploy/stage.js > ./src/constants/api.js
vercel --prod