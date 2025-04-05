FROM mcr.microsoft.com/playwright:v1.38.0-focal

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
