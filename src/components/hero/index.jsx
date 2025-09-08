import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import "/node_modules/slick-carousel/slick/slick-theme.css";
import "/node_modules/slick-carousel/slick/slick.css";
import Slider from "react-slick";

export default function HeroCarousel() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const item = localStorage.getItem("list");
  const itemList = JSON.parse(item);

  console.log(itemList,"test");

  const slides = [
    {
      title: "Freshness You Can Trust, Daily.",
      subtitle: "Pure Choices for a Healthy Life.",
      image: "/assets/carousel/gi_1.jpg",
    },
    {
      title: "From Farm to Basket, Always Fresh.",
      subtitle: "Groceries at Your Doorstep.",
      image: "/assets/carousel/gi_2.jpg",
    },
    {
      title: "Your Daily Essentials, Made Easy.",
      subtitle: "Fast, Fresh & Hassle-Free.",
      image: "/assets/carousel/gi_3.jpg",
    },
  ];

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          
          <Box
            key={index}
            sx={{
              height: { xs: "40vh", md: "60vh" },
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.55)",
              }}
            />

            {/* Content */}
            <Container
              sx={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "#fff",
              }}
            >
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {slide.subtitle}
              </Typography>
             
            </Container>
          </Box>
          
        ))}
      </Slider>
    </Box>
  );
}
