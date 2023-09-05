function CreateButton(){
    let saveButtons=[...document.querySelectorAll(".jobs-save-button")];
    for(var saveButtonIndex in saveButtons){
        let l=saveButtons[saveButtonIndex];
        let id=l.className.replaceAll(" ","");
        if(document.getElementById(id)==null){
            let b=document.createElement("button");
            b.style="padding:10px 17px;font-family: Arial, sans-serif; color: #ffffff; background-color: #0a66c2; border: none; -webkit-border-radius: 30px; -moz-border-radius: 30px; border-radius: 30px; margin-left: 8px";
            b.innerHTML="Generate Cover Letter"
            b.id=id;
            b.addEventListener('mouseenter', function(event) {
                b.style.backgroundColor="#004182";
            });
            b.addEventListener('mouseleave', function(event) {
                b.style.backgroundColor="#0a66c2";
            });
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
        }
    }
}



function GetJobTitle(){
    let t=document.querySelector(".jobs-unified-top-card__job-title");
    if(t!=null)
        return t.innerText;
    return null;
}
function GetCompany(){
    let c=document.querySelector(".jobs-unified-top-card__primary-description a");
    if(c!=null)
        return c.innerText;
    return null;
}
function GetDescription(){
    let jd=document.querySelector(".jobs-description article");
    if(jd!=null)
        return jd.innerText;
    return null;
}

function GetAllInfo(){
    return {
        "JobTitle":GetJobTitle(),
        "Company":GetCompany(),
        "Description":GetDescription()
    };
}


function getQueryURL(url,params) {
    const query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (url.indexOf('?') == -1)
      return `${url}?${query}`;
    else 
      return `${url}&${query}`;
}

CreateButton();

new MutationObserver(function(mutations,observer){
    for (const mutation of mutations) 
        if (mutation.type == 'childList' && [...document.querySelectorAll(".jobs-save-button")].length>0){
            CreateButton();
            observer.disconnect();
        }
}).observe(document.body, { childList: true, subtree: true });