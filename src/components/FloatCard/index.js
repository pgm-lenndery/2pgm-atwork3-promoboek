import React from 'react';
import PurpleRain from '../PurpleRain';
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import './index.scss';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "EUR") {
      currency
      rate
    }
  }
`;

export default ({ children: content, image, title }) => {

  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if(loading) return 'Loading products...';
  if(error) return `Error: ${error.message}`;

  const usdRate = data.rates[183];


    return (
        <Link to="/projecten" className="floatCard">
            <div className="floatCard__head">
            <div>
                <div className="label small">4 maanden geleden</div>
                <p>web programming</p>
            </div>
           <ArrowRight/>
            </div>
            <div className="floatCard__body">
                <div className="floatCard__body-overlay">
                    <h2>{ title }</h2>
                    <p>{ content }</p>
                    <p>1 { usdRate.currency } = € { usdRate.rate }</p>
                </div>
                <PurpleRain>
                    <img src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/tronald%20dump/thumb.png" alt=""/>
                </PurpleRain>
            </div>
        </Link>
    )
}