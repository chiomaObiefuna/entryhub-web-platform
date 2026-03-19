const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');

// Function to open the menu
function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

// Function to close the menu
function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Event Listeners
openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

// Clicking the dark overlay background will also close the menu
overlay.addEventListener('click', closeMenu);
