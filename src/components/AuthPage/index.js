import React,{useState} from 'react';

import './AuthPahe.scss'
import {auth} from "../../api/admin";
import {AuthStatus, ResponseStatus} from "../../constants/api";
import {useHistory} from "react-router-dom";

const AuthPage = () => {

  const history = useHistory();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const login = () => {
    auth(email, password).then(r => {
      if (r.status === ResponseStatus.CORRECT) {
        history.push('/admin/hub-routes')
      } else{
        console.log("wring password")
      }
    })
  }

  return (
    <section className={'auth-page-wrapper'}>
      <div className={'auth-form-wrapper'}>
        <div className={'auth-title'}>Вход в панель администратора</div>
        <div className={'auth-inputs-wrapper'}>
          <div className={'input-wrapper login-input'}>
            <label>Логин</label>
            <input type="text" value={email} onChange={emailHandler}/>
          </div>
          <div className={'input-wrapper'}>
            <label>Пароль</label>
            <input type="password" value={password} onChange={passwordHandler}/>
          </div>
        </div>
        <button className={'login-button'} onClick={login}>Войти</button>
      </div>
    </section>
  );
};

export default AuthPage;