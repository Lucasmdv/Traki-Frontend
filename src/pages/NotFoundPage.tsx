import { Button } from "@/components/ui/button"

export const NotFoundPage = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold">404</h1>
            <p>Página no encontrada</p>
            <Button variant="outline" asChild className="mt-6">
                <a href="/">Volver a la página principal</a>
            </Button>
        </div>
    )
}