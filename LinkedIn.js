function nullCheck(element){
    if(element==null)
        return null;
    return element.innerText;
}
let PageInfo={
    startsWith:"https://www.linkedin.com",
    button:{
        style:"padding:10px 17px;font-family: Arial, sans-serif; color: #ffffff; background-color: #0a66c2; border: none; -webkit-border-radius: 30px; -moz-border-radius: 30px; border-radius: 30px; margin-left: 8px",
        hover:"#004182",//hover color
        leave:"#0a66c2",//leave color
        //margin:"10px",
    },
    addButtonData:{
        getIdForButton:(l)=>l.className.replaceAll(" ",""),
        getButtons:()=>[...document.querySelectorAll(".jobs-save-button")],
    },
        
    info:{
        getTitle:()=>nullCheck(document.querySelector(".jobs-unified-top-card__job-title")),
        getCompany:()=>nullCheck(document.querySelector(".jobs-unified-top-card__primary-description a")),
        getDescription:()=>nullCheck(document.querySelector(".jobs-description article"))
    },
    sideBarInfo:{
        sideBarStartsWith:"https://www.linkedin.com/jobs/search",
        nonSideBarStartsWith:"https://www.linkedin.com/jobs/view/",
        getSideBar:()=>document.querySelector(".scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details")
    }
};
function GetAllInfo(){
    return {
        "Company":PageInfo.info.getCompany(),
        "Title":PageInfo.info.getTitle(),
        "Description":PageInfo.info.getDescription()
    };
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
    let saveButtons=PageInfo.addButtonData.getButtons();
    let buttonsMade=0;
    for(var saveButtonIndex in saveButtons){
        let l=saveButtons[saveButtonIndex];
        let id=PageInfo.addButtonData.getIdForButton(l);
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
    return buttonsMade;
}




function getQueryURL(url,params) {
    const query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (url.indexOf('?') == -1)
      return `${url}?${query}`;
    else 
      return `${url}&${query}`;
}

CreateButton();
let href=window.location.href;
if(href.startsWith(PageInfo.sideBarInfo.nonSideBarStartsWith)){
    let interval = setInterval(function(){
        if(AddButton()>0)
            clearInterval(interval);
    },300)
}else if(href.startsWith(PageInfo.sideBarInfo.sideBarStartsWith)){
    let sideBarInterval=setInterval(function(){
        console.log("Side Bar Interval");
        let sideBar=PageInfo.sideBarInfo.getSideBar();
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