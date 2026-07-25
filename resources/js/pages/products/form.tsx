import { Form, Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import products from '@/routes/products';
import type { Product } from '@/types/index.ts';

type Props = {
    product: Product;
};

export default function ProductForm({ product }: Props) {
    const { url } = usePage();
    const action = product.id
        ? products.update.form({ product: product.id })
        : products.store.form();

    return (
        <>
            <Head title="Products" />
            <Form {...action}>
                {({ errors, processing }) => (
                    <>
                        <div className="absolute inset-0 flex flex-col items-center gap-4 rounded-xl p-4 md:p-6">
                            <div className="flex w-1/2 justify-between gap-4">
                                <h1 className="text-2xl">
                                    {url != '/products/create'
                                        ? 'Edit Product'
                                        : 'Create Product'}
                                </h1>
                                <Button disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Product'}
                                </Button>
                            </div>
                            <div className="grid w-1/2 gap-4">
                                <div className="flex gap-4 pt-8">
                                    <Card className="md-4 w-full p-4">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={product.name}
                                                placeholder="Product name"
                                                aria-invalid={!!errors.name}
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="description">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                defaultValue={
                                                    product.description
                                                }
                                                placeholder="Product description"
                                                aria-invalid={
                                                    !!errors.description
                                                }
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="mt-8 flex w-1/2 justify-between">
                                <Button variant="secondary">Cancel</Button>
                                <Button disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Product'}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

ProductForm.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: products.index(),
        },
    ],
};
