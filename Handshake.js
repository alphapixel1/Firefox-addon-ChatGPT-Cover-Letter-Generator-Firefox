function nullCheck(element){
    if(element==null)
        return null;
    return element.innerText;
}
let PageInfo={
    startsWith:"https://app.joinhandshake.com",
    button:{
        style:"padding:9px 20px;font-size:18px;font-weight:700;font-family: Arial, sans-serif; color: #ffffff; background-color: #190083; border: none; -webkit-border-radius: 30px; -moz-border-radius: 30px; border-radius: 30px; margin-left: 8px",
        hover:"#100056",//hover color
        leave:"#190083",//leave color
    },
    /*addButtonData:{
        getIdForButton:(l)=>l.className.replaceAll(" ",""),
        getButtons:()=>[...document.querySelectorAll(".jobs-save-button")],
    },*/
    info:{
        getTitle:()=>nullCheck(document.querySelector(".style__job-title___P7PJV")),
        getCompany:()=>nullCheck(document.querySelector(".style__employer-name___54lqg")),
        getDescription:()=>nullCheck(document.querySelector(".style__margin-control___Cfd0z"))
    },
    /*sideBarInfo:{
        sideBarStartsWith:"https://www.linkedin.com/jobs/search",
        nonSideBarStartsWith:"https://www.linkedin.com/jobs/view/",
        getSideBar:()=>document.querySelector(".scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details")
    }*/
}
function GetAllInfo(){
    return {
        "Company":PageInfo.info.getCompany(),
        "Title":PageInfo.info.getTitle(),
        "Description":PageInfo.info.getDescription()
    };
}
function getQueryURL(url,params) {
    const query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (url.indexOf('?') == -1)
      return `${url}?${query}`;
    else 
      return `${url}&${query}`;
}

function CreateButton(){
    let b=document.createElement("button");
    b.style=PageInfo.button.style;
    b.innerHTML="Generate Cover Letter";
    b.addEventListener('mouseenter', ()=>b.style.backgroundColor=PageInfo.button.hover);
    b.addEventListener('mouseleave', ()=>b.style.backgroundColor=PageInfo.button.leave);
    return b;
}

function AddButton(){
    let buttons=[...document.querySelectorAll("button[aria-label=Apply]")];
    let buttonsMade=0;
    for(var buttonIndex in buttons){
        let l=buttons[buttonIndex].parentElement;
        if(l!=null){
            let id=l.parentElement.className.replaceAll(" ","");
            if(document.getElementById(id)==null){
            var b=CreateButton();
                b.id=id;
                b.onclick=function(){
                    let info=GetAllInfo();
                    console.log(info);
                    window.open(getQueryURL("https://www.ourwebsite.com",info));
                };
                if(l.nextElementSibling!=null){
                    l.parentElement.insertBefore(b,l.nextElementSibling);
                    b.style.margin="0px";
                }else
                    l.parentElement.appendChild(b)
                console.log("GPT Button Added");
                console.log(b,"Button");
                buttonsMade++;
            }
        }
    }
    return buttonsMade;
}
//AddButton();
let href=window.location.href;
if(href.startsWith("https://app.joinhandshake.com/stu/jobs/")){
    let interval = setInterval(function(){
        if(AddButton()>0)
            clearInterval(interval);
    },300)
}else if(href.startsWith("https://app.joinhandshake.com/stu/postings")){
    let sideBarInterval=setInterval(function(){
        console.log("Side Bar Interval");
        let sideBar=document.querySelector(".job-preview");
        if(sideBar!=null){
            new MutationObserver(function(mutations,observer){
                for (const mutation of mutations) 
                    if (mutation.type == 'childList'){
                        AddButton();
                        console.log("Adding button #2")   ;
                    }
                    console.log(mutations.type)
            }).observe(sideBar, { childList: true, subtree: true });
            clearInterval(sideBarInterval);
        }
    },300);
}