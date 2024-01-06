import { useEffect } from 'react';
import { useBreadcrumbsUpdater } from '../Breadcrumbs/BreadcrumbsContext';
import './About.css'

const About: React.FC = () => {

    const updateBreadcrumbs = useBreadcrumbsUpdater();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Главная', path: '/' }, { name: 'О нас', path: '/about' }]);
    }, []);

    return (
        <div className="o4ko">
            <div className="about-text">
                <div>
                    Этот веб - сайт — настоящая находка для преподавателей, и вот почему: здесь вы можете создавать опросы, спрашивая своих студентов об их впечатлениях от курса.
                    Полученные ответы — настоящее сокровище ценной информации, которая помогает вам совершенствовать свои занятия.Так что если вы хотите, чтобы ваш курс был на высшем уровне, вы попали по адресу!
                </div>
                <div>
                    На этом сайте мы стремимся создать мост между преподавателями и студентами, давая вам возможность не только учить, но и учиться на основе обратной связи. Здесь вы можете легко проводить опросы, собирая не только похвалы, но и конструктивные предложения.
                </div>
                <div>
                    Мы верим, что образование — это взаимный процесс, и ваш курс заслуживает быть лучшим, благодаря мнению тех, кто его проходит.
                </div>
            </div >
        </div>
    )
}

export default About