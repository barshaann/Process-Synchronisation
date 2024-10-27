function runDemo() {
    const demoType = document.getElementById('demoType').value;
    const numThreads = document.getElementById('numThreads').value;
    const maxAccess = document.getElementById('maxAccess').value;
    const outputElement = document.getElementById('output');
    
    let output = '';

    if (demoType === 'mutex') {
        output += 'Mutex Output:\n';
        for (let i = 0; i < numThreads; i++) {
            output += `Thread ${i} has entered the critical section.\n`;
            output += `Thread ${i} is leaving the critical section.\n`;
        }
    } else if (demoType === 'semaphore') {
        if (!maxAccess) {
            outputElement.innerText = 'Please enter the maximum threads allowed for semaphore.';
            return;
        }
        output += 'Semaphore Output:\n';
        let activeThreads = 0;
        for (let i = 0; i < numThreads; i++) {
            if (activeThreads < maxAccess) {
                output += `Thread ${i} has entered the semaphore section.\n`;
                activeThreads++;
            } else {
                output += `Thread ${i} is waiting for the semaphore.\n`;
                activeThreads = 0;
            }
            output += `Thread ${i} is leaving the semaphore section.\n`;
        }
    } else if (demoType === 'condition') {
        output += 'Condition Variable Output:\n';
        for (let i = 0; i < numThreads; i++) {
            output += `Thread ${i} is waiting for the condition to be met.\n`;
        }
        output += 'Signaling all threads waiting on condition.\n';
        for (let i = 0; i < numThreads; i++) {
            output += `Thread ${i} received the condition signal.\n`;
        }
    }
    
    outputElement.innerText = output;
}

document.getElementById('demoType').addEventListener('change', (event) => {
    const maxAccessField = document.getElementById('maxAccess');
    const semaphoreLabel = document.getElementById('semaphoreLabel');
    if (event.target.value === 'semaphore') {
        maxAccessField.style.display = 'block';
        semaphoreLabel.style.display = 'block';
    } else {
        maxAccessField.style.display = 'none';
        semaphoreLabel.style.display = 'none';
    }
});
