/**
 * Mehrstufiges Anmeldeformular
 * ---------------------------
 * Verwaltet die Navigation, Validierung und Datenübermittlung
 * eines mehrstufigen Formulars für die Schüleranmeldung.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hauptelemente des Formulars
    const form = document.getElementById('anmeldeformular');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-bar .step');
    let currentStep = 0;

    /**
     * Datum validieren
     * --------------
     * Prüft, ob ein Datum gültig ist und im erlaubten Bereich liegt
     */
    function isValidDate(day, month, year) {
        console.log('Validiere Datum:', { day, month, year });
        
        // Prüfe zuerst, ob die Werte im gültigen Bereich liegen
        if (day < 1 || day > 31) return false;
        if (month < 1 || month > 12) return false;
        if (year < 2004 || year > 2022) return false;

        // Erstelle ein Datum und prüfe die Gültigkeit
        const date = new Date(year, month - 1, day);
        const isValid = date.getDate() == day && 
                       date.getMonth() == month - 1 && 
                       date.getFullYear() == year;
                       
        console.log('Datum gültig:', isValid);
        return isValid;
    }

    function parseDate(value, isGerman) {
        console.log('Parse Datum:', value, 'Deutsch:', isGerman);
        
        let parts;
        
        // Prüfe auf ISO-Format (YYYY-MM-DD)
        if (value.includes('-')) {
            parts = value.split('-');
            // Konvertiere von ISO (YYYY-MM-DD) zu (DD,MM,YYYY)
            parts = [parts[2], parts[1], parts[0]];
        } else {
            // Originales Format (DD.MM.YYYY oder DD/MM/YYYY)
            const separator = isGerman ? '.' : '/';
            parts = value.split(separator);
        }
        
        console.log('Datumsteile:', parts);
        
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            
            console.log('Geparste Werte:', { day, month, year });
            
            if (isValidDate(day, month, year)) {
                const date = new Date(year, month - 1, day);
                console.log('Erstelltes Datum:', date);
                return date;
            }
        }
        console.log('Parsing fehlgeschlagen');
        return null;
    }
    /**
     * Datum formatieren
     * --------------
     * Formatiert ein Datum entsprechend der gewählten Sprache
     */
    function formatDate(date, isGerman) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const separator = isGerman ? '.' : '/';
        return `${day}${separator}${month}${separator}${year}`;
    }

    /**
     * Firefox-spezifische Behandlung des Datumsfeldes
     * -------------------------------------------
     * Spezielles Handling für Firefox, da dieser den HTML5-Datepicker anders handhabt
     */
    const dateInput = document.getElementById('geburtsdatum');
    if (dateInput) {
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        
        // Firefox verwendet immer ein Textfeld
        if (isFirefox) {
            dateInput.type = 'text';
            dateInput.placeholder = document.documentElement.lang === 'de' ? 'TT.MM.JJJJ' : 'DD/MM/AAAA';
        }

        // Tastatureingabe-Validierung
        dateInput.addEventListener('keydown', function(e) {
            if (isFirefox || this.type === 'text') {
                const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                const isNumber = /[0-9]/.test(e.key);
                const isSeparator = e.key === '.' || e.key === '/';
                
                if (!isNumber && !isSeparator && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                }
            }
        });

        // Automatische Formatierung während der Eingabe
        dateInput.addEventListener('input', function(e) {
            if (isFirefox || this.type === 'text') {
                const isGerman = document.documentElement.lang === 'de';
                const value = this.value;
                
                // Automatisch Trennzeichen einfügen
                if (value.length === 2 || value.length === 5) {
                    const separator = isGerman ? '.' : '/';
                    if (!value.endsWith(separator)) {
                        this.value = value + separator;
                    }
                }
                
                // Datum validieren und speichern
                const date = parseDate(value, isGerman);
                if (date) {
                    const hiddenInput = document.querySelector('input[name="geburtsdatum_hidden"]') || 
                        (() => {
                            const hidden = document.createElement('input');
                            hidden.type = 'hidden';
                            hidden.name = 'geburtsdatum_hidden';
                            this.parentNode.appendChild(hidden);
                            return hidden;
                        })();
                    
                    hiddenInput.value = date.toISOString().split('T')[0];
                }
            }
        });
    }

    /**
     * Formularvalidierung
     * -----------------
     * Validiert die Eingaben in jedem Schritt
     */
    function validateStep1() {
        const fields = [
            { id: 'vorname', msg: 'Bitte geben Sie den Vornamen ein.' },
            { id: 'nachname', msg: 'Bitte geben Sie den Nachnamen ein.' },
            { id: 'geburtsdatum', msg: 'Bitte geben Sie ein gültiges Geburtsdatum ein.' }
        ];

        clearErrors();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            if (!value) {
                showError(field.id, field.msg);
                isValid = false;
            } else if (field.id === 'geburtsdatum') {
                const isGerman = document.documentElement.lang === 'de';
                const date = parseDate(value, isGerman);
                if (!date) {
                    showError(field.id, field.msg);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function validateStep2() {
        const fields = [
            { id: 'guardian1_firstname', msg: 'Bitte geben Sie den Vornamen des ersten Erziehungsberechtigten ein.' },
            { id: 'guardian1_lastname', msg: 'Bitte geben Sie den Nachnamen des ersten Erziehungsberechtigten ein.' },
            { id: 'guardian1_id', msg: 'Bitte geben Sie die Personalausweisnummer des ersten Erziehungsberechtigten ein.' },
            { id: 'guardian2_firstname', msg: 'Bitte geben Sie den Vornamen des zweiten Erziehungsberechtigten ein.' },
            { id: 'guardian2_lastname', msg: 'Bitte geben Sie den Nachnamen des zweiten Erziehungsberechtigten ein.' },
            { id: 'guardian2_id', msg: 'Bitte geben Sie die Personalausweisnummer des zweiten Erziehungsberechtigten ein.' }
        ];

        clearErrors();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            if (!value) {
                showError(field.id, field.msg);
                isValid = false;
            } else if (field.id.includes('_id')) {
                // Validiere Personalausweisnummer (mindestens 8 Zeichen)
                if (value.length < 8) {
                    showError(field.id, 'Die Personalausweisnummer muss mindestens 8 Zeichen lang sein.');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function validateStep3() {
        const fields = [
            { id: 'guardian1_email', msg: 'Bitte geben Sie die E-Mail-Adresse des ersten Erziehungsberechtigten ein.', type: 'email' },
            { id: 'guardian1_phone', msg: 'Bitte geben Sie die Telefonnummer des ersten Erziehungsberechtigten ein.', type: 'phone' },
            { id: 'guardian2_email', msg: 'Bitte geben Sie die E-Mail-Adresse des zweiten Erziehungsberechtigten ein.', type: 'email' },
            { id: 'guardian2_phone', msg: 'Bitte geben Sie die Telefonnummer des zweiten Erziehungsberechtigten ein.', type: 'phone' }
        ];

        clearErrors();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            if (!value) {
                showError(field.id, field.msg);
                isValid = false;
            } else if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field.id, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                    isValid = false;
                }
            } else if (field.type === 'phone') {
                // Entferne alle Nicht-Ziffern für die Validierung
                const cleanNumber = value.replace(/\D/g, '');
                // Telefonnummer-Validierung (6-15 Ziffern)
                if (cleanNumber.length < 6 || cleanNumber.length > 15) {
                    showError(field.id, 'Die Telefonnummer muss zwischen 6 und 15 Ziffern haben.');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function validateStep4() {
        const fields = [
            { id: 'street', msg: 'Bitte geben Sie die Straße ein.' },
            { id: 'postal_code', msg: 'Bitte geben Sie die Postleitzahl ein.', type: 'plz' },
            { id: 'city', msg: 'Bitte geben Sie die Stadt ein.' },
            { id: 'province', msg: 'Bitte geben Sie das Bundesland ein.' }
        ];

        clearErrors();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            if (!value) {
                showError(field.id, field.msg);
                isValid = false;
            } else if (field.type === 'plz') {
                // Postleitzahl-Validierung (5 Ziffern)
                const plzRegex = /^\d{5}$/;
                if (!plzRegex.test(value)) {
                    showError(field.id, 'Bitte geben Sie eine gültige Postleitzahl ein (5 Ziffern).');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function validateStep5() {
        clearErrors();
        let isValid = true;

        // Prüfe, ob die Datenschutzerklärung akzeptiert wurde
        const privacyCheckbox = document.getElementById('privacy_accepted');
        if (!privacyCheckbox.checked) {
            showError('privacy_accepted', 'Bitte akzeptieren Sie die Datenschutzbestimmungen.');
            isValid = false;
        }

        return isValid;
    }

    // Funktion zum Speichern der Formulardaten
    function saveFormData() {
        console.log('Speichere Formulardaten...');
        const formData = {
            step: currentStep,
            data: {}
        };

        // Liste aller Formularfelder
        const fields = [
            'vorname', 'nachname', 'geburtsdatum',
            'guardian1_firstname', 'guardian1_lastname', 'guardian1_id',
            'guardian2_firstname', 'guardian2_lastname', 'guardian2_id',
            'guardian1_email', 'guardian1_phone',
            'guardian2_email', 'guardian2_phone',
            'street', 'postal_code', 'city', 'province',
            'privacy_accepted'
        ];

        // Sammle alle Werte
        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                formData.data[fieldId] = element.type === 'checkbox' ? element.checked : element.value;
            }
        });

        console.log('Zu speichernde Daten:', formData);
        
        try {
            localStorage.setItem('windsurf_form_data', JSON.stringify(formData));
            console.log('Daten erfolgreich gespeichert');
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            return false;
        }
    }

    // Funktion zum Wiederherstellen der Formulardaten
    function restoreFormData() {
        console.log('Versuche Formulardaten wiederherzustellen...');
        try {
            const savedData = localStorage.getItem('windsurf_form_data');
            console.log('Geladene Daten:', savedData);
            
            if (savedData) {
                const formData = JSON.parse(savedData);
                console.log('Geparste Daten:', formData);

                // Daten wiederherstellen
                Object.keys(formData.data).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = formData.data[key];
                        } else {
                            element.value = formData.data[key];
                        }
                        console.log(`Feld ${key} wiederhergestellt:`, formData.data[key]);
                    }
                });

                // Namen in Step 3 aktualisieren
                if (formData.data.guardian1_firstname && formData.data.guardian1_lastname) {
                    const guardian1Name = formData.data.guardian1_firstname + ' ' + formData.data.guardian1_lastname;
                    document.querySelectorAll('.guardian1-name').forEach(el => el.textContent = guardian1Name);
                }
                if (formData.data.guardian2_firstname && formData.data.guardian2_lastname) {
                    const guardian2Name = formData.data.guardian2_firstname + ' ' + formData.data.guardian2_lastname;
                    document.querySelectorAll('.guardian2-name').forEach(el => el.textContent = guardian2Name);
                }

                // Zum gespeicherten Schritt navigieren
                if (typeof formData.step === 'number' && formData.step >= 0) {
                    console.log('Navigiere zu Schritt:', formData.step);
                    setTimeout(() => showStep(formData.step), 100);
                }

                return true;
            }
        } catch (error) {
            console.error('Fehler beim Wiederherstellen der Daten:', error);
        }
        return false;
    }

    // Event-Listener für Sprachwechsel-Links
    document.querySelectorAll('.language-switcher a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sprachwechsel initiiert');
            
            // Speichere aktuelle Daten
            if (saveFormData()) {
                // Füge Sprach-Parameter zur URL hinzu
                const newLang = this.getAttribute('href').split('=')[1];
                console.log('Neue Sprache:', newLang);
                
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set('lang', newLang);
                
                // Navigiere zur neuen URL
                console.log('Navigiere zu:', currentUrl.toString());
                window.location.href = currentUrl.toString();
            }
        });
    });

    // Beim Laden der Seite
    window.addEventListener('load', function() {
        console.log('Seite geladen, versuche Daten wiederherzustellen...');
        if (!restoreFormData()) {
            console.log('Keine gespeicherten Daten gefunden, starte bei Schritt 1');
            showStep(0);
        }
    });

    function updateSummary() {
        // Schüler-Zusammenfassung
        const studentSummary = document.getElementById('student-summary');
        studentSummary.innerHTML = `
            <p><strong>Name:</strong> ${document.getElementById('vorname').value} ${document.getElementById('nachname').value}</p>
            <p><strong>Geburtsdatum:</strong> ${document.getElementById('geburtsdatum').value}</p>
        `;

        // Adress-Zusammenfassung
        const addressSummary = document.getElementById('address-summary');
        addressSummary.innerHTML = `
            <p><strong>Straße:</strong> ${document.getElementById('street').value}</p>
            <p><strong>PLZ:</strong> ${document.getElementById('postal_code').value}</p>
            <p><strong>Stadt:</strong> ${document.getElementById('city').value}</p>
            <p><strong>Bundesland:</strong> ${document.getElementById('province').value}</p>
        `;

        // Erziehungsberechtigter 1
        const guardian1Summary = document.getElementById('guardian1-summary');
        guardian1Summary.innerHTML = `
            <p><strong>Name:</strong> ${document.getElementById('guardian1_firstname').value} ${document.getElementById('guardian1_lastname').value}</p>
            <p><strong>Ausweis:</strong> ${document.getElementById('guardian1_id').value}</p>
            <p><strong>E-Mail:</strong> ${document.getElementById('guardian1_email').value}</p>
            <p><strong>Telefon:</strong> ${document.getElementById('guardian1_phone').value}</p>
        `;

        // Erziehungsberechtigter 2
        const guardian2Summary = document.getElementById('guardian2-summary');
        guardian2Summary.innerHTML = `
            <p><strong>Name:</strong> ${document.getElementById('guardian2_firstname').value} ${document.getElementById('guardian2_lastname').value}</p>
            <p><strong>Ausweis:</strong> ${document.getElementById('guardian2_id').value}</p>
            <p><strong>E-Mail:</strong> ${document.getElementById('guardian2_email').value}</p>
            <p><strong>Telefon:</strong> ${document.getElementById('guardian2_phone').value}</p>
        `;
    }

    function showStep(stepIndex) {
        console.log('Zeige Step:', stepIndex);
        
        // Entferne die active Klasse von allen Steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Setze display und active Klasse für den aktuellen Step
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.display = 'block';
                step.classList.add('active');
                
                // Aktualisiere Namen in Step 3
                if (index === 2) {
                    const guardian1Name = document.getElementById('guardian1_firstname').value + ' ' + 
                                       document.getElementById('guardian1_lastname').value;
                    const guardian2Name = document.getElementById('guardian2_firstname').value + ' ' + 
                                       document.getElementById('guardian2_lastname').value;
                    
                    document.querySelectorAll('.guardian1-name').forEach(el => el.textContent = guardian1Name);
                    document.querySelectorAll('.guardian2-name').forEach(el => el.textContent = guardian2Name);
                }
                
                // Aktualisiere Zusammenfassung in Step 5
                if (index === 4) {
                    updateSummary();
                }
            } else {
                step.style.display = 'none';
            }
        });
        
        // Aktualisiere die Fortschrittsanzeige
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= stepIndex);
        });
        
        currentStep = stepIndex;
    }

    /**
     * Fehlerbehandlung
     * --------------
     * Funktionen zum Anzeigen und Entfernen von Fehlermeldungen
     */
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error-input');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error');
        const errorInputs = document.querySelectorAll('.error-input');
        
        errorMessages.forEach(error => error.remove());
        errorInputs.forEach(input => input.classList.remove('error-input'));
    }


    /**
     * Navigation zwischen den Schritten
     * --------------------------------
     * Zeigt den aktuellen Schritt an und aktualisiert die Fortschrittsbalken
     */

    /**
     * Event-Listener für den Weiter-Button
     * -----------------------------------
     * Validiert den aktuellen Schritt und zeigt den nächsten an
     */
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep === 0) {
                console.log('Validiere Step 1...');
                const isValid = validateStep1();
                console.log('Step 1 Validierung:', isValid);
                if (isValid) {
                    showStep(currentStep + 1);
                }
            } else if (currentStep === 1) {
                console.log('Validiere Step 2...');
                const isValid = validateStep2();
                console.log('Step 2 Validierung:', isValid);
                if (isValid) {
                    showStep(currentStep + 1);
                }
            } else if (currentStep === 2) {
                console.log('Validiere Step 3...');
                const isValid = validateStep3();
                console.log('Step 3 Validierung:', isValid);
                if (isValid) {
                    showStep(currentStep + 1);
                }
            } else if (currentStep === 3) {
                console.log('Validiere Step 4...');
                const isValid = validateStep4();
                console.log('Step 4 Validierung:', isValid);
                if (isValid) {
                    showStep(currentStep + 1);
                }
            } else if (currentStep === 4) {
                console.log('Validiere Step 5...');
                const isValid = validateStep5();
                console.log('Step 5 Validierung:', isValid);
                if (isValid) {
                    // Hier würde normalerweise der Server-Request folgen
                    console.log('Formulardaten:');
                    alert('Formular erfolgreich gesendet!');
                    
                    // Optional: Formular zurücksetzen und zu Step 1 zurückkehren
                    form.reset();
                    showStep(0);
                }
            }
        });
    });

    /**
     * Event-Listener für den Zurück-Button
     * -----------------------------------
     * Zeigt den vorherigen Schritt an
     */
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // Formular absenden
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateStep5()) {
            try {
                // Alle Daten sammeln
                const formData = {
                    student: {
                        firstName: document.getElementById('vorname').value,
                        lastName: document.getElementById('nachname').value,
                        birthDate: document.getElementById('geburtsdatum').value
                    },
                    guardian1: {
                        firstName: document.getElementById('guardian1_firstname').value,
                        lastName: document.getElementById('guardian1_lastname').value,
                        idNumber: document.getElementById('guardian1_id').value,
                        email: document.getElementById('guardian1_email').value,
                        phone: document.getElementById('guardian1_phone').value
                    },
                    guardian2: {
                        firstName: document.getElementById('guardian2_firstname').value,
                        lastName: document.getElementById('guardian2_lastname').value,
                        idNumber: document.getElementById('guardian2_id').value,
                        email: document.getElementById('guardian2_email').value,
                        phone: document.getElementById('guardian2_phone').value
                    },
                    address: {
                        street: document.getElementById('street').value,
                        postalCode: document.getElementById('postal_code').value,
                        city: document.getElementById('city').value,
                        province: document.getElementById('province').value
                    },
                    privacyAccepted: document.getElementById('privacy_accepted').checked,
                    language: document.documentElement.lang
                };

                // Daten an Webhook senden
                const response = await fetch('https://hook.integrator.boost.space/v20u3sjrskjdtu8xwu4b10nukxotvsas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Netzwerkfehler');
                }

                // Erfolgs-Popup anzeigen
                const popup = document.createElement('div');
                popup.className = 'success-popup';
                popup.innerHTML = `
                    <button class="close-btn">&times;</button>
                    <h3>${document.documentElement.lang === 'de' ? 
                        'Erfolgreiche Übermittlung' : 
                        'Transmisión exitosa'}</h3>
                    <p>${document.documentElement.lang === 'de' ? 
                        'Die Daten wurden erfolgreich übermittelt.' : 
                        'Los datos se han transmitido con éxito.'}</p>
                `;
                document.body.appendChild(popup);

                // Animation starten
                setTimeout(() => popup.classList.add('show'), 10);

                // Popup nach 20 Sekunden automatisch schließen
                const autoClose = setTimeout(() => closePopup(popup), 20000);

                // Schließen-Button
                const closeBtn = popup.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    clearTimeout(autoClose);
                    closePopup(popup);
                });

                // Optional: Formular zurücksetzen und zu Step 1 zurückkehren
                setTimeout(() => {
                    form.reset();
                    showStep(0);
                }, 2000);

            } catch (error) {
                console.error('Fehler beim Senden:', error);
                
                // Fehlermeldung anzeigen
                const errorPopup = document.createElement('div');
                errorPopup.className = 'success-popup error';
                errorPopup.innerHTML = `
                    <button class="close-btn">&times;</button>
                    <h3>${document.documentElement.lang === 'de' ? 
                        'Fehler' : 
                        'Error'}</h3>
                    <p>${document.documentElement.lang === 'de' ? 
                        'Bei der Übermittlung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' : 
                        'Se ha producido un error durante la transmisión. Por favor, inténtelo de nuevo más tarde.'}</p>
                `;
                document.body.appendChild(errorPopup);

                // Animation starten
                setTimeout(() => errorPopup.classList.add('show'), 10);

                // Popup nach 20 Sekunden automatisch schließen
                const autoClose = setTimeout(() => closePopup(errorPopup), 20000);

                // Schließen-Button
                const closeBtn = errorPopup.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    clearTimeout(autoClose);
                    closePopup(errorPopup);
                });
            }
        }
    });

    /**
     * Popup-Verwaltung
     * --------------
     * Schließt das Popup und entfernt es aus dem DOM
     */
    function closePopup(popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }

    // Initialisierung
    showStep(0);
});