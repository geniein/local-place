import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '@pages/LogIn/styles';
import { useLocation} from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import useInput from '@hooks/useInput';

type LocationState = {
  kakaoEmail: string
}

const SignUp = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;  
  const [newEmail, setNewemail] = useState('');

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [pwd, , setPwd] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);


  const onChangePassword = useCallback(
    (e) => {
      setPwd(e.target.value);
      //setMismatchError(e.target.value !== passwordCheck);
    },
    [],
  );

  const onSubmit = useCallback((e:any) =>{
    e.preventDefault();    
    setSignUpError('');
    setSignUpSuccess(false);    
    axios.post('/api/createUser',{
      email,
      nickname,
      pwd,
    }).then((response)=>{
      console.log(response);
      setSignUpSuccess(true);
    }).catch((error)=>{
      console.dir(error);
    })
  },[email, nickname, pwd]);

  return (
    <div id="container">
      <Header>LocalPlace</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" value={locationState?.kakaoEmail ? locationState.kakaoEmail :email} name="email" onChange={onChangeEmail} readOnly={locationState?.kakaoEmail !==undefined}/>
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}/>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="pwd" name="pwd" value={pwd} onChange={onChangePassword}/>
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input type="password" id="password-check" name="password-check" />
          </div>        
        </Label>
        {!nickname && <Error>닉네임을 입력해주세요.</Error>}
        {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        <Button type="submit">회원가입</Button>        
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
