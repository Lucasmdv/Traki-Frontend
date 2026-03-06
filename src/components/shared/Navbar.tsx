'use client';

import { useState } from 'react';
import { Menu, X, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <PackageSearch className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-base font-semibold tracking-tight text-foreground">
                            Traki
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Seguimiento simple
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-6">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className="group inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    Inicio
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground">
                                    Productos
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[240px] gap-2 p-3">
                                        <li>
                                            <NavigationMenuLink
                                                href="/productos/1"
                                                className="block rounded-xl p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="text-sm font-medium text-foreground">
                                                    Producto 1
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Opción destacada para seguimiento.
                                                </p>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink
                                                href="/productos/2"
                                                className="block rounded-xl p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="text-sm font-medium text-foreground">
                                                    Producto 2
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Otra solución para envíos y trazabilidad.
                                                </p>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/about"
                                    className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    Acerca de
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/contact"
                                    className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    Contacto
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex md:items-center md:gap-3">
                    <Button
                        variant="ghost"
                        className="rounded-full px-5 text-sm font-medium"
                    >
                        Iniciar sesión
                    </Button>
                    <Button className="rounded-full px-5 text-sm font-medium shadow-sm">
                        Registrarse
                    </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        className="rounded-full"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                        <div className="space-y-1 rounded-2xl border bg-card p-3 shadow-sm">
                            <a
                                href="/"
                                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                Inicio
                            </a>
                            <a
                                href="/productos"
                                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                Productos
                            </a>
                            <a
                                href="/about"
                                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                Acerca de
                            </a>
                            <a
                                href="/contact"
                                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                Contacto
                            </a>
                        </div>

                        <div className="mt-4 grid gap-2">
                            <Button variant="outline" className="w-full rounded-full">
                                Iniciar sesión
                            </Button>
                            <Button className="w-full rounded-full">Registrarse</Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}