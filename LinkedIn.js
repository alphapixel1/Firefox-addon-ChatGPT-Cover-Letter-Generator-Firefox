function CreateButton(){
    for(var l of [...document.querySelectorAll(".jobs-save-button")]){
        let b=document.createElement("button");
        b.style="padding:10px 17px;font-family: Arial, sans-serif; color: #ffffff; background-color: #0a66c2; border: none; -webkit-border-radius: 30px; -moz-border-radius: 30px; border-radius: 30px; margin-left: 8px";
        b.innerHTML="Generate Cover Letter"
        b.addEventListener('mouseenter', function(event) {
            b.style.backgroundColor="#004182";
        });
        b.addEventListener('mouseleave', function(event) {
            b.style.backgroundColor="#0a66c2";
        });
        b.id="CoverLetterGeneratorButton";
        b.onclick=function(){
            console.log(window.open(getQueryURL("https://www.ourwebsite.com",GetAllInfo())))
        };
        if(l.nextElementSibling!=null){
            l.parentElement.insertBefore(b,l.nextElementSibling);
            b.style.margin="0px";
        }else
            l.parentElement.appendChild(b)
    }
}



function GetJobTitle(){
    let t=document.getElementById("ember41");
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
    let jd=document.querySelector(".jobs-description");
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

