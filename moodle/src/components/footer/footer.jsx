import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <div className="footerrrr">
            <footer className='footer'>
                <div className="container">
                    <div className="footer__inner">
                        <div className="footer__menus">
                            <div>
                                <h5>КОНТАКТЫ</h5>
                                <nav className="footer__nav-first">
                                    <a href="#!" className="footer__link">Адрес: Мангилик ел, C1</a>
                                    <a href="#!" className="footer__link">Почта: aituc@gmail.com</a>
                                    <a href="#!" className="footer__link">Телефон: +7 (7172) 645-710</a>
                                </nav>
                            </div>
                            <div>
                                <h5>Социальные Сети</h5>
                                <nav className="footer__nav-second">
                                    <a href="#!" id='fo2' className="footer__link">Facebook</a>
                                    <a href="#!" id='fo2' className="footer__link">Twitter</a>
                                    <a href="#!" id='fo2' className="footer__link">LinkedIn</a>
                                </nav>
                            </div>
                            <div>
                                <h5>ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ</h5>
                                <nav className="footer__nav-third">
                                    <a href="#!" id='fo3' className="footer__link">Блог</a>
                                    <a href="#!" id='fo3' className="footer__link">Статья</a>
                                    <a href="#!" id='fo3' className="footer__link">Партнеры</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='under__footer'>
                <div className="container">
                    <div className="under__footer-text">
                        COPYRIGHT © 2023 Your e-learning system. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;