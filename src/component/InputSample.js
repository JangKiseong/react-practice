import React, {useState} from "react";

function InputSample () {

    const [inputs, setInputs] = useState({
        name : "",
        nickname : ""
    })
    //! inputs = {name : "윌리", nickname : "willy"}  => typeof"객체"

    const { name, nickname } = inputs // 비구조화할당을 통해서 값을 추출
    //! const {name, nickname} 은 변수 2개를 선언하는 것
    //! name 은 "윌리"
    //! nickname 은 "willy"

    const onChangeHandler = (e) => {
        const { value, name } = e.target  // e.target에서 value, name을 추출
        
        console.log(value)              // 윌리 (=>name) // willy (=>nickname)
        console.log(name)               // name // nickname
        console.log(e.target)           // <input name = "name" placeholder = "이름" .../> // ...
        console.log({...inputs})        // {name: "윌리", nickname: "will"}

        setInputs({
            ...inputs,                  // 기존의 inputs 객체를 복사 //! {name: "윌리", nickname: "willy"}
            [name] : value              // name 키를 가진 값을 value로 설정 //! name : 윌리
        })

        //! 리액트에서 객체 수정시
        // 직접 수정 (X)
        // inputs[name] = value;  

        // 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해야 (O)
        // setInputs({
        //      ...inputs,
        //      [name]: value
        // });

    }

    const onClickHandler = () => {
        setInputs({
            name : "",
            nickname : ""
        })
    }

    return (
        <div className="form input">
            <input name = "name" placeholder = "이름" onChange = {onChangeHandler} value = {name}/>
            <input name = "nickname" placeholder = "닉네임" onChange = {onChangeHandler} value = {nickname}/>
            <button onClick = {onClickHandler}>초기화</button>
            <div>
                <b>값 : </b>
                {name} ( {nickname} )
            </div>
        </div>
    )
    
}

export default InputSample;

//! input 태그
//* name : <input> 요소의 이름(name)을 명시함 /  폼(form)이 제출된 후 서버에서 폼 데이터(form data)를 참조하기 위해 사용되거나, 자바스크립트에서 요소를 참조하기 위해 사용
//* value : <input> 요소의 값(value)을 명시함 / <input> 요소의 초기값(value)을 명시
//* type :  <input> 요소가 나타낼 타입을 명시함 / 기본값은 text / 종류가 많으니 찾아볼것

// input 태그의 상태를 관리할 때에는 "value 값"을 설정해주는 것이 중요하다
// value 값을 설정해주어야, 상태가 바꼈을 때, input의 내용도 업데이트할 수 있다.

// input의 개수가 많을 때는, useState, onChange를 여러개 만들어서 구현할 수 있다.
// 그러나 더 좋은 방법은
// input에 name을 설정하고, 이벤트가 발생했을 때, 이 값을 참조하는 것이다.
// useState에서는 문자열이 아니라, 객체형태의 상태를 관리하는 것이 좋다.
// 출처: [https://velog.io/@delilah/React-hooks-useRef]