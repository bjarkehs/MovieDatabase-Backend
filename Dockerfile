FROM node:10.9

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Install app dependencies
COPY package.json /code
COPY package-lock.json /code
RUN npm install

# Bundle app source
COPY . /code

EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]
