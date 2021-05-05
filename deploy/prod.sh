cat ./deploy/prod.json > .vercel/project.json
cat ./deploy/prod.js > ./src/constants/api.js
vercel --prod