import React from 'react'
import { Image } from "semantic-ui-react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import right_arrow from '../../assets/images/right_arrow.png'
import left_arrow from '../../assets/images/left_arrow.png'

export const SliderParty = () => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 9
        },
        desktop: {
            breakpoint: { max: 3000, min: 1300 },
            items: 7
        },
        smalldesktop: {
          breakpoint: { max: 1300, min: 1024 },
          items: 6  
        },
        tablet: {
          breakpoint: { max: 1024, min: 1000 },
          items: 5
        },
        smalltablet: {
            breakpoint: { max: 1000, min: 464 },
            items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
      const images = [
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      ];


      function CustomRightArrow({ onClick }) {
        return (
          <button
            onClick={onClick}
            aria-label="Go to next slide"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
          >
          <img src={right_arrow}  alt="Logo" />
          </button>
        );
      }
    
      function CustomLeftArrow({ onClick }) {
    
        return (
          <button
            onClick={onClick}
            aria-label="Go to previous slide"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
          >
              <img src={left_arrow}  alt="Logo" />
              </button>
        );
      }
    
      const ButtonGroup = ({ next, previous }) => {
        return (
          <div className="carousel-button-group">
            <CustomLeftArrow
              onClick={() => previous()}
            />
            <CustomRightArrow onClick={() => next()} />
          </div>
        );
      }

  return (
      <>
        <div className="container_slider ">

            <Carousel
            responsive={responsive}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            arrows={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            customButtonGroup={<ButtonGroup />}
            renderButtonGroupOutside={true}
            >
                <div className="main_div"> <div className="child_div"> 1 </div> </div>
                <div className="main_div"> <div className="child_div"> 2 </div> </div>
                <div className="main_div"> <div className="child_div"> 3 </div> </div>
                <div className="main_div"> <div className="child_div"> 4 </div> </div>
                <div className="main_div"> <div className="child_div"> 5 </div> </div>
                <div className="main_div"> <div className="child_div"> 6 </div> </div>
                <div className="main_div"> <div className="child_div"> 7 </div> </div>
                <div className="main_div"> <div className="child_div"> 8 </div> </div>
                <div className="main_div"> <div className="child_div"> 9 </div> </div>
                <div className="main_div"> <div className="child_div"> 10 </div> </div>
                {/* {images.map(image => {
                    return (
                        <>
                            <Image
                                draggable={false}
                                src={image}
                            />
                        </>
                    )
                })} */}
            </Carousel>
     
        </div>            
      </>
  )
}
