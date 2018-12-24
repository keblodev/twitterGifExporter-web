FROM node:9

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Run serve when the image is run.
CMD npm start
# Let Docker know about the port that serve runs on.
EXPOSE 5000

# copying working directory
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i

# Copy all local files into the image.
COPY . .
RUN npm run build