"use client";
import { Home, ShoppingBasket, Banknote, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Produtos",
      url: "/Produtos",
      icon: ShoppingBasket,
    },
    {
      title: "Vendas",
      url: "/Vendas",
      icon: Banknote,
    },
    {
      title: "Perfil",
      url: "/Perfil",
      icon: User,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarContent className="bg-[#9333ea]">
        <SidebarGroup className="">
          <SidebarGroupLabel className="text-lg">Get Stock</SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-[#a855f7] transition-colors duration-200 `}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
