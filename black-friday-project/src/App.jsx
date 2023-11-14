import { useState, useRef } from 'react'
import './App.css'
import { fetchEventSource } from '@microsoft/fetch-event-source';

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [ordersArray, setOrdersArray] = useState([]);
  const [timeRange, setTimeRange] = useState(0);
  const total = useRef(0);
  fetchEventSource("https://accelerator.thgaccess.com/events", {
    onmessage(event) {
      let message = JSON.parse(event.data);
      //setMessage(message.id);
      //console.log(message);
      handleMessage(message);
    //updateIcon("order");
    },
    //on open?
    onerror(e) {
      console.error(e);
    },
    credentials: "include",
  });
  //     connection.onmessage = function (event) {
  //       let message = JSON.parse(event.data);
  //       console.log(message);
  //       if (message.subscription == "orders") {
  //         processOrder(message.message);
  //         updateIcon("order");
  //       } else if (message.subscription == "heartbeat") {
  //         lastHeartbeat = message;
  //         updateIcon("heartbeat");
  //       }
  //     };
  //     connection.onclose = function () {
  //       console.log("Attempting a reconnect of the ws");
  //       init();
  //     };
  
  // function processOrder(order) {
  //   const price = order.total_items_price;
  //   //const divisionIndex = getDivisionFromChannel(order.property.channel);
  //   const mostRecent = document.querySelector(".most-recent");
  //   mostRecent.textContent = [
  //     Math.ceil(price.value),
  //     "on",
  //     order.property.channel,
  //     order.property.subsite ? order.property.subsite.toUpperCase() : "",
  //   ].join(" ");
  // }

  const handleMessage = (event) => {
    //may not be happening this time that the order doesn't have a total price
    //if it is a deleted order etc

    //below might go below "let message" line 8
    if (event && event.total_items_price) {
      const totalGbpPrice = event.total_items_price.gbp_value;
      const channel = event.property.channel;
      const countryCode = event.shipping.country_code;
      //might not need if not using logos
      //const siteID = parsed.message.property.site_id;
      total.current = total.current + totalGbpPrice;
      // console.log(total);
      // defaultCountryState[countryCode].total.current += totalGbpPrice;
      // for (var object in defaultCountryState.current) {
      //   console.log(defaultCountryState.current[object].)
      // }
      console.log(defaultCountryState.current[200].countryCode)


      // setOrdersArray((prev) => {
      //   console.log(ordersArray.length)

      //   if (channel !== "pmint" && ordersArray.length !== 0 
      //     && timeRange >= 6000000) 
      //     {
      //     window.location.reload(true);
      //     return;
      //   } else {
      //     if (channel !== "pmint" && ordersArray.length <= 2) {
      //       const order = {
      //         totalValue: 0,
      //         country: countryCode,
      //         brandName: channel,
      //         division: getDivisionFromChannel(channel),
      //         //siteID: siteID,
      //         //logo: "",
      //         timestamp: new Date().getTime(),
      //       };
      //       return [...prev, order];
      //     } else {
      //       while (channel !== "pmint" && ordersArray.length > 2 && ordersArray.length <= 100) {
      //       const order = {
      //         totalValue: 0,
      //         country: countryCode,
      //         brandName: channel,
      //         division: getDivisionFromChannel(channel),
      //         //siteID: siteID,
      //         //logo: "",
      //         timestamp: new Date().getTime(),
      //       };

      //       const timedArray = prev.sort(function (a, b) {
      //         return a.timestamp - b.timestamp;
      //       });
      //       console.log(timedArray[0].timestamp)
      //       //console.log(ordersArray.length)
  
      //       setTimeRange(timedArray[timedArray.length-1].timestamp - timedArray[0].timestamp);
  
      //       return [...prev, order];
      //     }}       
      //   }
      // });
    }
  };

  //To do : list comprehension on orders to sum up totals per country,
  //per division, per brand
  //for order in ordersArray
  //useState/ref as an object where each country code get a total
  //and a status (0) for the colour
  //useState/ref for divisions
  //useState/ref for brands

  const defaultCountryState = useRef([
    { countryCode: "AF", countryName: "Afghanistan", total: 0, colour: 0 },
    { countryCode: "AX", countryName: "Aland Islands", total: 0, colour: 0 },
    { countryCode: "AL", countryName: "Albania", total: 0, colour: 0 },
    { countryCode: "DZ", countryName: "Algeria", total: 0, colour: 0 },
    { countryCode: "AS", countryName: "American Samoa", total: 0, colour: 0 },
    { countryCode: "AD", countryName: "Andorra", total: 0, colour: 0 },
    { countryCode: "AO", countryName: "Angola", total: 0, colour: 0 },
    { countryCode: "AI", countryName: "Anguilla", total: 0, colour: 0 },
    { countryCode: "AQ", countryName: "Antarctica", total: 0, colour: 0 },
    { countryCode: "AG", countryName: "Antigua And Barbuda", total: 0, colour: 0 },
    { countryCode: "AR", countryName: "Argentina", total: 0, colour: 0 },
    { countryCode: "AM", countryName: "Armenia", total: 0, colour: 0 },
    { countryCode: "AW", countryName: "Aruba", total: 0, colour: 0 },
    { countryCode: "AU", countryName: "Australia", total: 0, colour: 0 },
    { countryCode: "AT", countryName: "Austria", total: 0, colour: 0 },
    { countryCode: "AZ", countryName: "Azerbaijan", total: 0, colour: 0 },
    { countryCode: "BS", countryName: "Bahamas", total: 0, colour: 0 },
    { countryCode: "BH", countryName: "Bahrain", total: 0, colour: 0 },
    { countryCode: "BD", countryName: "Bangladesh", total: 0, colour: 0 },
    { countryCode: "BB", countryName: "Barbados", total: 0, colour: 0 },
    { countryCode: "BY", countryName: "Belarus", total: 0, colour: 0 },
    { countryCode: "BE", countryName: "Belgium", total: 0, colour: 0 },
    { countryCode: "BZ", countryName: "Belize", total: 0, colour: 0 },
    { countryCode: "BJ", countryName: "Benin", total: 0, colour: 0 },
    { countryCode: "BM", countryName: "Bermuda", total: 0, colour: 0 },
    { countryCode: "BT", countryName: "Bhutan", total: 0, colour: 0 },
    { countryCode: "BO", countryName: "Bolivia", total: 0, colour: 0 },
    { countryCode: "BA", countryName: "Bosnia And Herzegovina", total: 0, colour: 0 },
    { countryCode: "BW", countryName: "Botswana", total: 0, colour: 0 },
    { countryCode: "BV", countryName: "Bouvet Island", total: 0, colour: 0 },
    { countryCode: "BR", countryName: "Brazil", total: 0, colour: 0 },
    { countryCode: "IO", countryName: "British Indian Ocean Territory", total: 0, colour: 0 },
    { countryCode: "BN", countryName: "Brunei Darussalam", total: 0, colour: 0 },
    { countryCode: "BG", countryName: "Bulgaria", total: 0, colour: 0 },
    { countryCode: "BF", countryName: "Burkina Faso", total: 0, colour: 0 },
    { countryCode: "BI", countryName: "Burundi", total: 0, colour: 0 },
    { countryCode: "KH", countryName: "Cambodia", total: 0, colour: 0 },
    { countryCode: "CM", countryName: "Cameroon", total: 0, colour: 0 },
    { countryCode: "CA", countryName: "Canada", total: 0, colour: 0 },
    { countryCode: "CV", countryName: "Cape Verde", total: 0, colour: 0 },
    { countryCode: "KY", countryName: "Cayman Islands", total: 0, colour: 0 },
    { countryCode: "CF", countryName: "Central African Republic", total: 0, colour: 0 },
    { countryCode: "TD", countryName: "Chad", total: 0, colour: 0 },
    { countryCode: "CL", countryName: "Chile", total: 0, colour: 0 },
    { countryCode: "CN", countryName: "China", total: 0, colour: 0 },
    { countryCode: "CX", countryName: "Christmas Island", total: 0, colour: 0 },
    { countryCode: "CC", countryName: "Cocos (Keeling) Islands", total: 0, colour: 0 },
    { countryCode: "CO", countryName: "Colombia", total: 0, colour: 0 },
    { countryCode: "KM", countryName: "Comoros", total: 0, colour: 0 },
    { countryCode: "CG", countryName: "Congo", total: 0, colour: 0 },
    { countryCode: "CD", countryName: "Congo, Democratic Republic", total: 0, colour: 0 },
    { countryCode: "CK", countryName: "Cook Islands", total: 0, colour: 0 },
    { countryCode: "CR", countryName: "Costa Rica", total: 0, colour: 0 },
    { countryCode: "CI", countryName: 'Cote D"Ivoire', total: 0, colour: 0 },
    { countryCode: "HR", countryName: "Croatia", total: 0, colour: 0 },
    { countryCode: "CU", countryName: "Cuba", total: 0, colour: 0 },
    { countryCode: "CY", countryName: "Cyprus", total: 0, colour: 0 },
    { countryCode: "CZ", countryName: "Czech Republic", total: 0, colour: 0 },
    { countryCode: "DK", countryName: "Denmark", total: 0, colour: 0 },
    { countryCode: "DJ", countryName: "Djibouti", total: 0, colour: 0 },
    { countryCode: "DM", countryName: "Dominica", total: 0, colour: 0 },
    { countryCode: "DO", countryName: "Dominican Republic", total: 0, colour: 0 },
    { countryCode: "EC", countryName: "Ecuador", total: 0, colour: 0 },
    { countryCode: "EG", countryName: "Egypt", total: 0, colour: 0 },
    { countryCode: "SV", countryName: "El Salvador", total: 0, colour: 0 },
    { countryCode: "GQ", countryName: "Equatorial Guinea", total: 0, colour: 0 },
    { countryCode: "ER", countryName: "Eritrea", total: 0, colour: 0 },
    { countryCode: "EE", countryName: "Estonia", total: 0, colour: 0 },
    { countryCode: "ET", countryName: "Ethiopia", total: 0, colour: 0 },
    { countryCode: "FK", countryName: "Falkland Islands (Malvinas)", total: 0, colour: 0 },
    { countryCode: "FO", countryName: "Faroe Islands", total: 0, colour: 0 },
    { countryCode: "FJ", countryName: "Fiji", total: 0, colour: 0 },
    { countryCode: "FI", countryName: "Finland", total: 0, colour: 0 },
    { countryCode: "FR", countryName: "France", total: 0, colour: 0 },
    { countryCode: "GF", countryName: "French Guiana", total: 0, colour: 0 },
    { countryCode: "PF", countryName: "French Polynesia", total: 0, colour: 0 },
    { countryCode: "TF", countryName: "French Southern Territories", total: 0, colour: 0 },
    { countryCode: "GA", countryName: "Gabon", total: 0, colour: 0 },
    { countryCode: "GM", countryName: "Gambia", total: 0, colour: 0 },
    { countryCode: "GE", countryName: "Georgia", total: 0, colour: 0 },
    { countryCode: "DE", countryName: "Germany", total: 0, colour: 0 },
    { countryCode: "GH", countryName: "Ghana", total: 0, colour: 0 },
    { countryCode: "GI", countryName: "Gibraltar", total: 0, colour: 0 },
    { countryCode: "GR", countryName: "Greece", total: 0, colour: 0 },
    { countryCode: "GL", countryName: "Greenland", total: 0, colour: 0 },
    { countryCode: "GD", countryName: "Grenada", total: 0, colour: 0 },
    { countryCode: "GP", countryName: "Guadeloupe", total: 0, colour: 0 },
    { countryCode: "GU", countryName: "Guam", total: 0, colour: 0 },
    { countryCode: "GT", countryName: "Guatemala", total: 0, colour: 0 },
    { countryCode: "GG", countryName: "Guernsey", total: 0, colour: 0 },
    { countryCode: "GN", countryName: "Guinea", total: 0, colour: 0 },
    { countryCode: "GW", countryName: "Guinea-Bissau", total: 0, colour: 0 },
    { countryCode: "GY", countryName: "Guyana", total: 0, colour: 0 },
    { countryCode: "HT", countryName: "Haiti", total: 0, colour: 0 },
    { countryCode: "HM", countryName: "Heard Island & Mcdonald Islands", total: 0, colour: 0 },
    { countryCode: "VA", countryName: "Holy See (Vatican City State)", total: 0, colour: 0 },
    { countryCode: "HN", countryName: "Honduras", total: 0, colour: 0 },
    { countryCode: "HK", countryName: "Hong Kong", total: 0, colour: 0 },
    { countryCode: "HU", countryName: "Hungary", total: 0, colour: 0 },
    { countryCode: "IS", countryName: "Iceland", total: 0, colour: 0 },
    { countryCode: "IN", countryName: "India", total: 0, colour: 0 },
    { countryCode: "ID", countryName: "Indonesia", total: 0, colour: 0 },
    { countryCode: "IR", countryName: "Iran, Islamic Republic Of", total: 0, colour: 0 },
    { countryCode: "IQ", countryName: "Iraq", total: 0, colour: 0 },
    { countryCode: "IE", countryName: "Ireland", total: 0, colour: 0 },
    { countryCode: "IM", countryName: "Isle Of Man", total: 0, colour: 0 },
    { countryCode: "IL", countryName: "Israel", total: 0, colour: 0 },
    { countryCode: "IT", countryName: "Italy", total: 0, colour: 0 },
    { countryCode: "JM", countryName: "Jamaica", total: 0, colour: 0 },
    { countryCode: "JP", countryName: "Japan", total: 0, colour: 0 },
    { countryCode: "JE", countryName: "Jersey", total: 0, colour: 0 },
    { countryCode: "JO", countryName: "Jordan", total: 0, colour: 0 },
    { countryCode: "KZ", countryName: "Kazakhstan", total: 0, colour: 0 },
    { countryCode: "KE", countryName: "Kenya", total: 0, colour: 0 },
    { countryCode: "KI", countryName: "Kiribati", total: 0, colour: 0 },
    { countryCode: "KR", countryName: "Korea", total: 0, colour: 0 },
    { countryCode: "KP", countryName: "North Korea", total: 0, colour: 0 },
    { countryCode: "KW", countryName: "Kuwait", total: 0, colour: 0 },
    { countryCode: "KG", countryName: "Kyrgyzstan", total: 0, colour: 0 },
    { countryCode: "LA", countryName: 'Lao People"s Democratic Republic', total: 0, colour: 0 },
    { countryCode: "LV", countryName: "Latvia", total: 0, colour: 0 },
    { countryCode: "LB", countryName: "Lebanon", total: 0, colour: 0 },
    { countryCode: "LS", countryName: "Lesotho", total: 0, colour: 0 },
    { countryCode: "LR", countryName: "Liberia", total: 0, colour: 0 },
    { countryCode: "LY", countryName: "Libyan Arab Jamahiriya", total: 0, colour: 0 },
    { countryCode: "LI", countryName: "Liechtenstein", total: 0, colour: 0 },
    { countryCode: "LT", countryName: "Lithuania", total: 0, colour: 0 },
    { countryCode: "LU", countryName: "Luxembourg", total: 0, colour: 0 },
    { countryCode: "MO", countryName: "Macao", total: 0, colour: 0 },
    { countryCode: "MK", countryName: "Macedonia", total: 0, colour: 0 },
    { countryCode: "MG", countryName: "Madagascar", total: 0, colour: 0 },
    { countryCode: "MW", countryName: "Malawi", total: 0, colour: 0 },
    { countryCode: "MY", countryName: "Malaysia", total: 0, colour: 0 },
    { countryCode: "MV", countryName: "Maldives", total: 0, colour: 0 },
    { countryCode: "ML", countryName: "Mali", total: 0, colour: 0 },
    { countryCode: "MT", countryName: "Malta", total: 0, colour: 0 },
    { countryCode: "MH", countryName: "Marshall Islands", total: 0, colour: 0 },
    { countryCode: "MQ", countryName: "Martinique", total: 0, colour: 0 },
    { countryCode: "MR", countryName: "Mauritania", total: 0, colour: 0 },
    { countryCode: "MU", countryName: "Mauritius", total: 0, colour: 0 },
    { countryCode: "YT", countryName: "Mayotte", total: 0, colour: 0 },
    { countryCode: "MX", countryName: "Mexico", total: 0, colour: 0 },
    { countryCode: "FM", countryName: "Micronesia, Federated States Of", total: 0, colour: 0 },
    { countryCode: "MD", countryName: "Moldova", total: 0, colour: 0 },
    { countryCode: "MC", countryName: "Monaco", total: 0, colour: 0 },
    { countryCode: "MN", countryName: "Mongolia", total: 0, colour: 0 },
    { countryCode: "ME", countryName: "Montenegro", total: 0, colour: 0 },
    { countryCode: "MS", countryName: "Montserrat", total: 0, colour: 0 },
    { countryCode: "MA", countryName: "Morocco", total: 0, colour: 0 },
    { countryCode: "MZ", countryName: "Mozambique", total: 0, colour: 0 },
    { countryCode: "MM", countryName: "Myanmar", total: 0, colour: 0 },
    { countryCode: "NA", countryName: "Namibia", total: 0, colour: 0 },
    { countryCode: "NR", countryName: "Nauru", total: 0, colour: 0 },
    { countryCode: "NP", countryName: "Nepal", total: 0, colour: 0 },
    { countryCode: "NL", countryName: "Netherlands", total: 0, colour: 0 },
    { countryCode: "AN", countryName: "Netherlands Antilles", total: 0, colour: 0 },
    { countryCode: "NC", countryName: "New Caledonia", total: 0, colour: 0 },
    { countryCode: "NZ", countryName: "New Zealand", total: 0, colour: 0 },
    { countryCode: "NI", countryName: "Nicaragua", total: 0, colour: 0 },
    { countryCode: "NE", countryName: "Niger", total: 0, colour: 0 },
    { countryCode: "NG", countryName: "Nigeria", total: 0, colour: 0 },
    { countryCode: "NU", countryName: "Niue", total: 0, colour: 0 },
    { countryCode: "NF", countryName: "Norfolk Island", total: 0, colour: 0 },
    { countryCode: "MP", countryName: "Northern Mariana Islands", total: 0, colour: 0 },
    { countryCode: "NO", countryName: "Norway", total: 0, colour: 0 },
    { countryCode: "OM", countryName: "Oman", total: 0, colour: 0 },
    { countryCode: "PK", countryName: "Pakistan", total: 0, colour: 0 },
    { countryCode: "PW", countryName: "Palau", total: 0, colour: 0 },
    { countryCode: "PS", countryName: "Palestinian Territory, Occupied", total: 0, colour: 0 },
    { countryCode: "PA", countryName: "Panama", total: 0, colour: 0 },
    { countryCode: "PG", countryName: "Papua New Guinea", total: 0, colour: 0 },
    { countryCode: "PY", countryName: "Paraguay", total: 0, colour: 0 },
    { countryCode: "PE", countryName: "Peru", total: 0, colour: 0 },
    { countryCode: "PH", countryName: "Philippines", total: 0, colour: 0 },
    { countryCode: "PN", countryName: "Pitcairn", total: 0, colour: 0 },
    { countryCode: "PL", countryName: "Poland", total: 0, colour: 0 },
    { countryCode: "PT", countryName: "Portugal", total: 0, colour: 0 },
    { countryCode: "PR", countryName: "Puerto Rico", total: 0, colour: 0 },
    { countryCode: "QA", countryName: "Qatar", total: 0, colour: 0 },
    { countryCode: "RE", countryName: "Reunion", total: 0, colour: 0 },
    { countryCode: "RO", countryName: "Romania", total: 0, colour: 0 },
    { countryCode: "RU", countryName: "Russian Federation", total: 0, colour: 0 },
    { countryCode: "RW", countryName: "Rwanda", total: 0, colour: 0 },
    { countryCode: "BL", countryName: "Saint Barthelemy", total: 0, colour: 0 },
    { countryCode: "SH", countryName: "Saint Helena", total: 0, colour: 0 },
    { countryCode: "KN", countryName: "Saint Kitts And Nevis", total: 0, colour: 0 },
    { countryCode: "LC", countryName: "Saint Lucia", total: 0, colour: 0 },
    { countryCode: "MF", countryName: "Saint Martin", total: 0, colour: 0 },
    { countryCode: "PM", countryName: "Saint Pierre And Miquelon", total: 0, colour: 0 },
    { countryCode: "VC", countryName: "Saint Vincent And Grenadines", total: 0, colour: 0 },
    { countryCode: "WS", countryName: "Samoa", total: 0, colour: 0 },
    { countryCode: "SM", countryName: "San Marino", total: 0, colour: 0 },
    { countryCode: "ST", countryName: "Sao Tome And Principe", total: 0, colour: 0 },
    { countryCode: "SA", countryName: "Saudi Arabia", total: 0, colour: 0 },
    { countryCode: "SN", countryName: "Senegal", total: 0, colour: 0 },
    { countryCode: "RS", countryName: "Serbia", total: 0, colour: 0 },
    { countryCode: "SC", countryName: "Seychelles", total: 0, colour: 0 },
    { countryCode: "SL", countryName: "Sierra Leone", total: 0, colour: 0 },
    { countryCode: "SG", countryName: "Singapore", total: 0, colour: 0 },
    { countryCode: "SK", countryName: "Slovakia", total: 0, colour: 0 },
    { countryCode: "SI", countryName: "Slovenia", total: 0, colour: 0 },
    { countryCode: "SB", countryName: "Solomon Islands", total: 0, colour: 0 },
    { countryCode: "SO", countryName: "Somalia", total: 0, colour: 0 },
    { countryCode: "ZA", countryName: "South Africa", total: 0, colour: 0 },
    { countryCode: "GS", countryName: "South Georgia And Sandwich Isl.", total: 0, colour: 0 },
    { countryCode: "ES", countryName: "Spain", total: 0, colour: 0 },
    { countryCode: "LK", countryName: "Sri Lanka", total: 0, colour: 0 },
    { countryCode: "SD", countryName: "Sudan", total: 0, colour: 0 },
    { countryCode: "SR", countryName: "Suriname", total: 0, colour: 0 },
    { countryCode: "SJ", countryName: "Svalbard And Jan Mayen", total: 0, colour: 0 },
    { countryCode: "SZ", countryName: "Swaziland", total: 0, colour: 0 },
    { countryCode: "SE", countryName: "Sweden", total: 0, colour: 0 },
    { countryCode: "CH", countryName: "Switzerland", total: 0, colour: 0 },
    { countryCode: "SY", countryName: "Syrian Arab Republic", total: 0, colour: 0 },
    { countryCode: "TW", countryName: "Taiwan", total: 0, colour: 0 },
    { countryCode: "TJ", countryName: "Tajikistan", total: 0, colour: 0 },
    { countryCode: "TZ", countryName: "Tanzania", total: 0, colour: 0 },
    { countryCode: "TH", countryName: "Thailand", total: 0, colour: 0 },
    { countryCode: "TL", countryName: "Timor-Leste", total: 0, colour: 0 },
    { countryCode: "TG", countryName: "Togo", total: 0, colour: 0 },
    { countryCode: "TK", countryName: "Tokelau", total: 0, colour: 0 },
    { countryCode: "TO", countryName: "Tonga", total: 0, colour: 0 },
    { countryCode: "TT", countryName: "Trinidad And Tobago", total: 0, colour: 0 },
    { countryCode: "TN", countryName: "Tunisia", total: 0, colour: 0 },
    { countryCode: "TR", countryName: "Turkey", total: 0, colour: 0 },
    { countryCode: "TM", countryName: "Turkmenistan", total: 0, colour: 0 },
    { countryCode: "TC", countryName: "Turks And Caicos Islands", total: 0, colour: 0 },
    { countryCode: "TV", countryName: "Tuvalu", total: 0, colour: 0 },
    { countryCode: "UG", countryName: "Uganda", total: 0, colour: 0 },
    { countryCode: "UA", countryName: "Ukraine", total: 0, colour: 0 },
    { countryCode: "AE", countryName: "United Arab Emirates", total: 0, colour: 0 },
    { countryCode: "GB", countryName: "United Kingdom", total: 0, colour: 0 },
    { countryCode: "US", countryName: "United States", total: 0, colour: 0 },
    { countryCode: "UM", countryName: "United States Outlying Islands", total: 0, colour: 0 },
    { countryCode: "UY", countryName: "Uruguay", total: 0, colour: 0 },
    { countryCode: "UZ", countryName: "Uzbekistan", total: 0, colour: 0 },
    { countryCode: "VU", countryName: "Vanuatu", total: 0, colour: 0 },
    { countryCode: "VE", countryName: "Venezuela", total: 0, colour: 0 },
    { countryCode: "VN", countryName: "Vietnam", total: 0, colour: 0 },
    { countryCode: "VG", countryName: "Virgin Islands, British", total: 0, colour: 0 },
    { countryCode: "VI", countryName: "Virgin Islands, U.S.", total: 0, colour: 0 },
    { countryCode: "WF", countryName: "Wallis And Futuna", total: 0, colour: 0 },
    { countryCode: "EH", countryName: "Western Sahara", total: 0, colour: 0 },
    { countryCode: "YE", countryName: "Yemen", total: 0, colour: 0 },
    { countryCode: "ZM", countryName: "Zambia", total: 0, colour: 0 },
    { countryCode: "ZW", countryName: "Zimbabwe", total: 0, colour: 0 },
  ]);

  const [countryState, setCountryState] = useState(defaultCountryState)

  // //0 - nutrition, 1 - beauty, 2 - lifestyle
  // //check if all channel names are correct
  function getDivisionFromChannel(channel) {
    const channelMapping = {
      myprotein: 0,
      myvegan: 0,
      massint: 0,
      myvitamins: 0,
      idealshape: 0,
      idealfit: 0,
      exante: 0,
      idealraw: 0,

      espa: 1,
      mio: 1,
      growgorgeous: 1,
      mious: 1,
      illamasqua: 1,
      lfint: 1,
      skinstore: 1,
      beautyexpert: 1,
      mankind: 1,
      hqhair: 1,
      skincarerx: 1,
      ryint: 1,
      glossybox: 1,
      facial: 1,

      ameliorate: 1,
      christopherobin: 1,
      cultbeauty: 1,
      dermstore: 1,
      eyeko: 1,
      glossyboxskincare: 1,
      lookfantastic: 1,
      mamamio: 1,
      minimio: 1,
      perriconeMD: 1,

      probike: 2,
      zavvi: 2,
      iwoot: 2,
      popinabox: 2,
      mygeekbox: 2,
      ninint: 2,
      eaint: 2,
      honda: 2,
      thehut: 2,
      coggles: 2,
      mybag: 2,
      allsole: 2,
      arrow: 2,
      preloved: 2,
    };

    //if channel is in the list, get the division number
    if (Object.keys(channelMapping).indexOf(channel) > -1) {
      return channelMapping[channel];
    } else {
      return 2;
    }
  }

  //logos
  //const imgDir = "./assets/brandlogos/";

  // const BrandData = [
  //   {
  //     siteName: "Allsole",
  //     siteID: 53,
  //     img: require(imgDir + "allsoleLogo.jpeg"),
  //   },
  //   {
  //     siteName: "The Hut",
  //     siteID: 79,
  //     img: require(imgDir + "theHutLogo.png"),
  //   },
  //   {
  //     siteName: "MyProtein",
  //     siteID: 83,
  //     img: require(imgDir + "myProteinLogo.png"),
  //   },
  //   {
  //     siteName: "MyVitamins",
  //     siteID: 86,
  //     img: require(imgDir + "myVitaminsLogo.png"),
  //   },
  //   {
  //     siteName: "Pro Bike Kit",
  //     siteID: 90,
  //     img: require(imgDir + "proBikeKitLogo.png"),
  //   },
  //   {
  //     siteName: "IWOOT",
  //     siteID: 92,
  //     img: require(imgDir + "iwootLogo.png"),
  //   },
  //   {
  //     siteName: "exante",
  //     siteID: 93,
  //     img: require(imgDir + "exanteLogo.png"),
  //   },
  //   {
  //     siteName: "Coggles",
  //     siteID: 94,
  //     img: require(imgDir + "cogglesLogo.png"),
  //   },
  //   {
  //     siteName: "LOOKFANTASTIC",
  //     siteID: 95,
  //     img: require(imgDir + "look-fantastic-logo.png"),
  //   },
  //   {
  //     siteName: "Zavvi",
  //     siteID: 96,
  //     img: require(imgDir + "zavviLogo.png"),
  //   },
  //   {
  //     siteName: "Mankind",
  //     siteID: 99,
  //     img: require(imgDir + "mankindLogo.png"),
  //   },
  //   {
  //     siteName: "Mass",
  //     siteID: 101,
  //     img: require(imgDir + "massLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Powerman",
  //     siteID: 104,
  //     img: require(imgDir + "powermanLogo.png"),
  //   },
  //   {
  //     siteName: "HQHair International",
  //     siteID: 105,
  //     img: require(imgDir + "hqhairLogo.png"),
  //   },
  //   {
  //     siteName: "Beauty Expert",
  //     siteID: 106,
  //     img: require(imgDir + "beautyExpertLogo.jpeg"),
  //   },
  //   {
  //     siteName: "MyBag",
  //     siteID: 107,
  //     img: require(imgDir + "mybagLogo.png"),
  //   },
  //   {
  //     siteName: "Pop In A Box",
  //     siteID: 111,
  //     img: require(imgDir + "popInABoxLogo.png"),
  //   },
  //   {
  //     siteName: "My Geek Box",
  //     siteID: 112,
  //     img: require(imgDir + "myGeekBoxLogo.png"),
  //   },
  //   {
  //     siteName: "Mio Skincare",
  //     siteID: 114,
  //     img: require(imgDir + "mioSkincareLogo.png"),
  //   },
  //   {
  //     siteName: "Honda",
  //     siteID: 119,
  //     img: require(imgDir + "hondaLogo.png"),
  //   },
  //   {
  //     siteName: "Grow Gorgeous ",
  //     siteID: 120,
  //     img: require(imgDir + "growGorgeousLogo.png"),
  //   },
  //   {
  //     siteName: "SkinStore",
  //     siteID: 121,
  //     img: require(imgDir + "skinstoreLogo.jpeg"),
  //   },
  //   {
  //     siteName: "IdealFit",
  //     siteID: 125,
  //     img: require(imgDir + "idealfitLogo.jpeg"),
  //   },
  //   {
  //     siteName: "SkinCareRX",
  //     siteID: 128,
  //     img: require(imgDir + "skincarerxLogo.jpeg"),
  //   },
  //   {
  //     siteName: "GLOSSYBOX",
  //     siteID: 129,
  //     img: require(imgDir + "glossyBoxLogo.png"),
  //   },
  //   {
  //     siteName: "RY",
  //     siteID: 132,
  //     img: require(imgDir + "ryLogo.jpeg"),
  //   },
  //   {
  //     siteName: "FacialCo",
  //     siteID: 133,
  //     img: require(imgDir + "facialcoLogo.png"),
  //   },
  //   {
  //     siteName: "Illamasqua",
  //     siteID: 134,
  //     img: require(imgDir + "illamasquaLogo.png"),
  //   },
  //   {
  //     siteName: "ESPA",
  //     siteID: 135,
  //     img: require(imgDir + "espaLogo.jpeg"),
  //   },
  //   {
  //     siteName: "IdealEssentials",
  //     siteID: 137,
  //     img: require(imgDir + "idealEssentialsLogo.png"),
  //   },
  //   {
  //     siteName: "Eyeko",
  //     siteID: 138,
  //     img: require(imgDir + "eyekoLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Breeders",
  //     siteID: 141,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Owners",
  //     siteID: 143,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Ameliorate",
  //     siteID: 145,
  //     img: require(imgDir + "ameliorateLogo.png"),
  //   },
  //   {
  //     siteName: "Christophe Robin",
  //     siteID: 146,
  //     img: require(imgDir + "christopheRobinLogo.png"),
  //   },
  //   {
  //     siteName: "Gillette",
  //     siteID: 147,
  //     img: require(imgDir + "gilletteLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Myvegan",
  //     siteID: 149,
  //     img: require(imgDir + "myVeganLogo.png"),
  //   },
  //   {
  //     siteName: "Garden Of Life",
  //     siteID: 153,
  //     img: require(imgDir + "gardenOfLifeLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Breeders Beta",
  //     siteID: 154,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "No7",
  //     siteID: 155,
  //     img: require(imgDir + "no7Logo.png"),
  //   },
  //   {
  //     siteName: "Oral B",
  //     siteID: 159,
  //     img: require(imgDir + "oralBLogo.png"),
  //   },
  //   {
  //     siteName: "Optifast",
  //     siteID: 161,
  //     img: require(imgDir + "optifastLogo.webp"),
  //   },
  //   { siteName: "MP", siteID: 162, img: require(imgDir + "mpLogo.png") },
  //   {
  //     siteName: "Mercedes Benz Formula E",
  //     siteID: 163,
  //     img: require(imgDir + "mercedesBenzFormulaELogo.jpeg"),
  //   },
  //   {
  //     siteName: "Burt's Bees",
  //     siteID: 164,
  //     img: require(imgDir + "burtsBeesLogo.png"),
  //   },
  //   {
  //     siteName: "Elemis",
  //     siteID: 165,
  //     img: require(imgDir + "elemisLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Direct",
  //     siteID: 166,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Braun",
  //     siteID: 167,
  //     img: require(imgDir + "braunLogo.svg"),
  //   },
  //   {
  //     siteName: "Minami",
  //     siteID: 168,
  //     img: require(imgDir + "minamiLogo.png"),
  //   },
  //   {
  //     siteName: "Klean Athlete",
  //     siteID: 169,
  //     img: require(imgDir + "kleanAthleteLogo.webp"),
  //   },
  //   {
  //     siteName: "Nuxe",
  //     siteID: 170,
  //     img: require(imgDir + "nuxeLogo.png"),
  //   },
  //   {
  //     siteName: "VeryNeko",
  //     siteID: 173,
  //     img: require(imgDir + "veryNekoLogo.png"),
  //   },
  //   {
  //     siteName: "Perricone MD",
  //     siteID: 180,
  //     img: require(imgDir + "perriconeMDLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Homebase",
  //     siteID: 182,
  //     img: require(imgDir + "homebaseLogo.gif"),
  //   },
  //   {
  //     siteName: "Every Health",
  //     siteID: 184,
  //     img: require(imgDir + "everyHealthLogo.png"),
  //   },
  //   {
  //     siteName: "Revolution Beauty",
  //     siteID: 185,
  //     img: require(imgDir + "revolutionLogo.png"),
  //   },
  //   {
  //     siteName: "Omorovicza",
  //     siteID: 189,
  //     img: require(imgDir + "omorovicsaLogo.png"),
  //   },
  //   {
  //     siteName: "Your Coca-Cola",
  //     siteID: 190,
  //     img: require(imgDir + "yourCocaColaLogo.png"),
  //   },
  //   {
  //     siteName: "SpoonfulOne",
  //     siteID: 191,
  //     img: require(imgDir + "spoonfulOneLogo.webp"),
  //   },
  //   {
  //     siteName: "Antipodes",
  //     siteID: 194,
  //     img: require(imgDir + "antipodesLogo.png"),
  //   },
  //   {
  //     siteName: "Acnecide",
  //     siteID: 195,
  //     img: require(imgDir + "acnecideLogo.png"),
  //   },
  //   {
  //     siteName: "Vita Coco",
  //     siteID: 197,
  //     img: require(imgDir + "vitaCocoLogo.png"),
  //   },
  //   {
  //     siteName: "Vital Proteins",
  //     siteID: 198,
  //     img: require(imgDir + "vitalProteinsLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Pro Plan",
  //     siteID: 200,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Vet",
  //     siteID: 201,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Purina Vet IVC",
  //     siteID: 207,
  //     img: require(imgDir + "purinaLogo.png"),
  //   },
  //   {
  //     siteName: "Dermstore",
  //     siteID: 208,
  //     img: require(imgDir + "dermstoreLogo.png"),
  //   },
  //   {
  //     siteName: "Jack Wills",
  //     siteID: 209,
  //     img: require(imgDir + "jackWillsLogo.png"),
  //   },
  //   {
  //     siteName: "Lancer Skincare",
  //     siteID: 210,
  //     img: require(imgDir + "lancerSkincareLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Creed",
  //     siteID: 216,
  //     img: require(imgDir + "creedLogo.png"),
  //   },
  //   {
  //     siteName: "Bathstore",
  //     siteID: 217,
  //     img: require(imgDir + "bathstoreLogo.png"),
  //   },
  //   {
  //     siteName: "Erborian",
  //     siteID: 218,
  //     img: require(imgDir + "erborianLogo.webp"),
  //   },
  //   {
  //     siteName: "Team Command",
  //     siteID: 222,
  //     img: require(imgDir + "teamCommandLogo.png"),
  //   },
  //   {
  //     siteName: "Morvelo",
  //     siteID: 223,
  //     img: require(imgDir + "morveloLogo.png"),
  //   },
  //   {
  //     siteName: "Orlebar Brown",
  //     siteID: 224,
  //     img: require(imgDir + "orlebarBrownLogo.png"),
  //   },
  //   {
  //     siteName: "Endura Sport",
  //     siteID: 225,
  //     img: require(imgDir + "enduraSportLogo.png"),
  //   },
  //   {
  //     siteName: "Sukin Naturals",
  //     siteID: 228,
  //     img: require(imgDir + "sukinNaturalsLogo.png"),
  //   },
  //   {
  //     siteName: "Arrow Films",
  //     siteID: 230,
  //     img: require(imgDir + "arrowFilmsLogo.png"),
  //   },
  //   {
  //     siteName: "Clink Spirit",
  //     siteID: 231,
  //     img: require(imgDir + "clinkSpiritLogo.png"),
  //   },
  //   {
  //     siteName: "Kellica",
  //     siteID: 233,
  //     img: require(imgDir + "kellicaLogo.png"),
  //   },
  //   {
  //     siteName: "SpectriSKIN",
  //     siteID: 234,
  //     img: require(imgDir + "spectriSkinLogo.png"),
  //   },
  //   {
  //     siteName: "Zyn",
  //     siteID: 236,
  //     img: require(imgDir + "zynLogo.png"),
  //   },
  //   {
  //     siteName: "Lor Espresso",
  //     siteID: 238,
  //     img: require(imgDir + "lorEspressoLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Toblerone",
  //     siteID: 239,
  //     img: require(imgDir + "tobleroneLogo.png"),
  //   },
  //   {
  //     siteName: "Croquons La Vie",
  //     siteID: 240,
  //     img: require(imgDir + "croquonsLaVieLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Speedo",
  //     siteID: 241,
  //     img: require(imgDir + "speedoLogo.png"),
  //   },
  //   {
  //     siteName: "Mama Mio",
  //     siteID: 244,
  //     img: require(imgDir + "mamaMioLogo.png"),
  //   },
  //   {
  //     siteName: "Melvita",
  //     siteID: 246,
  //     img: require(imgDir + "melvitaLogo.png"),
  //   },
  //   {
  //     siteName: "Berghaus",
  //     siteID: 248,
  //     img: require(imgDir + "berghausLogo.png"),
  //   },
  //   {
  //     siteName: "Comvita",
  //     siteID: 249,
  //     img: require(imgDir + "comvitaLogo.png"),
  //   },
  //   {
  //     siteName: "Andalou Naturals",
  //     siteID: 251,
  //     img: require(imgDir + "andalouNaturalsLogo.png"),
  //   },
  //   {
  //     siteName: "Clogau Outlet",
  //     siteID: 253,
  //     img: require(imgDir + "clogauOutletLogo.png"),
  //   },
  //   {
  //     siteName: "SFI Health",
  //     siteID: 254,
  //     img: require(imgDir + "sfiHealthLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Kickers",
  //     siteID: 255,
  //     img: require(imgDir + "kickersLogo.gif"),
  //   },
  //   {
  //     siteName: "THG Training",
  //     siteID: 256,
  //     img: require(imgDir + "thgLogo.png"),
  //   },
  //   {
  //     siteName: "Cult Beauty",
  //     siteID: 257,
  //     img: require(imgDir + "cultBeautyLogo.png"),
  //   },
  //   {
  //     siteName: "HandmadeSoapCompany",
  //     siteID: 259,
  //     img: require(imgDir + "handmadeSoapCompanyLogo.webp"),
  //   },
  //   {
  //     siteName: "Ellesse",
  //     siteID: 261,
  //     img: require(imgDir + "ellesseLogo.png"),
  //   },
  //   {
  //     siteName: "11 Degrees",
  //     siteID: 262,
  //     img: require(imgDir + "11DegreesLogo.png"),
  //   },
  //   {
  //     siteName: "Natures Truth",
  //     siteID: 263,
  //     img: require(imgDir + "naturesTruthLogo.png"),
  //   },
  //   {
  //     siteName: "Canterbury",
  //     siteID: 265,
  //     img: require(imgDir + "canterburyLogo.png"),
  //   },
  //   {
  //     siteName: "Pureis CBD",
  //     siteID: 266,
  //     img: require(imgDir + "pureisCBDLogo.png"),
  //   },
  //   {
  //     siteName: "Unishop",
  //     siteID: 267,
  //     img: require(imgDir + "unishopLogo.webp"),
  //   },
  //   {
  //     siteName: "Wella",
  //     siteID: 268,
  //     img: require(imgDir + "wellaLogo.jpeg"),
  //   },
  //   {
  //     siteName: "MyPro",
  //     siteID: 271,
  //     img: require(imgDir + "myProLogo.png"),
  //   },
  //   {
  //     siteName: "Revlon",
  //     siteID: 272,
  //     img: require(imgDir + "revlonLogo.png"),
  //   },
  //   {
  //     siteName: "The Unexpekted",
  //     siteID: 273,
  //     img: require(imgDir + "theUnexpektedLogo.png"),
  //   },
  //   {
  //     siteName: "Amika",
  //     siteID: 276,
  //     img: require(imgDir + "amikaLogo.png"),
  //   },
  //   {
  //     siteName: "BeNu",
  //     siteID: 277,
  //     img: require(imgDir + "benuLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Dr Brandt",
  //     siteID: 278,
  //     img: require(imgDir + "drBrandtLogo.png"),
  //   },
  //   {
  //     siteName: "HPE Activewear",
  //     siteID: 279,
  //     img: require(imgDir + "hpeActivewearLogo.png"),
  //   },
  //   {
  //     siteName: "Athletia Beauty",
  //     siteID: 280,
  //     img: require(imgDir + "athletiaBeautyLogo.png"),
  //   },
  //   {
  //     siteName: "David Gandy Wellwear",
  //     siteID: 283,
  //     img: require(imgDir + "davidGandyWellwearLogo.png"),
  //   },
  //   {
  //     siteName: "TRR Nutrition",
  //     siteID: 284,
  //     img: require(imgDir + "trrNutritionLogo.png"),
  //   },
  //   {
  //     siteName: "LQ Collagen",
  //     siteID: 285,
  //     img: require(imgDir + "lqCollagenLogo.png"),
  //   },
  //   {
  //     siteName: "Filorga",
  //     siteID: 286,
  //     img: require(imgDir + "filorgaLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Frank Body",
  //     siteID: 289,
  //     img: require(imgDir + "frankBodyLogo.jpeg"),
  //   },
  //   {
  //     siteName: "By Terry",
  //     siteID: 290,
  //     img: require(imgDir + "byTerryLogo.png"),
  //   },
  //   {
  //     siteName: "Bonraw Foods",
  //     siteID: 292,
  //     img: require(imgDir + "bonrawFoodsLogo.png"),
  //   },
  //   {
  //     siteName: "Precision Biotics",
  //     siteID: 293,
  //     img: require(imgDir + "precisionBioticsLogo.webp"),
  //   },
  //   {
  //     siteName: "ORA Skincare",
  //     siteID: 295,
  //     img: require(imgDir + "oraSkincareLogo.png"),
  //   },
  //   {
  //     siteName: "Mighty",
  //     siteID: 296,
  //     img: require(imgDir + "mightyLogo.png"),
  //   },
  //   {
  //     siteName: "PN Selfcare",
  //     siteID: 297,
  //     img: require(imgDir + "pnSelfcareLogo.png"),
  //   },
  //   {
  //     siteName: "Baby & Me",
  //     siteID: 299,
  //     img: require(imgDir + "babyAndMeLogo.png"),
  //   },
  //   {
  //     siteName: "Artdeco Cosmetics",
  //     siteID: 303,
  //     img: require(imgDir + "artdecoCosmeticsLogo.png"),
  //   },
  //   {
  //     siteName: "Puritan's Pride",
  //     siteID: 304,
  //     img: require(imgDir + "puritansPrideLogo.webp"),
  //   },
  //   {
  //     siteName: "Plenaire",
  //     siteID: 305,
  //     img: require(imgDir + "plenaireLogo.png"),
  //   },
  //   {
  //     siteName: "Gearbox",
  //     siteID: 306,
  //     img: require(imgDir + "gearboxLogo.png"),
  //   },
  //   {
  //     siteName: "Jersey Hemp",
  //     siteID: 307,
  //     img: require(imgDir + "jerseyHempLogo.png"),
  //   },
  //   {
  //     siteName: "Boostball",
  //     siteID: 309,
  //     img: require(imgDir + "boostballLogo.png"),
  //   },
  //   {
  //     siteName: "ACO",
  //     siteID: 310,
  //     img: require(imgDir + "acoLogo.png"),
  //   },
  //   {
  //     siteName: "Molton Brown",
  //     siteID: 311,
  //     img: require(imgDir + "moltonBrownLogo.png"),
  //   },
  //   {
  //     siteName: "Bimuno",
  //     siteID: 312,
  //     img: require(imgDir + "bimunoLogo.png"),
  //   },
  //   {
  //     siteName: "Nutrimuscle",
  //     siteID: 313,
  //     img: require(imgDir + "nutrimuscleLogo.webp"),
  //   },
  //   {
  //     siteName: "Shiro",
  //     siteID: 315,
  //     img: require(imgDir + "shiroLogo.png"),
  //   },
  //   {
  //     siteName: "Indie Lee",
  //     siteID: 316,
  //     img: require(imgDir + "indieLeeLogo.png"),
  //   },
  //   {
  //     siteName: "Rock and Roll Beauty",
  //     siteID: 317,
  //     img: require(imgDir + "rockAndRollBeautyLogo.png"),
  //   },
  //   {
  //     siteName: "Myrkl",
  //     siteID: 318,
  //     img: require(imgDir + "myrklLogo.png"),
  //   },
  //   {
  //     siteName: "Bio-Kult",
  //     siteID: 320,
  //     img: require(imgDir + "bioKultLogo.png"),
  //   },
  //   {
  //     siteName: "Fibre One",
  //     siteID: 324,
  //     img: require(imgDir + "fibreOneLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Begg x Co",
  //     siteID: 326,
  //     img: require(imgDir + "beggxcoLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Millican",
  //     siteID: 327,
  //     img: require(imgDir + "millicanLogo.webp"),
  //   },
  //   {
  //     siteName: "Inika Superfoods",
  //     siteID: 328,
  //     img: require(imgDir + "inikaSuperfoodsLogo.png"),
  //   },
  //   {
  //     siteName: "Prolong",
  //     siteID: 329,
  //     img: require(imgDir + "prolongLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Drybar",
  //     siteID: 330,
  //     img: require(imgDir + "drybarLogo.jpeg"),
  //   },
  //   {
  //     siteName: "BH Cosmetics",
  //     siteID: 331,
  //     img: require(imgDir + "bhCosmeticsLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Korres",
  //     siteID: 334,
  //     img: require(imgDir + "korresLogo.png"),
  //   },
  //   {
  //     siteName: "Oneskee",
  //     siteID: 337,
  //     img: require(imgDir + "oneskeeLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Born Primitive",
  //     siteID: 338,
  //     img: require(imgDir + "bornPrimitiveLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Sknhead",
  //     siteID: 339,
  //     img: require(imgDir + "sknheadLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Celebrity Slim",
  //     siteID: 341,
  //     img: require(imgDir + "celebritySlimLogo.png"),
  //   },
  //   {
  //     siteName: "Anastasia BH",
  //     siteID: 344,
  //     img: require(imgDir + "anastasiaBHLogo.jpeg"),
  //   },
  //   {
  //     siteName: "Movementum",
  //     siteID: 347,
  //     img: require(imgDir + "movementumLogo.png"),
  //   },
  //   {
  //     siteName: "About Time We Met",
  //     siteID: 351,
  //     img: require(imgDir + "aboutTimeWeMetLogo.jpeg"),
  //   },
  // ];

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
          {}
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