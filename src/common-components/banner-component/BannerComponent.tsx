// BannerComponent.tsx

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './style/style-banner.scss';

interface ItemData {
    id: number;
    image: string;
}

const items: ItemData[] = [
    {
        id: 1,
        image: 'https://allimages.sgp1.digitaloceanspaces.com/toplisteduvn/2023/03/Top-19-Cua-Hang-Xe-May-Cu-Ha-Noi-Uy.png',
    },
    {
        id: 2,
        image: process.env.PUBLIC_URL + '/banner2.png',
    },
    {
        id: 3,
        image: process.env.PUBLIC_URL + '/banner3.png',
    }
];

const CarouselItem: React.FC<ItemData> = ({ id, image }) => {
    return (
        <div key={id} className="carousel-item">
            <img className="carousel-image" src={image} alt={`Banner ${id}`} />
        </div>
    );
}

const BannerComponent: React.FC = () => {
    return (
        <div className="carousel-container">
            <Carousel animation="slide">
                {items.map(item => (
                    <CarouselItem key={item.id} {...item} />
                ))}
            </Carousel>
        </div>
    );
}

export default BannerComponent;
