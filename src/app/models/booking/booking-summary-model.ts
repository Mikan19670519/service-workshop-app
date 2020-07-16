import { SelectListItem } from '../shared/utility/select-list-item';

export interface BookingSummaryModel {
    bookingId: string;
    notes: string;
    bookingDate: Date;
    clientId: string;
    vehicleId: string;
    validationMessage: string;
    booking: SelectListItem[];
    selectedItem: string;
}
