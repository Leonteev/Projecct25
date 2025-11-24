document.addEventListener("DOMContentLoaded", begin_steaming);

window.addEventListener("resize", resize_streaming);

function begin_steaming() {
  if (window.innerWidth > 1023) {
    let appenderSelector = ".header-home";
    let banner = document.querySelector(".forcefullwidth_wrapper_tp_banner");
    let appender = document.querySelector(appenderSelector);
    if (banner) {
      let count = 0;
      let wrppr = document.createElement("div");
      wrppr.classList.add("steam_wrapper");
      appender.appendChild(wrppr);
      if (document.querySelector(".steam_wrapper")) {
        let steam_inval = setInterval(function() {
          count++;
          if (count > 11) {
            clearInterval(steam_inval);
          } else {
            let classAdd = "steam" + count;
            let steam = document.createElement("div");
            steam.classList.add(classAdd, "steam_background");
            wrppr.appendChild(steam);
          }
        }, 1000);
      }
    }
  }
}

function resize_streaming() {
  if (window.innerWidth < 1024) {
    let banner = document.querySelector(".forcefullwidth_wrapper_tp_banner");
    let wrppr = document.querySelector(".steam_wrapper");
    if (banner && wrppr) {
      wrppr.remove();
    }
  } else {
    if (!document.querySelector(".steam_wrapper")) {
      
      begin_steaming();
    }
  }
}
