export function convertHoursStringToMinutes(hoursString: string) {
    const [hours, minutes] = hoursString.split(':').map(Number)
    
    const minutesAmout = (hours * 60) + minutes;

    return minutesAmout;
}