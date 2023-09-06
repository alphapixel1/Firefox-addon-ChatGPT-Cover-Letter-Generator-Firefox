function nullCheck(element){
    if(element==null)
        return null;
    return element.innerText;
}
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
function getQueryURL(url,params) {
    const query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (url.indexOf('?') == -1)
      return `${url}?${query}`;
    else 
      return `${url}&${query}`;
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




let PageInfo={
    startsWith:"https://www.indeed.com",
    button:{
        style:"cursor:pointer;padding: 12px 15px; font-family: Arial, sans-serif; color: rgb(255, 255, 255); background-color: rgb(37, 87, 167); border: medium; border-radius: 8px; margin-left: 16px; font-size: 16px; font-weight: 700; vertical-align:top",
        hover:"#164081",//hover color
        leave:"#2557a7",//leave color
    },
    addButtonData:{
        getIdForButton:(l)=>"CoverLetterGenerator",
        getButtons:()=>{
            if(document.querySelector(".jobsearch-RightPane")!=null)//test if there is a sidebar
                return [document.querySelector(".jobsearch-ViewJobButtons-container").lastChild];
            let container=document.getElementById("saveJobButtonContainer");
            if(container==null)
                return [];
            return [container.firstChild];
        }
    },
        
    info:{
        getTitle:()=>nullCheck(document.querySelector(".jobsearch-JobInfoHeader-title")),
        getCompany:()=>nullCheck(document.querySelector("div[data-testid=inlineHeader-companyName]")),
        getDescription:()=>nullCheck(document.getElementById("jobDescriptionText"))
    },
    sideBarInfo:{
        sideBarStartsWith:"https://www.indeed.com/jobs",
        nonSideBarStartsWith:"https://www.indeed.com/viewjob",
        getSideBar:()=>document.querySelector(".jobsearch-RightPane")
    }
};



AddButton();
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