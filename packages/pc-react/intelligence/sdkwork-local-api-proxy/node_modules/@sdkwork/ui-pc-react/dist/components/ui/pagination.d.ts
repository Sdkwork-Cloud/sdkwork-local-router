import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button';
import * as React from 'react';
export type PaginationContentProps = React.ComponentPropsWithoutRef<'ul'>;
export type PaginationItemProps = React.ComponentPropsWithoutRef<'li'>;
export type PaginationProps = React.ComponentPropsWithoutRef<'nav'>;
declare const Pagination: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
export type PaginationLinkProps = React.ComponentPropsWithoutRef<'a'> & {
    isActive?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, 'size'>;
export type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink>;
export type PaginationNextProps = React.ComponentProps<typeof PaginationLink>;
export type PaginationEllipsisProps = React.ComponentPropsWithoutRef<'span'>;
declare const PaginationLink: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    isActive?: boolean;
} & Pick<VariantProps<(props?: ({
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string>, "size"> & React.RefAttributes<HTMLAnchorElement>>;
declare const PaginationPrevious: {
    ({ className, ...props }: PaginationPreviousProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PaginationNext: {
    ({ className, ...props }: PaginationNextProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PaginationEllipsis: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
