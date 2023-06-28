import { Splide, type SplideProps } from "@splidejs/react-splide";

export interface ICarouselProps extends SplideProps {}

const Carousel = ({ options, ...rest }: ICarouselProps) => {
  return (
    <Splide
      options={{
        snap: true,
        gap: "0.5rem",
        pagination: false,
        ...options,
      }}
      {...rest}
    />
  );
};

export default Carousel;
