import React from 'react';

import {Link} from 'react-router-dom';
import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";

import {HubRouteBlock} from "../HubRouteBlock";

import './HubsPage.scss'
import {adminInstance} from "../../../../api/admin";

const CreateHubRoutePage = ({}) => {

    const toAdminPage = () => {
        window.location = '/admin/hub-routes/'
    }

    const sendRequest = ({
                             sourceId,
                             destinationId,
                             distance,
                             duration,
                             rates,
                             typeOfShipping,
                             additionalServices,
                             rankedServices,
                             timetableDays,
                             prepareDays,
                             activeTimetable,
                             minimalPrice,
                             ratesValidTo,
                             active,
                             title
                         }) => {

        let body = {
            source: {
                id: sourceId,
            },
            destination: {
                id: destinationId
            },
            type: typeOfShipping,
            distance: distance,
            duration: duration,
            rates: rates,
            additional_services: additionalServices,
            ranked_services: rankedServices,
            minimal_price: minimalPrice,
            rates_valid_to: ratesValidTo,
            active: active,
            title: title
        }
        if (activeTimetable) {
            body.timetable = {
                weekdays: timetableDays,
                preparation_period: prepareDays
            }
        }

        adminInstance.post(`${ADMIN_SERVER_URL}admin-routes/`, body)
            .then(res => {
                console.log(res)
                toAdminPage()
            })

    }

    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>Добавить плечо</div>
                </div>
                <Link to={'/admin/hub-routes/'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            <HubRouteBlock initData={{}} onSubmit={sendRequest}/>
        </section>
    );
};

export default CreateHubRoutePage;