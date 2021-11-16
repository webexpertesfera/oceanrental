export class City {
    name: string = "";
    countryCode: string = "";
    stateCode: string = "";
    latitude?: string = "";
    longitude?: string = "";
}

interface Timezone {
    zoneName: string;
    gmtOffset: string;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

export class Country {
    isoCode: string = "";
    name: string = "";
    phonecode: number = 0;
    flag: string = "";
    currency: string = "";
    latitude: number = 0;
    longitude: number = 0;
    timezones?: Timezone[] = [];
}
