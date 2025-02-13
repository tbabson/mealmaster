import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/ImageSlider";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dwrmehhg3/image/upload/f_auto,q_auto/v1/mealmaster/lsldkvataufcy4d0knd2",
    title: "Delicious Breakfast Ideas",
    description: "Start your morning with these tasty and nutritious meals.",
  },
  {
    image:
      "https://res.cloudinary.com/dwrmehhg3/image/upload/f_auto,q_auto/v1/mealmaster/d8jreb98ifremoky9gav",
    title: "Master the Art of Cooking with Ease!",
    description: "Learn step-by-step how to prepare mouthwatering meals.",
  },
  {
    image:
      "https://res.cloudinary.com/dwrmehhg3/image/upload/f_auto,q_auto/v1/mealmaster/tzbgqvyvz5galhxz91p5",
    title: "Never Miss a Cooking Moment!",
    description: "Set reminders and keep your kitchen game strong.",
  },
  {
    image:
      "https://res.cloudinary.com/dwrmehhg3/image/upload/f_auto,q_auto/v1/mealmaster/iu2cvrr0hmabgkyqh9u7",
    title: "Your Meal, Perfectly Scheduled!",
    description: "Plan your meals effortlessly and stay on track.",
  },
  {
    image:
      "https://res.cloudinary.com/dwrmehhg3/image/upload/f_auto,q_auto/v1/mealmaster/fh99vjcgwf7dvldf5jj4",
    title: "Shop Ingredients Without the Hassle!",
    description: "Get fresh, quality ingredients delivered to your door.",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <Wrapper>
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="text-overlay">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="arrow-button left-arrow" onClick={prevSlide}>
          <BiSolidChevronLeft size={24} />
        </button>
        <button className="arrow-button right-arrow" onClick={nextSlide}>
          <BiSolidChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="dots-container">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ImageSlider;
