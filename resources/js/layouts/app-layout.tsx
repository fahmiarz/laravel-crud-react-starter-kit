import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const page = usePage();

    useEffect(() => {
        if (page.props.flash.message) {
            toast.success(page.props.flash.message);
        }

        if (page.props.flash.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props.flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Toaster position="top-center" richColors />
            {children}
        </AppLayoutTemplate>
    );
}
