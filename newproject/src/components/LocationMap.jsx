import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";

import { useState } from "react";


function LocationMarker({ setPosition }) {


    useMapEvents({

        click(e) {

            setPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);

        }

    });


    return null;

}



export default function LocationMap({ setUserLocation }) {


    const [position, setPosition] = useState([
        31.5204,
        74.3587
    ]);



    const updatePosition = (newPosition) => {

        setPosition(newPosition);

        setUserLocation({
            latitude: newPosition[0],
            longitude: newPosition[1]
        });


    }



    return (


        <MapContainer

            center={position}

            zoom={13}

            style={{
                height: "400px",
                width: "100%"
            }}

        >


            <TileLayer

                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

            />



            <Marker position={position} />


            <LocationMarker
                setPosition={updatePosition}
            />



        </MapContainer>


    )

}