// defining constants
const maxPrice = {
'us': 250,
'ca': 350,
'uk': 250,
'de': 250,
'es': 250,
'fr': 250,
'it': 250,
'nl': 250,
'au': 350,
'jp': 30000,
'pl': 1200,
'se': 2500
};

const devises = {
'us': "USD",
'ca': "CAD",
'uk': "GBP",
'de': "EUR",
'es': "EUR",
'fr': "EUR",
'it': "EUR",
'nl': "EUR",
'au': "AUD",
'jp': "JPY",
'pl': "PLN",
'se': "SEK"
};

const paperFixedCostBWUnder108 = {
'us': 2.15,
'ca': 2.82,
'uk': 1.70,
'de': 1.90,
'es': 1.90,
'fr': 1.90,
'it': 1.90,
'nl': 1.90,
'au': 4.49,
'jp': 400,
'pl': 8.76,
'se': 19.27
};

const paperFixedCostBWOver108 = {
'us': 0.85,
'ca': 1.11,
'uk': 0.70,
'de': 0.60,
'es': 0.60,
'fr': 0.60,
'it': 0.60,
'nl': 0.60,
'au': 2.17,
'jp': 175,
'pl': 2.77,
'se': 6.09
};

const paperAdditionalBWOver108 = {
'us': 0.012,
'ca': 0.016,
'uk': 0.010,
'de': 0.012,
'es': 0.012,
'fr': 0.012,
'it': 0.012,
'nl': 0.012,
'au': 0.0215,
'jp': 2,
'pl': 0.06,
'se': 0.12
};

const paperFixedCostPCUnder40 = {
'us': 3.65,
'ca': 4.78,
'uk': 2.05,
'de': 2.40,
'es': 2.40,
'fr': 2.40,
'it': 2.40,
'nl': 2.40,
'au': 5.05,
'jp': 475,
'pl': 11.06,
'se': 24.34
};

const paperFixedCostPCOver40 = paperFixedCostBWOver108;

const paperAdditionalPCOver40 = {
'us': 0.07,
'ca': 0.09,
'uk': 0.045,
'de': 0.06,
'es': 0.06,
'fr': 0.06,
'it': 0.06,
'nl': 0.06,
'au': 0.0720,
'jp': 4,
'pl': 0.28,
'se': 0.61
};

const paperFixedCostSC = {
'us': 0.85,
'ca': 1.11,
'uk': 0.70,
'de': 0.60,
'es': 0.60,
'fr': 0.60,
'it': 0.60,
'nl': 0.60,
'pl': 2.77,
'se': 6.09
};

const paperAdditionalSC = {
'us': 0.036,
'ca': 0.047,
'uk': 0.025,
'de': 0.031,
'es': 0.031,
'fr': 0.031,
'it': 0.031,
'nl': 0.031,
'pl': 0.14,
'se': 0.31
};

const hardFixedCostBWUnder108 = {
'us': 6.80,
'uk': 5.10,
'de': 5.80,
'es': 5.80,
'fr': 5.80,
'it': 5.80,
'nl': 5.80,
'pl': 26.73,
'se': 58.83
};

const hardFixedCostBWOver108 = {
'us': 5.50,
'uk': 4.00,
'de': 4.50,
'es': 4.50,
'fr': 4.50,
'it': 4.50,
'nl': 4.50,
'pl': 20.74,
'se': 45.65
};

const hardAdditionalBWOver108 = {
'us': 0.012,
'uk': 0.010,
'de': 0.012,
'es': 0.012,
'fr': 0.012,
'it': 0.012,
'nl': 0.012,
'pl': 0.06,
'se': 0.12
};

const hardFixedCostPC = {
'us': 5.50,
'uk': 4.00,
'de': 4.50,
'es': 4.50,
'fr': 4.50,
'it': 4.50,
'nl': 4.50,
'pl': 20.74,
'se': 45.65
};

const hardAdditionalPC = {
'us': 0.070,
'uk': 0.045,
'de': 0.060,
'es': 0.060,
'fr': 0.060,
'it': 0.060,
'nl': 0.060,
'pl': 0.28,
'se': 0.61
};

let error = 0;

function validation() {
    var bookType = $('input[name=booktype]:checked', '#book-type').val();
    var interType = $("#inter-type option:selected").attr('value');
    var pageCount = $("#page-count").val();
    var market = $("#market option:selected").attr('value');
    var listPrice = $("#list-price").val();

    var errorField = $('#error');
    error = 0;

    // validate empty price
    if ((!listPrice) || (listPrice == 0)) {
        errorField.html('List price cannot be 0 or empty.');
        error = 1;
        return;
    }
    // validate max price
    if (listPrice > maxPrice[market]) {
        errorField.html('List price cannot be above ' + maxPrice[market] + ' ' + devises[market] + '.');
        error = 1;
        return;
    }

    // validate page count == integer
    if (!(Math.round(pageCount) == pageCount)) {
        errorField.html("Please enter a valid number of pages (integer).");
        error = 1;
        return;
    }

    // validate page count paperback
    if (bookType == 'paperback') {
        if (interType.startsWith('sc')) {
            if ((market == 'jp') || (market == 'au')) {
                errorField.html("Standard color paperbacks are currently unavailable in Japan and Australia.");
                error = 1;
                return;
            } else {
                if (pageCount < 72 || pageCount > 600) {
                    errorField.html("Paperback page count for standard color can't be less than 72 or greater than 600.");
                    error = 1;
                    return;
                }
            }
        } else {
            if (pageCount < 24 || pageCount > 828) {
                errorField.html("Paperback page count can't be less than 24 or greater than 828.");
                error = 1;
                return;
            }
        }
    }

    // validate hardcover
    if (bookType == 'hardcover') {
        if (interType.startsWith('sc')) {
            errorField.html("Standard color is currently not available for hardcover books.");
            error = 1;
            return;
        } else {
            if ((market == 'jp') || (market == 'au') || (market == 'ca')) {
                errorField.html("Hardcover books are currently not available in the selected marketplace.");
                error = 1;
                return;
            } else {
                if (pageCount < 75 || pageCount > 550) {
                    errorField.html("Hardcover page count can't be less than 75 or greater than 550.");
                    error = 1;
                    return;
                }
            }
        }
    }
}


$('#calculate').on('click', function() {
    if (error == 0) {
        $('#error').html('');
        $('#zero-roy').html('');
        
        var bookType = $('input[name=booktype]:checked', '#book-type').val();
        var interType = $("#inter-type option:selected").attr('value');
        var pageCount = $("#page-count").val();
        var market = $("#market option:selected").attr('value');
        var marketURL =  $("#market option:selected").html();
        var listPrice = $("#list-price").val();
        var printCost = 0;


        if(bookType == 'paperback') {
            if (interType.startsWith('bw')) {
                if(pageCount <= 108) {
                    printCost = paperFixedCostBWUnder108[market];
                } else {
                    printCost = paperFixedCostBWOver108[market] + pageCount*paperAdditionalBWOver108[market];
                }
            } else if (interType == 'pc_wp') {
                if(pageCount <= 40) {
                    printCost = paperFixedCostPCUnder40[market];
                } else {
                    printCost = paperFixedCostPCOver40[market] + pageCount*paperAdditionalPCOver40[market];
                }
            } else if (interType == 'sc_wp') {
                printCost = paperFixedCostSC[market] + pageCount*paperAdditionalSC[market];
            }
        } else {
            if (interType.startsWith('bw')) {
                if(pageCount <= 108) {
                    printCost = hardFixedCostBWUnder108[market];
                } else {
                    printCost = hardFixedCostBWOver108[market] + pageCount*hardAdditionalBWOver108[market];
                }
            } else {
                printCost = hardFixedCostPC[market] + pageCount*hardAdditionalPC[market];
            }
        }

        printCost = Math.round(printCost*100)/100
        var minPrice = Math.round(printCost/(60/100) * 100) / 100;
        var estRoy = Math.round(((0.6*listPrice)-printCost) * 100) / 100;

        if (estRoy <= 0) {
            estRoy = 0
            $('#zero-roy').html('If the estimated royalty is 0.00 ' + devises[market] + ', the list price is not high enough to generate a royalty.');
        }

        $('.market-res').html(marketURL);
        $('.list-price-res').html(listPrice + ' ' + devises[market]);
        $('.min-price-res').html(minPrice + ' ' + devises[market]);
        $('.print-res').html(printCost + ' ' + devises[market]);
        $('.estroy-res').html(estRoy + ' ' + devises[market]);

    }
})
