import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { image } from "../../api/axios/axios";

export default function HeroCarousel() {
  const theme = useTheme();

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
      title: "Welcome to Our Platform",
      subtitle: "Seamless solutions for your business needs.",
      image: "https://source.unsplash.com/1600x800/?technology,office",
    },
    {
      title: "Empower Your Workflow",
      subtitle: "Boost productivity with modern tools.",
      image: "https://source.unsplash.com/1600x800/?business,teamwork",
    },
    {
      title: "Scale With Confidence",
      subtitle: "Grow faster with scalable solutions.",
      image: "https://source.unsplash.com/1600x800/?growth,success",
    },
  ];

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {itemList.map((slide, index) => (
          <>
          {console.log(slide.image,'itemList')}
          <Box
          
          // image={image(slide.image)}
            key={index}
            sx={{
              height: { xs: "40vh", md: "60vh" },
              backgroundImage: `url(${image(slide.image)})`,
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
                {slide.description}
              </Typography>
             
            </Container>
          </Box>
          </>
        ))}
      </Slider>
    </Box>
  );
}
