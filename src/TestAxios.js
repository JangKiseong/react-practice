import React, {useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const TestAxios = () => {

    const [testData, setTestData] = useState();

    const getServerDataTest = () => {
        const getServerDataTestUrl = "api";

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: 'json'
        }

        axios.get(getServerDataTestUrl, options)
        .then(response => {
            if(response?.data){
                setTestData(response.data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    useEffect(()=>{
        getServerDataTest();
    },[])

    return(
        <div>
            asdf<br/>
            {testData ? testData : null}
        </div>
    )
}

export default TestAxios;