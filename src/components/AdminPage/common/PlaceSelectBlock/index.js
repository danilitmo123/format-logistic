import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";
import AsyncSelect from "react-select/async/dist/react-select.esm";

const PlaceSelectBlock = ({titleCountry, titleCity}) => {

    return (
        <div className={'from-select-wrapper'}>
            <div className={'departure-country-select'}>
                <label className={'label-departure-select'}>Страна отправления</label>
                <Select
                    theme={customTheme}
                    onChange={setOptionCountryFromValue}
                    options={modifyCountryObj}
                    placeholder={'Страна'}
                    noOptionsMessage={() => `Не найдено`}
                    filterOption={createFilter(filterConfig)}
                />
            </div>
            <div className={'departure-city-select'}>
                <label className={'label-departure-select'}>Город отправления</label>
                <AsyncSelect
                    theme={customTheme}
                    loadOptions={loadOptionsFrom}
                    onChange={setOptionCityFromValue}
                    options={modifyCitiesFromObj}
                    placeholder={'Город'}
                    noOptionsMessage={() => `Не найдено`}
                    filterOption={createFilter(filterConfig)}
                />
            </div>
        </div>
    )

}