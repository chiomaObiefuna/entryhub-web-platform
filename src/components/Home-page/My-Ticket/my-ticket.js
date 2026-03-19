document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Tab Switching Logic ---
    const ticketTabs = document.querySelectorAll('.ticket-tab');
    
    // add content sections for each tab later, you would select them here:
    // const tabContents = document.querySelectorAll('.ticket-content-pane');

    ticketTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs
            ticketTabs.forEach(t => t.classList.remove('active'));
            
            // Add 'active' class to the clicked tab
            tab.classList.add('active');

        });
    });

    // --- 2. Button Click Handlers ---
    const downloadBtn = document.querySelector('.btn-download');
    const viewBtn = document.querySelector('.btn-view');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder for actual download logic (e.g., triggering a PDF generation or API call)
            alert('Initiating ticket download...');
            console.log('Download button clicked for Burna Boy Live ticket.');
        });
    }

    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder for viewing full ticket details (e.g., opening a modal or navigating to a new page)
            alert('Opening full ticket view...');
            console.log('View button clicked.');
        });
    }
});