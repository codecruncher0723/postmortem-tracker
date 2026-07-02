import type { Incident } from '../models/incident';

export function renderIncidentCard(incident: Incident): string{
    const dateString = incident.createdAt.toLocaleDateString();
    const severityKey = incident.severity.toLowerCase();
    const statusKey = incident.status.toLowerCase();

    return `
    <div class="incident-card" data-id="${incident.id}" data-severity="${severityKey}" data-status="${statusKey}">
      <div class="incident-card-actions">
        <button class="delete-btn btn-icon btn-icon-danger" aria-label="Delete incident">Delete</button>
        <button class="resolve-btn btn-icon" aria-label="Resolve incident">Resolve</button>
      </div>
      <div class="incident-card-body">
        <h3 class="incident-title">${incident.title}</h3>
        <div class="incident-badges">
          <span class="badge severity-${severityKey}">${incident.severity}</span>
          <span class="badge status-${statusKey}">${incident.status}</span>
        </div>
        <p class="incident-description">${incident.description}</p>
        <small class="incident-meta">Logged on: ${dateString}</small>
      </div>
    </div>
  `;
}
