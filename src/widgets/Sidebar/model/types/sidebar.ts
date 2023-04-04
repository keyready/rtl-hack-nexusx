import React from 'react';

export interface SidebarItemType {
    path: string;
    text: string;
    authOnly?: boolean;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}
