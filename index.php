<?php
// Spracheinstellung
session_start();
$allowed_languages = ['de', 'es'];
$default_language = 'de';

// Sprache aus URL-Parameter oder Session laden
$lang = isset($_GET['lang']) ? $_GET['lang'] : (isset($_SESSION['lang']) ? $_SESSION['lang'] : $default_language);
$lang = in_array($lang, $allowed_languages) ? $lang : $default_language;
$_SESSION['lang'] = $lang;

// Übersetzungen laden
$translations = require "translations_{$lang}.php";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $translations['title']; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="language-switcher">
        <a href="?lang=de" class="<?php echo $lang === 'de' ? 'active' : ''; ?>">Deutsch</a>
        <a href="?lang=es" class="<?php echo $lang === 'es' ? 'active' : ''; ?>">Español</a>
    </div>
    <div class="container">
        <form id="anmeldeformular" method="post" action="process.php">
            <!-- Fortschrittsanzeige -->
            <div class="progress-bar">
                <div class="step active">1</div>
                <div class="step">2</div>
                <div class="step">3</div>
                <div class="step">4</div>
                <div class="step">5</div>
            </div>

            <!-- Schritt 1: Willkommen und Schülerdaten -->
            <div class="form-step active" id="step1">
                <h2><?php echo $translations['step1_title']; ?></h2>
                <p><?php echo $translations['step1_description']; ?></p>
                
                <div class="form-group">
                    <label for="vorname"><?php echo $translations['student_firstname']; ?>*</label>
                    <input type="text" id="vorname" name="vorname" required>
                </div>

                <div class="form-group">
                    <label for="nachname"><?php echo $translations['student_lastname']; ?>*</label>
                    <input type="text" id="nachname" name="nachname" required>
                </div>

                <div class="form-group">
                    <label for="geburtsdatum"><?php echo $translations['student_birthdate']; ?>*</label>
                    <input type="date" 
                           id="geburtsdatum" 
                           name="geburtsdatum" 
                           min="2004-01-01" 
                           max="2022-01-01" 
                           required
                           placeholder="<?php echo $lang === 'de' ? 'TT.MM.JJJJ' : 'DD/MM/AAAA'; ?>"
                           autocomplete="off">
                    <small class="date-format-hint">
                        <?php echo $lang === 'de' ? 'Format: TT.MM.JJJJ' : 'Formato: DD/MM/AAAA'; ?>
                    </small>
                </div>

                <div class="button-group">
                    <button type="button" class="btn next-btn"><?php echo $translations['next']; ?></button>
                </div>
            </div>

            <!-- Schritt 2: Elternteile -->
            <div class="form-step" id="step2">
                <h2><?php echo $translations['step2_title']; ?></h2>
                <div class="two-columns">
                    <div class="column">
                        <h3><?php echo $translations['guardian1_title']; ?></h3>
                        <div class="form-group">
                            <label for="guardian1_firstname"><?php echo $translations['firstname']; ?>*</label>
                            <input type="text" id="guardian1_firstname" name="guardian1_firstname" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian1_lastname"><?php echo $translations['lastname']; ?>*</label>
                            <input type="text" id="guardian1_lastname" name="guardian1_lastname" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian1_id"><?php echo $translations['id_number']; ?>*</label>
                            <input type="text" id="guardian1_id" name="guardian1_id" required>
                        </div>
                    </div>
                    <div class="column">
                        <h3><?php echo $translations['guardian2_title']; ?></h3>
                        <div class="form-group">
                            <label for="guardian2_firstname"><?php echo $translations['firstname']; ?>*</label>
                            <input type="text" id="guardian2_firstname" name="guardian2_firstname" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian2_lastname"><?php echo $translations['lastname']; ?>*</label>
                            <input type="text" id="guardian2_lastname" name="guardian2_lastname" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian2_id"><?php echo $translations['id_number']; ?>*</label>
                            <input type="text" id="guardian2_id" name="guardian2_id" required>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="btn back-btn"><?php echo $translations['back']; ?></button>
                    <button type="button" class="btn next-btn"><?php echo $translations['next']; ?></button>
                </div>
            </div>

            <!-- Schritt 3: Kontaktdaten -->
            <div class="form-step" id="step3">
                <h2><?php echo $translations['step3_title']; ?></h2>
                <div class="two-columns">
                    <div class="column">
                        <h3><?php echo $translations['guardian1_title']; ?> (<span class="guardian1-name"></span>)</h3>
                        <div class="form-group">
                            <label for="guardian1_email"><?php echo $translations['email']; ?>*</label>
                            <input type="email" id="guardian1_email" name="guardian1_email" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian1_phone"><?php echo $translations['phone']; ?>*</label>
                            <input type="tel" id="guardian1_phone" name="guardian1_phone" required>
                        </div>
                    </div>
                    <div class="column">
                        <h3><?php echo $translations['guardian2_title']; ?> (<span class="guardian2-name"></span>)</h3>
                        <div class="form-group">
                            <label for="guardian2_email"><?php echo $translations['email']; ?>*</label>
                            <input type="email" id="guardian2_email" name="guardian2_email" required>
                        </div>
                        <div class="form-group">
                            <label for="guardian2_phone"><?php echo $translations['phone']; ?>*</label>
                            <input type="tel" id="guardian2_phone" name="guardian2_phone" required>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="btn back-btn"><?php echo $translations['back']; ?></button>
                    <button type="button" class="btn next-btn"><?php echo $translations['next']; ?></button>
                </div>
            </div>

            <!-- Schritt 4: Adresse -->
            <div class="form-step" id="step4">
                <h2><?php echo $translations['step4_title']; ?></h2>
                
                <!-- Adresse des Schülers -->
                <h3><?php echo $translations['student_address']; ?> (<span class="student-name"></span>)</h3>
                <div class="form-group">
                    <label for="street"><?php echo $translations['street']; ?>*</label>
                    <input type="text" id="street" name="street" required>
                </div>

                <!-- Postleitzahl und Ort nebeneinander -->
                <div class="form-row">
                    <div class="form-group half">
                        <label for="postal_code"><?php echo $translations['postal_code']; ?>*</label>
                        <input type="text" id="postal_code" name="postal_code" required>
                    </div>
                    <div class="form-group half">
                        <label for="city"><?php echo $translations['city']; ?>*</label>
                        <input type="text" id="city" name="city" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="province"><?php echo $translations['province']; ?>*</label>
                    <input type="text" id="province" name="province" required>
                </div>

                <div class="button-group">
                    <button type="button" class="btn back-btn"><?php echo $translations['back']; ?></button>
                    <button type="button" class="btn next-btn"><?php echo $translations['next']; ?></button>
                </div>
            </div>

            <!-- Schritt 5: Zusammenfassung -->
            <div class="form-step" id="step5">
                <h2><?php echo $translations['step5_title']; ?></h2>
                <div class="summary-grid">
                    <!-- Schüler und Adresse nebeneinander -->
                    <div class="column">
                        <h3><?php echo $translations['student_data']; ?></h3>
                        <div id="student-summary"></div>
                    </div>
                    <div class="column">
                        <h3><?php echo $translations['address']; ?></h3>
                        <div id="address-summary"></div>
                    </div>
                    
                    <!-- Erziehungsberechtigte nebeneinander -->
                    <div class="column">
                        <h3><?php echo $translations['guardian1_title']; ?></h3>
                        <div id="guardian1-summary"></div>
                    </div>
                    <div class="column">
                        <h3><?php echo $translations['guardian2_title']; ?></h3>
                        <div id="guardian2-summary"></div>
                    </div>

                    <!-- Datenschutzerklärung über volle Breite -->
                    <div class="full-width">
                        <div class="privacy-section">
                            <p>
                                <a href="<?php echo $lang === 'de' ? 'datenschutz_de.html' : 'datenschutz_es.html'; ?>" target="_blank">
                                    <?php echo $translations['privacy_policy']; ?>
                                </a>
                            </p>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="privacy_accepted" name="privacy_accepted" required>
                                    <?php echo $translations['privacy_accept']; ?>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="btn back-btn"><?php echo $translations['back']; ?></button>
                    <button type="submit" class="btn submit-btn"><?php echo $translations['submit']; ?></button>
                    <button type="button" class="btn cancel-btn"><?php echo $translations['cancel']; ?></button>
                </div>
            </div>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
