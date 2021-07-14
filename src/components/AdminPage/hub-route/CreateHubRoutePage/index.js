import React from 'react';

import {Link} from 'react-router-dom';

import './HubsPage.scss'
import { useHistory } from "react-router-dom";

import {HubRouteBlock} from "../HubRouteBlock";
import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";

const CreateHubRoutePage = ({}) => {

    const history = useHistory()

    const refreshPage = () => {
        history.push('/admin/hub-routes/');
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
                             activeTimetable
                         }) => {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        let body = {
            source: {
                id: sourceId,
            },
            destination: {
                id: destinationId
            },
            type: typeOfShipping,
            distance: distance,
            duration: duration * 60 * 24,
            rates: rates,
            additional_services: additionalServices,
            ranked_services: rankedServices
        }
        if (activeTimetable) {
            body.timetable = {
                weekdays: timetableDays,
                preparation_period: prepareDays
            }
        }

        console.log({body})
        axios.post(`${ADMIN_SERVER_URL}admin-routes/`, body, options)
            .then(res => console.log(res))

        refreshPage()
    }

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
            <HubRouteBlock initData={{}} onSubmit={sendRequest}/>
        </section>
    );
};

export default CreateHubRoutePage;