import heroImage from '../assets/hero-image.svg';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Hello, I am <strong>Sanjana</strong>
          </h1>
          <p>(SUN-juh-nuh)</p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Product Designer" />
          <p className="tagline">Product Designer looking for Employment</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
