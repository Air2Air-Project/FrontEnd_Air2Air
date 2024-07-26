import { UserIcon } from '@heroicons/react/20/solid';
import React, {useState} from 'react';
import { AiOutlineRise, AiOutlineAlert, AiOutlineFall } from "react-icons/ai";
import airImg from '../img/AIR.png';
import cityImg from '../img/CITY.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AlarmList = ({ data, formatDateTime, limit }) => {
  const displayData = limit ? data.slice(0, limit) : data;

  const getIcon = (alertType) => {
    switch (alertType) {
      case 'CITY':
        return <img src={cityImg} className="h-10 w-10" aria-hidden="true" />;
      case 'AIR':
        return <img src={airImg} className="h-10 w-10" aria-hidden="true" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />;
    }
  };

  const getAlertTypeText = (alertType) => {
    switch (alertType) {
      case 'CITY':
        return '도시공해지수';
      case 'AIR':
        return '대기환경지수';
      default:
        return alertType;
    }
  };

  return (
    <div className=' bg-white bg-opacity-80 p-5 rounded-lg shadow-lg w-full overflow-auto h-96 min-w-96 mt-5'>
      <ul role="list" className="mb-8">
        {displayData.map((event, eventIdx) => (
          <li key={event.alertTime + event.region.small + eventIdx}>
            <div className="relative pb-5">
              <div className="relative flex space-x-3">
                <div className="flex flex-col justify-center items-start min-w-0 flex-1 pt-1.5">
                  <div className="flex flex-wrap items-center">
                    <span
                      className={classNames(
                        ' flex justify-center items-center rounded-full ring-2 ring-white m-2'
                      )}
                    >
                      {getIcon(event.alertType)}
                    </span>
                    <time dateTime={event.alertTime} className="text-base text-gray-500 p-2">
                      {formatDateTime(event.alertTime)} &nbsp;
                    </time>
                    <p className="text-base text-gray-500">
                      {event.region.large} {event.region.middle} {event.region.small} - {getAlertTypeText(event.alertType)}{event.value}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmList;
