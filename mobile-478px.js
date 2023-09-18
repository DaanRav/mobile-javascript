document.addEventListener("DOMContentLoaded", function() {
    const vorigeButton = document.getElementById("back-button");
    const nextButton = document.getElementById("volgende-button");
    const loadingProgress = document.querySelector('.laad-progress');
    const transitionDuration = 2000; // 2 sec
    let hasEnteredViewport = false;
    let currentState = 0;
	let linkLine = document.getElementById("link-Line");
  let activeIndex = 0;

const group = document.getElementsByClassName("afbeelding-group");
    function updateContent() {
		console.log("Updating content for currentState:", currentState);
		
        const elements = [
            ["eerste-title", "eerste-subtitle", "eerste-link",],
            ["tweede-title", "tweede-subtitle", "tweede-link",],
            ["derde-title", "derde-subtitle", "derde-link",]
        ];

        elements.flat().forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.opacity = "0";
            }
        });

        elements[currentState].forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.opacity = "1";
            }
        });

        loadingProgress.style.width = `${(currentState + 1) * 33.3}%`;
		 
  const elementToModify = document.querySelector('.block-2-lijn3');

    if (currentState === 1 || currentState === 2) {
        elementToModify.classList.add('geen-underline');
    } else {
        elementToModify.classList.remove('geen-underline');
    }
}



function goForward() {
    if (currentState < 2) { 
        vorigeButton.setAttribute("disabled", "disabled");
        nextButton.setAttribute("disabled", "disabled");

        currentState++;
        updateContent();
    }
    if (activeIndex < 2) {  
        const nextindex = activeIndex + 1;

        const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
        const nextGroup = document.querySelector(`[data-index="${nextindex}"]`);

        currentGroup.dataset.status = "after";
        nextGroup.dataset.status = "becoming-active";

        setTimeout(() => {
            nextGroup.dataset.status = "active";
            activeIndex = nextindex;
        });
    }
    const allButtons = document.querySelectorAll('.block-3-knop-container .block-3-knop');

allButtons.forEach(button => {
    button.classList.remove('state-0', 'state-1', 'state-2');
});


allButtons.forEach(button => {
    button.classList.add(`state-${currentState}`);
});
const lineContainer = document.querySelector('.lijn-container');
    
 
    lineContainer.classList.remove('state-0', 'state-1', 'state-2');
    
  
    lineContainer.classList.add(`state-${currentState}`);
}
    function goBack() {
        vorigeButton.setAttribute("disabled", "disabled");
        nextButton.setAttribute("disabled", "disabled");

        if (currentState > 0) {
            currentState--;
            updateContent();
        }
        if (activeIndex > 0) {  
        const previndex = activeIndex - 1;

        const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
        const prevGroup = document.querySelector(`[data-index="${previndex}"]`);

        currentGroup.dataset.status = "before";
        prevGroup.dataset.status = "becoming-active-from-before";

        setTimeout(() => {
            prevGroup.dataset.status = "active";
            activeIndex = previndex;
        });
    }
    const allButtons = document.querySelectorAll('.block-3-knop-container .block-3-knop');


allButtons.forEach(button => {
    button.classList.remove('state-0', 'state-1', 'state-2');
});


allButtons.forEach(button => {
    button.classList.add(`state-${currentState}`);
});
const lineContainer = document.querySelector('.lijn-container');
    
    lineContainer.classList.remove('state-0', 'state-1', 'state-2');
    
    lineContainer.classList.add(`state-${currentState}`);
    }

    function seekToTime(targetTime, isReversing = false) {
        const initialTime = video.currentTime;
        const startTime = performance.now();

        function step() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;

            if (elapsedTime < transitionDuration) {
                const progress = elapsedTime / transitionDuration;
                video.currentTime = isReversing
                    ? initialTime - progress * (initialTime - targetTime)
                    : initialTime + progress * (targetTime - initialTime);
                requestAnimationFrame(step);
            } else {
                video.currentTime = targetTime;
                updateButtons();
            }
        }

        requestAnimationFrame(step);
    }

    function updateButtons() {
        if (currentState === 0) {
            vorigeButton.setAttribute("disabled", "disabled");
            nextButton.removeAttribute("disabled");
        } else if (currentState === 2) {
            nextButton.setAttribute("disabled", "disabled");
            vorigeButton.removeAttribute("disabled");
        } else {
            vorigeButton.removeAttribute("disabled");
            nextButton.removeAttribute("disabled");
        }
    }

    function checkViewport() {
        const rect = video.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!hasEnteredViewport && isInViewport) {
            hasEnteredViewport = true;
            video.play();
            setTimeout(() => {
                video.pause();
                updateButtons();
                updateContent();
            }, 2000); 
        }
    }

    window.addEventListener("scroll", checkViewport);
    window.addEventListener("resize", checkViewport);
    vorigeButton.addEventListener("click", goBack);
    nextButton.addEventListener("click", goForward);

    
    vorigeButton.setAttribute("disabled", "disabled"); 
});