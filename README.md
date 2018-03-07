# INFO-COLLECTOR
## in use of collect infomation in wechat-grouptalk

### front-end
Vue.js

### back-end
egg.js

### RUN
- fill the `/backend/config/config.minus.js` with your own `jwtSalt`
- fill the `/backend/config/config.default.js` -> `domainWhiteList` with your own host
  - e.g. `http://q.kevinaskin.cn`
```
$ mongod
$ cd backend
$ npm install
$ npm start

$ cd ../frontend
$ npm install
$ npm run build
```

parsing your own host at `/frontend/dist/`

[online example](http://q.kevinaskin.cn)

![index](https://github.com/kevinaskin/info-collector/blob/master/screenshoot/index.png)


![question](https://github.com/kevinaskin/info-collector/blob/master/screenshoot/q.png)


![list](https://github.com/kevinaskin/info-collector/blob/master/screenshoot/list.png)
