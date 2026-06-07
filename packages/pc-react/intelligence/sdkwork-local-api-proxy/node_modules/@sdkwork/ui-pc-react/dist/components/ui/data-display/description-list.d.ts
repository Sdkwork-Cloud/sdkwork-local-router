import * as React from 'react';
declare const descriptionListColumnsClassName: {
    readonly 1: "grid-cols-1";
    readonly 2: "grid-cols-1 xl:grid-cols-2";
    readonly 3: "grid-cols-1 xl:grid-cols-3";
};
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
    columns?: keyof typeof descriptionListColumnsClassName;
}
export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {
    mono?: boolean;
}
export type DescriptionItemProps = React.HTMLAttributes<HTMLDivElement>;
export type DescriptionTermProps = React.HTMLAttributes<HTMLElement>;
declare const DescriptionList: React.ForwardRefExoticComponent<DescriptionListProps & React.RefAttributes<HTMLDListElement>>;
declare const DescriptionItem: React.ForwardRefExoticComponent<DescriptionItemProps & React.RefAttributes<HTMLDivElement>>;
declare const DescriptionTerm: React.ForwardRefExoticComponent<DescriptionTermProps & React.RefAttributes<HTMLElement>>;
declare const DescriptionDetails: React.ForwardRefExoticComponent<DescriptionDetailsProps & React.RefAttributes<HTMLElement>>;
export { DescriptionDetails, DescriptionItem, DescriptionList, DescriptionTerm };
