export interface AircraftTypeData {
        manufacturer: string;
        model: string;
        engine_type: string;
        max_speed_knots: string;
        ceiling_ft: string;
        gross_weight_lbs: string;
        length_ft: string;
        height_ft: string;
        wing_span_ft: string;
        range_nautical_miles: string;      
}

export interface AircraftTypeAttributes {
    id: string;
    model: string;
    manufacturer: string;
    max_speed_knots: number;
    ceiling_ft: number;
    gross_weight_lbs: number;
    length_ft: number; 
    height_ft: number;
    wing_span_ft: number;
    range_nautical_miles: number;
}

export interface AircraftAttributes {
    id: string;
    registration: string;
    special_livery: boolean;
    type: string;
    aircraft_description: string;
}