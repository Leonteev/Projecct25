document.addEventListener("DOMContentLoaded", load);

function load() {
  let classArray = window.scriptData.module_bastform_btnclass.split(", ");
  for (let i = 0; i < classArray.length; i++) {
    let btnsQuery = "." + classArray[i];
    if (btnsQuery.length > 1 && document.querySelectorAll(btnsQuery).length > 0) {
      let btnsEvent = document.querySelectorAll(btnsQuery);
      if (  btnsEvent.length > 0 ) {
        for (let l = 0; l < btnsEvent.length; l++) {
          btnsEvent[l].addEventListener("click", () => { load_form(document.documentElement.scrollWidth, event); }, false);
        }
      }
    }
  }
}

function load_form(scrollWBfr, e) {
  if ( document.querySelectorAll(".bast_form_wrapper").length === 0 ) {
    let form_title = e.target.textContent;
    if (window.scriptData.title) {
      form_title = window.scriptData.title;
    }
    let fields = window.scriptData.fields;
    let fieldsname = window.scriptData.fieldsname;
    let innerfields = '';
    for (let i = 0; i < fields.length; i++) {
      switch (fields[i]) {
        case "text":
          innerfields += '<input type="' + fields[i] + '" class="field" style="' + window.scriptData.style_fields + '" placeholder="' + fieldsname[i] + '" />';
          break;
        case "textarea":
          innerfields += '<textarea class="field" style="' + window.scriptData.style_fields + '" placeholder="' + fieldsname[i] + '"></textarea>';
          break;
        case "checkbox":
          innerfields += '<label><input type="' + fields[i] + '"class="field" style="' + window.scriptData.style_fields + '" />' + fieldsname[i] + '</label>';
          break;
      }
    }
    let error_message = window.scriptData.error;
    let submit = window.scriptData.button;
    let formW = document.createElement("div");
    formW.classList.add("bast_form_wrapper");
    formW.setAttribute("style", window.scriptData.style_back);
    let form = document.createElement("div");
    form.classList.add("bast_form");
    form.setAttribute("style", window.scriptData.style_body);
    let btn = document.createElement("button");
    btn.classList.add("bast_form_submit");
    btn.setAttribute("style", window.scriptData.style_submit);
    btn.textContent = submit;
    btn.addEventListener("click", check_form);
    let btncls = document.createElement("button");
    btncls.classList.add("bast_form_close");
    btncls.textContent = "×";
    btncls.setAttribute("style", window.scriptData.style_closebtn);
    btncls.addEventListener("click", destroy_form);
    let inner = '<div class="bast_form_header" style="' + window.scriptData.style_header_header + '"><span class="bast_form_title" style="' + window.scriptData.style_header_text + '">' + form_title + '</span></div><div class="bast_form_body">' + innerfields + '<span class="bast_form_error" style="' + window.scriptData.style_error + '">' + error_message + '</span></div>';
    form.innerHTML = inner;
    form.appendChild(btn);
    form.appendChild(btncls);
    formW.appendChild(form);
    document.body.appendChild(formW);
    document.querySelector("html").style.overflowY = "hidden";
    let scrollWAft = document.documentElement.scrollWidth;
    let bodyMar = "0";
    if (scrollWBfr < scrollWAft) {
      let val = scrollWBfr - scrollWAft;
      bodyMar = "0 0 0 " + val / 2 + "px";
    }
    document.body.style.margin = bodyMar;
  }
}

function check_form() {
  let sendfields = [];
  let fieldsname = window.scriptData.fieldsname;
  let fields = document.querySelectorAll(".field");
  let errorVal = false;
  for (let i = 0; i < fields.length; i++) {
    console.log(fields[i].getAttribute("type"))
    if (fields[i].getAttribute("type") === "checkbox") {
      if (!fields[i].checked) errorVal = true;
    } else if (fields[i].getAttribute("type") === "tel" && fields[i].value.length < 17) {
      errorVal = true;
    }  else if (fields[i].value.length > 0) {
      sendfields.push(fieldsname[i] + ": " + fields[i].value);
    } else {
      errorVal = true;
    }
  }
return false;
  sendfields.info = {
    url: location.href,
    heading_title: $('title').text()
  }

  if (!errorVal) {
    send_form(sendfields);
  } else {
    document.querySelector(".bast_form_error").classList.add("show_error");
  }
}

function send_form(send) {
  $.post('index.php?route=extension/module/bastform/mail',
      {
        array: send
      },
      onAjaxSuccess
  );
  function onAjaxSuccess(data) {
    document.querySelector(".bast_form .bast_form_body").innerHTML = '<p style="font-size: 16px;">' + window.scriptData.success + '</p>';
    let btnS = document.querySelector(".bast_form .bast_form_submit");
    btnS.textContent = window.scriptData.btn_success;
    btnS.classList.add("bast_form_destroy");
    btnS.removeEventListener("click", check_form);
    btnS.classList.remove("bast_form_submit");
    document.querySelector(".bast_form .bast_form_destroy").addEventListener("click", destroy_form);
  }
}

function destroy_form() {
  document.querySelector(".bast_form_wrapper").remove();
  document.querySelector("html").style.overflowY = "auto";
  document.body.style.margin="0";
}
