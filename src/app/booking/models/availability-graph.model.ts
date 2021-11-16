export class AvailabilityGraph {
  id?: number;
  name?: string;
  availabilityGraph: Array<DateAvailable> = [];
}

export class DateAvailable {
  date?: string;
  available?: boolean;
}
