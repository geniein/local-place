import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, ButtonKakao, Form, Header, Input, Label, LinkContainer } from './styles';

declare global{
  interface Window{
    Kakao:any;  
  }
}

const LogIn = ({history}: RouteComponentProps) => {
  const [kakaoEmail, setKakaoEmail] = useState('');
  const onSubmit = useCallback(() => {    
  }, []);

  const onClickKaKao = useCallback(() => {
    window.Kakao.Auth.login({      
      success: (res:any)=>{ 
        console.log(res);
        loginCheck(res.access_token);                  
      },
      fail :  (e:any)=>{      
        console.log
      }
    });
  }, []);

  const loginCheck = (token:string) => {
      axios.get('/api/kakaoAuth',{
        headers: {
          "Content-Type": "application/json",
          Authorization: token                  
        }
      }).then((res)=>{                
        if(res.data.result ===false){
          console.log('false');          
          //setKakaoEmail(res.data.email);                    
          //console.log(kakaoEmail);
          history.push(
            {
              pathname:'/signup',
              state : {kakaoEmail: res.data.email}
            });        
          //history.push('/signup',kakaoEmail);  
        }else{
          console.log('true');          
          localStorage.setItem("token", res.data.token)
        }               
      }).finally(()=>{
        console.log('final');
      })
  }

  const onClickLogOut = useCallback(() => {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(res:any) {
        console.log(res);
      },
      fail: function(err:any) {
        console.log(err);
      }
    })
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
        <ButtonKakao type="button" onClick={onClickLogOut}>
          로그아웃
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
