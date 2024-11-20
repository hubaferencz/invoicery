type SidebarItem = {
    id: number;
    label: string;
    subtitle: string;
    iconPath: string;
    activeIconPath: string;
    completeIconPath: string;
    altText: string;
    component: React.ReactNode;
  };