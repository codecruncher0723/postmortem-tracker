    import type { Incident, Severity } from './models/incident';
    import { GenericStorage } from './services/storageService';
    import { createIncident } from './utils/incidentFactory';
    import { renderIncidentCard } from './components/IncidentCard';
    import { countCriticalIncidents } from './utils/analytics';

    //1.Initialize them service
    const incidentStorage = new GenericStorage<Incident>(
        'postmorterm_incidents',
        (raw: any): Incident => ({
            ...raw,
            createdAt: new Date(raw.createdAt),
            resolvedAt: (raw.resolvedAt)?new Date(raw.resolvedAt): undefined
        })
    );

    // 2. Query the DOM safely
    const dashboardContainer = document.getElementById('dashboard-container') as HTMLDivElement | null;

    if(!dashboardContainer){
        throw new Error('Critical: Dashboard container is missing from HTML');
    }



    // 3.Add incident Button
    const addIncidentBtn = document.getElementById('add-incident-btn') as HTMLButtonElement | null;

    if(!addIncidentBtn){
        throw new Error('Critical: Add incident button is missing from HTML');
    }

    // Query DOM for critical count in dashboard container
    const criticalCountElement = document.getElementById('critical-count') as HTMLSpanElement | null ;

    if(!criticalCountElement) throw new Error('CRITICAL: Critical count span element is missing in HTML');

    // Query DOM for export button
    const exportBtn = document.getElementById('export-btn') as HTMLButtonElement | null;
    if(!exportBtn) throw new Error('CRITICAL: Export Button is missing.');


    // Query the file input
    const importFileInput = document.getElementById('import-file') as HTMLInputElement | null;
    if (!importFileInput) throw new Error('CRITICAL: Import file input missing');

    // Query the search input
    const searchInput = document.getElementById('search-input') as HTMLInputElement ;
    if (!searchInput) throw new Error('CRITICAL:Search input is missing');

    // Query the Form
    const incidentForm = document.getElementById('incident-form') as HTMLFormElement | null;
    if(!incidentForm){
        throw new Error('CRITICAL: Incident Form is missing from HTML');
    }

    // Listen for the submit event
    incidentForm.addEventListener('submit',(event:SubmitEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const formData = new FormData(target);

        const title = formData.get('title') as string;
        console.log('New Incident Title: ',title);

        const description = formData.get('description') as string;
        const severity = formData.get('severity') as Severity;

        const newIncident: Incident = createIncident(title, description, severity);

        incidentStorage.saveNewItem(newIncident);

        target.reset();
        refreshDashboard();

    })

    // Dashboard Refresh function

    function refreshDashboard(){
        const allIncidents = incidentStorage.getAll();
        const searchTerm = searchInput!.value.toLowerCase();
        const filteredIncidents = allIncidents.filter(incident => 
            incident.title.toLowerCase().includes(searchTerm)
        )

        const sortedIncidents = [...filteredIncidents].sort((a,b) => b.createdAt.getTime() -a.createdAt.getTime()) 

        const htmlArray = sortedIncidents.map(item => renderIncidentCard(item));
        const finalHtmlString = htmlArray.join(``);
        dashboardContainer!.innerHTML = finalHtmlString;
        const criticalCount = countCriticalIncidents(filteredIncidents);
        criticalCountElement!.innerText = criticalCount.toString();


    }
    refreshDashboard();

    //Export Button Event Listener
    exportBtn.addEventListener('click', () => {
        incidentStorage.exportToJSON();
    })

    //Listen for when the user selects the file
    importFileInput.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if(!file) return;
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const jsonString = e.target?.result as string;
            // We have the text! Now we need a method to handle it.
            incidentStorage.importJSON(jsonString);
            refreshDashboard();
        }
        reader.readAsText(file);

    });

    // Listen for every key stroke
    searchInput.addEventListener('input', () => {
        refreshDashboard();
    })

    //Listen for delete button click from dashboard container
    dashboardContainer.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if(target.matches('.delete-btn')){
            const card = target.closest('.incident-card') as HTMLElement | null;
            if(card && card.dataset.id){
                const incidentId = card.dataset.id;
                const isConfirmed = window.confirm("Are you sure you want to delete this incident?");
                if(isConfirmed){
                    incidentStorage.deleteItem(incidentId);
                    refreshDashboard();
                }
            }
        }
        else if(target.matches('.resolve-btn')){
            const card = target.closest('.incident-card') as HTMLElement | null;
            if(card && card.dataset.id){
                const incidentId = card.dataset.id;
                incidentStorage.updateItem(incidentId,{ status: 'RESOLVED', resolvedAt: new Date() });
                refreshDashboard();
            }
        }
    });