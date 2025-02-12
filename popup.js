document.addEventListener('DOMContentLoaded', function() {
    const plus = document.getElementById('plusBtn');
    const reset = document.getElementById('resetBtn');
    const minus = document.getElementById('minusBtn');
    const counter = document.getElementById('counter');

    chrome.storage.local.get(["counter"], (data)=>{
    counter.innerText = data.counter || 0;
    })
    
    chrome.storage.onChanged.addListener((changes) => {
        if(changes.counter){
            counter.innerText = changes.counter.newValue;
        }
    })
    
    plus.addEventListener('click', () => {
        updateCounter(1)
    });
    reset.addEventListener('click', () => {
        chrome.storage.local.set({ counter : 0}, ()=> counter.innerText= 0)
    });
    minus.addEventListener('click', () => {
        updateCounter(-1)
    });

    function updateCounter(change){
        chrome.storage.local.get(("counter"), (data) =>{
            let counterTally = Number(data.counter) || 0;
            counterTally += change;
            chrome.storage.local.set({ counter: counterTally},()=>{
                counter.innerText = counterTally;
            });
        })
    }

})