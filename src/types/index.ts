export interface Program {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  categories: Category[];
  tags: Tag[];
  images: Image[];
  attributes: Attribute[];
  meta_data: MetaData[];
  institution?: {
    name: string;
    location: string;
  };
  program_details?: {
    type: string;
    duration: string;
    category: string;
    start_date?: string;
  };
  video_urls?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
} 