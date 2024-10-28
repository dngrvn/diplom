import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';

const sections = [
  {
    text: "Здесь вы можете делиться историями о ваших любимых пушистых, пернатых или чешуйчатых друзьях. Создавайте посты, выкладывайте фотографии и рассказывайте о том, как ваши питомцы делают вашу жизнь ярче и счастливее.",
    img: img1,
    alt: "img1"
  },
  {
    text: "Вы можете делиться своими удивительными историями о приключениях по всему миру. Рассказывайте о местах, которые вас вдохновили, делитесь советами для путешествий, выкладывайте фотографии и впечатления о том, как вы открывали для себя новые города, страны и культуры.",
    img: img2,
    alt: "img2"
  },
  {
    text: "Можете делиться своими уникальными способами отдыха и восстановления. Будь то активные приключения, спокойные выходные в кругу семьи, медитация на природе или уютные вечера с книгой — расскажите, что помогает вам расслабиться и перезагрузиться.",
    img: img3,
    alt: "img3"
  },
  {
    text: "Делитесь своим опытом, профессиональными достижениями и рассказами о ежедневных вызовах на работе. Рассказывайте, чем занимаетесь, делитесь полезными советами, мотивацией, а также историями успехов и неудач в карьере.",
    img: img4,
    alt: "img4"
  }
];

const Section = ({ text, img, alt }) => (
  <div className='text-center mb-20 italic mx-auto'>
    <p className='mb-10'>{text}</p>
    <img src={img} alt={alt} className="mx-auto mb-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" />
  </div>
);

const Welcome = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='text-center p-8'>
        <div className='hero-section'>
          <h1 className='text-4xl font-bold text-white'>BLOG</h1>
          <p>Здесь вы можете создать свой блог</p>
        </div>
      </header>
      <section className="flex-grow">
        <div className="mb-4 text-center">
          <div className="text-xl text-center text-gray-300">
            <div className="fade-in-up">Здесь могут храниться ваши самые запоминающиеся моменты</div>
            <div className="italic text-sm py-1 text-gray-500 fade-in-up">
              Чтобы создать свой собственный блог, потребуется лишь несколько минут.
            </div>
            <button className="text-xs text-white bg-gray-600 px-4 py-2 mt-4 rounded">
              <Link to="/register" className="ml-1 text-xs text-white">
                Создать блог
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section className='p-8 text-center text-white mb-6'>
        {sections.map((section, index) => (
          <Section key={index} text={section.text} img={section.img} alt={section.alt} />
        ))}
      </section>

      <div className='text-center mb-20 italic mx-auto'>
        <p className='mb-10'>
          Присоединяйтесь к нашему сообществу и делитесь своими историями! Независимо от того, о чем вы хотите рассказать — о работе, путешествиях, отдыхе или любимых питомцах — каждый пост важен и может стать источником вдохновения для других. Давайте вместе создавать пространство для обмена идеями, опытом и впечатлениями!
        </p>
      </div>
      <footer className="bg-gray-800 text-white text-center text-xs p-1 fixed bottom-0 left-0 w-full">
        <p>&copy; 2024 Блог. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default Welcome;