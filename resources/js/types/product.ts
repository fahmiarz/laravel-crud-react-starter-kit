import type { Paginated } from './pagination';

export type Product = {
    id: number;
    name: string;
    description: string;
};

export type PaginatedProducts = Paginated<Product>;
