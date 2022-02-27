import { React, useEffect } from 'react'
import { Image } from "semantic-ui-react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import right_arrow from '../assets/images/right_arrow.png'
import left_arrow from '../assets/images/left_arrow.png'

export const Slider = (props) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1300 },
            items: 6
        },
        smalldesktop: {
            breakpoint: { max: 1300, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 1000 },
            items: 4
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

    useEffect(() => {
        // imitialize slider
      }, []);

    function CustomRightArrow({ onClick }) {
        return (
            <button
                onClick={onClick}
                aria-label="Go to next slide"
                className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
            >
                <img src={right_arrow} className="slide-arrow-button" alt="Logo" />
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
                <img src={left_arrow} className="slide-arrow-button" alt="Logo" />
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
                    autoPlay={true}
                    responsive={responsive}
                    infinite={true}
                    // autoPlaySpeed={2000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    // transitionDuration={500}
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
                    {props.images && props.images.map(image => {
                        return (
                            <div className="main_div">
                                <div className="child_div">
                                    <Image
                                        draggable={false}
                                        src={image}
                                        style={{ width: 130, height: 130 }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </Carousel>

            </div>
        </>
    )
}
