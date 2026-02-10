# WebdriverJS_Testpage_TestPlan

## Application Overview

Test plan for the WebdriverJS Testpage demo site (https://guinea-pig.webdriver.io/). Covers verification of all interactive UI elements, happy paths, negative/edge cases, accessibility checks, and navigation behaviors. Assumes a fresh browser state for each scenario.

## Test Scenarios

### 1. WebdriverJS Testpage Elements

**Seed:** `e2e/seed.spec.ts`

#### 1.1. Page Load & Basic Content

**File:** `tests/WebdriverJS/page-load.spec.ts`

**Steps:**
  1. Assumption: Fresh browser session with no cache or cookies.
  2. 1. Navigate to https://guinea-pig.webdriver.io/.
  3. 2. Wait for page to load and for main heading to be visible.
  4. 3. Verify page title and main heading text.
  5. 4. Inspect presence of primary navigation links and visible text blocks.

**Expected Results:**
  - Page loads successfully within acceptable time.
  - Document title equals 'WebdriverJS Testpage'.
  - Main heading 'WebdriverJS Testpage' is visible and correct.
  - Primary links and key text blocks are present and readable. Success criteria: title and heading match exactly; failure: missing title/heading or major layout broken.

#### 1.2. Links and Navigation (internal & external)

**File:** `tests/WebdriverJS/links.spec.ts`

**Steps:**
  1. Assumption: Starting from fresh page load.
  2. 1. Identify internal links (index.html, gestureTest.html, pointer.html, ./two.html).
  3. 2. Click each internal link that opens in the same tab and verify navigation target loads or hash changes.
  4. 3. Click link 'GitHub Repo' and verify it opens external site (new tab or same tab depending on target).
  5. 4. Click 'open new tab' and verify a new tab/window is created.
  6. 5. Click '#'-href 'Hello' link and verify it does not cause an unexpected navigation (stays on page).

**Expected Results:**
  - Internal links navigate to expected pages or update URL fragment.
  - External GitHub link opens external site (status 200 or page title indicates GitHub).
  - 'open new tab' creates new browser context or tab with expected URL.
  - '#' link does not navigate away. Success: each link opens the appropriate target; failure: broken links, unexpected 404 or navigation.

#### 1.3. Buttons & Popups

**File:** `tests/WebdriverJS/buttons-popups.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Locate buttons: 'Open Popup', 'Klick #1', 'Klick #2' (disabled), 'Klick #3', 'Klick #4', 'Choose File', 'send'.
  3. 2. Verify 'Klick #2' is disabled and cannot be activated.
  4. 3. Click 'Klick #1', 'Klick #3', 'Klick #4' and observe page behavior or DOM changes.
  5. 4. Click 'Open Popup' and verify a popup opens (new window or dialog).
  6. 5. Click 'Choose File' and validate the file chooser opens (OS dialog or input[type=file] activated).
  7. 6. Click 'send' and observe form submission behavior or confirmation UI.

**Expected Results:**
  - Disabled button does not fire actions or change state.
  - Enabled buttons trigger expected DOM changes or JS events (documented in step observations).
  - Popup or new window is created for 'Open Popup'.
  - File chooser opens when triggered. 'send' triggers submission or expected message. Success: buttons respond correctly; failure: disabled button is clickable or enabled buttons throw errors.

#### 1.4. Dropdowns / Comboboxes

**File:** `tests/WebdriverJS/dropdowns.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Locate both combobox/select elements and their options.
  3. 2. Verify default selected option(s).
  4. 3. Select each available option in both comboboxes and verify selection persists and associated UI updates (if any).
  5. 4. Attempt keyboard navigation (Arrow keys) through options and select via Enter.
  6. 5. Validate behavior when selecting an out-of-range index (negative test via script).

**Expected Results:**
  - Default selected options match snapshot ('2' selected in first combobox; 'uno' selected in second).
  - Selecting options updates selected index/value as expected and persists until changed.
  - Keyboard selection works (arrow/enter).
  - Negative selection attempts fail gracefully (no crash). Success: selects change as expected; failure: options cannot be selected or selection causes error.

#### 1.5. Text Inputs, Searchbox & Textareas

**File:** `tests/WebdriverJS/text-inputs.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Identify textboxes, searchbox, and visible/disabled text inputs.
  3. 2. Type valid text into enabled textboxes and verify value is reflected.
  4. 3. Verify disabled textbox cannot be changed and retains original content ('some content').
  5. 4. Test clearing, backspace, and selection (Ctrl/Command+A then delete).
  6. 5. For the searchbox, enter a query and confirm any page behavior (filtering or event trigger).
  7. 6. Test paste via clipboard into an input.
  8. 7. Negative: attempt to type into disabled input and assert no change.

**Expected Results:**
  - Enabled inputs accept text and return expected values.
  - Disabled input remains unchanged.
  - Clipboard paste populates input correctly.
  - Searchbox triggers expected event or no-op if not implemented. Success: inputs behave normally; failure: typing causes exceptions or values do not persist.

#### 1.6. Checkboxes

**File:** `tests/WebdriverJS/checkboxes.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Locate checkboxes: one initially checked and one unchecked.
  3. 2. Toggle each checkbox and verify checked state changes accordingly.
  4. 3. Toggle repeatedly to confirm state flips reliably.
  5. 4. Test keyboard toggling (Space key when focused).
  6. 5. Negative: programmatically set invalid attribute and verify page handles it without crashing.

**Expected Results:**
  - Checkbox state changes reflect user actions and persist until changed again.
  - Keyboard toggling works.
  - Edge/negative manipulation does not crash script. Success: correct toggle behavior; failure: checkbox state stuck or JS error.

#### 1.7. Radio Buttons

**File:** `tests/WebdriverJS/radios.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Locate radio group (multiple radios with two initially checked in snapshot — verify which are truly grouped).
  3. 2. Select each radio sequentially and verify only one radio in the group is selected at any time.
  4. 3. Verify previously selected radio is unselected when another is chosen.
  5. 4. Test keyboard selection (Arrow keys navigation).
  6. 5. Negative: attempt selecting multiple radios by scripting and verify DOM group invariants.

**Expected Results:**
  - Only one radio is selected at a time per group.
  - Keyboard interaction selects expected radio.
  - Attempting invalid multi-select results in expected DOM state (single selection). Success: grouping works correctly; failure: multiple simultaneous selections or no selection update.

#### 1.8. Hidden & Dynamic Elements

**File:** `tests/WebdriverJS/hidden-dynamic.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Locate elements marked not visible in snapshot ('I am not visible', etc.) and verify they are hidden (display:none or not in layout).
  3. 2. Identify elements that disappear (e.g., 'I will be gone in a second') and assert they are removed within expected timeframe.
  4. 3. Interact with content that may cause visibility toggles and verify ARIA/DOM updates.
  5. 4. Negative: attempt to click hidden elements and assert no action occurs or exception is thrown.

**Expected Results:**
  - Hidden elements are not interactable and not visible to users.
  - Transient elements disappear as documented within a reasonable timeout.
  - Visibility toggles are reflected in DOM and accessibility tree. Success: elements behave as dynamic/hidden; failure: hidden elements are clickable or never disappear.

#### 1.9. Form Submission & 'send' Behavior

**File:** `tests/WebdriverJS/form-submit.spec.ts`

**Steps:**
  1. Assumption: Fresh page and network intercepts allowed.
  2. 1. Fill available form inputs (textboxes a,b,c) and optional fields.
  3. 2. Click 'send' and observe network requests, DOM changes, or confirmation messages.
  4. 3. Validate form data payload matches filled values (if submission occurs).
  5. 4. Negative: submit with required fields empty (if any) and assert validation messages or prevented submission.

**Expected Results:**
  - Form submission triggers a network call or client-side handler and payload contains expected values.
  - If validation exists, empty required fields block submission and show messages. Success: submission behavior as expected; failure: wrong payload or silent failure.

#### 1.10. Alerts, Dialogs & Popup Handling

**File:** `tests/WebdriverJS/dialogs.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Trigger 'Open Popup' and any alert/dialogs from page actions.
  3. 2. Verify ability to accept and dismiss dialogs and capture text content.
  4. 3. Verify focus returns to main page after dialog closure.
  5. 4. Test behavior when popup opens new window and when closed - ensure main remains stable.

**Expected Results:**
  - Dialogs show expected text and can be accepted/dismissed programmatically.
  - Popups open and close without leaving extraneous windows or broken references. Success: dialog handling works; failure: dialogs block automation or crash.

#### 1.11. Accessibility & Keyboard Navigation

**File:** `tests/WebdriverJS/accessibility.spec.ts`

**Steps:**
  1. Assumption: Fresh load; use accessibility tree where available.
  2. 1. Tab through interactive elements in logical order and verify tab stops follow expected sequence (links, buttons, inputs).
  3. 2. Verify elements have accessible names/labels (buttons, inputs, selects).
  4. 3. Use ARIA properties where applicable; ensure screen-reader-friendly text exists for key controls.
  5. 4. Test role and label presence for comboboxes, checkboxes, and radios.
  6. 5. Negative: verify missing labels are flagged.

**Expected Results:**
  - Tab order is logical and keyboard controls work.
  - Interactive elements have accessible names/labels. ARIA roles present where needed. Success: keyboard and a11y checks pass; failure: unreachable controls or missing labels.

#### 1.12. Keyboard & Special Input Cases

**File:** `tests/WebdriverJS/keyboard.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Test special keys in inputs: Enter, Tab, Escape, Arrow keys, Ctrl/Command+A and Delete.
  3. 2. Ensure Enter triggers appropriate actions (e.g., form submit) where applicable.
  4. 3. Test long input (several thousand characters) in textbox for stability.
  5. 4. Negative: input forbidden characters or paste extremely long clipboard content and verify page stability.

**Expected Results:**
  - Special key interactions behave as expected and don't crash the page.
  - Large input is handled without catastrophic failure. Success: no page crashes, expected event firing; failure: UI freezes or errors.

#### 1.13. Responsive Layout & Visual Regression Checks

**File:** `tests/WebdriverJS/responsive.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Resize viewport to multiple breakpoints (mobile, tablet, desktop) and record layout differences.
  3. 2. Verify key elements remain visible and usable at each size (navigation, buttons, forms).
  4. 3. Take DOM snapshots or capture accessibility snapshots for regression baseline.
  5. 4. Negative: extremely small viewport should not hide critical functionality (e.g., forms inaccessible).

**Expected Results:**
  - Page remains usable at typical breakpoints; critical controls accessible.
  - No major layout breakage. Success: elements accessible; failure: essential controls hidden or unusable.

#### 1.14. Negative & Edge Cases

**File:** `tests/WebdriverJS/negative-edge.spec.ts`

**Steps:**
  1. Assumption: Fresh load.
  2. 1. Attempt interacting with disabled button 'Klick #2' and disabled textbox; assert no state change.
  3. 2. Programmatically set invalid values on inputs and observe whether client-side validation rejects them gracefully.
  4. 3. Simulate slow network and verify timeouts/behavior of buttons/links.
  5. 4. Force DOM mutation errors (remove parent nodes) and verify app does not crash the test harness.

**Expected Results:**
  - Disabled controls cannot be changed and do not throw exceptions.
  - Invalid inputs are handled gracefully or validation error is shown.
  - Slow network results in retries/timeouts without uncontrolled failures. Success: graceful degradation; failure: unhandled exceptions or crashes.
