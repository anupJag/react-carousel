import * as React from 'react';
import Picture from './Picture/Picture';
import { IImageCarouselConfig } from '../IImageCarouselProps';
import styles from './Carousel.module.scss';

export interface ICarouselProps extends IImageCarouselConfig {
};

const carousel = (props: ICarouselProps) => {

    const imgContent = props.imageRedirectURL ?
        <a href={props.imageRedirectURL} target="_blank" className={styles.withLink}>
            <Picture
                imgSrc={props.imageURL}
            />
        </a>
        :
        <Picture
            imgSrc={props.imageURL}
        />;

    const content = props.imageText ?
        <div className={styles.contentArea}>
            <div className={styles.content}>
                {props.imageText}
            </div>
        </div> : null;


    return (
        <div className={styles.carouselHolder}>
            {imgContent}
            {content}
        </div>
    );
};

export default carousel;