const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const dbConnect = require('../database');
const qs = require('qs');
const kakaoRestAPIKey = process.env.KAKAO_API_KEY;
const weatherAPIkey = process.env.WEATHER_API_KEY;
const redirectURI = "https://kshrimp.kro.kr/oauth";

router.get('/database', (req, res) => {
  const db = dbConnect.getConnection();

  db.query(`SELECT * FROM controllers`, (err, rows, fields) => {
    if(err){
      console.error(err);
      res.status(404);
      res.end();
    } else{
      res.json(rows);
      res.end();
    }
  })
})

router.get('/kakao', (req, res) => {
  res.redirect(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestAPIKey}&redirect_uri=${redirectURI}`);
  res.end();
})

router.get('/weather', (req, res) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=1845457&appid=${weatherAPIkey}`;

  axios.get(weatherURL)
  .then(response => {
    res.json(response.data);
    res.end();
  })
  .catch(error => {
    console.error(error);
    res.status(404);
    res.end();
  })
})

router.get('/oauth', (req, res) => {
  const accessTokenURL = "https://kauth.kakao.com/oauth/token";
  const authData = {
    grant_type: "authorization_code",
    client_id: kakaoRestAPIKey,
    redirect_uri: redirectURI,
    code: req.query.code,
    client_secret: process.env.KAKAO_CLIENT_SECRET
  }

  const options = {
    headers: {
      "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
    },
    responseType: 'json' 
  }

  axios.post(accessTokenURL, qs.stringify(authData), options)
  .then(response => {
    req.session.accessToken = response?.data.access_token;

    res.redirect('/token');
    res.end();
  })
  .catch(error => {
    console.error(error);
    res.status(404);
    res.end();
  })
})

router.get('/token', (req, res) => {
  const userInfoURL = "https://kapi.kakao.com/v2/user/me";
  const options = {
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + req.session.accessToken
    },
    responseType: 'json'
  };

  axios.get(userInfoURL, options)
  .then(response => {
    req.session.userid    = response?.data.id;
    req.session.nickname  = response?.data.properties.nickname;

    res.redirect("https://kshrimp.kro.kr/");
    res.end();

  })
  .catch(error => {
    console.error(error);
    req.session.destroy(() => {
      res.redirect("https://kshrimp.kro.kr/");
      res.end();
    })
  })
})

router.get('/login', (req, res) => {
  req.session.userid 
  ? res.json({isLogin: 'login'})
  : res.json({isLogin: 'logout'})
  res.end();
});

router.get('/logout', (req, res) => {
  if(req.session.userid){
    const logOutURL = "https://kapi.kakao.com/v1/user/logout"
    const options = {
      headers: {
        "Authorization" : `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`
      },
      responseType: 'json',
    }
    const data = {
      target_id_type  : "user_id",
      target_id       : req.session.userid
    };

    axios.post(logOutURL, qs.stringify(data), options)
    .then(response => {
      if(response.data.id === req.session.userid){
        req.session.destroy(() => {
          res.json({isLogout:true});
          res.end();
        })
      } else {
        res.json({isLogout:false})
        res.end()
      }
    })
    .catch(error => {
      console.error(error)
      res.json({isLogout:false})
      res.end()
    })
  } else {
    req.session.destroy(() => {
      res.redirect('/test');
      res.end();
    })
  }
})

router.get('/api', (req, res, next) => {
  res.json({msg:"CONNECTED SERVER"}).end();
})

router.get('/', (req, res, next) => {
  res.render('index');
  res.end();
});

module.exports = router;
