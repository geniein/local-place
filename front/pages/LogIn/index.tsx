import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
// import KakaoLogin from 'react-kakao-login';
import { Link } from 'react-router-dom';
import { Button, ButtonKakao, Form, Header, Input, Label, LinkContainer } from './styles';

declare global{
  interface Window{
    Kakao:any;
  }
}

const LogIn = () => {
  const onSubmit = useCallback(() => {}, []);

  const onClickKaKao = useCallback(() => {
    window.Kakao.Auth.login({
      success: (res:any)=>{    
        axios.get('/api/kakaoAuth',{
          headers: {
            "Content-Type": "application/json",
            Authorization: res.access_token,
          },
        }).then((res)=>{
          localStorage.setItem("token", res.data.token);
          alert("로그인 되었습니다.");
        })
      },
      fail :  (e:any)=>{      
        console.log
      }
    });
  }, []);

  return (
    <div id="container">
      <Header>LocalPlace</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" />
          </div>
        </Label>
        <Button type="submit">로그인</Button>
        <ButtonKakao type="button" onClick={onClickKaKao}>
          카카오로그인
        </ButtonKakao>
        {/* <KakaoLogin token={token} onSuccess={console.log} onFail={console.error} onLogout={console.info} /> */}
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
