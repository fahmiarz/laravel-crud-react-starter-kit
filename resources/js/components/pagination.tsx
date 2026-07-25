import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { PaginationMeta } from '@/types';

type Props = {
    meta: PaginationMeta;
};

export default function Pagination({ meta }: Props) {
    return (
        <div className="mt-1 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                Showing Page {meta.current_page} of {meta.last_page} (
                {meta.total} total items)
            </p>
            {meta.links.length > 1 && (
                <div className="flex gap-1">
                    {meta.links.map((link, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            disabled={!link.url}
                            asChild
                        >
                            <Link
                                href={link.url || '#'}
                                className={link.active ? 'bg-accent' : ''}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></span>
                            </Link>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
