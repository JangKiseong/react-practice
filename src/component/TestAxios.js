import React, {useEffect, useState} from 'react';
import GoogleMap from "google-map-react";
import axios from 'axios';
import './style.css'

axios.defaults.withCredentials = true;

const TestAxios = () => {

    const [data, setData] = useState({
        msg: null,
        ez: null,
        db: null,
        weather: null,
        isLogin: "logout"
    });

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'json'
    }

    const getServerDataTest = () => {
        const getServerDataTestUrl = "api";

        axios.get(getServerDataTestUrl, options)
        .then(response => setData({...data, msg: response?.data.msg}))
        .catch(error => console.error(error));
    }

    const getDbData = () => {
        const getDbDataURL = "database";

        axios.get(getDbDataURL, options)
        .then(response => setData({...data, db: response?.data[0].serial}))
        .catch(error => console.error(error));
    }

    const getLoginStatement = () => {
        const getLoginStatementURL = "login";

        axios.get(getLoginStatementURL, options)
        .then(response => setData({...data, isLogin: response?.data.isLogin}))
        .catch(error => console.error(error));
    }

    const getWeatherData = () => {
        const getWeatherDataURL = "weather";

        axios.get(getWeatherDataURL, options)
        .then(response => setData({...data, weather: response?.data.main}))
        .catch(error => console.error(error));
    }

    const logout = () => {
        const logoutURL = "logout";

        axios.get(logoutURL, options)
        .then(response => {
            if(response?.data.isLogout) setData({...data, isLogout:'logout'});
            else alert("로그아웃에 실패했습니다!")
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getLoginStatement();
    }, []);

    return(
        <div>
            {data?.isLogin === "login"
                ? <span className="btn logout" onClick={logout}>
                    LOGOUT
                </span>
                : <div onClick={()=>window.location.href="kakao"}>
                    <img className="img kakao" src="kakao_login_medium_narrow.png" />
                </div>
            }

            LOGIN STATES : {data.isLogin ? data.isLogin : null}

            <div className="form map">
                <GoogleMap
                    bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                    defaultZoom = {10}
                    defaultCenter = {{lat: 35.858, lng: 127.082 }}
                ></GoogleMap>
            </div>

            <div className="form server">
                서버에서 데이터 받기
                <span className="btn get data" onClick={getServerDataTest}>GET</span>
                {data.msg ? data.msg : null}
            </div>

            <div className="form db">
                db에서 데이터 받기
                <span className="btn get data" onClick={getDbData}>GET</span>
                {data.db ? data.db : null}
            </div>

            <div className="form weather">
                날씨
                <span className="btn get data" onClick={getWeatherData}>GET</span>
                {data.weather 
                    ? <div className="data weather">온도 : {data.weather.temp-273.15}<br/>습도 : {data.weather.humidity}%</div>
                    : null
                }
            </div>
            
        </div>
    )
}

export default TestAxios;