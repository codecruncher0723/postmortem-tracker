import type { Incident, Status, Severity } from '../models/incident';

export function countIncidentsByStatus(incidents: Incident[], statusToCount: Status): number{
    const filteredArray = incidents.filter(incident => incident.status === statusToCount);
    return filteredArray.length;
}

export function countCriticalIncidents(incidents: Incident[]): number{
    const criticalIncidents = incidents.filter(incident => incident.severity === 'CRITICAL');
    return criticalIncidents.length;
}

export function getSeverityTally(incidents: Incident[]): Record<Severity, number>{
    const initialTally: Record<Severity, number> = {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0,
    };
    return incidents.reduce((tally,incident) => {
        tally[incident.severity] ++;
        return tally;
    }, initialTally);
}