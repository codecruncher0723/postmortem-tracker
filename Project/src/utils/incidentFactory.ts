import type { Incident, Severity } from '../models/incident';

export function createIncident(title: string, description: string, severity: Severity): Incident{
    return {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        severity: severity,
        status: 'OPEN',
        createdAt: new Date()
    };
}                                                                                                                                    