import React from 'react';

import logo from '../../img/logo.svg'

import {Link} from 'react-router-dom'

import './SideBar.scss'

const SideBar = () => {
    return (
        <section>
            <input type="checkbox" id="nav-toggle" hidden/>
            <nav className={'nav'}>
                <label htmlFor="nav-toggle" className="nav-toggle" onClick></label>
                <div className={'logo'}>
                    <img src={logo} alt=""/>
                    <div className={'logo-text-block'}>
                        <div className={'logo-main-text'}>Format Logistic</div>
                        <div className={'logo-extra-text'}>Перевозка грузов в Россию</div>
                    </div>
                </div>
                <ul>
                    <li>
                        <Link to={'/admin/hubs'}>
                            <button className={'button-in-sidebar'}>Хабовые плечи</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/routes'}>
                            <button className={'button-in-sidebar'}>Вспомогательные плечи</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/zones'}>
                            <button className={'button-in-sidebar'}>Районы</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default SideBar;