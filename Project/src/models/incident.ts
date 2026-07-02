export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Status = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export interface Incident{
    id: string;
    title: string;
    description: string;
    severity: Severity;
    createdAt: Date;
    status: Status;
    resolvedAt?: Date; 
}

export type IncidentDropdownItem = Pick<Incident, 'id'|'title'>;
export type NewIncidentInput = Omit<Incident, 'id'|'createdAt' | 'resolvedAt' | 'status'>;

