function getConsumableValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}

function setConsumableText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        element.textContent = "-";

        return;
    }

    if (
        element.tagName === "INPUT"
    ) {

        element.value =
            String(value);

    } else {

        element.textContent =
            String(value);
    }

    // element.textContent =
    //     String(value);
}

function showConsumableMessage(
    message,
    type
) {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent =
        message;


    messageBox.className =
        "consumable-message " +
        type;
}

function hideConsumableMessage() {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";

    messageBox.className =
        "consumable-message";
}

function hideConsumableResult() {

    const resultSection =
        document.getElementById(
            "consumableResult"
        );

    if (resultSection) {

        resultSection.style.display =
            "none";
    }
}
function isEmptyOrZero(value) {
    if (value === undefined || value === null || value === "") return true;
    const num = Number(value);
    return !Number.isNaN(num) && num === 0;
}


function setSearchButtonLoading(
    loading
) {

    const button =
        document.querySelector(
            ".search-btn"
        );

    if (!button) {
        return;
    }

    button.disabled =
        loading;

    if (loading) {

        button.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Searching';

    } else {

        button.innerHTML =
            '<i class="fas fa-search"></i> Search';
    }
}

// =========================================
// FIXED: handleProgramChange (no more auto-search)
// =========================================
async function handleProgramChange() {
    const selectedProgram = document.querySelector('input[name="program"]:checked')?.value;

    const b1Section = document.getElementById("b1PricingSection");
    const brSection = document.getElementById("brPricingSection");
    const kondaField = document.getElementById("consumableKonda");
    const kondaRow = document.getElementById("priceKonda")?.closest(".info-row");

    if (selectedProgram === "B1") {
        if (b1Section) b1Section.style.display = "block";
        if (brSection) brSection.style.display = "none";
        if (kondaRow) kondaRow.style.display = "none";

        if (kondaField) {
            kondaField.disabled = true;
            kondaField.value = "ZX";
        }
    } else {
        if (b1Section) b1Section.style.display = "none";
        if (brSection) brSection.style.display = "block";
        if (kondaRow) kondaRow.style.display = "flex";

        if (kondaField) {
            kondaField.disabled = false;
            kondaField.value = "ZX";
        }
    }

    // Only re-search if user manually changed the radio
    // (prevents the infinite loop / edit-reset bug)
    if (handleProgramChange.isUserAction) {
        const consumable = document.getElementById("consumableSearch")?.value?.trim();
        if (consumable) {
            await searchConsumable();
        }
    }
}

// Flag to know if the change came from user click
handleProgramChange.isUserAction = false;


// =========================================
// FIXED: showConsumableResult (no recursive search)
// =========================================
function showConsumableResult(data) {
    window.currentPricingData = data;

    const resultSection = document.getElementById("consumableResult");
    if (resultSection) {
        resultSection.style.display = "grid";
    }

    // Material Information
    setConsumableText("matConsumable", data.CONSUMABLE);
    setConsumableText("matMtart", data.MTART);
    setConsumableText("matMbrsh", data.MBRSH);
    setConsumableText("matMatkl", data.MATKL);
    setConsumableText("matMeins", data.MEINS);
    setConsumableText("matSpart", data.SPART);
    setConsumableText("matEan11", data.EAN11);
    setConsumableText("matMstae", data.MSTAE);
    setConsumableText("matMstav", data.MSTAV);
    setConsumableText("matSpras", data.SPRAS);
    setConsumableText("matMaktx", data.MAKTX);
    setConsumableText("materialDescription", data.MAKTX);
    setConsumableText("matVtweg", data.VTWEG);
    setConsumableText("matWerks", data.WERKS);
    setConsumableText("matVmsta", data.VMSTA);

    setConsumableText("imageConsumableName", data.CONSUMABLE);

    // Common
    setConsumableText("priceKschl", data.KSCHL);
    setConsumableText("priceSelkzb1", data.SELKZB1);
    setConsumableText("priceSelkzbr", data.SELKZBR);
    setConsumableText("priceKonda", data.KONDA);

    // B1
    const b1IsZero = isEmptyOrZero(data.B1KBETR);
    if (b1IsZero) {
        setConsumableText("priceB1kbetr", "-");
        setConsumableText("priceB1konwa", "-");
        setConsumableText("priceB1kpein", "-");
        setConsumableText("priceB1kmein", "-");
        setConsumableText("priceB1krech", "-");
        setConsumableText("priceB1datab", "-");
        setConsumableText("priceB1datbi", "-");
    } else {
        setConsumableText("priceB1kbetr", formatPrice(data.B1KBETR));
        setConsumableText("priceB1konwa", data.B1KONWA);
        setConsumableText("priceB1kpein", formatPricingUnit(data.B1KPEIN));
        setConsumableText("priceB1kmein", data.B1KMEIN);
        setConsumableText("priceB1krech", data.B1KRECH);
        setConsumableText("priceB1datab", formatConsumableDate(data.B1DATAB));
        setConsumableText("priceB1datbi", formatConsumableDate(data.B1DATBI));
    }

    // BR
    const brIsZero = isEmptyOrZero(data.BRKBETR);
    if (brIsZero) {
        setConsumableText("priceBrkbetr", "-");
        setConsumableText("priceBrkonwa", "-");
        setConsumableText("priceBrkpein", "-");
        setConsumableText("priceBrkmein", "-");
        setConsumableText("priceBrkrech", "-");
        setConsumableText("priceBrdatab", "-");
        setConsumableText("priceBrdatbi", "-");
    } else {
        setConsumableText("priceBrkbetr", formatPrice(data.BRKBETR));
        setConsumableText("priceBrkonwa", data.BRKONWA);
        setConsumableText("priceBrkpein", formatPricingUnit(data.BRKPEIN));
        setConsumableText("priceBrkmein", data.BRKMEIN);
        setConsumableText("priceBrkrech", data.BRKRECH);
        setConsumableText("priceBrdatab", formatConsumableDate(data.BRDATAB));
        setConsumableText("priceBrdatbi", formatConsumableDate(data.BRDATBI));
    }

    // Just update the UI sections (NO search here!)
    handleProgramChange();

    // Zero price message
    const selectedProgram = document.querySelector('input[name="program"]:checked')?.value;
    if (selectedProgram === "B1" && b1IsZero) {
        showConsumableMessage("No price details available for B1.", "error");
    } else if (selectedProgram === "BR" && brIsZero) {
        showConsumableMessage("No price details available for BR.", "error");
    } else {
        hideConsumableMessage();
    }
}
function isEmptyOrZero(value) {
    if (value === undefined || value === null || value === "") return true;
    const num = Number(value);
    return !Number.isNaN(num) && num === 0;
}

function formatPrice(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";
    }

    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {

        return String(value);
    }

    return number.toFixed(2);
}

function formatPricingUnit(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";
    }

    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {

        return String(value);
    }

    return String(
        number
    );
}

function formatConsumableDate(
    value
) {

    if (!value) {
        return "-";
    }

    // SAP OData V2 Date
    // /Date(1234567890000)/

    if (
        typeof value === "string" &&
        value.startsWith("/Date(")
    ) {

        const startIndex =
            value.indexOf("(");

        const endIndex =
            value.indexOf(")");

        if (
            startIndex !== -1 &&
            endIndex !== -1
        ) {

            const timestamp =
                value.substring(
                    startIndex + 1,
                    endIndex
                );

            const milliseconds =
                Number(timestamp);

            if (
                !Number.isNaN(
                    milliseconds
                )
            ) {

                const date =
                    new Date(
                        milliseconds
                    );

                const year =
                    date.getUTCFullYear();

                const month =
                    String(
                        date.getUTCMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );

                const day =
                    String(
                        date.getUTCDate()
                    ).padStart(
                        2,
                        "0"
                    );

                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    day
                );
            }
        }
    }

    // YYYYMMDD

    if (
        typeof value === "string" &&
        /^\d{8}$/.test(value)
    ) {

        return (
            value.substring(0, 4) +
            "-" +
            value.substring(4, 6) +
            "-" +
            value.substring(6, 8)
        );
    }

    return String(value);
}

function showConsumableResult(data) {
    window.currentPricingData = data;

    const resultSection = document.getElementById("consumableResult");
    if (resultSection) {
        resultSection.style.display = "grid";
    }

    // ===== Material Information =====
    setConsumableText("matConsumable", data.CONSUMABLE);
    setConsumableText("matMtart", data.MTART);
    setConsumableText("matMbrsh", data.MBRSH);
    setConsumableText("matMatkl", data.MATKL);
    setConsumableText("matMeins", data.MEINS);
    setConsumableText("matSpart", data.SPART);
    setConsumableText("matEan11", data.EAN11);
    setConsumableText("matMstae", data.MSTAE);
    setConsumableText("matMstav", data.MSTAV);
    setConsumableText("matSpras", data.SPRAS);
    setConsumableText("matMaktx", data.MAKTX);
    setConsumableText("materialDescription", data.MAKTX);
    setConsumableText("matVtweg", data.VTWEG);
    setConsumableText("matWerks", data.WERKS);
    setConsumableText("matVmsta", data.VMSTA);

    // Image name
    setConsumableText("imageConsumableName", data.CONSUMABLE);

    // ===== Common fields =====
    setConsumableText("priceKschl", data.KSCHL);
    setConsumableText("priceSelkzb1", data.SELKZB1);
    setConsumableText("priceSelkzbr", data.SELKZBR);
    setConsumableText("priceKonda", data.KONDA);

    // ===== B1 Pricing =====
    const b1IsZero = isEmptyOrZero(data.B1KBETR);

    if (b1IsZero) {
        setConsumableText("priceB1kbetr", "-");
        setConsumableText("priceB1konwa", "-");
        setConsumableText("priceB1kpein", "-");
        setConsumableText("priceB1kmein", "-");
        setConsumableText("priceB1krech", "-");
        setConsumableText("priceB1datab", "-");
        setConsumableText("priceB1datbi", "-");
    } else {
        setConsumableText("priceB1kbetr", formatPrice(data.B1KBETR));
        setConsumableText("priceB1konwa", data.B1KONWA);
        setConsumableText("priceB1kpein", formatPricingUnit(data.B1KPEIN));
        setConsumableText("priceB1kmein", data.B1KMEIN);
        setConsumableText("priceB1krech", data.B1KRECH);
        setConsumableText("priceB1datab", formatConsumableDate(data.B1DATAB));
        setConsumableText("priceB1datbi", formatConsumableDate(data.B1DATBI));
    }

    // ===== BR Pricing =====
    const brIsZero = isEmptyOrZero(data.BRKBETR);

    if (brIsZero) {
        setConsumableText("priceBrkbetr", "-");
        setConsumableText("priceBrkonwa", "-");
        setConsumableText("priceBrkpein", "-");
        setConsumableText("priceBrkmein", "-");
        setConsumableText("priceBrkrech", "-");
        setConsumableText("priceBrdatab", "-");
        setConsumableText("priceBrdatbi", "-");
    } else {
        setConsumableText("priceBrkbetr", formatPrice(data.BRKBETR));
        setConsumableText("priceBrkonwa", data.BRKONWA);
        setConsumableText("priceBrkpein", formatPricingUnit(data.BRKPEIN));
        setConsumableText("priceBrkmein", data.BRKMEIN);
        setConsumableText("priceBrkrech", data.BRKRECH);
        setConsumableText("priceBrdatab", formatConsumableDate(data.BRDATAB));
        setConsumableText("priceBrdatbi", formatConsumableDate(data.BRDATBI));
    }

    // ===== Show correct section + hide Customer Price Group for B1 =====
    handleProgramChange();

    // ===== Show error message if price is zero =====
    const selectedProgram = document.querySelector('input[name="program"]:checked')?.value;

    if (selectedProgram === "B1" && b1IsZero) {
        showConsumableMessage("No price details available for B1.", "error");
    } else if (selectedProgram === "BR" && brIsZero) {
        showConsumableMessage("No price details available for BR.", "error");
    } else {
        hideConsumableMessage();
    }
}

function resetConsumableSearch() {
    document.getElementById("consumableSearch").value = "";
    document.getElementById("consumableKschl").value = "ZPR0";
    document.getElementById("consumableKonda").value = "ZX";
    document.getElementById("consumableWerks").value = "1710";
    document.getElementById("consumableVtweg").value = "30";
    document.getElementById("consumableSpart").value = "10";

    const b1Radio = document.querySelector('input[name="program"][value="B1"]');
    if (b1Radio) {
        b1Radio.checked = true;
    }

    enableBothPrograms();          // ← re-enable both radios

    hideConsumableMessage();
    hideConsumableResult();
    disableGlobalSave();
}


function enablePriceEdit(id) {

    const input =
        document.getElementById(id);

    if (!input) {
        return;
    }

    input.removeAttribute(
        "readonly"
    );

    input.focus();
}


document.addEventListener(
    "DOMContentLoaded",
    function () {
        hideConsumableResult();
        console.log(
            "Consumables JavaScript loaded"
        );

        const consumable =
            document.getElementById(
                "consumableSearch"
            );

        document
            .querySelectorAll(
                'input[name="program"]'
            )
            .forEach(function (radio) {

                radio.addEventListener(
                    "change",
                    handleProgramChange
                );

            });

        handleProgramChange();

        if (!consumable) {
            return;
        }

        // Uppercase automatically

        consumable.addEventListener(
            "input",
            function () {

                consumable.value =
                    consumable.value
                        .toUpperCase();
            }
        );

        // Search when Enter is pressed

        consumable.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchConsumable();
                }
            }


        );
    }


);

function enableB1Edit() {

    document
        .getElementById(
            "priceB1kbetr"
        )
        .removeAttribute(
            "readonly"
        );
}

function enableBREdit() {

    document
        .getElementById(
            "priceBrkbetr"
        )
        .removeAttribute(
            "readonly"
        );
}

function enableEANEdit() {

    document
        .getElementById(
            "matEan11"
        )
        .removeAttribute(
            "readonly"
        );
}

// Helper: converts /Date(123456789)/ or null → clean string or empty
function cleanDate(value) {
    if (!value || value === null) return "";

    // Already in YYYY-MM-DD
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    // SAP OData format → convert to YYYY-MM-DD
    if (typeof value === "string" && value.startsWith("/Date(")) {
        const timestamp = Number(value.substring(value.indexOf("(") + 1, value.indexOf(")")));
        if (!Number.isNaN(timestamp)) {
            const date = new Date(timestamp);
            const y = date.getUTCFullYear();
            const m = String(date.getUTCMonth() + 1).padStart(2, "0");
            const d = String(date.getUTCDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        }
    }

    return "";
}
function disableOppositeProgram(selectedProgram) {
    const b1Radio = document.querySelector('input[name="program"][value="B1"]');
    const brRadio = document.querySelector('input[name="program"][value="BR"]');

    if (!b1Radio || !brRadio) return;

    if (selectedProgram === "B1") {
        b1Radio.disabled = false;
        brRadio.disabled = true;
    } else {
        b1Radio.disabled = true;
        brRadio.disabled = false;
    }
}

function enableBothPrograms() {
    const b1Radio = document.querySelector('input[name="program"][value="B1"]');
    const brRadio = document.querySelector('input[name="program"][value="BR"]');

    if (b1Radio) b1Radio.disabled = false;
    if (brRadio) brRadio.disabled = false;
}

function getConsumableValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}

function setConsumableText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        element.textContent = "-";

        return;
    }

    if (
        element.tagName === "INPUT"
    ) {

        element.value =
            String(value);

    } else {

        element.textContent =
            String(value);
    }

    // element.textContent =
    //     String(value);
}

function showConsumableMessage(
    message,
    type
) {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent =
        message;


    messageBox.className =
        "consumable-message " +
        type;
}

function hideConsumableMessage() {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";

    messageBox.className =
        "consumable-message";
}

function hideConsumableResult() {

    const resultSection =
        document.getElementById(
            "consumableResult"
        );

    if (resultSection) {

        resultSection.style.display =
            "none";
    }
}

async function searchConsumable() {

    const consumable =
        getConsumableValue(
            "consumableSearch"
        )
            .toUpperCase();

    const program =
        document.querySelector(
            'input[name="program"]:checked'
        )?.value || "BR";

    hideConsumableMessage();

    // =========================================
    // VALIDATION
    // =========================================

    if (!consumable) {

        showConsumableMessage(
            "Please enter a Consumable.",
            "error"
        );

        return;
    }


    if (!program) {

        showConsumableMessage(
            "Please select a Program.",
            "error"
        );

        return;
    }

    setSearchButtonLoading(
        true
    );

    showConsumableMessage(
        "Searching SAP pricing information...",
        "loading"
    );

    try {

        // =====================================
        // NODE API URL
        // =====================================

        const kschl =
            getConsumableValue(
                "consumableKschl"
            );

        const konda =
            getConsumableValue(
                "consumableKonda"
            );

        const werks =
            getConsumableValue(
                "consumableWerks"
            );

        const vtweg =
            getConsumableValue(
                "consumableVtweg"
            );

        const spart =
            getConsumableValue(
                "consumableSpart"
            );

        const url =
            "/api/consumable/pricing" +
            "?_=" +
            Date.now() +
            "&consumable=" +
            encodeURIComponent(consumable) +
            "&kschl=" +
            encodeURIComponent(kschl) +
            "&konda=" +
            encodeURIComponent(konda) +
            "&werks=" +
            encodeURIComponent(werks) +
            "&vtweg=" +
            encodeURIComponent(vtweg) +
            "&spart=" +
            encodeURIComponent(spart) +
            "&program=" +
            encodeURIComponent(program);

        console.log(
            "Calling Consumable API:",
            url
        );

        // =====================================
        // CALL NODE
        // =====================================

        const response =
            await fetch(url);

        const result =
            await response.json();

        console.log(
            "Consumable API Response:",
            result
        );

        // =====================================
        // ERROR
        // =====================================

        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to retrieve pricing"
            );
        }

        if (!result.success) {

            throw new Error(
                result.message ||
                "Unable to retrieve pricing"
            );
        }

        // =====================================
        // GET NORMALIZED SAP DATA
        // =====================================

        const sap =
            result.pricing || {};

        const resultData = {

            CONSUMABLE:
                result.CONSUMABLE,

            MTART:
                result.MTART,

            MBRSH:
                result.MBRSH,

            MATKL:
                result.MATKL,

            MEINS:
                result.MEINS,

            SPART:
                result.SPART,

            EAN11:
                result.EAN11,

            MSTAE:
                result.MSTAE,

            MSTAV:
                result.MSTAV,

            SPRAS:
                result.SPRAS,

            MAKTX:
                result.MAKTX,

            VTWEG:
                result.VTWEG,

            WERKS:
                result.WERKS,

            VMSTA:
                result.VMSTA,

            KSCHL:
                result.KSCHL,

            SELKZB1:
                result.SELKZB1,

            SELKZBR:
                result.SELKZBR,

            KONDA:
                result.KONDA,

            B1KBETR:
                result.B1KBETR,

            B1KONWA:
                result.B1KONWA,

            B1KPEIN:
                result.B1KPEIN,

            B1KMEIN:
                result.B1KMEIN,

            B1KRECH:
                result.B1KRECH,

            B1DATAB:
                result.B1DATAB,

            B1DATBI:
                result.B1DATBI,

            BRKBETR:
                result.BRKBETR,

            BRKONWA:
                result.BRKONWA,

            BRKPEIN:
                result.BRKPEIN,

            BRKMEIN:
                result.BRKMEIN,

            BRKRECH:
                result.BRKRECH,

            BRDATAB:
                result.BRDATAB,

            BRDATBI:
                result.BRDATBI
        };

        console.log(
            "Formatted Pricing Data:",
            resultData
        );

        hideConsumableMessage();

        console.log(
            "RESULT DATA"
        );

        console.log(
            JSON.stringify(
                resultData,
                null,
                2
            )
        );

        showConsumableResult(
            resultData
        );
        const selectedProgram = document.querySelector('input[name="program"]:checked')?.value;
        disableOppositeProgram(selectedProgram);

    } catch (error) {

        console.error(
            "Consumable Search Error:"
        );

        console.error(error);

        console.error(error.stack);

        hideConsumableResult();

        showConsumableMessage(
            error.message ||
            "Unable to retrieve pricing information.",
            "error"
        );
    } finally {

        setSearchButtonLoading(
            false
        );
    }
}

function setSearchButtonLoading(
    loading
) {

    const button =
        document.querySelector(
            ".search-btn"
        );

    if (!button) {
        return;
    }

    button.disabled =
        loading;

    if (loading) {

        button.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Searching';

    } else {

        button.innerHTML =
            '<i class="fas fa-search"></i> Search';
    }
}



function formatPrice(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";
    }

    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {

        return String(value);
    }

    return number.toFixed(2);
}

function formatPricingUnit(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";
    }

    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {

        return String(value);
    }

    return String(
        number
    );
}

function formatConsumableDate(
    value
) {

    if (!value) {
        return "-";
    }

    // SAP OData V2 Date
    // /Date(1234567890000)/

    if (
        typeof value === "string" &&
        value.startsWith("/Date(")
    ) {

        const startIndex =
            value.indexOf("(");

        const endIndex =
            value.indexOf(")");

        if (
            startIndex !== -1 &&
            endIndex !== -1
        ) {

            const timestamp =
                value.substring(
                    startIndex + 1,
                    endIndex
                );

            const milliseconds =
                Number(timestamp);

            if (
                !Number.isNaN(
                    milliseconds
                )
            ) {

                const date =
                    new Date(
                        milliseconds
                    );

                const year =
                    date.getUTCFullYear();

                const month =
                    String(
                        date.getUTCMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );

                const day =
                    String(
                        date.getUTCDate()
                    ).padStart(
                        2,
                        "0"
                    );

                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    day
                );
            }
        }
    }

    // YYYYMMDD

    if (
        typeof value === "string" &&
        /^\d{8}$/.test(value)
    ) {

        return (
            value.substring(0, 4) +
            "-" +
            value.substring(4, 6) +
            "-" +
            value.substring(6, 8)
        );
    }

    return String(value);
}

function showConsumableResult(
    data
) {

    window.currentPricingData = data;

    const resultSection =
        document.getElementById(
            "consumableResult"
        );


    if (resultSection) {

        resultSection.style.display =
            "grid";
    }


    setConsumableText(
        "matConsumable",
        data.CONSUMABLE
    );

    setConsumableText(
        "matMtart",
        data.MTART
    );

    setConsumableText(
        "matMbrsh",
        data.MBRSH
    );

    setConsumableText(
        "matMatkl",
        data.MATKL
    );

    setConsumableText(
        "matMeins",
        data.MEINS
    );

    setConsumableText(
        "matSpart",
        data.SPART
    );

    setConsumableText(
        "matEan11",
        data.EAN11
    );

    setConsumableText(
        "matMstae",
        data.MSTAE
    );

    setConsumableText(
        "matMstav",
        data.MSTAV
    );

    setConsumableText(
        "matSpras",
        data.SPRAS
    );

    setConsumableText(
        "matMaktx",
        data.MAKTX
    );

    setConsumableText(
        "materialDescription",
        data.MAKTX
    );

    setConsumableText(
        "matVtweg",
        data.VTWEG
    );

    setConsumableText(
        "matWerks",
        data.WERKS
    );

    setConsumableText(
        "matVmsta",
        data.VMSTA
    );

    setConsumableText(
        "priceKschl",
        data.KSCHL
    );

    setConsumableText(
        "priceSelkzb1",
        data.SELKZB1
    );

    setConsumableText(
        "priceSelkzbr",
        data.SELKZBR
    );

    setConsumableText(
        "priceKonda",
        data.KONDA
    );

    setConsumableText(
        "priceB1kbetr",
        data.B1KBETR
    );

    setConsumableText(
        "priceB1konwa",
        data.B1KONWA
    );

    setConsumableText(
        "priceB1kpein",
        data.B1KPEIN
    );

    setConsumableText(
        "priceB1kmein",
        data.B1KMEIN
    );

    setConsumableText(
        "priceB1krech",
        data.B1KRECH
    );

    setConsumableText(
        "priceB1datab",
        formatConsumableDate(
            data.B1DATAB
        )
    );

    setConsumableText(
        "priceB1datbi",
        formatConsumableDate(
            data.B1DATBI
        )
    );

    setConsumableText(
        "priceBrkbetr",
        data.BRKBETR
    );

    setConsumableText(
        "priceBrkonwa",
        data.BRKONWA
    );

    setConsumableText(
        "priceBrkpein",
        data.BRKPEIN
    );

    setConsumableText(
        "priceBrkmein",
        data.BRKMEIN
    );

    setConsumableText(
        "priceBrkrech",
        data.BRKRECH
    );

    setConsumableText(
        "priceBrdatab",
        formatConsumableDate(
            data.BRDATAB
        )
    );

    setConsumableText(
        "priceBrdatbi",
        formatConsumableDate(
            data.BRDATBI
        )
    );

    const selectedProgram =
        document.querySelector(
            'input[name="program"]:checked'
        )?.value;

    if (selectedProgram === "B1") {

        document.getElementById(
            "b1PricingSection"
        ).style.display = "block";

        document.getElementById(
            "brPricingSection"
        ).style.display = "none";

    } else {

        document.getElementById(
            "b1PricingSection"
        ).style.display = "none";

        document.getElementById(
            "brPricingSection"
        ).style.display = "block";
    }
    disableGlobalSave();

}

function enablePriceEdit(id) {

    const input =
        document.getElementById(id);

    if (!input) {
        return;
    }

    input.removeAttribute(
        "readonly"
    );

    input.focus();
}


document.addEventListener(
    "DOMContentLoaded",
    function () {
        hideConsumableResult();
        console.log(
            "Consumables JavaScript loaded"
        );

        const consumable =
            document.getElementById(
                "consumableSearch"
            );

        document
            .querySelectorAll(
                'input[name="program"]'
            )
            .forEach(function (radio) {

                radio.addEventListener(
                    "change",
                    handleProgramChange
                );

            });

        handleProgramChange();

        if (!consumable) {
            return;
        }

        // Uppercase automatically

        consumable.addEventListener(
            "input",
            function () {

                consumable.value =
                    consumable.value
                        .toUpperCase();
            }
        );

        // Search when Enter is pressed

        consumable.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchConsumable();
                }
            }


        );
    }


);

function enableB1Edit() {

    document
        .getElementById(
            "priceB1kbetr"
        )
        .removeAttribute(
            "readonly"
        );
}

function enableBREdit() {

    document
        .getElementById(
            "priceBrkbetr"
        )
        .removeAttribute(
            "readonly"
        );
}

function enableEANEdit() {

    document
        .getElementById(
            "matEan11"
        )
        .removeAttribute(
            "readonly"
        );
}
async function saveConsumableChanges() {

    const payload = {

        Consumable:
            document.getElementById(
                "matConsumable"
            ).textContent.trim(),

        Ean11:
            document.getElementById(
                "matEan11"
            ).value.trim(),

        Kschl:
            document.getElementById(
                "priceKschl"
            ).textContent.trim(),

        Selkzb1:
            document.getElementById(
                "priceSelkzb1"
            ).textContent.trim() === "-"
                ? ""
                : document.getElementById(
                    "priceSelkzb1"
                ).textContent.trim(),

        Selkzbr:
            document.getElementById(
                "priceSelkzbr"
            ).textContent.trim() === "-"
                ? ""
                : document.getElementById(
                    "priceSelkzbr"
                ).textContent.trim(),

        Konda:
            document.getElementById(
                "priceKonda"
            ).textContent.trim(),

        Werks:
            document.getElementById(
                "matWerks"
            ).textContent.trim(),

        Vtweg:
            document.getElementById(
                "matVtweg"
            ).textContent.trim(),

        Spart:
            document.getElementById(
                "matSpart"
            ).textContent.trim(),

        B1kbetr:
            document.getElementById(
                "priceB1kbetr"
            )?.value || "",

        Brkbetr:
            document.getElementById(
                "priceBrkbetr"
            )?.value || ""
    };
    console.log(
        "SAVE PAYLOAD"
    );

    console.log(
        JSON.stringify(
            payload,
            null,
            2
        )
    );

    const response =
        await fetch(
            "/api/consumable/updatePrice",
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body:
                    JSON.stringify(
                        payload
                    )
            }
        );

    const result =
        await response.json();

    console.log(
        "SAVE RESPONSE"
    );

    console.log(result);

    if (
        result.success
    ) {

        if (result.success) {

            showConsumableMessage(
                "Changes saved successfully.",
                "success"
            );

            setTimeout(
                async function () {

                    await searchConsumable();

                },
                500
            );

            return;
        }

    } else {

        showConsumableMessage(
            result.message,
            "error"
        );
    }
}
async function togglePriceEdit(id) {
    const input = document.getElementById(id);
    const button = document.getElementById(id + "Btn");

    if (!input || !button) return;

    // Currently locked → unlock for editing
    if (input.hasAttribute("readonly")) {
        input.removeAttribute("readonly");
        input.focus();
        input.select();
        button.innerHTML = '<i class="fas fa-check"></i>';
        // Do NOT enable Save here
        return;
    }

    // Currently editable → lock again + enable Global Save
    input.setAttribute("readonly", true);
    button.innerHTML = '<i class="fas fa-pen"></i>';

    // Enable Save Changes only when user clicks the tick
    enableGlobalSave();
}

function enableGlobalSave() {
    const btn = document.getElementById("globalSaveBtn");
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}
function disableGlobalSave() {
    const btn = document.getElementById("globalSaveBtn");
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
        btn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}
let isSaving = false; // prevent double submit

async function saveAllChanges() {


    // Prevent double click
    if (isSaving) {
        console.log("Save already in progress...");
        return;
    }
    isSaving = true;

    const saveBtn = document.getElementById("globalSaveBtn");
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    }
    const original = window.currentPricingData;

    try {
        // const payload = {
        //     Consumable: document.getElementById("matConsumable")?.textContent.trim() || "",
        //     Mtart: document.getElementById("matMtart")?.textContent.trim() || "",
        //     Mbrsh: document.getElementById("matMbrsh")?.textContent.trim() || "",
        //     Matkl: document.getElementById("matMatkl")?.textContent.trim() || "",
        //     Meins: document.getElementById("matMeins")?.textContent.trim() || "",
        //     Maktx: document.getElementById("matMaktx")?.textContent.trim() || "",
        //     Mstae: document.getElementById("matMstae")?.textContent.trim() || "",
        //     Mstav: document.getElementById("matMstav")?.textContent.trim() || "",
        //     Spras: document.getElementById("matSpras")?.textContent.trim() || "",
        //     Vmsta: document.getElementById("matVmsta")?.textContent.trim() || "",
        //     Ean11: document.getElementById("matEan11")?.value.trim() || "",
        //     Kschl: document.getElementById("priceKschl")?.textContent.trim() || "",
        //     Selkzb1: document.getElementById("priceSelkzb1")?.textContent.trim() === "-"
        //         ? ""
        //         : document.getElementById("priceSelkzb1")?.textContent.trim() || "",
        //     Selkzbr: document.getElementById("priceSelkzbr")?.textContent.trim() === "-"
        //         ? ""
        //         : document.getElementById("priceSelkzbr")?.textContent.trim() || "",
        //     B1KPEIN: document.getElementById("priceB1kpein")?.textContent.trim() || "",
        //     B1KMEIN: document.getElementById("priceB1kmein")?.textContent.trim() || "",
        //     B1KONWA: document.getElementById("priceB1konwa")?.textContent.trim() || "",
        //     B1KRECH: document.getElementById("priceB1krech")?.textContent.trim() || "",
        //     // B1DATAB: document.getElementById("priceB1datab")?.textContent.trim() || "",
        //     // B1DATBI: document.getElementById("priceB1datbi")?.textContent.trim() || "",
        //     BRKPEIN: document.getElementById("priceBrkpein")?.textContent.trim() || "",
        //     BRKMEIN: document.getElementById("priceBrkmein")?.textContent.trim() || "",
        //     BRKONWA: document.getElementById("priceBrkonwa")?.textContent.trim() || "",
        //     BRKRECH: document.getElementById("priceBrkrech")?.textContent.trim() || "",
        //     // BRDATAB: document.getElementById("priceBrdatab")?.textContent.trim() || "",
        //     // BRDATBI: document.getElementById("priceBrdatbi")?.textContent.trim() || "",
        //     Konda: document.getElementById("priceKonda")?.textContent.trim() || "",
        //     Werks: document.getElementById("matWerks")?.textContent.trim() || "",
        //     Vtweg: document.getElementById("matVtweg")?.textContent.trim() || "",
        //     Spart: document.getElementById("matSpart")?.textContent.trim() || "",
        //     B1kbetr: document.getElementById("priceB1kbetr")?.value || "",
        //     Brkbetr: document.getElementById("priceBrkbetr")?.value || ""
        // };


        const payload = {

            // Material Data
            Consumable: original.CONSUMABLE,
            Mtart: original.MTART,
            Mbrsh: original.MBRSH,
            Matkl: original.MATKL,
            Meins: original.MEINS,
            Maktx: original.MAKTX,
            Mstae: original.MSTAE,
            Mstav: original.MSTAV,
            Spras: original.SPRAS,
            Vmsta: original.VMSTA,
            Werks: original.WERKS,
            Vtweg: original.VTWEG,
            Spart: original.SPART,

            // Editable UPC
            Ean11:
                document.getElementById("matEan11")?.value?.trim()
                || original.EAN11,

            // Pricing Header
            Kschl: original.KSCHL,
            Selkzb1: original.SELKZB1,
            Selkzbr: original.SELKZBR,
            Konda: original.KONDA,

            // B1 Pricing
            B1kbetr:
                document.getElementById("priceB1kbetr")?.value?.trim()
                || original.B1KBETR,

            B1konwa: original.B1KONWA,
            B1kpein: original.B1KPEIN,
            B1kmein: original.B1KMEIN,
            B1krech: original.B1KRECH,
            // B1DATAB: original.B1DATAB,
            // B1DATBI: original.B1DATBI,

            // BR Pricing
            Brkbetr:
                document.getElementById("priceBrkbetr")?.value?.trim()
                || original.BRKBETR,

            Brkonwa: original.BRKONWA,
            Brkpein: original.BRKPEIN,
            Brkmein: original.BRKMEIN,
            Brkrech: original.BRKRECH,
            // BRDATAB: original.BRDATAB,
            // BRDATBI: original.BRDATBI
        };

        console.log("SAVE PAYLOAD:", payload);

        const response = await fetch("/api/consumable/updatePrice", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("SAVE RESPONSE:", result);

        if (result.success) {
            showConsumableMessage("Changes saved successfully.", "success");

            // Optional: refresh data after short delay
            setTimeout(async () => {
                await searchConsumable();
            }, 600);

            // Lock fields
            lockAllEditableFields();
            disableGlobalSave();

        } else {
            showConsumableMessage(result.message || "Save failed", "error");
            enableGlobalSave();
        }

    } catch (error) {
        console.error("Save error:", error);
        showConsumableMessage(error.message || "Failed to save changes", "error");
        enableGlobalSave();
    } finally {
        isSaving = false; // allow next save
    }
}


// async function saveAllChanges() {
//     if (isSaving) {
//         console.log("Save already in progress...");
//         return;
//     }
//     isSaving = true;

//     if (!window.currentPricingData) {
//         showConsumableMessage("No data loaded. Please search first.", "error");
//         isSaving = false;
//         return;
//     }

//     const saveBtn = document.getElementById("globalSaveBtn");
//     if (saveBtn) {
//         saveBtn.disabled = true;
//         saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
//     }

//     try {
//         const original = window.currentPricingData;
//         const selectedProgram = document.querySelector('input[name="program"]:checked')?.value || "BR";

//         // Helper: keep original value if empty / "-"
//         const getValue = (inputId, originalValue) => {
//             const el = document.getElementById(inputId);
//             if (!el) return originalValue ?? "";

//             let val = el.value?.trim() || el.textContent?.trim() || "";
//             if (val === "-" || val === "" || val === "null") {
//                 return originalValue ?? "";
//             }
//             return val;
//         };

//         // ===== FULL PAYLOAD (all fields) =====
//         const payload = {
//             // Material
//             Consumable: original.CONSUMABLE || "",
//             Mtart: original.MTART || "",
//             Mbrsh: original.MBRSH || "",
//             Matkl: original.MATKL || "",
//             Meins: original.MEINS || "",
//             Ean11: getValue("matEan11", original.EAN11),          // editable
//             // MSTAE: original.MSTAE || "",
//             // MSTAV: original.MSTAV || "",
//             SPRAS: original.SPRAS || "",
//             MAKTX: original.MAKTX || "",
//             vmsta: original.VMSTA || "",
//             Werks: original.WERKS || "",
//             Vtweg: original.VTWEG || "",
//             Spart: original.SPART || "",

//             // Pricing header
//             Kschl: original.KSCHL || "",
//             Selkzb1: original.SELKZB1 || "",
//             Selkzbr: original.SELKZBR || "",
//             Konda: original.KONDA || "",

//             // B1 Price (editable)
//             B1kbetr: getValue("priceB1kbetr", original.B1KBETR),
//             B1KONWA: original.B1KONWA || "",
//             B1KPEIN: original.B1KPEIN || "",
//             B1KMEIN: original.B1KMEIN || "",
//             B1KRECH: original.B1KRECH || "",
//             B1DATAB: original.B1DATAB || "",
//             B1DATBI: original.B1DATBI || "",

//             // BR Price (editable)
//             Brkbetr: getValue("priceBrkbetr", original.BRKBETR),
//             BRKONWA: original.BRKONWA || "",
//             BRKPEIN: original.BRKPEIN || "",
//             BRKMEIN: original.BRKMEIN || "",
//             BRKRECH: original.BRKRECH || "",
//             BRDATAB: original.BRDATAB || "",
//             BRDATBI: original.BRDATBI || ""
//         };

//         // Make sure the active program price is taken from the input
//         if (selectedProgram === "B1") {
//             const val = document.getElementById("priceB1kbetr")?.value?.trim();
//             payload.B1kbetr = (!val || val === "-") ? (original.B1KBETR || "0.00") : val;
//         } else {
//             const val = document.getElementById("priceBrkbetr")?.value?.trim();
//             payload.Brkbetr = (!val || val === "-") ? (original.BRKBETR || "0.00") : val;
//         }

//         console.log("FULL SAVE PAYLOAD:", payload);

//         const response = await fetch("/api/consumable/updatePrice", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(payload)
//         });

//         const result = await response.json();
//         console.log("SAVE RESPONSE:", result);

//         if (result.success) {
//             showConsumableMessage("Changes saved successfully.", "success");

//             // Update local cache
//             window.currentPricingData = {
//                 ...window.currentPricingData,
//                 EAN11: payload.Ean11,
//                 B1KBETR: payload.B1kbetr,
//                 BRKBETR: payload.Brkbetr
//             };

//             // Refresh UI
//             setTimeout(async () => {
//                 await searchConsumable();
//             }, 600);

//             lockAllEditableFields();
//             disableGlobalSave();

//         } else {
//             showConsumableMessage(result.message || "Save failed", "error");
//             enableGlobalSave();
//         }

//     } catch (error) {
//         console.error("Save error:", error);
//         showConsumableMessage(error.message || "Failed to save changes", "error");
//         enableGlobalSave();
//     } finally {
//         isSaving = false;
//     }
// }


function lockAllEditableFields() {
    ["matEan11", "priceB1kbetr", "priceBrkbetr"].forEach(id => {
        const input = document.getElementById(id);
        const button = document.getElementById(id + "Btn");
        if (input) input.setAttribute("readonly", true);
        if (button) button.innerHTML = '<i class="fas fa-pen"></i>';
    });
}   
