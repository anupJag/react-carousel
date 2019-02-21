import * as React from 'react';
import styles from './Picture.module.scss';

export interface IPictureProps {
    imgSrc: string;
}

const picture = (props: IPictureProps) => {
    return (
        <img src={props.imgSrc} alt="" className={styles.imageHolder}/>
    );
};

export default picture;