// Calculate the total imbalance for each hour based on the forecast data
export const calculateImbalance = (members) => {
    const hourlyImbalance = {};

    // Ensure members exist and is an array
    if (!members || !Array.isArray(members)) {
        console.error('Invalid members data:', members);
        return [];
    }

    members.forEach(member => {
        // Ensure the member has a forecast array
        if (!member.forecast || !Array.isArray(member.forecast)) {
            console.error(`No forecast data for member ${member.id}`);
            return; // Skip this member if no forecast is available
        }

        member.forecast.forEach(forecast => {
            // Convert date to a consistent string format (ISO)
            const dateKey = new Date(forecast.date).toISOString(); // Ensure consistent date format
            const { value } = forecast;

            // Initialize the imbalance at each hour (dateKey) if not already set
            if (!hourlyImbalance[dateKey]) {
                hourlyImbalance[dateKey] = 0;
            }

            // Add the forecast value: inflows are positive for producers, negative for consumers
            hourlyImbalance[dateKey] += member.type === 'Producer' ? value : -value;
        });
    });

    // Convert the imbalance object into an array of {date, imbalance} for easier rendering
    return Object.entries(hourlyImbalance).map(([date, imbalance]) => ({
        date,
        imbalance
    }));
};