import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPicker({ coordinates, listing }) {
    return (
        <MapContainer
            center={coordinates}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={coordinates}>
                <Popup>
                    <div>
                        <h3>{listing.title}</h3>
                        <p><strong>Rent:</strong> ₹{listing.rent}/month</p>
                        <p><strong>Address:</strong> {listing.address}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {listing.isAvailable ? "Available" : "Not Available"}
                        </p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}