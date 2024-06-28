import getImage from "~/libs/getImage";

export const dataCountry = [
  {
    language: 'English (US)',
    countryCode: 'en-US',
    flag: getImage('USAFlag'),
  },
  {
    language: 'English (UK)',
    countryCode: 'en',
    flag: getImage('England'),
  },
  {
    language: 'English (Singapore)',
    countryCode: 'en-SG',
    flag: getImage('Singapore'),

  },
  {
    language: 'English (India)',
    countryCode: 'en-IN',
    flag: getImage('India'),

  },
  {
    language: 'Chinese (TW)',
    countryCode: 'zh-TW',
    flag: getImage('Taiwan'),
  },
  {
    language: 'Chinese (Cantonese)',
    countryCode: 'yue-HK',
    flag: getImage('Hongkong'),
  },
  {
    language: 'Chinese (Mandarin, Simplified)',
    countryCode: 'zh-CN',
    flag: getImage('China'),
  },
  {
    language: 'German',
    countryCode: 'de',
    flag: getImage('Germany'),
  },
  {
    language: 'Hindi',
    countryCode: 'hi',
    flag: getImage('hindi'),
  },
]