import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';

const BackgroundCarousel = () => {
  const slides = [
    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg'
  ];

  useEffect(() => {
    // Preload images
    slides.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 perspective-1000">
      <Swiper
        modules={[Autoplay, EffectFade, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
            rotate: [0, 0, -45],
            opacity: 0
          },
          next: {
            translate: [0, 0, -400],
            rotate: [0, 0, 45],
            opacity: 0
          }
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={index}
            style={{
              willChange: 'transform, opacity',
              contain: 'content'
            }}
          >
            <div 
              className="h-full w-full bg-cover bg-center transform-gpu"
              style={{ 
                backgroundImage: `url(${slide})`,
                filter: 'brightness(0.2) saturate(1.2)'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    </div>
  );
};

export default BackgroundCarousel;