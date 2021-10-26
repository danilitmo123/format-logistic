import React, {useState, useEffect} from "react";

import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import {Link, useParams} from "react-router-dom";
import {adminInstance} from "../../../../api/admin";

import Loader from "../../../Common/Loader"
import {HubRouteBlock} from "../HubRouteBlock";

const EditHubRoutePage = () => {

    const {id} = useParams();
    const [initData, setInitData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        adminInstance.get(`${ADMIN_SERVER_URL}admin-routes/${id}`).then(res => {
            setInitData(res.data)
            setLoading(false)
        }).catch(err => {
                console.log({err})
            }
        )
    }, [])

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
                             title,
                             source_is_storage,
                             destination_is_storage,
                             description,
                             markup
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
            duration: duration,
            rates: rates,
            additional_services: additionalServices,
            ranked_services: rankedServices,
            minimal_price: minimalPrice,
            rates_valid_to: ratesValidTo,
            active: active,
            title: title,
            cargo_type: 'BOX',
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

        adminInstance.put(`${ADMIN_SERVER_URL}admin-routes/${id}/`, body, options)
            .then(res => {
                console.log(res.data)
            }).catch(error => console.log({error}))
    }


    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>Редактирования плеча</div>
                </div>
                <Link to={'/admin/hub-routes/'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            {!loading ?
                <HubRouteBlock initData={initData} onSubmit={sendRequest}/> : <Loader/>
            }

        </section>
    );
};

export default EditHubRoutePage;