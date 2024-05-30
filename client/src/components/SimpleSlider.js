import React from 'react'
import { CardProduct } from '../components'
import Slider from 'react-slick'


const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const SimpleSlider = ({ products }) => {
  return (
    <div className='mr-[-15px]'>
      {products && (
        <Slider {...settings}>
          {products.map(product => (
            <CardProduct key={product._id} product={product} />
          ))}
        </Slider>
      )}
    </div>
  )
}

export default SimpleSlider