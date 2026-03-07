import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'

const HomePage = () => {

    const [trackingNumber, setTrackingNumber] = useState("")
    const [carrier, setCarrier] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)

    const handleTrack = () => {
        console.log(`Rastreando paquete con número: ${trackingNumber} y transportista: ${carrier}`)
        setShowSpinner(true)

        setTimeout(() => {
            setShowSpinner(false)
            alert("Rastreo completado (simulado)")
        }, 2000)
    }

    return (
        <div className='container mx-auto py-10'>
            <div className="max-w-3xl mx-auto">
                
                <h1 className='text-3xl font-bold mb-6'>Rastrea tu paquete</h1>

                <div className="flex gap-3 items-center">

                    <Input
                        className="flex-1"
                        placeholder="Ingrese el número de rastreo"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />

                    <NativeSelect
                        className="bg-background color-principal w-48"
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                    >
                        <option value="" disabled>Transportista</option>
                        <option value="oca">OCA</option>
                        <option value="andreani">Andreani</option>
                        <option value="correo">Correo Argentino</option>
                    </NativeSelect>

                    <Button onClick={handleTrack} className="flex items-center gap-2">
                        {showSpinner && <Spinner className="size-4" />}
                        Rastrear
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default HomePage