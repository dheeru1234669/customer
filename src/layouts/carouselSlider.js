import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
class Carousels extends React.Component {
  render() {

    const images= this.props.showImages
    console.log("images", typeof this.props.showImages)
    const settings = {
      dots: true, // Show navigation dots
      infinite: true, // Enable circular looping      
      slidesToShow: 1, // Number of slides to show at a time
      slidesToScroll: 1, // Number of slides to scroll at a time
      autoplay: true, // Enable autoplay
      autoplaySpeed: 2000, // Autoplay interval in milliseconds
      arrows:false,
      
    };

    return (
            <Slider {...settings}>
              {images?.length>0 && images.map((image,index)=> (
            <div key={index}>
            <Image src={image.img_url} width={395} height={200} className="slider-img" alt={`Image ${index}`} />
            </div>
           ) )}
            </Slider>
           );
}
}

export default Carousels;