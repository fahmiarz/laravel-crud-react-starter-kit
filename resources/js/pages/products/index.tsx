import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Save, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import products from '@/routes/products';
import type { PaginatedProducts, Product } from '@/types';

type Props = {
    collection: PaginatedProducts;
    search: string | null;
};

export default function ProductIndex({ collection, search }: Props) {
    const [searchTerm, setSearchTerm] = useState(search ?? '');
    const isFirstRender = useRef(true);
    const onDelete = (id: Product['id']) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(products.destroy(id));
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                products.index.url(),
                searchTerm ? { search: searchTerm } : {},
                {
                    preserveState: true,
                    replace: true,
                    only: ['collection', 'search'],
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="absolute top-1.5 right-4 flex items-center justify-end gap-2">
                    <Button>
                        <Link href={products.create()} className="flex gap-1">
                            <Save />
                            Add Product
                        </Link>
                    </Button>
                </div>
                <div className="relative mb-0 max-w-sm">
                    <Input
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products"
                        className="pr-9"
                    />
                    {searchTerm && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 size-9"
                            aria-label="Clear search"
                        >
                            <X className="size-4" />
                        </Button>
                    )}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-end">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="mr-2"
                                    >
                                        <Link href={products.edit(item.id)}>
                                            <Pencil />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        title="Delete"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination meta={collection.meta} />
            </div>
        </>
    );
}

ProductIndex.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: products.index(),
        },
    ],
};
