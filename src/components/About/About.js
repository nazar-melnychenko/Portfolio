import React from 'react';
import './About.sass';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'
import { Link } from "react-router-dom";

function About() {
  return (
	 <div className="aboutWrapper">
		<Title title="Про мене"/>
		<div className="content">
		  <h3>Про мене</h3>
		  <div className="content__wrapper">
			 <div className="content__wrapper--photo">
				<div className="img">
				  <img src="img/avatar.jpg" alt="Аватар"/>
				</div>
			 </div>
			 <div className="content__wrapper--desc">
				<h4>Вітаю Вас...на даній сторінці розкажу трохи про себе...</h4>
				<p>Мене звати Мельниченко Назар, я займаюся Front-End розробкою. Ще за часи студенства самостійно освоював
				такі технології як: HTML, CSS, JS, PHP, MySQL. На цих же технологіях написав та захистив успішно дипломну роботу.</p>
				<p>В 2020 році закінчив курси Beetroot Academy за напрямком Front-End розробка, технології які освоїв, удосконалив за час
				навчання будуть описані нижче. Також в розділі <Link  to="/portfolio">Портфоліо</Link> Ви можете переглянути мої роботи.</p>
				<p>Для більш детальної інформації, завантажте моє резюме, а також перейдіть на GitHub:</p><br />
				<span className="links">
				  <a href="Nazar_Melnychenko_CV.pdf" download><img className="icon" src="/img/ms.png" alt="CV"/>Резюме</a>&ensp;&ensp;&ensp;&ensp;&ensp;
				  <a href="https://github.com/nazar-melnychenko" target="_blank"><img className="icon" src="/img/github.png" alt="Git"/>GitHub</a>
				</span>
				<hr />
				<h5>Технології:</h5>
				<div className="technology">
				  <img src="/img/about/html.png" alt="HTML"/>
				  <img src="/img/about/css.png" alt="CSS"/>
				  <img src="/img/about/js.png" alt="JS"/>
				  <img src="/img/about/bootstrap.png" alt="Bootstrap"/>
				  <img src="/img/about/sass.png" alt="SASS"/>
				  <img src="/img/about/less.png" alt="LESS"/>
				  <img src="/img/about/jquery.png" alt="jQuery"/>
				  <img src="/img/about/react.png" alt="React"/>
				  <img src="/img/about/php.png" alt="PHP"/>
				  <img src="/img/about/mysql.png" alt="MySql"/>
				  <img src="/img/about/gulp.png" alt="Gulp"/>
				  <img src="/img/about/webpack.png" alt="Webpack"/>
				  <img src="/img/about/wordpress.png" alt="Wordpress"/>
				  <img src="/img/about/woocommerce.png" alt="WooCommerce"/>

				</div>
			 </div>
		  </div>

		</div>
		<Footer/>
	 </div>
  );
}

export default About;