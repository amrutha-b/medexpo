// Global variables
let medicineDatabase = {};
let savedMedicines = [];

// Load medicine database
async function loadMedicineDatabase() {
    try {
        const response = await fetch('data/medicines.json');
        medicineDatabase = await response.json();
        console.log('Medicine database loaded successfully');
    } catch (error) {
        console.error('Error loading medicine database:', error);
    }
}

// Initialize application
async function initializeApp() {
    await loadMedicineDatabase();
    showSection('searchSection');
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            updateActiveLink(this);
        });
    });
}

// Navigation functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function updateActiveLink(clickedLink) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Search functionality
function searchMedicine() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    const loading = document.getElementById("loading");

    if (!searchInput) {
        resultsDiv.innerHTML = '<p>Please enter a medicine name to search.</p>';
        return;
    }

    loading.style.display = 'block';
    setTimeout(() => {
        const medicine = medicineDatabase[searchInput];
        loading.style.display = 'none';

        if (medicine) {
            displayMedicineInfo(medicine, resultsDiv);
        } else {
            resultsDiv.innerHTML = `
                <div class="medicine-details">
                    <h3 style="color: #dc3545;">❌ Not Found</h3>
                    <p>No medicine found with the name "${searchInput}".</p>
                    <p>Please check the spelling and try again.</p>
                </div>
            `;
        }
    }, 500);
}

// Display medicine information
function displayMedicineInfo(medicine, container) {
    container.innerHTML = `
        <div class="medicine-details">
            <h3>${medicine.name}</h3>
            <div class="detail-section">
                <p><strong>Type:</strong> ${medicine.type}</p>
                <p><strong>Usage:</strong> ${medicine.usage}</p>
                <p><strong>Dosage:</strong> ${medicine.dosage}</p>
                <p><strong>Side Effects:</strong> ${medicine.sideEffects.join(', ')}</p>
                <p><strong>Warnings:</strong> ${medicine.warnings}</p>
            </div>
            <button onclick='saveMedicine(${JSON.stringify(medicine)})'>
                Save to My List
            </button>
        </div>
    `;
}

// Category functions
function showCategory(category) {
    const resultsDiv = document.getElementById("categoryResults");
    const medicines = Object.values(medicineDatabase).filter(med => med.category === category);

    if (medicines.length > 0) {
        let html = '<div class="category-grid">';
        medicines.forEach(medicine => {
            html += `
                <div class="category-card" onclick='displayMedicineInfo(${JSON.stringify(medicine)}, document.getElementById("categoryResults"))'>
                    <h3>${medicine.name}</h3>
                    <p>${medicine.type}</p>
                </div>
            `;
        });
        html += '</div>';
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3 style="color: #dc3545;">❌ No Results</h3>
                <p>No medicines found in this category.</p>
            </div>
        `;
    }
}

// Drug interaction checker
function checkInteractions() {
    const drug1 = document.getElementById("drug1").value.trim().toLowerCase();
    const drug2 = document.getElementById("drug2").value.trim().toLowerCase();
    const resultsDiv = document.getElementById("interactionResults");

    if (!drug1 || !drug2) {
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <p style="color: #dc3545;">Please enter both medicines.</p>
            </div>
        `;
        return;
    }

    const med1 = medicineDatabase[drug1];
    const med2 = medicineDatabase[drug2];

    if (med1 && med2) {
        const hasInteraction = med1.interactions.includes(drug2) || med2.interactions.includes(drug1);
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3>${hasInteraction ? '⚠️ Interaction Found' : '✅ No Known Interaction'}</h3>
                <div class="detail-section">
                    ${hasInteraction 
                        ? `<p>Potential interaction detected between ${med1.name} and ${med2.name}.</p>
                           <p>Please consult with your healthcare provider before using these medicines together.</p>`
                        : `<p>No known interactions between ${med1.name} and ${med2.name}.</p>
                           <p>However, always consult with your healthcare provider about potential drug interactions.</p>`
                    }
                </div>
            </div>
        `;
    } else {
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3 style="color: #dc3545;">❌ Medicine Not Found</h3>
                <p>One or both medicines not found in our database.</p>
                <p>Please check the spelling and try again.</p>
            </div>
        `;
    }
}

// Saved medicines functions
function saveMedicine(medicine) {
    if (!savedMedicines.find(med => med.name === medicine.name)) {
        savedMedicines.push(medicine);
        alert(`${medicine.name} has been saved to your list!`);
        if (document.getElementById('savedSection').classList.contains('active')) {
            updateSavedMedicinesList();
        }
    } else {
        alert(`${medicine.name} is already in your saved list.`);
    }
}

function removeSavedMedicine(medicineName) {
    savedMedicines = savedMedicines.filter(med => med.name !== medicineName);
    updateSavedMedicinesList();
}

function updateSavedMedicinesList() {
    const savedList = document.getElementById("savedList");
    if (savedMedicines.length === 0) {
        savedList.innerHTML = `
            <div class="medicine-details">
                <p>No medicines saved yet.</p>
            </div>
        `;
    } else {
        let html = '';
        savedMedicines.forEach(med => {
            html += `
                <div class="saved-item">
                    <h3>${med.name}</h3>
                    <p><strong>Type:</strong> ${med.type}</p>
                    <p><strong>Usage:</strong> ${med.usage}</p>
                    <button onclick='displayMedicineInfo(${JSON.stringify(med)}, document.getElementById("savedList"))'>
                        View Details
                    </button>
                    <button onclick="removeSavedMedicine('${med.name}')" style="background-color: #dc3545;">
                        Remove
                    </button>
                </div>
            `;
        });
        savedList.innerHTML = html;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);