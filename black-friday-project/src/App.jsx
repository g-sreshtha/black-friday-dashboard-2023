import { useState } from 'react'
import './App.css'
import { fetchEventSource } from '@microsoft/fetch-event-source';

function App() {
  const [count, setCount] = useState(0)
  //const [message, setMessage] = useState("")
  //const { fetchEventSource } = require("@microsoft/fetch-event-source");
  fetchEventSource("https://accelerator.thgaccess.com/events", {
    onmessage(event) {
      let message = JSON.parse(event.data);
     // setMessage(message);
      console.log(message);
     // processOrder(message);
    //  updateIcon("order");
    },
    //on open?
    onerror(e) {
      console.error(e);
    },
    credentials: "include",
  });
  function init(address) {
    const connection = new WebSocket(address + "?filter=orders");

    fetchEventSource("https://accelerator.thgaccess.com/events", {
      onmessage(event) {
        let message = JSON.parse(event.data);
       // setMessage(message);
        console.log(message);
       // processOrder(message);
      //  updateIcon("order");
      },
      //on open?
      onerror(e) {
        console.error(e);
      },
      credentials: "include",
    });

      // connection.onmessage = function (event) {
      //   let message = JSON.parse(event.data);
      //   console.log(message);
      //   if (message.subscription == "orders") {
      //     processOrder(message.message);
      //     updateIcon("order");
      //   } else if (message.subscription == "heartbeat") {
      //     lastHeartbeat = message;
      //     updateIcon("heartbeat");
      //   }
      // };
      // connection.onclose = function () {
      //   console.log("Attempting a reconnect of the ws");
      //   init();
      // };
  }

  // function processOrder(order) {
  //   const price = order.total_items_price;
  //   const divisionIndex = getDivisionFromChannel(order.property.channel);
  //   const mostRecent = document.querySelector(".most-recent");
  //   mostRecent.textContent = [
  //     Math.ceil(price.value),
  //     "on",
  //     order.property.channel,
  //     order.property.subsite ? order.property.subsite.toUpperCase() : "",
  //   ].join(" ");
  // }

  // const [ordersArray, setOrdersArray] = useState([]);

  // const handleMessage = (event) => {
  //   const parsed = JSON.parse(event.data);

  //   //may not be happening this time that the order doesn't have a total price
  //   //if it is a deleted order etc

  //   //below needs to go below "let message" line 8
  //   //get rid of const parsed above, change parsed into message below
  //   if (parsed.message && parsed.message.total_items_price) {
  //     const totalGbpPrice = parsed.message.total_items_price.gbp_value;
  //     const channel = parsed.message.property.channel;
  //     const countryCode = parsed.message.shipping.country_code;
  //     //might not need if not using logos
  //     //const siteID = parsed.message.property.site_id;

  //     setOrdersArray((prev) => {
  //       const timedArray = prev.sort(function (a, b) {
  //         return a.addedTime - b.addedTime;
  //       });

  //       const timeRange = timedArray[-1].addedTime - timedArray[0].addedTime;

  //       if (timeRange >= 6000000) {
  //         window.location.reload(true);
  //       } else {
  //         const order = {
  //           totalValue: 0,
  //           country: countryCode,
  //           brandName: channel,
  //           division: getDivisionFromChannel(channel),
  //           //siteID: siteID,
  //           //logo: "",
  //           addedTime: new Date().getTime(),
  //         };

  //         return [...prev, order];
  //       }
  //     });
  //   }
  // };

  // //To do : list comprehension on orders to sum up totals per country,
  // //per division, per brand
  // //for order in ordersArray
  // //useState/ref as an object where each country code get a total
  // //and a status (0) for the colour
  // //useState/ref for divisions
  // //useState/ref for brands

  // const countryState = [
  //   { AF: "Afghanistan", total: 0, colour: 0 },
  //   { AX: "Aland Islands", total: 0, colour: 0 },
  //   { AL: "Albania", total: 0, colour: 0 },
  //   { DZ: "Algeria", total: 0, colour: 0 },
  //   { AS: "American Samoa", total: 0, colour: 0 },
  //   { AD: "Andorra", total: 0, colour: 0 },
  //   { AO: "Angola", total: 0, colour: 0 },
  //   { AI: "Anguilla", total: 0, colour: 0 },
  //   { AQ: "Antarctica", total: 0, colour: 0 },
  //   { AG: "Antigua And Barbuda", total: 0, colour: 0 },
  //   { AR: "Argentina", total: 0, colour: 0 },
  //   { AM: "Armenia", total: 0, colour: 0 },
  //   { AW: "Aruba", total: 0, colour: 0 },
  //   { AU: "Australia", total: 0, colour: 0 },
  //   { AT: "Austria", total: 0, colour: 0 },
  //   { AZ: "Azerbaijan", total: 0, colour: 0 },
  //   { BS: "Bahamas", total: 0, colour: 0 },
  //   { BH: "Bahrain", total: 0, colour: 0 },
  //   { BD: "Bangladesh", total: 0, colour: 0 },
  //   { BB: "Barbados", total: 0, colour: 0 },
  //   { BY: "Belarus", total: 0, colour: 0 },
  //   { BE: "Belgium", total: 0, colour: 0 },
  //   { BZ: "Belize", total: 0, colour: 0 },
  //   { BJ: "Benin", total: 0, colour: 0 },
  //   { BM: "Bermuda", total: 0, colour: 0 },
  //   { BT: "Bhutan", total: 0, colour: 0 },
  //   { BO: "Bolivia", total: 0, colour: 0 },
  //   { BA: "Bosnia And Herzegovina", total: 0, colour: 0 },
  //   { BW: "Botswana", total: 0, colour: 0 },
  //   { BV: "Bouvet Island", total: 0, colour: 0 },
  //   { BR: "Brazil", total: 0, colour: 0 },
  //   { IO: "British Indian Ocean Territory", total: 0, colour: 0 },
  //   { BN: "Brunei Darussalam", total: 0, colour: 0 },
  //   { BG: "Bulgaria", total: 0, colour: 0 },
  //   { BF: "Burkina Faso", total: 0, colour: 0 },
  //   { BI: "Burundi", total: 0, colour: 0 },
  //   { KH: "Cambodia", total: 0, colour: 0 },
  //   { CM: "Cameroon", total: 0, colour: 0 },
  //   { CA: "Canada", total: 0, colour: 0 },
  //   { CV: "Cape Verde", total: 0, colour: 0 },
  //   { KY: "Cayman Islands", total: 0, colour: 0 },
  //   { CF: "Central African Republic", total: 0, colour: 0 },
  //   { TD: "Chad", total: 0, colour: 0 },
  //   { CL: "Chile", total: 0, colour: 0 },
  //   { CN: "China", total: 0, colour: 0 },
  //   { CX: "Christmas Island", total: 0, colour: 0 },
  //   { CC: "Cocos (Keeling) Islands", total: 0, colour: 0 },
  //   { CO: "Colombia", total: 0, colour: 0 },
  //   { KM: "Comoros", total: 0, colour: 0 },
  //   { CG: "Congo", total: 0, colour: 0 },
  //   { CD: "Congo, Democratic Republic", total: 0, colour: 0 },
  //   { CK: "Cook Islands", total: 0, colour: 0 },
  //   { CR: "Costa Rica", total: 0, colour: 0 },
  //   { CI: 'Cote D"Ivoire', total: 0, colour: 0 },
  //   { HR: "Croatia", total: 0, colour: 0 },
  //   { CU: "Cuba", total: 0, colour: 0 },
  //   { CY: "Cyprus", total: 0, colour: 0 },
  //   { CZ: "Czech Republic", total: 0, colour: 0 },
  //   { DK: "Denmark", total: 0, colour: 0 },
  //   { DJ: "Djibouti", total: 0, colour: 0 },
  //   { DM: "Dominica", total: 0, colour: 0 },
  //   { DO: "Dominican Republic", total: 0, colour: 0 },
  //   { EC: "Ecuador", total: 0, colour: 0 },
  //   { EG: "Egypt", total: 0, colour: 0 },
  //   { SV: "El Salvador", total: 0, colour: 0 },
  //   { GQ: "Equatorial Guinea", total: 0, colour: 0 },
  //   { ER: "Eritrea", total: 0, colour: 0 },
  //   { EE: "Estonia", total: 0, colour: 0 },
  //   { ET: "Ethiopia", total: 0, colour: 0 },
  //   { FK: "Falkland Islands (Malvinas)", total: 0, colour: 0 },
  //   { FO: "Faroe Islands", total: 0, colour: 0 },
  //   { FJ: "Fiji", total: 0, colour: 0 },
  //   { FI: "Finland", total: 0, colour: 0 },
  //   { FR: "France", total: 0, colour: 0 },
  //   { GF: "French Guiana", total: 0, colour: 0 },
  //   { PF: "French Polynesia", total: 0, colour: 0 },
  //   { TF: "French Southern Territories", total: 0, colour: 0 },
  //   { GA: "Gabon", total: 0, colour: 0 },
  //   { GM: "Gambia", total: 0, colour: 0 },
  //   { GE: "Georgia", total: 0, colour: 0 },
  //   { DE: "Germany", total: 0, colour: 0 },
  //   { GH: "Ghana", total: 0, colour: 0 },
  //   { GI: "Gibraltar", total: 0, colour: 0 },
  //   { GR: "Greece", total: 0, colour: 0 },
  //   { GL: "Greenland", total: 0, colour: 0 },
  //   { GD: "Grenada", total: 0, colour: 0 },
  //   { GP: "Guadeloupe", total: 0, colour: 0 },
  //   { GU: "Guam", total: 0, colour: 0 },
  //   { GT: "Guatemala", total: 0, colour: 0 },
  //   { GG: "Guernsey", total: 0, colour: 0 },
  //   { GN: "Guinea", total: 0, colour: 0 },
  //   { GW: "Guinea-Bissau", total: 0, colour: 0 },
  //   { GY: "Guyana", total: 0, colour: 0 },
  //   { HT: "Haiti", total: 0, colour: 0 },
  //   { HM: "Heard Island & Mcdonald Islands", total: 0, colour: 0 },
  //   { VA: "Holy See (Vatican City State)", total: 0, colour: 0 },
  //   { HN: "Honduras", total: 0, colour: 0 },
  //   { HK: "Hong Kong", total: 0, colour: 0 },
  //   { HU: "Hungary", total: 0, colour: 0 },
  //   { IS: "Iceland", total: 0, colour: 0 },
  //   { IN: "India", total: 0, colour: 0 },
  //   { ID: "Indonesia", total: 0, colour: 0 },
  //   { IR: "Iran, Islamic Republic Of", total: 0, colour: 0 },
  //   { IQ: "Iraq", total: 0, colour: 0 },
  //   { IE: "Ireland", total: 0, colour: 0 },
  //   { IM: "Isle Of Man", total: 0, colour: 0 },
  //   { IL: "Israel", total: 0, colour: 0 },
  //   { IT: "Italy", total: 0, colour: 0 },
  //   { JM: "Jamaica", total: 0, colour: 0 },
  //   { JP: "Japan", total: 0, colour: 0 },
  //   { JE: "Jersey", total: 0, colour: 0 },
  //   { JO: "Jordan", total: 0, colour: 0 },
  //   { KZ: "Kazakhstan", total: 0, colour: 0 },
  //   { KE: "Kenya", total: 0, colour: 0 },
  //   { KI: "Kiribati", total: 0, colour: 0 },
  //   { KR: "Korea", total: 0, colour: 0 },
  //   { KP: "North Korea", total: 0, colour: 0 },
  //   { KW: "Kuwait", total: 0, colour: 0 },
  //   { KG: "Kyrgyzstan", total: 0, colour: 0 },
  //   { LA: 'Lao People"s Democratic Republic', total: 0, colour: 0 },
  //   { LV: "Latvia", total: 0, colour: 0 },
  //   { LB: "Lebanon", total: 0, colour: 0 },
  //   { LS: "Lesotho", total: 0, colour: 0 },
  //   { LR: "Liberia", total: 0, colour: 0 },
  //   { LY: "Libyan Arab Jamahiriya", total: 0, colour: 0 },
  //   { LI: "Liechtenstein", total: 0, colour: 0 },
  //   { LT: "Lithuania", total: 0, colour: 0 },
  //   { LU: "Luxembourg", total: 0, colour: 0 },
  //   { MO: "Macao", total: 0, colour: 0 },
  //   { MK: "Macedonia", total: 0, colour: 0 },
  //   { MG: "Madagascar", total: 0, colour: 0 },
  //   { MW: "Malawi", total: 0, colour: 0 },
  //   { MY: "Malaysia", total: 0, colour: 0 },
  //   { MV: "Maldives", total: 0, colour: 0 },
  //   { ML: "Mali", total: 0, colour: 0 },
  //   { MT: "Malta", total: 0, colour: 0 },
  //   { MH: "Marshall Islands", total: 0, colour: 0 },
  //   { MQ: "Martinique", total: 0, colour: 0 },
  //   { MR: "Mauritania", total: 0, colour: 0 },
  //   { MU: "Mauritius", total: 0, colour: 0 },
  //   { YT: "Mayotte", total: 0, colour: 0 },
  //   { MX: "Mexico", total: 0, colour: 0 },
  //   { FM: "Micronesia, Federated States Of", total: 0, colour: 0 },
  //   { MD: "Moldova", total: 0, colour: 0 },
  //   { MC: "Monaco", total: 0, colour: 0 },
  //   { MN: "Mongolia", total: 0, colour: 0 },
  //   { ME: "Montenegro", total: 0, colour: 0 },
  //   { MS: "Montserrat", total: 0, colour: 0 },
  //   { MA: "Morocco", total: 0, colour: 0 },
  //   { MZ: "Mozambique", total: 0, colour: 0 },
  //   { MM: "Myanmar", total: 0, colour: 0 },
  //   { NA: "Namibia", total: 0, colour: 0 },
  //   { NR: "Nauru", total: 0, colour: 0 },
  //   { NP: "Nepal", total: 0, colour: 0 },
  //   { NL: "Netherlands", total: 0, colour: 0 },
  //   { AN: "Netherlands Antilles", total: 0, colour: 0 },
  //   { NC: "New Caledonia", total: 0, colour: 0 },
  //   { NZ: "New Zealand", total: 0, colour: 0 },
  //   { NI: "Nicaragua", total: 0, colour: 0 },
  //   { NE: "Niger", total: 0, colour: 0 },
  //   { NG: "Nigeria", total: 0, colour: 0 },
  //   { NU: "Niue", total: 0, colour: 0 },
  //   { NF: "Norfolk Island", total: 0, colour: 0 },
  //   { MP: "Northern Mariana Islands", total: 0, colour: 0 },
  //   { NO: "Norway", total: 0, colour: 0 },
  //   { OM: "Oman", total: 0, colour: 0 },
  //   { PK: "Pakistan", total: 0, colour: 0 },
  //   { PW: "Palau", total: 0, colour: 0 },
  //   { PS: "Palestinian Territory, Occupied", total: 0, colour: 0 },
  //   { PA: "Panama", total: 0, colour: 0 },
  //   { PG: "Papua New Guinea", total: 0, colour: 0 },
  //   { PY: "Paraguay", total: 0, colour: 0 },
  //   { PE: "Peru", total: 0, colour: 0 },
  //   { PH: "Philippines", total: 0, colour: 0 },
  //   { PN: "Pitcairn", total: 0, colour: 0 },
  //   { PL: "Poland", total: 0, colour: 0 },
  //   { PT: "Portugal", total: 0, colour: 0 },
  //   { PR: "Puerto Rico", total: 0, colour: 0 },
  //   { QA: "Qatar", total: 0, colour: 0 },
  //   { RE: "Reunion", total: 0, colour: 0 },
  //   { RO: "Romania", total: 0, colour: 0 },
  //   { RU: "Russian Federation", total: 0, colour: 0 },
  //   { RW: "Rwanda", total: 0, colour: 0 },
  //   { BL: "Saint Barthelemy", total: 0, colour: 0 },
  //   { SH: "Saint Helena", total: 0, colour: 0 },
  //   { KN: "Saint Kitts And Nevis", total: 0, colour: 0 },
  //   { LC: "Saint Lucia", total: 0, colour: 0 },
  //   { MF: "Saint Martin", total: 0, colour: 0 },
  //   { PM: "Saint Pierre And Miquelon", total: 0, colour: 0 },
  //   { VC: "Saint Vincent And Grenadines", total: 0, colour: 0 },
  //   { WS: "Samoa", total: 0, colour: 0 },
  //   { SM: "San Marino", total: 0, colour: 0 },
  //   { ST: "Sao Tome And Principe", total: 0, colour: 0 },
  //   { SA: "Saudi Arabia", total: 0, colour: 0 },
  //   { SN: "Senegal", total: 0, colour: 0 },
  //   { RS: "Serbia", total: 0, colour: 0 },
  //   { SC: "Seychelles", total: 0, colour: 0 },
  //   { SL: "Sierra Leone", total: 0, colour: 0 },
  //   { SG: "Singapore", total: 0, colour: 0 },
  //   { SK: "Slovakia", total: 0, colour: 0 },
  //   { SI: "Slovenia", total: 0, colour: 0 },
  //   { SB: "Solomon Islands", total: 0, colour: 0 },
  //   { SO: "Somalia", total: 0, colour: 0 },
  //   { ZA: "South Africa", total: 0, colour: 0 },
  //   { GS: "South Georgia And Sandwich Isl.", total: 0, colour: 0 },
  //   { ES: "Spain", total: 0, colour: 0 },
  //   { LK: "Sri Lanka", total: 0, colour: 0 },
  //   { SD: "Sudan", total: 0, colour: 0 },
  //   { SR: "Suriname", total: 0, colour: 0 },
  //   { SJ: "Svalbard And Jan Mayen", total: 0, colour: 0 },
  //   { SZ: "Swaziland", total: 0, colour: 0 },
  //   { SE: "Sweden", total: 0, colour: 0 },
  //   { CH: "Switzerland", total: 0, colour: 0 },
  //   { SY: "Syrian Arab Republic", total: 0, colour: 0 },
  //   { TW: "Taiwan", total: 0, colour: 0 },
  //   { TJ: "Tajikistan", total: 0, colour: 0 },
  //   { TZ: "Tanzania", total: 0, colour: 0 },
  //   { TH: "Thailand", total: 0, colour: 0 },
  //   { TL: "Timor-Leste", total: 0, colour: 0 },
  //   { TG: "Togo", total: 0, colour: 0 },
  //   { TK: "Tokelau", total: 0, colour: 0 },
  //   { TO: "Tonga", total: 0, colour: 0 },
  //   { TT: "Trinidad And Tobago", total: 0, colour: 0 },
  //   { TN: "Tunisia", total: 0, colour: 0 },
  //   { TR: "Turkey", total: 0, colour: 0 },
  //   { TM: "Turkmenistan", total: 0, colour: 0 },
  //   { TC: "Turks And Caicos Islands", total: 0, colour: 0 },
  //   { TV: "Tuvalu", total: 0, colour: 0 },
  //   { UG: "Uganda", total: 0, colour: 0 },
  //   { UA: "Ukraine", total: 0, colour: 0 },
  //   { AE: "United Arab Emirates", total: 0, colour: 0 },
  //   { GB: "United Kingdom", total: 0, colour: 0 },
  //   { US: "United States", total: 0, colour: 0 },
  //   { UM: "United States Outlying Islands", total: 0, colour: 0 },
  //   { UY: "Uruguay", total: 0, colour: 0 },
  //   { UZ: "Uzbekistan", total: 0, colour: 0 },
  //   { VU: "Vanuatu", total: 0, colour: 0 },
  //   { VE: "Venezuela", total: 0, colour: 0 },
  //   { VN: "Vietnam", total: 0, colour: 0 },
  //   { VG: "Virgin Islands, British", total: 0, colour: 0 },
  //   { VI: "Virgin Islands, U.S.", total: 0, colour: 0 },
  //   { WF: "Wallis And Futuna", total: 0, colour: 0 },
  //   { EH: "Western Sahara", total: 0, colour: 0 },
  //   { YE: "Yemen", total: 0, colour: 0 },
  //   { ZM: "Zambia", total: 0, colour: 0 },
  //   { ZW: "Zimbabwe", total: 0, colour: 0 },
  // ];

  // //0 - nutrition, 1 - beauty, 2 - lifestyle
  // //check if all channel names are correct
  // function getDivisionFromChannel(channel) {
  //   const channelMapping = {
  //     myprotein: 0,
  //     myvegan: 0,
  //     massint: 0,
  //     myvitamins: 0,
  //     idealshape: 0,
  //     idealfit: 0,
  //     exante: 0,
  //     idealraw: 0,
  //     exante: 0,

  //     espa: 1,
  //     mio: 1,
  //     growgorgeous: 1,
  //     mious: 1,
  //     illamasqua: 1,
  //     lfint: 1,
  //     skinstore: 1,
  //     beautyexpert: 1,
  //     mankind: 1,
  //     hqhair: 1,
  //     skincarerx: 1,
  //     ryint: 1,
  //     glossybox: 1,
  //     facial: 1,

  //     ameliorate: 1,
  //     beautyexpert: 1,
  //     christopherobin: 1,
  //     cultbeauty: 1,
  //     dermstore: 1,
  //     eyeko: 1,
  //     glossyboxskincare: 1,
  //     lookfantastic: 1,
  //     mamamio: 1,
  //     minimio: 1,
  //     perriconeMD: 1,

  //     probike: 2,
  //     zavvi: 2,
  //     iwoot: 2,
  //     popinabox: 2,
  //     mygeekbox: 2,
  //     ninint: 2,
  //     eaint: 2,
  //     honda: 2,
  //     thehut: 2,
  //     coggles: 2,
  //     mybag: 2,
  //     allsole: 2,
  //     arrow: 2,
  //     coggles: 2,
  //     mybag: 2,
  //     preloved: 2,
  //     MP: 2,
  //   };

  //   //if channel is in the list, get the division number
  //   if (Object.keys(channelMapping).indexOf(channel) > -1) {
  //     return channelMapping[channel];
  //   } else {
  //     return 2;
  //   }
  // }

  // //logos
  // const imgDir = "./assets/brandlogos/";

  // // const BrandData = [
  // //   {
  // //     siteName: "Allsole",
  // //     siteID: 53,
  // //     img: require(imgDir + "allsoleLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "The Hut",
  // //     siteID: 79,
  // //     img: require(imgDir + "theHutLogo.png"),
  // //   },
  // //   {
  // //     siteName: "MyProtein",
  // //     siteID: 83,
  // //     img: require(imgDir + "myProteinLogo.png"),
  // //   },
  // //   {
  // //     siteName: "MyVitamins",
  // //     siteID: 86,
  // //     img: require(imgDir + "myVitaminsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Pro Bike Kit",
  // //     siteID: 90,
  // //     img: require(imgDir + "proBikeKitLogo.png"),
  // //   },
  // //   {
  // //     siteName: "IWOOT",
  // //     siteID: 92,
  // //     img: require(imgDir + "iwootLogo.png"),
  // //   },
  // //   {
  // //     siteName: "exante",
  // //     siteID: 93,
  // //     img: require(imgDir + "exanteLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Coggles",
  // //     siteID: 94,
  // //     img: require(imgDir + "cogglesLogo.png"),
  // //   },
  // //   {
  // //     siteName: "LOOKFANTASTIC",
  // //     siteID: 95,
  // //     img: require(imgDir + "look-fantastic-logo.png"),
  // //   },
  // //   {
  // //     siteName: "Zavvi",
  // //     siteID: 96,
  // //     img: require(imgDir + "zavviLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Mankind",
  // //     siteID: 99,
  // //     img: require(imgDir + "mankindLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Mass",
  // //     siteID: 101,
  // //     img: require(imgDir + "massLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Powerman",
  // //     siteID: 104,
  // //     img: require(imgDir + "powermanLogo.png"),
  // //   },
  // //   {
  // //     siteName: "HQHair International",
  // //     siteID: 105,
  // //     img: require(imgDir + "hqhairLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Beauty Expert",
  // //     siteID: 106,
  // //     img: require(imgDir + "beautyExpertLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "MyBag",
  // //     siteID: 107,
  // //     img: require(imgDir + "mybagLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Pop In A Box",
  // //     siteID: 111,
  // //     img: require(imgDir + "popInABoxLogo.png"),
  // //   },
  // //   {
  // //     siteName: "My Geek Box",
  // //     siteID: 112,
  // //     img: require(imgDir + "myGeekBoxLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Mio Skincare",
  // //     siteID: 114,
  // //     img: require(imgDir + "mioSkincareLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Honda",
  // //     siteID: 119,
  // //     img: require(imgDir + "hondaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Grow Gorgeous ",
  // //     siteID: 120,
  // //     img: require(imgDir + "growGorgeousLogo.png"),
  // //   },
  // //   {
  // //     siteName: "SkinStore",
  // //     siteID: 121,
  // //     img: require(imgDir + "skinstoreLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "IdealFit",
  // //     siteID: 125,
  // //     img: require(imgDir + "idealfitLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "SkinCareRX",
  // //     siteID: 128,
  // //     img: require(imgDir + "skincarerxLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "GLOSSYBOX",
  // //     siteID: 129,
  // //     img: require(imgDir + "glossyBoxLogo.png"),
  // //   },
  // //   {
  // //     siteName: "RY",
  // //     siteID: 132,
  // //     img: require(imgDir + "ryLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "FacialCo",
  // //     siteID: 133,
  // //     img: require(imgDir + "facialcoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Illamasqua",
  // //     siteID: 134,
  // //     img: require(imgDir + "illamasquaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "ESPA",
  // //     siteID: 135,
  // //     img: require(imgDir + "espaLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "IdealEssentials",
  // //     siteID: 137,
  // //     img: require(imgDir + "idealEssentialsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Eyeko",
  // //     siteID: 138,
  // //     img: require(imgDir + "eyekoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Breeders",
  // //     siteID: 141,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Owners",
  // //     siteID: 143,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Ameliorate",
  // //     siteID: 145,
  // //     img: require(imgDir + "ameliorateLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Christophe Robin",
  // //     siteID: 146,
  // //     img: require(imgDir + "christopheRobinLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Gillette",
  // //     siteID: 147,
  // //     img: require(imgDir + "gilletteLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Myvegan",
  // //     siteID: 149,
  // //     img: require(imgDir + "myVeganLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Garden Of Life",
  // //     siteID: 153,
  // //     img: require(imgDir + "gardenOfLifeLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Breeders Beta",
  // //     siteID: 154,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "No7",
  // //     siteID: 155,
  // //     img: require(imgDir + "no7Logo.png"),
  // //   },
  // //   {
  // //     siteName: "Oral B",
  // //     siteID: 159,
  // //     img: require(imgDir + "oralBLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Optifast",
  // //     siteID: 161,
  // //     img: require(imgDir + "optifastLogo.webp"),
  // //   },
  // //   { siteName: "MP", siteID: 162, img: require(imgDir + "mpLogo.png") },
  // //   {
  // //     siteName: "Mercedes Benz Formula E",
  // //     siteID: 163,
  // //     img: require(imgDir + "mercedesBenzFormulaELogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Burt's Bees",
  // //     siteID: 164,
  // //     img: require(imgDir + "burtsBeesLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Elemis",
  // //     siteID: 165,
  // //     img: require(imgDir + "elemisLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Direct",
  // //     siteID: 166,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Braun",
  // //     siteID: 167,
  // //     img: require(imgDir + "braunLogo.svg"),
  // //   },
  // //   {
  // //     siteName: "Minami",
  // //     siteID: 168,
  // //     img: require(imgDir + "minamiLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Klean Athlete",
  // //     siteID: 169,
  // //     img: require(imgDir + "kleanAthleteLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Nuxe",
  // //     siteID: 170,
  // //     img: require(imgDir + "nuxeLogo.png"),
  // //   },
  // //   {
  // //     siteName: "VeryNeko",
  // //     siteID: 173,
  // //     img: require(imgDir + "veryNekoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Perricone MD",
  // //     siteID: 180,
  // //     img: require(imgDir + "perriconeMDLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Homebase",
  // //     siteID: 182,
  // //     img: require(imgDir + "homebaseLogo.gif"),
  // //   },
  // //   {
  // //     siteName: "Every Health",
  // //     siteID: 184,
  // //     img: require(imgDir + "everyHealthLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Revolution Beauty",
  // //     siteID: 185,
  // //     img: require(imgDir + "revolutionLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Omorovicza",
  // //     siteID: 189,
  // //     img: require(imgDir + "omorovicsaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Your Coca-Cola",
  // //     siteID: 190,
  // //     img: require(imgDir + "yourCocaColaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "SpoonfulOne",
  // //     siteID: 191,
  // //     img: require(imgDir + "spoonfulOneLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Antipodes",
  // //     siteID: 194,
  // //     img: require(imgDir + "antipodesLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Acnecide",
  // //     siteID: 195,
  // //     img: require(imgDir + "acnecideLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Vita Coco",
  // //     siteID: 197,
  // //     img: require(imgDir + "vitaCocoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Vital Proteins",
  // //     siteID: 198,
  // //     img: require(imgDir + "vitalProteinsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Pro Plan",
  // //     siteID: 200,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Vet",
  // //     siteID: 201,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Purina Vet IVC",
  // //     siteID: 207,
  // //     img: require(imgDir + "purinaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Dermstore",
  // //     siteID: 208,
  // //     img: require(imgDir + "dermstoreLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Jack Wills",
  // //     siteID: 209,
  // //     img: require(imgDir + "jackWillsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Lancer Skincare",
  // //     siteID: 210,
  // //     img: require(imgDir + "lancerSkincareLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Creed",
  // //     siteID: 216,
  // //     img: require(imgDir + "creedLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Bathstore",
  // //     siteID: 217,
  // //     img: require(imgDir + "bathstoreLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Erborian",
  // //     siteID: 218,
  // //     img: require(imgDir + "erborianLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Team Command",
  // //     siteID: 222,
  // //     img: require(imgDir + "teamCommandLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Morvelo",
  // //     siteID: 223,
  // //     img: require(imgDir + "morveloLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Orlebar Brown",
  // //     siteID: 224,
  // //     img: require(imgDir + "orlebarBrownLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Endura Sport",
  // //     siteID: 225,
  // //     img: require(imgDir + "enduraSportLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Sukin Naturals",
  // //     siteID: 228,
  // //     img: require(imgDir + "sukinNaturalsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Arrow Films",
  // //     siteID: 230,
  // //     img: require(imgDir + "arrowFilmsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Clink Spirit",
  // //     siteID: 231,
  // //     img: require(imgDir + "clinkSpiritLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Kellica",
  // //     siteID: 233,
  // //     img: require(imgDir + "kellicaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "SpectriSKIN",
  // //     siteID: 234,
  // //     img: require(imgDir + "spectriSkinLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Zyn",
  // //     siteID: 236,
  // //     img: require(imgDir + "zynLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Lor Espresso",
  // //     siteID: 238,
  // //     img: require(imgDir + "lorEspressoLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Toblerone",
  // //     siteID: 239,
  // //     img: require(imgDir + "tobleroneLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Croquons La Vie",
  // //     siteID: 240,
  // //     img: require(imgDir + "croquonsLaVieLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Speedo",
  // //     siteID: 241,
  // //     img: require(imgDir + "speedoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Mama Mio",
  // //     siteID: 244,
  // //     img: require(imgDir + "mamaMioLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Melvita",
  // //     siteID: 246,
  // //     img: require(imgDir + "melvitaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Berghaus",
  // //     siteID: 248,
  // //     img: require(imgDir + "berghausLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Comvita",
  // //     siteID: 249,
  // //     img: require(imgDir + "comvitaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Andalou Naturals",
  // //     siteID: 251,
  // //     img: require(imgDir + "andalouNaturalsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Clogau Outlet",
  // //     siteID: 253,
  // //     img: require(imgDir + "clogauOutletLogo.png"),
  // //   },
  // //   {
  // //     siteName: "SFI Health",
  // //     siteID: 254,
  // //     img: require(imgDir + "sfiHealthLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Kickers",
  // //     siteID: 255,
  // //     img: require(imgDir + "kickersLogo.gif"),
  // //   },
  // //   {
  // //     siteName: "THG Training",
  // //     siteID: 256,
  // //     img: require(imgDir + "thgLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Cult Beauty",
  // //     siteID: 257,
  // //     img: require(imgDir + "cultBeautyLogo.png"),
  // //   },
  // //   {
  // //     siteName: "HandmadeSoapCompany",
  // //     siteID: 259,
  // //     img: require(imgDir + "handmadeSoapCompanyLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Ellesse",
  // //     siteID: 261,
  // //     img: require(imgDir + "ellesseLogo.png"),
  // //   },
  // //   {
  // //     siteName: "11 Degrees",
  // //     siteID: 262,
  // //     img: require(imgDir + "11DegreesLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Natures Truth",
  // //     siteID: 263,
  // //     img: require(imgDir + "naturesTruthLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Canterbury",
  // //     siteID: 265,
  // //     img: require(imgDir + "canterburyLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Pureis CBD",
  // //     siteID: 266,
  // //     img: require(imgDir + "pureisCBDLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Unishop",
  // //     siteID: 267,
  // //     img: require(imgDir + "unishopLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Wella",
  // //     siteID: 268,
  // //     img: require(imgDir + "wellaLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "MyPro",
  // //     siteID: 271,
  // //     img: require(imgDir + "myProLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Revlon",
  // //     siteID: 272,
  // //     img: require(imgDir + "revlonLogo.png"),
  // //   },
  // //   {
  // //     siteName: "The Unexpekted",
  // //     siteID: 273,
  // //     img: require(imgDir + "theUnexpektedLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Amika",
  // //     siteID: 276,
  // //     img: require(imgDir + "amikaLogo.png"),
  // //   },
  // //   {
  // //     siteName: "BeNu",
  // //     siteID: 277,
  // //     img: require(imgDir + "benuLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Dr Brandt",
  // //     siteID: 278,
  // //     img: require(imgDir + "drBrandtLogo.png"),
  // //   },
  // //   {
  // //     siteName: "HPE Activewear",
  // //     siteID: 279,
  // //     img: require(imgDir + "hpeActivewearLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Athletia Beauty",
  // //     siteID: 280,
  // //     img: require(imgDir + "athletiaBeautyLogo.png"),
  // //   },
  // //   {
  // //     siteName: "David Gandy Wellwear",
  // //     siteID: 283,
  // //     img: require(imgDir + "davidGandyWellwearLogo.png"),
  // //   },
  // //   {
  // //     siteName: "TRR Nutrition",
  // //     siteID: 284,
  // //     img: require(imgDir + "trrNutritionLogo.png"),
  // //   },
  // //   {
  // //     siteName: "LQ Collagen",
  // //     siteID: 285,
  // //     img: require(imgDir + "lqCollagenLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Filorga",
  // //     siteID: 286,
  // //     img: require(imgDir + "filorgaLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Frank Body",
  // //     siteID: 289,
  // //     img: require(imgDir + "frankBodyLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "By Terry",
  // //     siteID: 290,
  // //     img: require(imgDir + "byTerryLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Bonraw Foods",
  // //     siteID: 292,
  // //     img: require(imgDir + "bonrawFoodsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Precision Biotics",
  // //     siteID: 293,
  // //     img: require(imgDir + "precisionBioticsLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "ORA Skincare",
  // //     siteID: 295,
  // //     img: require(imgDir + "oraSkincareLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Mighty",
  // //     siteID: 296,
  // //     img: require(imgDir + "mightyLogo.png"),
  // //   },
  // //   {
  // //     siteName: "PN Selfcare",
  // //     siteID: 297,
  // //     img: require(imgDir + "pnSelfcareLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Baby & Me",
  // //     siteID: 299,
  // //     img: require(imgDir + "babyAndMeLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Artdeco Cosmetics",
  // //     siteID: 303,
  // //     img: require(imgDir + "artdecoCosmeticsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Puritan's Pride",
  // //     siteID: 304,
  // //     img: require(imgDir + "puritansPrideLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Plenaire",
  // //     siteID: 305,
  // //     img: require(imgDir + "plenaireLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Gearbox",
  // //     siteID: 306,
  // //     img: require(imgDir + "gearboxLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Jersey Hemp",
  // //     siteID: 307,
  // //     img: require(imgDir + "jerseyHempLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Boostball",
  // //     siteID: 309,
  // //     img: require(imgDir + "boostballLogo.png"),
  // //   },
  // //   {
  // //     siteName: "ACO",
  // //     siteID: 310,
  // //     img: require(imgDir + "acoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Molton Brown",
  // //     siteID: 311,
  // //     img: require(imgDir + "moltonBrownLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Bimuno",
  // //     siteID: 312,
  // //     img: require(imgDir + "bimunoLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Nutrimuscle",
  // //     siteID: 313,
  // //     img: require(imgDir + "nutrimuscleLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Shiro",
  // //     siteID: 315,
  // //     img: require(imgDir + "shiroLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Indie Lee",
  // //     siteID: 316,
  // //     img: require(imgDir + "indieLeeLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Rock and Roll Beauty",
  // //     siteID: 317,
  // //     img: require(imgDir + "rockAndRollBeautyLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Myrkl",
  // //     siteID: 318,
  // //     img: require(imgDir + "myrklLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Bio-Kult",
  // //     siteID: 320,
  // //     img: require(imgDir + "bioKultLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Fibre One",
  // //     siteID: 324,
  // //     img: require(imgDir + "fibreOneLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Begg x Co",
  // //     siteID: 326,
  // //     img: require(imgDir + "beggxcoLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Millican",
  // //     siteID: 327,
  // //     img: require(imgDir + "millicanLogo.webp"),
  // //   },
  // //   {
  // //     siteName: "Inika Superfoods",
  // //     siteID: 328,
  // //     img: require(imgDir + "inikaSuperfoodsLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Prolong",
  // //     siteID: 329,
  // //     img: require(imgDir + "prolongLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Drybar",
  // //     siteID: 330,
  // //     img: require(imgDir + "drybarLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "BH Cosmetics",
  // //     siteID: 331,
  // //     img: require(imgDir + "bhCosmeticsLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Korres",
  // //     siteID: 334,
  // //     img: require(imgDir + "korresLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Oneskee",
  // //     siteID: 337,
  // //     img: require(imgDir + "oneskeeLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Born Primitive",
  // //     siteID: 338,
  // //     img: require(imgDir + "bornPrimitiveLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Sknhead",
  // //     siteID: 339,
  // //     img: require(imgDir + "sknheadLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Celebrity Slim",
  // //     siteID: 341,
  // //     img: require(imgDir + "celebritySlimLogo.png"),
  // //   },
  // //   {
  // //     siteName: "Anastasia BH",
  // //     siteID: 344,
  // //     img: require(imgDir + "anastasiaBHLogo.jpeg"),
  // //   },
  // //   {
  // //     siteName: "Movementum",
  // //     siteID: 347,
  // //     img: require(imgDir + "movementumLogo.png"),
  // //   },
  // //   {
  // //     siteName: "About Time We Met",
  // //     siteID: 351,
  // //     img: require(imgDir + "aboutTimeWeMetLogo.jpeg"),
  // //   },
  // // ];

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Test</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <div>
          {message}
        </div> */}
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
