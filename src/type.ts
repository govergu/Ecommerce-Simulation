export interface ProductType {
    id: number;
    title: string;
    price: number;
    rating: number;
    description: string;
    discountPercentage: number;
    brand: string;
    category: string;
    tags: string[]
    stock: number;
    images: string[];
    reviews: Review;
    shippingInformation: string;
    thumbnail: string;    
    warrantyInformation: string;
    weight: number;

    
}

export interface Review {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
}