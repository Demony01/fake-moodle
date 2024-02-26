import { Link as ScrollLink } from 'react-scroll';
import React from 'react'
import './main.css'
import vector from './vector.svg'
import cap from './cap.svg'
import photo1 from './image1.svg'
import photo2 from './image2.svg'
import photo3 from './image3.svg'
import photo4 from './image4.svg'
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Main() {
    return (
        <div className='main'>
            <div className="main-bg">
                <div className="container">
                    <div className="main-main">
                        <div className="main-text">
                            УЧИТЕСЬ В ЛЮБОМ МЕСТЕ
                        </div>
                        <div className="main-desc-text">
                            Научитесь в любом месте с нашей системой электронного обучения! Мы предоставляем удобный доступ к образовательным материалам, позволяя вам гибко учиться в соответствии с вашим графиком и местоположением. Будьте на шаге впереди, осваивайте новые знания в комфортной обстановке, где бы вы ни находились. Учитесь эффективно и мобильно с нашей инновационной системой обучения!
                        </div>
                        <div className="vector">
                            <ScrollLink to="group" smooth={true} duration={500}>
                                <img src={vector} alt="" />
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grooo' id='group'>
                <div className="containerr">
                    <div className='group'>
                        <div className="group__images">
                            <div className="group__1">
                                <img src={photo2} alt="" />
                                <p>
                                    ГИБКОСТЬ ОБУЧЕНИЯ
                                </p>
                            </div>
                            <div className="group__2">
                                <img src={photo3} alt="" />
                                <p>
                                    <div className="photo__1-2">
                                        ТЕХНОЛОГИЙ БУДУЩЕГО
                                    </div>
                                </p>
                            </div>
                            <div className="group__3">
                                <img src={photo4} alt="" />
                                <p>
                                    <div className="photo__3">
                                        ИНТЕРАКТИВНОЕ ОБРАЗОВАТЕЛЬНЫЕ МАТЕРИАЛЫ
                                    </div>
                                </p>
                            </div>
                            <div className="group__4">
                                <img src={photo1} alt="" />
                                <p>
                                    <div className="photo__4">
                                        ГИБКАЯ ИНФРАСТРУКТУРА ЭЛЕКТРОННОГО ОБУЧЕНИЯ
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group2">
                        <div className='group2__text'>НАШИ ПРЕИМУЩЕСТВА</div>
                        <p>                Обеспечиваем гибкий график обучения, где вы можете учиться в удобное для вас время. Мы предоставляем индивидуализированный подход к обучению, используя последние образовательные технологии. Наши курсы ориентированы на практическое применение знаний в реальных ситуациях, чтобы вы могли успешно применять полученные навыки.</p>
                        <div className="btn-gr">
                            <a href="#" className='btn-a-group'>
                                <div className="btn-text">ПОДРОБНЕЕ</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>



            <div className="main-achieves">
                <div className="achieves-bg">
                    <div className="container">
                        <div className="achieves-menu">
                            <div className="achieves-text">
                                <div className="achieves-main-text">НАШИ ДОСТИЖЕНИЯ</div>
                                <div className="achieves-desc-text">
                                    В системе электронного обучения мы гордимся своими достижениями и стремимся к постоянному совершенствованию. Наша цель - предоставить высококачественное образование с использованием современных технологий и методик, чтобы обеспечить успешное обучение наших студентов.
                                </div>
                            </div>
                            <div className="achieves-cards">
                                <div className="achieves-card">
                                    <img src={cap} alt="" />
                                    <div className="cap-text">ЗАКОНЧИВШИЕ ОБУЧЕНИЕ</div>
                                    <div className="cap-text">343292</div>
                                </div>
                                <div className="achieves-card">
                                    <img src={cap} alt="" />
                                    <div className="cap-text">СТУДЕНТСКИЕ ПРОЕКТЫ</div>
                                    <div className="cap-text">Реализовано: 500+</div>
                                </div>
                                <div className="achieves-card">
                                    <img src={cap} alt="" />
                                    <div className="cap-text">ОТЗЫВЫ СТУДЕНТОВ</div>
                                    <div className="cap-text">4.9/5</div>
                                </div>
                                <div className="achieves-card">
                                    <img src={cap} alt="" />
                                    <div className="cap-text">ДОВОЛЬНЫЕ СТУДЕНТЫ</div>
                                    <div className="cap-text">95%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="swiper-menu">
                <div className="container">
                    <div className="swiper-text">
                        ПОСЛЕДНИЕ НОВОСТИ НА САЙТЕ
                    </div>
                    <div className="swiper-container">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            scrollbar={{ draggable: true }}
                        >
                            <SwiperSlide>
                                <img src="https://via.placeholder.com/500" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://via.placeholder.com/500" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://via.placeholder.com/500" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://via.placeholder.com/500" alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}