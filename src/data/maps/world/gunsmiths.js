import locations from "../../locales/locations";
import labels from "../../locales/labels";

const gunsmith = [
  {
    name: labels.gunsmith,
    location: {
      name: locations.cities.tumbleweed,
      region: locations.regions.gaptoothridge,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 24.995082240025944,
    lng: -143.86742591857913
  },
  {
    name: labels.gunsmith,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.61959804455186,
    lng: -29.585452079772953
  },
  {
    name: labels.gunsmith,
    location: {
      name: locations.cities.rhodes,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.35172537604459,
    lng: 5.404114723205567
  },
  {
    name: labels.gunsmith,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.853998384646516,
    lng: 35.87585449218751
  },
  {
    name: labels.gunsmith,
    location: {
      name: locations.cities.annesburg,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 75.8149228358407,
    lng: 40.85652351379395
  }
];

export default gunsmith;
