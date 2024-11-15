# Mehrsprachiges SchÃ¼leranmeldeformular

Ein responsives, mehrstufiges Anmeldeformular fÃ¼r Schulen mit UnterstÃ¼tzung fÃ¼r Deutsch und Spanisch.

## Features

### Mehrsprachigkeit
- Deutsch und Spanisch verfÃ¼gbar
- Dynamischer Sprachwechsel
- Sprachspezifische Datumsformate
- Lokalisierte Fehlermeldungen

### 5-Stufen-Anmeldeprozess
1. **SchÃ¼lerdaten**
   - Vor- und Nachname
   - Geburtsdatum (mit Validierung 2004-2022)

2. **Erziehungsberechtigte**
   - Daten fÃ¼r zwei Erziehungsberechtigte
   - Name und Ausweisnummer

3. **Kontaktdaten**
   - E-Mail-Adressen (mehrere mÃ¶glich)
   - Telefonnummern

4. **Adresse**
   - StraÃŸe
   - PLZ/Ort
   - Bundesland/Provinz

5. **Zusammenfassung & Einwilligung**
   - Ãœbersicht aller Daten
   - DatenschutzerklÃ¤rung
   - EinwilligungserklÃ¤rung

### Technische Features
- Responsive Design
- BrowserÃ¼bergreifende Datumseingabe
- Client-seitige Validierung
- Webhook-Integration
- Dynamische Fortschrittsanzeige

## Technische Anforderungen

### Server
- PHP 8.0 oder hÃ¶her
- Webserver (z.B. Apache)

### Browser-UnterstÃ¼tzung
- Chrome (aktuell)
- Firefox (aktuell)
- Edge (aktuell)
- Safari (aktuell)

## Installation

1. Dateien in das Webserver-Verzeichnis kopieren
2. Berechtigungen prÃ¼fen (755 fÃ¼r Verzeichnisse, 644 fÃ¼r Dateien)
3. Im Browser aufrufen

## Dateistruktur


## Formularvalidierung

### Client-seitig
- PflichtfeldprÃ¼fung
- E-Mail-Format
- Telefonnummern-Format
- Datumsbereich
- Mehrsprachige Fehlermeldungen

### Datumseingabe
- Deutsches Format: TT.MM.JJJJ
- Spanisches Format: DD/MM/AAAA
- Spezielle Behandlung fÃ¼r Firefox
- Manuelle Eingabe mÃ¶glich

## Webhook-Integration

Das Formular sendet die Daten an:
https://hook.integrator.boost.space/v20u3sjrskjdtu8xwu4b10nukxotvsas


## Datenformat

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


## Design

###Farbschema
- PrimÃ¤rfarbe: #FF9800 (Orange)
- SekundÃ¤rfarbe: #F57C00 (Dunkel-Orange)
- Akzentfarbe: #FFB74D (Mittel-Orange)
- Hintergrund: #FFE0B2 (Hell-Orange)
### Layout
- Zweispaltiges Design fÃ¼r Desktop
- Responsive Einspaltiges Layout fÃ¼r Mobile
- Maximale Breite: 800px
- Minimale Breite: 320px
### Sicherheit
- CSRF-Schutz
- XSS-PrÃ¤vention
- Validierung aller Eingaben
- Sichere DatenÃ¼bertragung

## Geplante Erweiterungen
- [ ] Server-seitige Validierung
- [ ] Datenbank-Integration
- [ ] Admin-Dashboard
- [ ] Weitere Sprachen
-  [ ] PDF-Export