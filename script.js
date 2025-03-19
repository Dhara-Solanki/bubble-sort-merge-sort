let array = [];
let steps = [];
let stepIndex = 0;

function startSort(method) {
    const input = document.getElementById('inputArray').value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    steps = [];
    stepIndex = 0;

    if (method === 'bubble') {
        bubbleSort(array);
    } else {
        mergeSort(array, 0, array.length - 1);
    }

    animateSteps();
}

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ array: [...arr], explanation: `Swapping ${arr[j]} and ${arr[j + 1]}` });
            }
        }
    }
    steps.push({ array: [...arr], explanation: "Sorting complete!" });
}

function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    let m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) 
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) 
        R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            steps.push({ array: [...arr], explanation: `Merging: Added ${L[i]} from left subarray` });
            i++;
        } else {
            arr[k] = R[j];
            steps.push({ array: [...arr], explanation: `Merging: Added ${R[j]} from right subarray` });
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        steps.push({ array: [...arr], explanation: `Merging: Added ${L[i]} from left subarray` });
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        steps.push({ array: [...arr], explanation: `Merging: Added ${R[j]} from right subarray` });
        j++;
        k++;
    }
}

function animateSteps() {
    if (stepIndex < steps.length) {
        updateArray(steps[stepIndex].array);
        document.getElementById('explanation').textContent = steps[stepIndex].explanation;
        stepIndex++;
        setTimeout(animateSteps, 1000);
    }
}

function updateArray(arr) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    const maxVal = Math.max(...arr);
    arr.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(num / maxVal) * 100}%`;
        bar.textContent = num;
        container.appendChild(bar);
    });
}