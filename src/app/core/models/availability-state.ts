export class AvailabilityState {
  state:
    | 'AVAILABLE'
    | 'AVAILABLE_BUT_DELAYED'
    | 'NOT_AVAILABLE'
    | 'COULD_NOT_DETERMINE' = 'COULD_NOT_DETERMINE';
  notes: string = '';
}
