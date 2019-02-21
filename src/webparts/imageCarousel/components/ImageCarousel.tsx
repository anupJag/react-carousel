import * as React from 'react';
import styles from './ImageCarousel.module.scss';
import { IImageCarouselProps, IImageCarouselConfig } from './IImageCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Carousel from './Carousel/Carousel';

export default class ImageCarousel extends React.Component<IImageCarouselProps, {}> {
  public render(): React.ReactElement<IImageCarouselProps> {
    return (
      <div className={styles.imageCarousel}>
        <div className={styles.container}>
          <div className={styles.row}>
            {
              this.props.carouselConfig && this.props.carouselConfig.length > 0 ?
                this.props.carouselConfig.map((el: IImageCarouselConfig, index) =>
                  <Carousel
                    key={index}
                    imageURL={el.imageURL}
                    imageRedirectURL={el.imageRedirectURL}
                    imageText={el.imageText}
                  />
                )
                :
                <p>Please Configure the Webpart</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
