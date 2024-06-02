function bruteForceSearch(text, pattern) {
    var occurrences = [];
    var n = text.length;
    var m = pattern.length;
    for (var i = 0; i <= n - m; i++) {
        var match = true;
        for (var j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            occurrences.push(i);
        }
    }
    return occurrences;
}

function greedySearch(text, pattern) {
    var occurrences = [];
    var n = text.length;
    var m = pattern.length;
    var i = 0;
    while (i <= n - m) {
        var j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) {
            occurrences.push(i);
            i += m;
        } else if (j === 0) {
            i++;
        } else {
            i += j;
        }
    }
    return occurrences;
}

function highlightOccurrences(text, pattern, occurrences) {
    let highlightedText = "";
    let lastIndex = 0;
    occurrences.forEach(index => {
        highlightedText += text.slice(lastIndex, index);
        highlightedText += `<span class="highlight">${text.slice(index, index + pattern.length)}</span>`;
        lastIndex = index + pattern.length;
    });
    highlightedText += text.slice(lastIndex);
    return highlightedText;
}

function search() {
    var text = document.getElementById("textInput").value;
    var pattern = document.getElementById("patternInput").value;

    var startBruteForce = performance.now();
    var bruteForceOccurrences = bruteForceSearch(text, pattern);
    var endBruteForce = performance.now();

    var startGreedy = performance.now();
    var greedyOccurrences = greedySearch(text, pattern);
    var endGreedy = performance.now();

    var bruteForceTime = (endBruteForce - startBruteForce) / 1000;
    var greedyTime = (endGreedy - startGreedy) / 1000;

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Hasil pencarian pola '${pattern}' menggunakan brute force: ${bruteForceOccurrences}</p>`;
    resultDiv.innerHTML += `<p>Waktu pencarian menggunakan brute force: ${bruteForceTime} detik</p>`;
    resultDiv.innerHTML += `<p>Hasil pencarian pola '${pattern}' menggunakan greedy: ${greedyOccurrences}</p>`;
    resultDiv.innerHTML += `<p>Waktu pencarian menggunakan greedy: ${greedyTime} detik</p>`;

    if (bruteForceOccurrences.length > 0) {
        resultDiv.innerHTML += `<p>Teks dengan pola yang disorot (brute force):</p>`;
        resultDiv.innerHTML += `<p>${highlightOccurrences(text, pattern, bruteForceOccurrences)}</p>`;
    }
    if (greedyOccurrences.length > 0) {
        resultDiv.innerHTML += `<p>Teks dengan pola yang disorot (greedy):</p>`;
        resultDiv.innerHTML += `<p>${highlightOccurrences(text, pattern, greedyOccurrences)}</p>`;
    }
}
