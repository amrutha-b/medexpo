// Global variables
let savedMedicines = [];

// Medicine database (embedded to avoid CORS issues with local files)
const medicineDatabase = {
  // Over-the-Counter (OTC) Medicines
  "paracetamol": {
    "name": "Paracetamol",
    "type": "OTC",
    "usage": "Fever and mild to moderate pain",
    "dosage": "500-1000mg every 4-6 hours",
    "sideEffects": ["Nausea", "Rash", "Liver problems (with overdose)"],
    "warnings": "Do not exceed 4000mg per day",
    "category": "Pain Relief",
    "interactions": ["warfarin", "metoclopramide"]
  },
  "ibuprofen": {
    "name": "Ibuprofen",
    "type": "OTC",
    "usage": "Pain, inflammation, and fever",
    "dosage": "200-400mg every 4-6 hours",
    "sideEffects": ["Stomach upset", "Heartburn", "Dizziness"],
    "warnings": "Take with food. Not for long-term use without medical supervision.",
    "category": "Pain Relief",
    "interactions": ["aspirin", "warfarin", "lisinopril"]
  },
  "aspirin": {
    "name": "Aspirin",
    "type": "OTC",
    "usage": "Pain relief, fever reduction, and blood clot prevention",
    "dosage": "325-650mg every 4 hours",
    "sideEffects": ["Stomach bleeding", "Ringing in ears", "Nausea"],
    "warnings": "Not for children under 16. Risk of Reye's syndrome.",
    "category": "Pain Relief",
    "interactions": ["ibuprofen", "warfarin", "alcohol"]
  },
  "benadryl": {
    "name": "Benadryl (Diphenhydramine)",
    "type": "OTC",
    "usage": "Allergies, hay fever, and insomnia",
    "dosage": "25-50mg every 6-8 hours",
    "sideEffects": ["Drowsiness", "Dry mouth", "Blurred vision"],
    "warnings": "May cause drowsiness. Avoid alcohol and driving.",
    "category": "Allergy Relief",
    "interactions": ["alcohol", "sedatives", "muscle relaxants"]
  },
  "tums": {
    "name": "Tums (Calcium Carbonate)",
    "type": "OTC",
    "usage": "Heartburn and indigestion",
    "dosage": "2-4 tablets as needed",
    "sideEffects": ["Constipation", "Gas", "Stomach upset"],
    "warnings": "Do not exceed 7 doses in 24 hours",
    "category": "Digestive Health",
    "interactions": ["iron supplements", "tetracycline", "quinolone antibiotics"]
  },

  // Prescription Medicines
  "amoxicillin": {
    "name": "Amoxicillin",
    "type": "Prescription",
    "usage": "Bacterial infections",
    "dosage": "250-500mg every 8 hours",
    "sideEffects": ["Diarrhea", "Rash", "Nausea"],
    "warnings": "Complete full course as prescribed. Prescription required.",
    "category": "Antibiotics",
    "interactions": ["methotrexate", "probenecid", "birth control pills"]
  },
  "lisinopril": {
    "name": "Lisinopril",
    "type": "Prescription",
    "usage": "High blood pressure and heart failure",
    "dosage": "10-40mg daily",
    "sideEffects": ["Dry cough", "Dizziness", "Headache"],
    "warnings": "Monitor blood pressure regularly. Prescription required.",
    "category": "Blood Pressure",
    "interactions": ["ibuprofen", "potassium supplements", "lithium"]
  },
  "metformin": {
    "name": "Metformin",
    "type": "Prescription",
    "usage": "Type 2 diabetes",
    "dosage": "500-1000mg twice daily",
    "sideEffects": ["Nausea", "Diarrhea", "Metallic taste"],
    "warnings": "Take with food. Monitor kidney function. Prescription required.",
    "category": "Diabetes",
    "interactions": ["alcohol", "contrast dye", "furosemide"]
  },
  "atorvastatin": {
    "name": "Atorvastatin (Lipitor)",
    "type": "Prescription",
    "usage": "High cholesterol",
    "dosage": "10-80mg daily",
    "sideEffects": ["Muscle pain", "Liver problems", "Memory issues"],
    "warnings": "Regular liver function tests required. Prescription required.",
    "category": "Cholesterol",
    "interactions": ["grapefruit juice", "cyclosporine", "gemfibrozil"]
  },
  "sertraline": {
    "name": "Sertraline (Zoloft)",
    "type": "Prescription",
    "usage": "Depression and anxiety",
    "dosage": "25-200mg daily",
    "sideEffects": ["Nausea", "Insomnia", "Sexual side effects"],
    "warnings": "May increase suicide risk in young adults. Prescription required.",
    "category": "Mental Health",
    "interactions": ["mao inhibitors", "nsaids", "blood thinners"]
  },

  // Generic Medicines
  "acetaminophen": {
    "name": "Acetaminophen (Generic Tylenol)",
    "type": "Generic",
    "usage": "Pain relief and fever reduction",
    "dosage": "325-1000mg every 4-6 hours",
    "sideEffects": ["Rare: skin rash", "Liver damage with overdose"],
    "warnings": "Do not exceed 3000mg per day. Generic equivalent to Tylenol.",
    "category": "Pain Relief",
    "interactions": ["warfarin", "alcohol", "phenytoin"]
  },
  "omeprazole": {
    "name": "Omeprazole (Generic Prilosec)",
    "type": "Generic",
    "usage": "Acid reflux and ulcers",
    "dosage": "20-40mg daily",
    "sideEffects": ["Headache", "Stomach pain", "Nausea"],
    "warnings": "Take before meals. Generic equivalent to Prilosec.",
    "category": "Digestive Health",
    "interactions": ["clopidogrel", "nelfinavir", "iron supplements"]
  },
  "loratadine": {
    "name": "Loratadine (Generic Claritin)",
    "type": "Generic",
    "usage": "Seasonal allergies",
    "dosage": "10mg daily",
    "sideEffects": ["Headache", "Fatigue", "Dry mouth"],
    "warnings": "Non-drowsy formula. Generic equivalent to Claritin.",
    "category": "Allergy Relief",
    "interactions": ["ketoconazole", "erythromycin", "cimetidine"]
  },
  "simvastatin": {
    "name": "Simvastatin (Generic Zocor)",
    "type": "Generic",
    "usage": "High cholesterol",
    "dosage": "5-40mg daily",
    "sideEffects": ["Muscle pain", "Headache", "Nausea"],
    "warnings": "Take in evening. Generic equivalent to Zocor.",
    "category": "Cholesterol",
    "interactions": ["grapefruit juice", "cyclosporine", "amiodarone"]
  },
  "hydrochlorothiazide": {
    "name": "Hydrochlorothiazide (Generic)",
    "type": "Generic",
    "usage": "High blood pressure and fluid retention",
    "dosage": "12.5-50mg daily",
    "sideEffects": ["Dizziness", "Electrolyte imbalance", "Increased urination"],
    "warnings": "Monitor electrolytes and kidney function.",
    "category": "Blood Pressure",
    "interactions": ["lithium", "nsaids", "diabetes medications"]
  }
};

// RxNorm API Integration with CORS handling
async function searchWithRxNormAPI(drugName) {
    try {
        console.log(`Searching for ${drugName} in RxNorm API...`);
        
        // Use a different RxNorm endpoint that's more CORS-friendly
        const searchUrl = `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(drugName)}&maxEntries=1`;
        
        const searchResponse = await fetch(searchUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!searchResponse.ok) {
            throw new Error(`HTTP error! status: ${searchResponse.status}`);
        }
        
        const searchData = await searchResponse.json();
        console.log('RxNorm search response:', searchData);

        // Check if we got results
        if (!searchData.approximateGroup || !searchData.approximateGroup.candidate) {
            console.log('No candidates found in RxNorm');
            return null;
        }

        const candidates = searchData.approximateGroup.candidate;
        if (!candidates || candidates.length === 0) {
            return null;
        }

        const firstCandidate = candidates[0];
        const rxcui = firstCandidate.rxcui;
        
        console.log(`Found RxCUI: ${rxcui} for ${firstCandidate.name}`);

        // Get basic properties
        const propsUrl = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`;
        const propsResponse = await fetch(propsUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        let propsData = {};
        if (propsResponse.ok) {
            propsData = await propsResponse.json();
        }

        // Format the drug name
        const drugName_formatted = propsData.properties?.name || firstCandidate.name || drugName;
        const drugType = determineDrugType(drugName_formatted);
        
        // Try to get interactions (this might fail due to CORS, so we'll handle it gracefully)
        let interactions = [];
        try {
            const interactionsUrl = `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${rxcui}`;
            const interactionsResponse = await fetch(interactionsUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (interactionsResponse.ok) {
                const interactionsData = await interactionsResponse.json();
                if (interactionsData.interactionTypeGroup) {
                    interactionsData.interactionTypeGroup.forEach(group => {
                        if (group.interactionType && group.interactionType[0]?.interactionPair) {
                            group.interactionType[0].interactionPair.forEach(pair => {
                                if (pair.interactionConcept && pair.interactionConcept.length > 1) {
                                    const otherDrug = pair.interactionConcept.find(concept => 
                                        concept.minConceptItem.name.toLowerCase() !== drugName_formatted.toLowerCase()
                                    );
                                    if (otherDrug) {
                                        interactions.push(otherDrug.minConceptItem.name.toLowerCase());
                                    }
                                }
                            });
                        }
                    });
                }
            }
        } catch (interactionError) {
            console.log('Could not fetch interactions:', interactionError.message);
            interactions = ['Interaction data unavailable'];
        }

        console.log(`Successfully processed ${drugName_formatted} from RxNorm`);
        
        return {
            name: drugName_formatted,
            type: drugType,
            usage: getGenericUsage(drugName_formatted),
            dosage: getDosageInfo(drugName_formatted),
            sideEffects: getCommonSideEffects(drugName_formatted),
            warnings: getWarningInfo(drugName_formatted),
            category: getCategory(drugName_formatted),
            interactions: interactions.slice(0, 5),
            source: "RxNorm API + Clinical Database"
        };

    } catch (error) {
        console.error('RxNorm API Error:', error);
        console.log('API call failed, falling back to local database only');
        return null;
    }
}

// Helper functions for RxNorm API data
function determineDrugType(drugName) {
    const otcDrugs = ['acetaminophen', 'ibuprofen', 'aspirin', 'diphenhydramine', 'loratadine', 'omeprazole'];
    const prescriptionDrugs = ['lisinopril', 'metformin', 'atorvastatin', 'sertraline', 'amoxicillin'];
    
    const lowerName = drugName.toLowerCase();
    if (otcDrugs.some(drug => lowerName.includes(drug))) return 'OTC';
    if (prescriptionDrugs.some(drug => lowerName.includes(drug))) return 'Prescription';
    return 'Unknown';
}

function getGenericUsage(drugName) {
    const usageMap = {
        'acetaminophen': 'Pain relief and fever reduction',
        'ibuprofen': 'Pain, inflammation, and fever relief',
        'aspirin': 'Pain relief, fever reduction, and blood clot prevention',
        'lisinopril': 'High blood pressure and heart failure treatment',
        'metformin': 'Type 2 diabetes management and blood sugar control',
        'atorvastatin': 'High cholesterol and cardiovascular disease prevention',
        'sertraline': 'Depression, anxiety, and other mood disorders',
        'amoxicillin': 'Bacterial infections (respiratory, ear, skin, urinary tract)',
        'prednisone': 'Inflammation, allergic reactions, autoimmune conditions',
        'warfarin': 'Blood clot prevention (stroke, heart attack, deep vein thrombosis)',
        'hydrocodone': 'Moderate to severe pain relief (chronic and post-surgical)',
        'levothyroxine': 'Hypothyroidism (underactive thyroid) hormone replacement',
        'amlodipine': 'High blood pressure and angina (chest pain) treatment',
        'metoprolol': 'High blood pressure, angina, and heart failure management',
        'simvastatin': 'High cholesterol treatment and heart disease prevention',
        'losartan': 'High blood pressure and diabetic kidney disease protection',
        'gabapentin': 'Nerve pain (neuropathy) and seizure disorders',
        'tramadol': 'Moderate to severe pain relief (chronic conditions)'
    };
    
    const lowerName = drugName.toLowerCase();
    for (const [key, usage] of Object.entries(usageMap)) {
        if (lowerName.includes(key)) return usage;
    }
    return 'Medication found in RxNorm database. Consult healthcare provider for usage information.';
}

function getCommonSideEffects(drugName) {
    const sideEffectsMap = {
        'acetaminophen': ['Rare allergic reactions', 'Liver damage with overdose'],
        'ibuprofen': ['Stomach upset', 'Heartburn', 'Dizziness'],
        'aspirin': ['Stomach bleeding', 'Ringing in ears', 'Nausea'],
        'lisinopril': ['Dry cough', 'Dizziness', 'Headache'],
        'metformin': ['Nausea', 'Diarrhea', 'Metallic taste'],
        'atorvastatin': ['Muscle pain', 'Liver problems', 'Memory issues'],
        'sertraline': ['Nausea', 'Insomnia', 'Sexual side effects'],
        'amoxicillin': ['Diarrhea', 'Rash', 'Nausea'],
        'prednisone': ['Weight gain', 'Mood changes', 'Increased appetite', 'Trouble sleeping'],
        'warfarin': ['Bleeding', 'Bruising easily', 'Hair loss', 'Skin necrosis'],
        'levothyroxine': ['Hair loss', 'Weight loss', 'Rapid heartbeat', 'Nervousness', 'Sweating'],
        'hydrocodone': ['Drowsiness', 'Constipation', 'Nausea', 'Dizziness'],
        'amlodipine': ['Swelling in ankles/feet', 'Dizziness', 'Flushing', 'Headache'],
        'metoprolol': ['Fatigue', 'Dizziness', 'Depression', 'Cold hands/feet'],
        'simvastatin': ['Muscle pain', 'Headache', 'Nausea', 'Liver problems'],
        'losartan': ['Dizziness', 'Upper respiratory infection', 'Back pain'],
        'gabapentin': ['Dizziness', 'Drowsiness', 'Swelling', 'Weight gain'],
        'tramadol': ['Nausea', 'Dizziness', 'Constipation', 'Headache']
    };
    
    const lowerName = drugName.toLowerCase();
    for (const [key, effects] of Object.entries(sideEffectsMap)) {
        if (lowerName.includes(key)) return effects;
    }
    return ['Consult healthcare provider for side effect information'];
}

function getDosageInfo(drugName) {
    const dosageMap = {
        'acetaminophen': '325-1000mg every 4-6 hours (max 3000mg daily)',
        'ibuprofen': '200-400mg every 4-6 hours (max 1200mg daily for OTC)',
        'aspirin': '325-650mg every 4 hours (max 4000mg daily)',
        'lisinopril': '10-40mg once daily (typically started at 10mg)',
        'metformin': '500-1000mg twice daily with meals (max 2000mg daily)',
        'atorvastatin': '10-80mg once daily in evening (typically 20-40mg)',
        'sertraline': '25-200mg once daily (typically started at 25-50mg)',
        'amoxicillin': '250-500mg every 8 hours or 500-875mg every 12 hours',
        'prednisone': '5-60mg daily (varies widely based on condition)',
        'warfarin': '2-10mg daily (individualized based on INR monitoring)',
        'levothyroxine': '25-200mcg once daily on empty stomach (individualized)',
        'hydrocodone': '5-10mg every 4-6 hours as needed (max 60mg daily)',
        'amlodipine': '2.5-10mg once daily (typically 5-10mg)',
        'metoprolol': '25-200mg twice daily or 50-400mg once daily (extended-release)',
        'simvastatin': '5-40mg once daily in evening (max 40mg)',
        'losartan': '25-100mg once or twice daily (typically 50mg once daily)',
        'gabapentin': '100-800mg three times daily (max 3600mg daily)',
        'tramadol': '50-100mg every 4-6 hours (max 400mg daily)'
    };
    
    const lowerName = drugName.toLowerCase();
    for (const [key, dosage] of Object.entries(dosageMap)) {
        if (lowerName.includes(key)) return dosage;
    }
    return 'Dosage varies by individual and condition. Consult healthcare provider.';
}

function getWarningInfo(drugName) {
    const warningsMap = {
        'acetaminophen': 'Do not exceed maximum daily dose. Avoid alcohol. Can cause liver damage.',
        'ibuprofen': 'Take with food. May increase bleeding risk. Monitor kidney function.',
        'aspirin': 'Bleeding risk. Not for children under 16. Take with food.',
        'lisinopril': 'Monitor blood pressure and kidney function. May cause dry cough.',
        'metformin': 'Take with food. Monitor kidney function. Stop before contrast procedures.',
        'atorvastatin': 'Monitor liver function. Report muscle pain. Avoid grapefruit juice.',
        'sertraline': 'May increase suicide risk in young adults. Monitor mood changes.',
        'amoxicillin': 'Complete full course. May reduce birth control effectiveness.',
        'prednisone': 'Do not stop suddenly. May suppress immune system. Monitor blood sugar.',
        'warfarin': 'Regular INR monitoring required. Bleeding risk. Many drug interactions.',
        'levothyroxine': 'Take on empty stomach. Monitor thyroid levels regularly. Many drug interactions.',
        'hydrocodone': 'Addiction potential. Respiratory depression risk. Avoid alcohol.',
        'amlodipine': 'Monitor blood pressure. May cause ankle swelling. Grapefruit interactions.',
        'metoprolol': 'Do not stop suddenly. Monitor heart rate and blood pressure.',
        'simvastatin': 'Monitor liver function. Report muscle pain. Avoid grapefruit juice.',
        'losartan': 'Monitor blood pressure and kidney function. May increase potassium.',
        'gabapentin': 'Do not stop suddenly. May cause drowsiness. Kidney dose adjustment needed.',
        'tramadol': 'Seizure risk. Addiction potential. Serotonin syndrome risk.'
    };
    
    const lowerName = drugName.toLowerCase();
    for (const [key, warning] of Object.entries(warningsMap)) {
        if (lowerName.includes(key)) return warning;
    }
    return 'Prescription required. Follow healthcare provider instructions. This is for reference only.';
}

function getCategory(drugName) {
    const categoryMap = {
        'acetaminophen': 'Pain Relief',
        'ibuprofen': 'Pain Relief',
        'aspirin': 'Pain Relief',
        'lisinopril': 'Blood Pressure',
        'metformin': 'Diabetes',
        'atorvastatin': 'Cholesterol',
        'sertraline': 'Mental Health',
        'amoxicillin': 'Antibiotics',
        'prednisone': 'Corticosteroids',
        'warfarin': 'Anticoagulants',
        'levothyroxine': 'Thyroid Medications',
        'hydrocodone': 'Pain Relief',
        'amlodipine': 'Blood Pressure',
        'metoprolol': 'Blood Pressure',
        'simvastatin': 'Cholesterol',
        'losartan': 'Blood Pressure',
        'gabapentin': 'Neurological',
        'tramadol': 'Pain Relief'
    };
    
    const lowerName = drugName.toLowerCase();
    for (const [key, category] of Object.entries(categoryMap)) {
        if (lowerName.includes(key)) return category;
    }
    return 'General Medicine';
}

// Initialize application
function initializeApp() {
    console.log('Medicine database loaded successfully');
    console.log('RxNorm API integration enabled');
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
            
            // Update saved medicines list if switching to saved section
            if (section === 'savedSection') {
                updateSavedMedicinesList();
            }
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

// Search functionality with RxNorm API integration
async function searchMedicine() {
    const searchInput = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("searchResults");
    const loading = document.getElementById("loading");

    if (!searchInput) {
        resultsDiv.innerHTML = '<p>Please enter a medicine name to search.</p>';
        return;
    }

    loading.style.display = 'block';
    
    try {
        // First check local database
        const localMedicine = medicineDatabase[searchInput.toLowerCase()];
        if (localMedicine) {
            loading.style.display = 'none';
            displayMedicineInfo(localMedicine, resultsDiv);
            return;
        }

        // If not found locally, search using RxNorm API
        try {
            const apiResult = await searchWithRxNormAPI(searchInput);
            loading.style.display = 'none';
            
            if (apiResult) {
                displayMedicineInfo(apiResult, resultsDiv);
            } else {
                // Show enhanced "not found" with API status
                resultsDiv.innerHTML = `
                    <div class="medicine-details">
                        <h3 style="color: #dc3545;">❌ Not Found</h3>
                        <p>No medicine found with the name "${searchInput}".</p>
                        <p>Please check the spelling and try again.</p>
                        <div class="detail-section">
                            <p><strong>Search completed in:</strong></p>
                            <p>✅ Local database (${Object.keys(medicineDatabase).length} medicines)</p>
                            <p>🌐 RxNorm API (National Library of Medicine)</p>
                            <p><em>Try searching for common medicines like: warfarin, prednisone, levothyroxine</em></p>
                        </div>
                    </div>
                `;
            }
        } catch (apiError) {
            loading.style.display = 'none';
            console.log('API search failed, showing local-only results');
            resultsDiv.innerHTML = `
                <div class="medicine-details">
                    <h3 style="color: #dc3545;">❌ Not Found</h3>
                    <p>No medicine found with the name "${searchInput}" in local database.</p>
                    <p><strong>API Status:</strong> RxNorm API temporarily unavailable</p>
                    <div class="detail-section">
                        <p>Available medicines in local database:</p>
                        <p><em>${Object.keys(medicineDatabase).join(', ')}</em></p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        loading.style.display = 'none';
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3 style="color: #dc3545;">⚠️ Search Error</h3>
                <p>Unable to search for medicines at the moment.</p>
                <p>Please check your internet connection and try again.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

// Search medicines by type for search section
function searchByType(type) {
    const resultsDiv = document.getElementById("searchResults");
    const medicines = Object.values(medicineDatabase).filter(med => med.type === type);

    if (medicines.length > 0) {
        let html = `<div class="medicine-details"><h3>${type} Medicines Available</h3></div>`;
        medicines.forEach(medicine => {
            html += `
                <div class="medicine-details" style="margin-top: 15px;">
                    <h4>${medicine.name}</h4>
                    <div class="detail-section">
                        <p><strong>Type:</strong> ${medicine.type}</p>
                        <p><strong>Category:</strong> ${medicine.category}</p>
                        <p><strong>Usage:</strong> ${medicine.usage}</p>
                    </div>
                    <button onclick="saveMedicineToList('${medicine.name}')">
                        Save to My List
                    </button>
                    <button onclick="showMedicineDetails('${medicine.name}', 'searchResults')" style="margin-left: 10px; background-color: #666;">
                        View Full Details
                    </button>
                </div>
            `;
        });
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3 style="color: #dc3545;">❌ No Results</h3>
                <p>No ${type} medicines found.</p>
            </div>
        `;
    }
}

// Display medicine information
function displayMedicineInfo(medicine, container) {
    const sourceInfo = medicine.source ? `<p><small><em>Source: ${medicine.source}</em></small></p>` : '';
    
    container.innerHTML = `
        <div class="medicine-details">
            <h3>${medicine.name}</h3>
            <div class="detail-section">
                <p><strong>Type:</strong> ${medicine.type}</p>
                <p><strong>Usage:</strong> ${medicine.usage}</p>
                <p><strong>Dosage:</strong> ${medicine.dosage}</p>
                <p><strong>Side Effects:</strong> ${medicine.sideEffects.join(', ')}</p>
                <p><strong>Warnings:</strong> ${medicine.warnings}</p>
                ${medicine.interactions && medicine.interactions.length > 0 ? 
                    `<p><strong>Known Interactions:</strong> ${medicine.interactions.join(', ')}</p>` : ''
                }
                ${sourceInfo}
            </div>
            <button onclick="saveMedicineToList('${medicine.name}')">
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
                <div class="category-card" onclick="showMedicineDetails('${medicine.name}', 'categoryResults')">
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

// Helper function to save medicine by name
function saveMedicineToList(medicineName) {
    const medicine = medicineDatabase[medicineName.toLowerCase()];
    if (medicine) {
        saveMedicine(medicine);
    }
}

// Helper function to show medicine details by name
function showMedicineDetails(medicineName, containerId) {
    const medicine = medicineDatabase[medicineName.toLowerCase()];
    if (medicine) {
        const container = document.getElementById(containerId);
        displayMedicineInfo(medicine, container);
    }
}

// Saved medicines functions
function saveMedicine(medicine) {
    if (!savedMedicines.find(med => med.name === medicine.name)) {
        savedMedicines.push(medicine);
        alert(`${medicine.name} has been saved to your list!`);
        // Always update the saved medicines list when a medicine is added
        updateSavedMedicinesList();
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
                    <button onclick="showMedicineDetails('${med.name}', 'savedList')">
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

// Filter medicines by type (OTC, Prescription, Generic)
function filterByType(type) {
    const resultsDiv = document.getElementById("categoryResults");
    const medicines = Object.values(medicineDatabase).filter(med => med.type === type);

    if (medicines.length > 0) {
        let html = `<div class="medicine-details"><h3>${type} Medicines</h3></div><div class="category-grid">`;
        medicines.forEach(medicine => {
            html += `
                <div class="category-card" onclick="showMedicineDetails('${medicine.name}', 'categoryResults')">
                    <h3>${medicine.name}</h3>
                    <p><strong>Type:</strong> ${medicine.type}</p>
                    <p><strong>Category:</strong> ${medicine.category}</p>
                </div>
            `;
        });
        html += '</div>';
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = `
            <div class="medicine-details">
                <h3 style="color: #dc3545;">❌ No Results</h3>
                <p>No ${type} medicines found.</p>
            </div>
        `;
    }
}

// Show all medicines
function showAllMedicines() {
    const resultsDiv = document.getElementById("categoryResults");
    const medicines = Object.values(medicineDatabase);

    let html = '<div class="medicine-details"><h3>All Medicines Database</h3></div><div class="category-grid">';
    medicines.forEach(medicine => {
        html += `
            <div class="category-card" onclick="showMedicineDetails('${medicine.name}', 'categoryResults')">
                <h3>${medicine.name}</h3>
                <p><strong>Type:</strong> ${medicine.type}</p>
                <p><strong>Category:</strong> ${medicine.category}</p>
            </div>
        `;
    });
    html += '</div>';
    resultsDiv.innerHTML = html;
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);