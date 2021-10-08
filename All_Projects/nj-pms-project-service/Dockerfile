FROM node:10.6.0-alpine
RUN mkdir -p /usr/apps
ENV APP_HOME /usr/apps
COPY * $APP_HOME/
COPY config $APP_HOME/config
COPY controller $APP_HOME/controller
COPY model $APP_HOME/model
COPY routes $APP_HOME/routes
COPY services $APP_HOME/services
COPY utils $APP_HOME/utils
WORKDIR $APP_HOME
RUN npm install
#RUN npm start
EXPOSE 3000
CMD [ "node", "app.js" ]
