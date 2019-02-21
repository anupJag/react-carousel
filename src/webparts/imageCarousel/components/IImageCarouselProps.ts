export interface IImageCarouselProps {
  carouselConfig: IImageCarouselConfig[];
  sliderTime : number;
}


export interface IImageCarouselConfig {
  imageURL: string;
  imageRedirectURL?: string;
  imageText?: string;
}