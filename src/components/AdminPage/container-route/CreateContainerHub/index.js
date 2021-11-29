import React from 'react';

import {Link} from 'react-router-dom';

import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import {ContainerRouteBlock} from "../ContainerRouteBlock";
import {adminInstance} from "../../../../api/admin";
import './CreateContainerHub.scss'

const CreateContainerHub = ({}) => {

    const toAdminPage = () => {
        window.location = '/admin/container-hubs'
    }

    const sendRequest = ({
                             sourceId,
                             destinationId,
                             distance,
                             duration,
                             cargo_type,
                             containerRates,
                             typeOfShipping,
                             additionalServices,
                             rankedServices,
                             timetableDays,
                             prepareDays,
                             activeTimetable,
                             minimalPrice,
                             ratesValidTo,
                             active,
                             title,
                             source_is_storage,
                             destination_is_storage,
                             description,
                             markup
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
            rates: [],
            additional_services: additionalServices,
            ranked_services: rankedServices,
            minimal_price: minimalPrice,
            rates_valid_to: ratesValidTo,
            cargo_type,
            container_rates: containerRates,
            active: active,
            title: title,
            source_is_storage: source_is_storage,
            destination_is_storage: destination_is_storage,
            description: description,
            markup: markup
        }
        if (activeTimetable) {
            body.timetable = {
                weekdays: timetableDays,
                preparation_period: prepareDays
            }
        }

        adminInstance.post(`${ADMIN_SERVER_URL}admin-routes/`, body)
            .then(res => {
                toAdminPage()
            })

    }

    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>Добавить плечо</div>
                </div>
                <Link to={'/admin/container-hubs/'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            <ContainerRouteBlock initData={{}} onSubmit={sendRequest}/>
        </section>
    );
};

export default CreateContainerHub;
