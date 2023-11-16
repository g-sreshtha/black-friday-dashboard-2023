import MapChart from './MapChart.jsx';
import s from './App.styling.jsx';
import { useState, useRef, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const time = Date.now();
export const App = () => {
  const defaultCountryState = [
    { countryCode: 'AF', countryName: 'Afghanistan', total: 0, colour: 0 },
    { countryCode: 'AX', countryName: 'Aland Islands', total: 0, colour: 0 },
    { countryCode: 'AL', countryName: 'Albania', total: 0, colour: 0 },
    { countryCode: 'DZ', countryName: 'Algeria', total: 0, colour: 0 },
    { countryCode: 'AS', countryName: 'American Samoa', total: 0, colour: 0 },
    { countryCode: 'AD', countryName: 'Andorra', total: 0, colour: 0 },
    { countryCode: 'AO', countryName: 'Angola', total: 0, colour: 0 },
    { countryCode: 'AI', countryName: 'Anguilla', total: 0, colour: 0 },
    { countryCode: 'AQ', countryName: 'Antarctica', total: 0, colour: 0 },
    {
      countryCode: 'AG',
      countryName: 'Antigua And Barbuda',
      total: 0,
      colour: 0,
    },
    { countryCode: 'AR', countryName: 'Argentina', total: 0, colour: 0 },
    { countryCode: 'AM', countryName: 'Armenia', total: 0, colour: 0 },
    { countryCode: 'AW', countryName: 'Aruba', total: 0, colour: 0 },
    { countryCode: 'AU', countryName: 'Australia', total: 0, colour: 0 },
    { countryCode: 'AT', countryName: 'Austria', total: 0, colour: 0 },
    { countryCode: 'AZ', countryName: 'Azerbaijan', total: 0, colour: 0 },
    { countryCode: 'BS', countryName: 'Bahamas', total: 0, colour: 0 },
    { countryCode: 'BH', countryName: 'Bahrain', total: 0, colour: 0 },
    { countryCode: 'BD', countryName: 'Bangladesh', total: 0, colour: 0 },
    { countryCode: 'BB', countryName: 'Barbados', total: 0, colour: 0 },
    { countryCode: 'BY', countryName: 'Belarus', total: 0, colour: 0 },
    { countryCode: 'BE', countryName: 'Belgium', total: 0, colour: 0 },
    { countryCode: 'BZ', countryName: 'Belize', total: 0, colour: 0 },
    { countryCode: 'BJ', countryName: 'Benin', total: 0, colour: 0 },
    { countryCode: 'BM', countryName: 'Bermuda', total: 0, colour: 0 },
    { countryCode: 'BT', countryName: 'Bhutan', total: 0, colour: 0 },
    { countryCode: 'BO', countryName: 'Bolivia', total: 0, colour: 0 },
    {
      countryCode: 'BA',
      countryName: 'Bosnia and Herzegovina',
      total: 0,
      colour: 0,
    },
    { countryCode: 'BW', countryName: 'Botswana', total: 0, colour: 0 },
    { countryCode: 'BV', countryName: 'Bouvet Island', total: 0, colour: 0 },
    { countryCode: 'BR', countryName: 'Brazil', total: 0, colour: 0 },
    {
      countryCode: 'IO',
      countryName: 'British Indian Ocean Territory',
      total: 0,
      colour: 0,
    },
    {
      countryCode: 'BN',
      countryName: 'Brunei Darussalam',
      total: 0,
      colour: 0,
    },
    { countryCode: 'BG', countryName: 'Bulgaria', total: 0, colour: 0 },
    { countryCode: 'BF', countryName: 'Burkina Faso', total: 0, colour: 0 },
    { countryCode: 'BI', countryName: 'Burundi', total: 0, colour: 0 },
    { countryCode: 'KH', countryName: 'Cambodia', total: 0, colour: 0 },
    { countryCode: 'CM', countryName: 'Cameroon', total: 0, colour: 0 },
    { countryCode: 'CA', countryName: 'Canada', total: 0, colour: 0 },
    { countryCode: 'CV', countryName: 'Cape Verde', total: 0, colour: 0 },
    { countryCode: 'KY', countryName: 'Cayman Islands', total: 0, colour: 0 },
    {
      countryCode: 'CF',
      countryName: 'Central African Republic',
      total: 0,
      colour: 0,
    },
    { countryCode: 'TD', countryName: 'Chad', total: 0, colour: 0 },
    { countryCode: 'CL', countryName: 'Chile', total: 0, colour: 0 },
    { countryCode: 'CN', countryName: 'China', total: 0, colour: 0 },
    { countryCode: 'CX', countryName: 'Christmas Island', total: 0, colour: 0 },
    {
      countryCode: 'CC',
      countryName: 'Cocos (Keeling) Islands',
      total: 0,
      colour: 0,
    },
    { countryCode: 'CO', countryName: 'Colombia', total: 0, colour: 0 },
    { countryCode: 'KM', countryName: 'Comoros', total: 0, colour: 0 },
    { countryCode: 'CG', countryName: 'Congo', total: 0, colour: 0 },
    {
      countryCode: 'CD',
      countryName: 'Democratic Republic of Congo',
      total: 0,
      colour: 0,
    },
    { countryCode: 'CK', countryName: 'Cook Islands', total: 0, colour: 0 },
    { countryCode: 'CR', countryName: 'Costa Rica', total: 0, colour: 0 },
    { countryCode: 'CI', countryName: 'Cote D"Ivoire', total: 0, colour: 0 },
    { countryCode: 'HR', countryName: 'Croatia', total: 0, colour: 0 },
    { countryCode: 'CU', countryName: 'Cuba', total: 0, colour: 0 },
    { countryCode: 'CY', countryName: 'Cyprus', total: 0, colour: 0 },
    { countryCode: 'CZ', countryName: 'Czechia', total: 0, colour: 0 },
    { countryCode: 'DK', countryName: 'Denmark', total: 0, colour: 0 },
    { countryCode: 'DJ', countryName: 'Djibouti', total: 0, colour: 0 },
    { countryCode: 'DM', countryName: 'Dominica', total: 0, colour: 0 },
    {
      countryCode: 'DO',
      countryName: 'Dominican Republic',
      total: 0,
      colour: 0,
    },
    { countryCode: 'EC', countryName: 'Ecuador', total: 0, colour: 0 },
    { countryCode: 'EG', countryName: 'Egypt', total: 0, colour: 0 },
    { countryCode: 'SV', countryName: 'El Salvador', total: 0, colour: 0 },
    {
      countryCode: 'GQ',
      countryName: 'Equatorial Guinea',
      total: 0,
      colour: 0,
    },
    { countryCode: 'ER', countryName: 'Eritrea', total: 0, colour: 0 },
    { countryCode: 'EE', countryName: 'Estonia', total: 0, colour: 0 },
    { countryCode: 'ET', countryName: 'Ethiopia', total: 0, colour: 0 },
    {
      countryCode: 'FK',
      countryName: 'Falkland Islands (Malvinas)',
      total: 0,
      colour: 0,
    },
    { countryCode: 'FO', countryName: 'Faroe Islands', total: 0, colour: 0 },
    { countryCode: 'FJ', countryName: 'Fiji', total: 0, colour: 0 },
    { countryCode: 'FI', countryName: 'Finland', total: 0, colour: 0 },
    { countryCode: 'FR', countryName: 'France', total: 0, colour: 0 },
    { countryCode: 'GF', countryName: 'French Guiana', total: 0, colour: 0 },
    { countryCode: 'PF', countryName: 'French Polynesia', total: 0, colour: 0 },
    {
      countryCode: 'TF',
      countryName: 'French Southern Territories',
      total: 0,
      colour: 0,
    },
    { countryCode: 'GA', countryName: 'Gabon', total: 0, colour: 0 },
    { countryCode: 'GM', countryName: 'Gambia', total: 0, colour: 0 },
    { countryCode: 'GE', countryName: 'Georgia', total: 0, colour: 0 },
    { countryCode: 'DE', countryName: 'Germany', total: 0, colour: 0 },
    { countryCode: 'GH', countryName: 'Ghana', total: 0, colour: 0 },
    { countryCode: 'GI', countryName: 'Gibraltar', total: 0, colour: 0 },
    { countryCode: 'GR', countryName: 'Greece', total: 0, colour: 0 },
    { countryCode: 'GL', countryName: 'Greenland', total: 0, colour: 0 },
    { countryCode: 'GD', countryName: 'Grenada', total: 0, colour: 0 },
    { countryCode: 'GP', countryName: 'Guadeloupe', total: 0, colour: 0 },
    { countryCode: 'GU', countryName: 'Guam', total: 0, colour: 0 },
    { countryCode: 'GT', countryName: 'Guatemala', total: 0, colour: 0 },
    { countryCode: 'GG', countryName: 'Guernsey', total: 0, colour: 0 },
    { countryCode: 'GN', countryName: 'Guinea', total: 0, colour: 0 },
    { countryCode: 'GW', countryName: 'Guinea-Bissau', total: 0, colour: 0 },
    { countryCode: 'GY', countryName: 'Guyana', total: 0, colour: 0 },
    { countryCode: 'HT', countryName: 'Haiti', total: 0, colour: 0 },
    {
      countryCode: 'HM',
      countryName: 'Heard Island & Mcdonald Islands',
      total: 0,
      colour: 0,
    },
    {
      countryCode: 'VA',
      countryName: 'Holy See (Vatican City State)',
      total: 0,
      colour: 0,
    },
    { countryCode: 'HN', countryName: 'Honduras', total: 0, colour: 0 },
    { countryCode: 'HK', countryName: 'Hong Kong', total: 0, colour: 0 },
    { countryCode: 'HU', countryName: 'Hungary', total: 0, colour: 0 },
    { countryCode: 'IS', countryName: 'Iceland', total: 0, colour: 0 },
    { countryCode: 'IN', countryName: 'India', total: 0, colour: 0 },
    { countryCode: 'ID', countryName: 'Indonesia', total: 0, colour: 0 },
    {
      countryCode: 'IR',
      countryName: 'Iran',
      total: 0,
      colour: 0,
    },
    { countryCode: 'IQ', countryName: 'Iraq', total: 0, colour: 0 },
    { countryCode: 'IE', countryName: 'Ireland', total: 0, colour: 0 },
    { countryCode: 'IM', countryName: 'Isle Of Man', total: 0, colour: 0 },
    { countryCode: 'IL', countryName: 'Israel', total: 0, colour: 0 },
    { countryCode: 'IT', countryName: 'Italy', total: 0, colour: 0 },
    { countryCode: 'JM', countryName: 'Jamaica', total: 0, colour: 0 },
    { countryCode: 'JP', countryName: 'Japan', total: 0, colour: 0 },
    { countryCode: 'JE', countryName: 'Jersey', total: 0, colour: 0 },
    { countryCode: 'JO', countryName: 'Jordan', total: 0, colour: 0 },
    { countryCode: 'KZ', countryName: 'Kazakhstan', total: 0, colour: 0 },
    { countryCode: 'KE', countryName: 'Kenya', total: 0, colour: 0 },
    { countryCode: 'KI', countryName: 'Kiribati', total: 0, colour: 0 },
    { countryCode: 'XK', countryName: 'Kosovo', total: 0, colour: 0 },
    { countryCode: 'KP', countryName: 'North Korea', total: 0, colour: 0 },
    { countryCode: 'KW', countryName: 'Kuwait', total: 0, colour: 0 },
    { countryCode: 'KG', countryName: 'Kyrgyzstan', total: 0, colour: 0 },
    {
      countryCode: 'LA',
      countryName: 'Lao People"s Democratic Republic',
      total: 0,
      colour: 0,
    },
    { countryCode: 'LV', countryName: 'Latvia', total: 0, colour: 0 },
    { countryCode: 'LB', countryName: 'Lebanon', total: 0, colour: 0 },
    { countryCode: 'LS', countryName: 'Lesotho', total: 0, colour: 0 },
    { countryCode: 'LR', countryName: 'Liberia', total: 0, colour: 0 },
    {
      countryCode: 'LY',
      countryName: 'Libya',
      total: 0,
      colour: 0,
    },
    { countryCode: 'LI', countryName: 'Liechtenstein', total: 0, colour: 0 },
    { countryCode: 'LT', countryName: 'Lithuania', total: 0, colour: 0 },
    { countryCode: 'LU', countryName: 'Luxembourg', total: 0, colour: 0 },
    { countryCode: 'MO', countryName: 'Macao', total: 0, colour: 0 },
    { countryCode: 'MK', countryName: 'North Macedonia', total: 0, colour: 0 },
    { countryCode: 'MG', countryName: 'Madagascar', total: 0, colour: 0 },
    { countryCode: 'MW', countryName: 'Malawi', total: 0, colour: 0 },
    { countryCode: 'MY', countryName: 'Malaysia', total: 0, colour: 0 },
    { countryCode: 'MV', countryName: 'Maldives', total: 0, colour: 0 },
    { countryCode: 'ML', countryName: 'Mali', total: 0, colour: 0 },
    { countryCode: 'MT', countryName: 'Malta', total: 0, colour: 0 },
    { countryCode: 'MH', countryName: 'Marshall Islands', total: 0, colour: 0 },
    { countryCode: 'MQ', countryName: 'Martinique', total: 0, colour: 0 },
    { countryCode: 'MR', countryName: 'Mauritania', total: 0, colour: 0 },
    { countryCode: 'MU', countryName: 'Mauritius', total: 0, colour: 0 },
    { countryCode: 'YT', countryName: 'Mayotte', total: 0, colour: 0 },
    { countryCode: 'MX', countryName: 'Mexico', total: 0, colour: 0 },
    {
      countryCode: 'FM',
      countryName: 'Micronesia, Federated States Of',
      total: 0,
      colour: 0,
    },
    { countryCode: 'MD', countryName: 'Moldova', total: 0, colour: 0 },
    { countryCode: 'MC', countryName: 'Monaco', total: 0, colour: 0 },
    { countryCode: 'MN', countryName: 'Mongolia', total: 0, colour: 0 },
    { countryCode: 'ME', countryName: 'Montenegro', total: 0, colour: 0 },
    { countryCode: 'MS', countryName: 'Montserrat', total: 0, colour: 0 },
    { countryCode: 'MA', countryName: 'Morocco', total: 0, colour: 0 },
    { countryCode: 'MZ', countryName: 'Mozambique', total: 0, colour: 0 },
    { countryCode: 'MM', countryName: 'Myanmar', total: 0, colour: 0 },
    { countryCode: 'NA', countryName: 'Namibia', total: 0, colour: 0 },
    { countryCode: 'NR', countryName: 'Nauru', total: 0, colour: 0 },
    { countryCode: 'NP', countryName: 'Nepal', total: 0, colour: 0 },
    { countryCode: 'NL', countryName: 'Netherlands', total: 0, colour: 0 },
    {
      countryCode: 'AN',
      countryName: 'Netherlands Antilles',
      total: 0,
      colour: 0,
    },
    { countryCode: 'NC', countryName: 'New Caledonia', total: 0, colour: 0 },
    { countryCode: 'NZ', countryName: 'New Zealand', total: 0, colour: 0 },
    { countryCode: 'NI', countryName: 'Nicaragua', total: 0, colour: 0 },
    { countryCode: 'NE', countryName: 'Niger', total: 0, colour: 0 },
    { countryCode: 'NG', countryName: 'Nigeria', total: 0, colour: 0 },
    { countryCode: 'NU', countryName: 'Niue', total: 0, colour: 0 },
    { countryCode: 'NF', countryName: 'Norfolk Island', total: 0, colour: 0 },
    {
      countryCode: 'MP',
      countryName: 'Northern Mariana Islands',
      total: 0,
      colour: 0,
    },
    { countryCode: 'NO', countryName: 'Norway', total: 0, colour: 0 },
    { countryCode: 'OM', countryName: 'Oman', total: 0, colour: 0 },
    { countryCode: 'PK', countryName: 'Pakistan', total: 0, colour: 0 },
    { countryCode: 'PW', countryName: 'Palau', total: 0, colour: 0 },
    {
      countryCode: 'PS',
      countryName: 'Palestinian Territory, Occupied',
      total: 0,
      colour: 0,
    },
    { countryCode: 'PA', countryName: 'Panama', total: 0, colour: 0 },
    { countryCode: 'PG', countryName: 'Papua New Guinea', total: 0, colour: 0 },
    { countryCode: 'PY', countryName: 'Paraguay', total: 0, colour: 0 },
    { countryCode: 'PE', countryName: 'Peru', total: 0, colour: 0 },
    { countryCode: 'PH', countryName: 'Philippines', total: 0, colour: 0 },
    { countryCode: 'PN', countryName: 'Pitcairn', total: 0, colour: 0 },
    { countryCode: 'PL', countryName: 'Poland', total: 0, colour: 0 },
    { countryCode: 'PT', countryName: 'Portugal', total: 0, colour: 0 },
    { countryCode: 'PR', countryName: 'Puerto Rico', total: 0, colour: 0 },
    { countryCode: 'QA', countryName: 'Qatar', total: 0, colour: 0 },
    { countryCode: 'RE', countryName: 'Reunion', total: 0, colour: 0 },
    { countryCode: 'RO', countryName: 'Romania', total: 0, colour: 0 },
    {
      countryCode: 'RU',
      countryName: 'Russia',
      total: 0,
      colour: 0,
    },
    { countryCode: 'RW', countryName: 'Rwanda', total: 0, colour: 0 },
    { countryCode: 'BL', countryName: 'Saint Barthelemy', total: 0, colour: 0 },
    { countryCode: 'SH', countryName: 'Saint Helena', total: 0, colour: 0 },
    {
      countryCode: 'KN',
      countryName: 'Saint Kitts And Nevis',
      total: 0,
      colour: 0,
    },
    { countryCode: 'LC', countryName: 'Saint Lucia', total: 0, colour: 0 },
    { countryCode: 'MF', countryName: 'Saint Martin', total: 0, colour: 0 },
    {
      countryCode: 'PM',
      countryName: 'Saint Pierre And Miquelon',
      total: 0,
      colour: 0,
    },
    {
      countryCode: 'VC',
      countryName: 'Saint Vincent And Grenadines',
      total: 0,
      colour: 0,
    },
    { countryCode: 'WS', countryName: 'Samoa', total: 0, colour: 0 },
    { countryCode: 'SM', countryName: 'San Marino', total: 0, colour: 0 },
    {
      countryCode: 'ST',
      countryName: 'Sao Tome And Principe',
      total: 0,
      colour: 0,
    },
    { countryCode: 'SA', countryName: 'Saudi Arabia', total: 0, colour: 0 },
    { countryCode: 'SN', countryName: 'Senegal', total: 0, colour: 0 },
    { countryCode: 'RS', countryName: 'Serbia', total: 0, colour: 0 },
    { countryCode: 'SC', countryName: 'Seychelles', total: 0, colour: 0 },
    { countryCode: 'SL', countryName: 'Sierra Leone', total: 0, colour: 0 },
    { countryCode: 'SG', countryName: 'Singapore', total: 0, colour: 0 },
    { countryCode: 'SK', countryName: 'Slovakia', total: 0, colour: 0 },
    { countryCode: 'SI', countryName: 'Slovenia', total: 0, colour: 0 },
    { countryCode: 'SB', countryName: 'Solomon Islands', total: 0, colour: 0 },
    { countryCode: 'SO', countryName: 'Somalia', total: 0, colour: 0 },
    { countryCode: 'ZA', countryName: 'South Africa', total: 0, colour: 0 },
    {
      countryCode: 'GS',
      countryName: 'South Georgia And Sandwich Isl.',
      total: 0,
      colour: 0,
    },
    { countryCode: 'KR', countryName: 'South Korea', total: 0, colour: 0 },
    { countryCode: 'SS', countryName: 'South Sudan', total: 0, colour: 0 },
    { countryCode: 'ES', countryName: 'Spain', total: 0, colour: 0 },
    { countryCode: 'LK', countryName: 'Sri Lanka', total: 0, colour: 0 },
    { countryCode: 'SD', countryName: 'Sudan', total: 0, colour: 0 },
    { countryCode: 'SR', countryName: 'Suriname', total: 0, colour: 0 },
    {
      countryCode: 'SJ',
      countryName: 'Svalbard And Jan Mayen',
      total: 0,
      colour: 0,
    },
    { countryCode: 'SZ', countryName: 'Swaziland', total: 0, colour: 0 },
    { countryCode: 'SE', countryName: 'Sweden', total: 0, colour: 0 },
    { countryCode: 'CH', countryName: 'Switzerland', total: 0, colour: 0 },
    {
      countryCode: 'SY',
      countryName: 'Syria',
      total: 0,
      colour: 0,
    },
    { countryCode: 'TW', countryName: 'Taiwan', total: 0, colour: 0 },
    { countryCode: 'TJ', countryName: 'Tajikistan', total: 0, colour: 0 },
    { countryCode: 'TZ', countryName: 'Tanzania', total: 0, colour: 0 },
    { countryCode: 'TH', countryName: 'Thailand', total: 0, colour: 0 },
    { countryCode: 'TL', countryName: 'Timor-Leste', total: 0, colour: 0 },
    { countryCode: 'TG', countryName: 'Togo', total: 0, colour: 0 },
    { countryCode: 'TK', countryName: 'Tokelau', total: 0, colour: 0 },
    { countryCode: 'TO', countryName: 'Tonga', total: 0, colour: 0 },
    {
      countryCode: 'TT',
      countryName: 'Trinidad And Tobago',
      total: 0,
      colour: 0,
    },
    { countryCode: 'TN', countryName: 'Tunisia', total: 0, colour: 0 },
    { countryCode: 'TR', countryName: 'Turkey', total: 0, colour: 0 },
    { countryCode: 'TM', countryName: 'Turkmenistan', total: 0, colour: 0 },
    {
      countryCode: 'TC',
      countryName: 'Turks And Caicos Islands',
      total: 0,
      colour: 0,
    },
    { countryCode: 'TV', countryName: 'Tuvalu', total: 0, colour: 0 },
    { countryCode: 'UG', countryName: 'Uganda', total: 0, colour: 0 },
    { countryCode: 'UA', countryName: 'Ukraine', total: 0, colour: 0 },
    {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      total: 0,
      colour: 0,
    },
    { countryCode: 'GB', countryName: 'United Kingdom', total: 0, colour: 0 },
    { countryCode: 'US', countryName: 'United States', total: 0, colour: 0 },
    {
      countryCode: 'UM',
      countryName: 'United States Outlying Islands',
      total: 0,
      colour: 0,
    },
    { countryCode: 'UY', countryName: 'Uruguay', total: 0, colour: 0 },
    { countryCode: 'UZ', countryName: 'Uzbekistan', total: 0, colour: 0 },
    { countryCode: 'VU', countryName: 'Vanuatu', total: 0, colour: 0 },
    { countryCode: 'VE', countryName: 'Venezuela', total: 0, colour: 0 },
    { countryCode: 'VN', countryName: 'Vietnam', total: 0, colour: 0 },
    {
      countryCode: 'VG',
      countryName: 'Virgin Islands, British',
      total: 0,
      colour: 0,
    },
    {
      countryCode: 'VI',
      countryName: 'Virgin Islands, U.S.',
      total: 0,
      colour: 0,
    },
    {
      countryCode: 'WF',
      countryName: 'Wallis And Futuna',
      total: 0,
      colour: 0,
    },
    { countryCode: 'EH', countryName: 'Western Sahara', total: 0, colour: 0 },
    { countryCode: 'YE', countryName: 'Yemen', total: 0, colour: 0 },
    { countryCode: 'ZM', countryName: 'Zambia', total: 0, colour: 0 },
    { countryCode: 'ZW', countryName: 'Zimbabwe', total: 0, colour: 0 },
  ];
  const [countryState, setCountryState] = useState(defaultCountryState);
  const total = useRef(0);

  useEffect(() => {

    // TODO: abort controller stuff

  fetchEventSource('https://accelerator.thgaccess.com/events', {
    onmessage(event) {
      let message = JSON.parse(event.data);
      //console.log(message);
      handleMessage(message);
    },
    onerror(e) {
      console.error(e);
    },
    credentials: 'include',
  });

// return a signal.abort()
}, []);


  const handleMessage = event => {
    if (event && event.total_items_price) {
      const newTime = Date.now();
      const totalGbpPrice = event.total_items_price.gbp_value;
      //const channel = event.property.channel;
      const countryCode = event.shipping.country_code;
      total.current = total.current + totalGbpPrice;
      console.log(total.current);
      console.log(newTime - time);
      if (newTime - time < 180000) {
        let newCountryState = [...defaultCountryState];
        newCountryState.forEach(country => {
          if (country.countryCode === countryCode) {
            country.total = country.total + totalGbpPrice;
          }
        });
        setCountryState(newCountryState);
        //console.log(countryCode)
        console.log(
          countryState.filter(el => {
            return el.countryCode === countryCode;
          }),
        );
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <s.heading>
        <h1>LoveLace Dashboard</h1>
      </s.heading>
      <s.mapStyle>
        <MapChart defaultCountryData = {countryState}/>
      </s.mapStyle>
    </>
  );
};