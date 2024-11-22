let bodyis = document.getElementById("body")


//سیستم امتیازدهی
let scorinmemory = 0
let scorediv = document.getElementById('scorediv');


// فرایند های چپو راست شدن هواپیما
let palneis = document.getElementById('palneis');
let toright = document.getElementById('toright');
let toleft = document.getElementById('toleft');
let position = palneis.getBoundingClientRect();
let leftPosition = position.left; // موقعیت left عنصر

function toleftfunc() {
    leftPosition -= 20; // کاهش موقعیت left به اندازه 10 پیکسل
    palneis.style.left = leftPosition + 'px'; // اعمال موقعیت جدید به عنصر
}
function torightfunc() {
    leftPosition += 20; // کاهش موقعیت left به اندازه 10 پیکسل
    palneis.style.left = leftPosition + 'px'; // اعمال موقعیت جدید به عنصر
}
toleft.addEventListener("touchstart",toleftfunc)
toright.addEventListener("touchstart",torightfunc)


//فرایندهای تولید مهاجم
function createattackermobile(){
    let attaker = document.createElement("div")
    attaker.classList.add("attakeris")
    let screenWidth = window.innerWidth;
    let randomX = 50 + Math.floor(Math.random() * (screenWidth-50))
    attaker.style.top = 0 + 'px'
    attaker.style.left = randomX + 'px'
    bodyis.appendChild(attaker)

    gsap.to(attaker,{
        y:610,
        duration:5,
    })
    setTimeout(() => {
        attaker.remove(); // حذف مهاجم
    }, 6000);

}
setInterval(createattackermobile,3000)

// فرایند های شکلیک 
let tofire = document.getElementById('tofire');
let fireis = document.getElementById('fireis');

tofire.addEventListener("touchstart",function(){
    let firediv = document.createElement("div")
    firediv.classList.add("fireis")
    firediv.style.left = leftPosition + 'px'
    bodyis.appendChild(firediv)
    const sound = new Audio("img/firesoundready.mp3");
        sound.play();

    gsap.to(firediv, {
        y: -800, // حرکت به سمت پایین
        duration: 1 // مدت زمان انیمیشن (مقدار را می‌توانید تغییر دهید)
    });
    setTimeout(() => {
        firediv.remove(); // حذف مهاجم
    }, 5000);


    //برسی برخورد یا عدم برخورد

    let allattackers = document.querySelectorAll(".attakeris")
    allattackers.forEach(attaker =>{
        let firedivRect = firediv.getBoundingClientRect(); // گرفتن موقعیت
        let attackerRect = attaker.getBoundingClientRect()
        let firedivRx = firedivRect.x 
        let attackdivRx = attackerRect.x
        console.log(firedivRx,attackdivRx)
        if(firedivRx < (attackdivRx + 63)&&firedivRx > (attackdivRx -63)){
            if(attaker.style.display != "none"){
                attaker.style.display = "none"
                scorinmemory +=10
                scorediv.innerHTML = scorinmemory
            }
        }
    })
})

//جلوگیری از زوم در حالت موبایل
let lastTouchEnd = 0;

document.addEventListener('touchend', (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // جلوگیری از زوم دوبار کلیک
    }
    lastTouchEnd = now;
}, false);

