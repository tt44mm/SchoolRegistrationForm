# SchoolRegistrationForm
PHP Form für die neuanmeldung für schueler

# Mehrsprachiges Schüleranmeldeformular

Ein responsives, mehrstufiges Anmeldeformular für Schulen mit Unterstützung für Deutsch und Spanisch.

## Features

### Mehrsprachigkeit
- Deutsch und Spanisch verfügbar
- Dynamischer Sprachwechsel
- Sprachspezifische Datumsformate
- Lokalisierte Fehlermeldungen

### 5-Stufen-Anmeldeprozess
1. **Schülerdaten**
   - Vor- und Nachname
   - Geburtsdatum (mit Validierung 2004-2022)

2. **Erziehungsberechtigte**
   - Daten für zwei Erziehungsberechtigte
   - Name und Ausweisnummer

3. **Kontaktdaten**
   - E-Mail-Adressen (mehrere möglich)
   - Telefonnummern

4. **Adresse**
   - Straße
   - PLZ/Ort
   - Bundesland/Provinz

5. **Zusammenfassung & Einwilligung**
   - Übersicht aller Daten
   - Datenschutzerklärung
   - Einwilligungserklärung

### Technische Features
- Responsive Design
- Browserübergreifende Datumseingabe
- Client-seitige Validierung
- Webhook-Integration
- Dynamische Fortschrittsanzeige

## Technische Anforderungen

### Server
- PHP 8.0 oder höher
- Webserver (z.B. Apache)

### Browser-Unterstützung
- Chrome (aktuell)
- Firefox (aktuell)
- Edge (aktuell)
- Safari (aktuell)

## Installation

1. Dateien in das Webserver-Verzeichnis kopieren
2. Berechtigungen prüfen (755 für Verzeichnisse, 644 für Dateien)
3. Im Browser aufrufen

## Dateistruktur

```json
{
    "student": {
        "firstName": "...",
        "lastName": "...",
        "birthDate": "..."
    },
    "guardian1": {
        "firstName": "...",
        "lastName": "...",
        "idNumber": "...",
        "email": "...",
        "phone": "..."
    },
    "guardian2": {
        "firstName": "...",
        "lastName": "...",
        "idNumber": "...",
        "email": "...",
        "phone": "..."
    },
    "address": {
        "street": "...",
        "postalCode": "...",
        "city": "...",
        "province": "..."
    },
    "language": "de|es"
}
```

## Formularvalidierung

### Client-seitig
- Pflichtfeldprüfung
- E-Mail-Format
- Telefonnummern-Format
- Datumsbereich
- Mehrsprachige Fehlermeldungen
## Datenformat


### Datumseingabe
- Deutsches Format: TT.MM.JJJJ
- Spanisches Format: DD/MM/AAAA
- Spezielle Behandlung für Firefox
- Manuelle Eingabe möglich

## Webhook-Integration

Das Formular sendet die Daten an:
https://hook.integrator.boost.space/v20u3sjrskjdtu8xwu4b10nukxotvsas


## Datenformat


## Design
###Farbschema
- Primärfarbe: #FF9800 (Orange)
- Sekundärfarbe: #F57C00 (Dunkel-Orange)
- Akzentfarbe: #FFB74D (Mittel-Orange)
- Hintergrund: #FFE0B2 (Hell-Orange)
### Layout
- Zweispaltiges Design für Desktop
- Responsive Einspaltiges Layout für Mobile
- Maximale Breite: 800px
- Minimale Breite: 320px
### Sicherheit
- CSRF-Schutz
- XSS-Prävention
- Validierung aller Eingaben
- Sichere Datenübertragung

## Geplante Erweiterungen
- [ ] Server-seitige Validierung
- [ ] Datenbank-Integration
- [ ] Admin-Dashboard
- [ ] Weitere Sprachen
-  [ ] PDF-Export
