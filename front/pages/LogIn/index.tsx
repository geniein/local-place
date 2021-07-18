import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, ButtonKakao, Form, Header, Input, Label, LinkContainer } from './styles';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [pwd, onChangePassword] = useInput('');
  const [kakaoEmail, setKakaoEmail] = useState('');
  const history = useHistory();
  const onSubmit = useCallback( async (e:any) => {        
    e.preventDefault();
    if(email ==='' || pwd===''){
      alert('ID 혹은 비밀번호가 비여있습니다.');
      return false;
    }    
    axios.post('/api/auth/login',
    {
      email,
      pwd
    }
    ,{
      headers: {
        "Content-Type": "application/json",                         
      }
    }).then((res)=>{           
      localStorage.setItem("token", res.data.access_token)                  
      history.push(
        {
          pathname:'/workspace',          
        });                  
    }).catch((err)=>{
      console.log(err);
    });               
  },
  [email, pwd]
  );

  const onClickKaKao = useCallback(() => {
    window.Kakao.Auth.login({      
      success: (res:any)=>{ 
        console.log(res);
        loginCheck(res.access_token);                  
      },
      fail :  (e:any)=>{      
        console.log(e);
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
          history.push(
            {
              pathname:'/signup',
              state : {kakaoEmail: res.data.email}
            });                  
        }else{
          console.log('true');          
          localStorage.setItem("token", res.data.token)
          history.push(
            {
              pathname:'/workspace',              
            });
        }               
      }).finally(()=>{
        console.log('final');
      })
  }
  return (
    <div id="container">
      <Header>LocalPlace</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" onChange={onChangeEmail}/>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" onChange={onChangePassword}/>
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
