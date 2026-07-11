import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap

} from "react-leaflet";

import { useState, useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

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
function SearchControl({ setPosition }) {

    const map = useMap();

    useEffect(() => {

        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            style: "bar",
            showMarker: false, // we already render our own <Marker>
            autoClose: true,
            keepResult: true,
            searchLabel: "Search for your location..."
        });

        map.addControl(searchControl);

        map.on("geosearch/showlocation", (result) => {

            const newPosition = [result.location.y, result.location.x];

            setPosition(newPosition);

            map.setView(newPosition, 16);

        });

        return () => map.removeControl(searchControl);

    }, [map, setPosition]);

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

            <SearchControl
                setPosition={updatePosition}
            />


        </MapContainer>


    )

}