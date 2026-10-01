import { Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SlideOne } from "./SlideOne";
import { SlideTwo } from "./SlideTwo";
import { SlideThree } from "./SlideThree";

export const DisplayCarousel = () => {
  const { mode, theme } = useZTheme();

  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />];

  return (
    <>
      <style>
        {`
        .swiper-pagination {
        margin: 12px 0px; 
        } 
          .swiper-pagination-bullet {
            background-color: ${theme[mode].grayLight};
            width: 12px;
            height: 12px;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: ${theme[mode].light};
            width: 24px;
            border-radius: 6px;
          }
        `}
      </style>

      <Stack
        sx={{
          borderRadius: "32px",
          background:
            "linear-gradient(153deg, var(--c5, #474B54) 0%, var(--c7, #0F1216) 32%);",
          width: "100%",
          maxWidth: "678px",
          overflow: "hidden",
        }}
      >
        {/* Swiper */}
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "98vh",
          }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "32px",
              // minHeight: "80%",
            }}
          >
            {slides.map((e, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "100%",
                  // height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "16px",
                }}
              >
                {e}
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      </Stack>
    </>
  );
};
