import React, { useEffect, useState } from "react";

import { icons } from "../ultils/icons";
import { apiGetProducts } from "../services/product";
import { formatMoney, renderStartFromNumber } from "../ultils/helpers";
import { CountDown, Button } from "../components";


const { AiFillStar, IoMdMenu } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null)
  const [isHour, setIsHour] = useState(24)
  const [isMinute, setIsMinute] = useState(59)
  const [isSecond, setIsSecond] = useState(59)
  const [started, setStarted] = useState(false)

  const fetchDealDaily = async() => {
    const date = new Date()
    const hour = 24 - date.getHours()
    const minute = 60 - date.getMinutes()
    const second = 60 - date.getSeconds()
    const response = await apiGetProducts({ limit: 1, page: Math.random() * 5 })
    if ( response.data.success) {
      setDealDaily(response.data.products[0])
      setStarted(true)
      setIsHour(hour)
      setIsMinute(minute)
      setIsSecond(second)
    }
  }

  useEffect(() => {
    fetchDealDaily()
  }, [])

  useEffect(() => {
    if ( started ) {
      const intervalId = setInterval(() => {
        setIsSecond(prev => prev - 1)
        if ( isSecond === 0 ) {
          setIsSecond(59)
          setIsMinute(prev => prev - 1)
          if ( isMinute === 0 ) {
            setIsMinute(59)
            setIsHour(prev => prev - 1)
            if ( isHour === 0 && isMinute === 0 && isSecond === 0 ) {
              fetchDealDaily()
              setIsHour(24)
              setIsMinute(59)
              setIsSecond(59)
            }
          }
        }
      }, 1000)
      
      return () => clearInterval(intervalId)
    }
  }, [isSecond, isMinute, isHour, started])
  

  return (
    <div className="w-1/4 border p-5 relative">
      <AiFillStar className="absolute top-5 left-5" size={25} color="#ee3131" />
      <div className="text-center font-bold text-lg mb-5" >
        <span className="uppercase tracking-widest">daily deals</span>
      </div>

      <img 
        src={dealDaily?.thumb}
        alt="deal"
      />

      <div className="text-center tracking-wider text-lg mt-12">
        <span className="flex items-center justify-center">{renderStartFromNumber(dealDaily?.totalRatings, 30)}</span>
        <span className="my-2 line-clamp-1">{dealDaily?.title}</span>
        <span className="mb-5">{`${formatMoney(dealDaily?.price)} VND`}</span>
      </div>

      <div className="flex items-center justify-center gap-2 my-5" >
        <CountDown number={isHour} unit="Hour" />
        <CountDown number={isMinute} unit="Minute" />
        <CountDown number={isSecond} unit="Second" />
      </div>

      <Button 
        title="options"
        leftIcon={<IoMdMenu size={25} />}
      />
    </div>
  );
};

export default DealDaily;
