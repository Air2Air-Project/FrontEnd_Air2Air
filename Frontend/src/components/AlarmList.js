import { UserIcon } from '@heroicons/react/20/solid';
import React, {useState} from 'react';
import { AiOutlineRise, AiOutlineAlert, AiOutlineFall } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AlarmList = ({ data, formatDateTime, limit }) => {
  //const [eventType, setEventType]=useState();
  const displayData = limit ? data.slice(0, limit) : data;
  const getIcon = (alertType) => {
    switch (alertType) {
      case 'ACTIVITY':
        return <AiOutlineAlert className="h-5 w-5 text-red-500" aria-hidden="true" />;
      case 'POLLUTION':
        return <AiOutlineRise className="h-5 w-5 text-green-500" aria-hidden="true" />;
      // case '감소':
      //   return <AiOutlineFall className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />;
    }
  };

  return (
    <div className=' bg-white bg-opacity-80 p-5 rounded-lg shadow-lg w-full overflow-auto h-96 min-w-96 m-5'>
      <ul role="list" className="mb-8">
        {displayData.map((event, eventIdx) => (
          
          <li key={event.alertTime + event.region.eupmyeondong + eventIdx}>
            <div className="relative pb-5">
              {/* {eventIdx !== displayData.length - 1 ? ( */}
                {/* <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" /> */}
              {/* ) : null} */}
              <div className="relative flex space-x-3">
                {/* <div>
                  <spa
                    className={classNames(
                      'bg-gray-400',  // 알림 타입에 따라 색깔 변하게 하기
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </spa>
                </div> */}
                <div className="flex flex-col justify-center items-start min-w-0 flex-1 pt-1.5">
                    <div className="flex flex-wrap items-center">
                        <span
                    className={classNames(
                      ' flex justify-center items-center h-8 w-8 rounded-full ring-2 ring-white m-2'
                    )}
                  >
                    {getIcon(event.alertType)}
                  </span>  
                        <time dateTime={event.alertTime} className="text-sm text-gray-500">
                        {formatDateTime(event.alertTime)} &nbsp;
                        </time>
                        <p className="text-sm text-gray-500">
                        {event.region.sido} {event.region.gugun} {event.region.eupmyeondong} - {event.alertType}
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