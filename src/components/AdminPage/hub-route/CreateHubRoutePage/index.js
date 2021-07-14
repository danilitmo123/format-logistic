import React from 'react';

import {Link} from 'react-router-dom';

import './HubsPage.scss'

import {HubRouteBlock} from "../HubRouteBlock";

const CreateHubRoutePage = ({}) => {

    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>Добавить плечо</div>
                </div>
                <Link to={'/admin/hubs'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            <HubRouteBlock initData={{}}/>
        </section>
    );
};

export default CreateHubRoutePage;