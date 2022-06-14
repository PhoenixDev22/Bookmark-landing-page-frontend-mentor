const logo = document.getElementById("logo");
const naviagtion = document.getElementById("navigation");
const toggleBtn = document.getElementById("toggle__btn");

toggleBtn.addEventListener("click", () => {
    toggleBtn.getAttribute("aria-expanded") ==="false"?toggleBtn.setAttribute("aria-expanded", "true"):toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.children[0].classList.toggle("disappear")
    toggleBtn.children[1].classList.toggle("disappear")
    naviagtion.classList.toggle("navigation-appear");
    logo.classList.toggle("logo__white")
    document.body.classList.toggle("no-scroll")
})

document.addEventListener("keyup", (e) =>{
    if(e.key === "escape" ){
        toggleBtn.children[0].classList.remove("disappear")
        toggleBtn.children[1].classList.add("disappear")
        naviagtion.classList.remove("navigation-appear");
        logo.classList.remove("logo__white")
    }
})

const validRegExp = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;
const inputField = document.getElementById("user__email");
const submitBtn = document.getElementById("submit__btn");
const form = document.getElementById("contact__form");
const errorMsg = document.getElementById("alert__msg");
const errorImg = document.getElementById("error-img");
let isValid = false;

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    isValid = validRegExp.test(form.email.value);
    if(!isValid){
        errorMsg.removeAttribute("hidden");
        inputField.setAttribute("aria-invalid", "false")
        inputField.classList.add("border-red")
        errorMsg.classList.add("opacity")
        errorImg.classList.add("opacity")
        setTimeout(() => {
            errorMsg.setAttribute("hidden", "true");
            errorMsg.classList.remove("opacity", "border-red")
            inputField.classList.remove("border-red")
            errorImg.classList.remove("opacity")
        }, 4000)
    }else{
        errorMsg.setAttribute("hidden", "true");
        inputField.setAttribute("aria-invalid", "true")
    }
})



const tabs = Array.from(document.querySelectorAll(`[role="tab"]`));
const tabList = document.querySelector(`[role="tablist"]`)
let tabIndex = 0


tabs.forEach(tab => tab.addEventListener("click", changeTheTabs ))
// change the focus and tab index of our tab elements with the right and left arrows
// Enable the arrow navigation between tabs in the tab list
tabList.addEventListener("keydown", (e) => {
    if(e.keyCode === 37 || e.keyCode === 39){
        tabs[tabIndex].setAttribute("tabindex", -1)
        if(e.keyCode === 37){
            tabIndex--;
            if(tabIndex < 0){
                tabIndex = tabs.length - 1;
            }
        }else{
            if(e.keyCode === 39){
                tabIndex++;
                if(tabIndex >= tabs.length){
                    tabIndex = 0;
                }
            }
        }
        tabs[tabIndex].tabIndex = 0;
        tabs[tabIndex].focus()
    }
})
// change the active tab and tabpanel when we click 
function changeTheTabs (e){  
    const targetEle = e.currentTarget;
    const parent = targetEle.parentNode;
    const tabsPanel = Array.from(parent.parentNode.querySelectorAll(`[role="tabpanel"]`));
    const targetPanel = parent.parentNode.querySelector(`#${targetEle.getAttribute("aria-controls")}`);

    // remove active and selected from all the tabs
    tabs.forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false")  
    })
    // Set the selected tab as active
    targetEle.classList.add("active")
    targetEle.setAttribute("aria-selected", "true")

    // Hide all the tab panels 
    tabsPanel.forEach(tabpanel => {
        tabpanel.classList.remove("opacity-1");
        tabpanel.setAttribute("aria-expanded", "false")
        tabpanel.setAttribute("hidden", "true")
    })
    // show the selected panel 
    targetPanel.classList.add("opacity-1")
    targetPanel.setAttribute("aria-expanded", "true")
    targetPanel.removeAttribute("hidden")   
}


// close the open details when select another details
const allTheSummary = [...document.querySelectorAll(".FAQs summary>div")]

allTheSummary.forEach(summary => {
    summary.addEventListener("click", (e) =>{
        console.log(e.currentTarget.parentNode)
        if(e.currentTarget.parentNode.parentNode.hasAttributes("open") ){
            allTheSummary.forEach(summary => {
                if(summary.dataset.answer !== e.currentTarget.dataset.answer ){
                    summary.parentNode.parentNode.removeAttribute("open")
                }else{
                    return
                }  
            })
        }
    })
})

























