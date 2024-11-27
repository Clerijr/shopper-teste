import React, { useEffect, useState } from "react";
import { Ride } from "./types";

const Table: React.FC = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('localhost:8080/ride/10?driver_id=2'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.map((ride: Ride) => ({
                "Origem": ride.origin,
                "Destination": ride.destination,
                "Distance": `${ride.distance / 1000}km`,
                "Duração": ride.duration,
                "Valor": `R$ ${ride.value}`,
                "Motorista": ride.driver.name,
                "Data da Viagem": new Date(ride.created_at).toString(),
              })));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="overflow-x-auto">
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                    <thead>
                        <tr>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Distância</th>
                            <th>Duração</th>
                            <th>Valor</th>
                            <th>Motorista</th>
                            <th>Data da Viagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>)}
        </div>
    );
};

export default Table;
