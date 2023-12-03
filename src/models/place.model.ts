interface Place {
    id: string;
    formattedAddress: string;
    location: Location;
    displayName: DisplayName;
}

interface Location {
    latitude: number;
    longitude: number;
}

interface DisplayName {
    text: string;
}

interface PlacesResponse {
    places: Place[];
}