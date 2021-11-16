import csc from 'country-state-city';
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city';

const getAllCountries = (req: any, res: any) => {
    try {
        const countries = csc.getAllCountries();
        return res.json({ success: true, code: 200, data: countries });
    } catch (err) {
        return res.json({
            success: false,
            code: 500,
            message: 'Failed to get countries',
        });
    }
};

const getCitiesOfCountry = (req: any, res: any) => {
    try {
        const cities = csc.getCitiesOfCountry(`${req.params.country_code}`);
        return res.json({ success: true, code: 200, data: cities });
    } catch (err) {
        return res.json({
            success: false,
            code: 500,
            message: 'Failed to get cities',
        });
    }
};


export { getAllCountries, getCitiesOfCountry };