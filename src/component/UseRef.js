import React, {useState, useRef} from "react"

function UseRef () {
    
    const [inputs, setInputs] = useState({
        name : "",
        nickname : ""
    })
    // inputs = {name : "윌리"", nickname : "willy"}  => typeof"객체"

    const nameInputs = useRef() //! (1) ref 객체 만들기 
    const nickNameInputs = useRef();

    const { name, nickname } = inputs
    // const {name, nickname} 은 변수 2개를 선언하는 것
    // name 은 "윌리"
    // nickname 은 "willy"

    const onChangeHandler = (e) => {
        const { value, name } = e.target    // e.target 에서 name과 value를 추출
        setInputs({
            ...inputs,                      // 기존의 input 객체를 복사한 뒤
            [name] : value                  // name 키를 가진 값을 value 로 설정
        })
    }

    const onClickHandler = () => {
        setInputs({
            name : "",
            nickname : ""
        })
        //???????????????????????????????????????????????
        console.log("----------")
        console.log(nameInputs) // {current : input}
        console.log(nameInputs.current) // <input name="name" placeholder="이름" value>
        console.log(nameInputs.current.name)
        console.log(nameInputs.current.value)
        console.log("----------")
        nameInputs.current.focus() 
        //! (2) 내가 선택하려고 하는 DOM에 ref 값으로 설정해주어야 한다. 
        //! (3) ref 객체의 .current 값은 내가 원하는 DOM을 가리킨다.

        console.log("----------")
        console.log(nickNameInputs) // {current : input}
        console.log(nickNameInputs.current) // <input name="name" placeholder="이름" value>
        console.log(nickNameInputs.current.name)
        console.log(nickNameInputs.current.value)
        console.log("----------")
        // nickNameInputs.current.focus() 
    }
    
    return (
        <div className="form useref">
            <input name = "name" placeholder = "이름" onChange = {onChangeHandler} value = {name} ref = {nameInputs}/>
            <input name = "nickname" placeholder = "닉네임" onChange = {onChangeHandler} value = {nickname} ref = {nickNameInputs}/>
            <button onClick = {onClickHandler}>초기화</button>
            <div>
                <b>값 :</b>
                {name} ( {nickname} )
            </div>
        </div>
    )

}

export default UseRef;


//! useRef 는 언제 사용하는가?
// 특정 DOM을 선택해야하는 상황에서!
// 출처: [https://velog.io/@delilah/React-hooks-useRef]