import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/ImageSlider";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

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
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );

  return (
    <Wrapper>
      <div className="slider-container">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="slide active"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
            />
            <div className="text-overlay">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slides[currentIndex].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentIndex].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

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
