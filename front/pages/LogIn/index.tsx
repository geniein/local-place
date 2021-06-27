import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonKakao, Form, Header, Input, Label, LinkContainer } from './styles';

declare global{
  interface Window{
    Kakao:any;  
  }
}

const LogIn = () => {
  const [idChk, setIdChk] = useState(false);
  const onSubmit = useCallback(() => {    
  }, []);
  
  const onClickRouteTest = useCallback(() => {
    console.log(idChk);
  }, []);

  const onClickKaKao = useCallback(() => {
    window.Kakao.Auth.login({      
      success: (res:any)=>{    
        window.Kakao.API.request({
          url: '/v2/user/me',
          data: {
            property_keys: ["kakao_account.email","kakao_account.profile"]
          },
          success: function(getInfo:any) {            
            loginCheck(getInfo.kakao_account.email,res.access_token);
          },
          fail: function(err:any) {
            console.log(err);
          }
        })
        
      },
      fail :  (e:any)=>{      
        console.log
      }
    });
  }, [idChk]);

  const loginCheck = async (getInfo:any, token:string) => {
      await axios.get('/api/auth',{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Loginemail:getInfo            
        }
      }).then((res)=>{        
        if(res.data.idchk===false){
          console.log('aa');
          setIdChk(true);
        }else{
          localStorage.setItem("token", res.data.token)
        }
        //console.log(res);
        //localStorage.setItem("token", res.data.token);          
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

  if(idChk === true){
    <Redirect to='/signup'/>
  }

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
        <ButtonKakao type="button" onClick={onClickRouteTest}>
        onClickRouteTest
        </ButtonKakao>
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
