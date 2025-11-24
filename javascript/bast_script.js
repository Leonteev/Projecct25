document.addEventListener("DOMContentLoaded", function (event) {
    questions();
    slick_slider();
    tabs();
    parts();
    phoneMask('+380 ', "input[type=tel]");
    get_form();
    make_links();

    setTimeout(() => {
        document.querySelectorAll('a[href="#сall_meter"]').forEach(link => {
            const anchor = link.getAttribute('href').replace('#', ''),
                blockPosition = document.querySelector('a[name="' + anchor + '"]').offsetTop

            link.addEventListener('click', function (e) {
                e.preventDefault()

                window.scroll({
                    top: blockPosition,
                    behavior: 'smooth'
                });
            })

            document.querySelectorAll('.info-select-call').forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault()

                    window.scroll({
                        top: blockPosition,
                        behavior: 'smooth'
                    });
                })
            })

        })
    }, 600)

    let slides = document.querySelectorAll(".calculator_slider-slide");
    let slidesSelect = document.querySelectorAll(".calculator_slide-select");
    let checkSystems = document.querySelectorAll(".check_system");
    let blockSystems = document.querySelectorAll(".block_system");
    blockSystems.length ? blockSystems[0].style.display = "block" : false
    slidesSelect.forEach(select => {
        select.addEventListener("click", function () {
            slidesSelect.forEach(sel => {
                sel.classList.remove('selected');
            });
            select.classList.add('selected');
            slides.forEach(slide => {
                slide.style.display = "none";
            });
            let selected_slide = this.getAttribute("slide");
            document.querySelector('#' + selected_slide).style.display = "flex";
            document.querySelector('#' + selected_slide + ' .block_system').style.display = "block";
            setSizeToRange(document.querySelector('#' + selected_slide));
        })
    });
    checkSystems.forEach(check => {
        check.addEventListener("click", function () {
            blockSystems.forEach(blockSys => {
                blockSys.style.display = 'none';
            });
            let systemID = 'system_' + check.getAttribute("system");
            document.querySelector("#" + systemID).style.display = 'block';
        });
    });
    custom_range();
    let img = slides.length ? slides[0].querySelector(".calculator_slider_slide_left-image_wrapper img") : false;

    img && img.addEventListener("load", function() {
        setSizeToRange(slides[0]);
        let height_inputs = document.querySelectorAll(".height_input");
        let width_inputs = document.querySelectorAll(".width_input");
    });

});

function questions() {
    let questionTitle = document.querySelectorAll(".often_question-title");
    questionTitle.forEach(title => {
        title.addEventListener("click", function () {
            // let t = this;
            // questionTitle.forEach(title1 => {
                // if (title1 != t) {
                  // title1.classList.remove("minus");
                  // title1.parentNode.querySelector(".often_question-answer").classList.remove("show");
                // }
            // });
            this.classList.toggle("minus");
            this.parentNode.querySelector(".often_question-answer").classList.toggle("show");
            // if (this.classList.contains("minus")) {
              // this.scrollIntoView({behavior: "smooth"});
            // }
        });
    });
}

function slick_slider() {
    jQuery('.slider_home-block').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        prevArrow: $(''),
        nextArrow: $('.slider_home-next'),
    });
}

function tabs() {
    let select_tabs = document.querySelectorAll(".select_tab");
    select_tabs.forEach(elem => {
        elem.addEventListener("click", () => do_tabs(event));
    });
}

function do_tabs(event) {
    let elem = event.target;
    let allSelects = elem.parentNode.querySelectorAll(".select_tab");
    allSelects.forEach(select => {
        select.style.color = "#ACBFE6";
    });
    elem.style.color = "#fff";
    let tabE = elem.getAttribute("tab");
    let parent = event.target.closest('.html-module');
    let tabs = parent.querySelectorAll(".tabs");
    let tabBN = 1;
    tabs.forEach((tab, indx) => {
        tab.style.display = "none";
        let tabB = tab.getAttribute("tab");
        if (tabB === tabE) {
            tabBN = indx++;
        }
    });
    tabs[tabBN].style.display = "flex";
}

function parts() {
    let select_tabs = document.querySelectorAll(".parts_tab");
    select_tabs.forEach(elem => {
        elem.addEventListener("click", function (e) {
            let elem = event.target;
            let allSelects = elem.parentNode.querySelectorAll(".parts_tab");
            allSelects.forEach(select => {
                select.style.color = "#ACBFE6";
            });
            elem.style.color = "#182978";
            let tabE = elem.getAttribute("tab");
            let parent = event.target.closest('.html-module');
            let tabs = parent.querySelectorAll(".what_window-tabswrapper");
            let tabBN = 1;
            tabs.forEach((tab, indx) => {
                tab.style.display = "none";
                let tabB = tab.getAttribute("tab");
                if (tabB === tabE) {
                    tabBN = indx++;
                }
            });
            tabs[tabBN].style.display = "block";
        });
    });

}

function phoneMask(number, query) {
    number = String(number);
    let phoneInputs = document.querySelectorAll(query);
    phoneInputs.forEach(function (phoneInput) {
        if (phoneInput) {
            if (phoneInput.getAttribute("type") != "tel") {
                phoneInput.setAttribute("type", "tel")
            }
            phoneInput.value = number;
            phoneInput.addEventListener("keydown", function (event) {
                phoneInput.oninput = e => {
                    if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9 && number.length < 17) {
                        keyDown = String(event.key);
                        switch (number.length) {
                            case 7:
                                number = number + ' ' + keyDown;
                                break;
                            case 11:
                                number = number + '-' + keyDown;
                                break;
                            case 14:
                                number = number + '-' + keyDown;
                                break;
                            default:
                                number = number + keyDown;
                        }
                    } else if (event.key === 'Backspace' && number.length > 5) {
                        switch (number.length) {
                            case 16:
                                number = number.slice(0, number.length - 2);
                                break;
                            case 13:
                                number = number.slice(0, number.length - 2);
                                break;
                            case 9:
                                number = number.slice(0, number.length - 2);
                                break;
                            default:
                                number = number.slice(0, number.length - 1);
                        }
                    }
                    e.target.value = number;
                }
            });
        }
    });
}

function get_form() {
    let requiredPhone = false;
    let submits = document.querySelectorAll(".form_btn");

    submits.forEach(btn => {
        btn.addEventListener("click", function (e) {
            let sendMessage = '';
            let form = e.target.closest(".send_form");
            let inputs = form.querySelectorAll('input:not([type="hidden"]), textarea');
            let file = false

            inputs.forEach(input => { 
                if (input.tagName.toLowerCase() == 'textarea' || (input.getAttribute('type') != 'tel' && input.getAttribute('type') != 'file')) {
                    let info = input.getAttribute("info");
                    let value = input.value;
                    sendMessage += '<p>' + info + ': ' + value + '</p>';
                } else if(input.getAttribute('type') === 'file') {
                    if (input.files.length > 0) {
                        file = input.files[0]
                    }
                } else {
                    if (input.value.length < 17) {
                        requiredPhone = true;
                        const error_message = form.querySelector('.form__error') ? form.querySelector('.form__error').value : document.querySelector('.form__error').value
                        showMessage(error_message);
                    } else {
                        let info = input.getAttribute("info");
                        let value = input.value;
                        sendMessage += '<p>' + info + ': ' + value + '</p>';
                        requiredPhone = false;
                    }
                }
            });

            let $form = $(form),
                title = e.target.textContent,
                name = $form.find('.form-name').val() ?? '',
                phone = $form.find('.form-phone').val() ?? $form.find('[type="tel"]').val(),
                sendData = {title, name, phone},
                comments = '';
                
            let $address = $form.find('.form-address');
            if($address.length) {
                let address = $address.val();
                sendData['address'] = address;
                comments += `Адрес: ${address}<br /><br />`;
            }
            
            let $date = $form.find('.form-date');
            if($date.length) {
                let date = $date.val();
                comments += `Дата: ${date}<br /><br />`;
            }
            
            let $form_comments = $form.find('.form-comments');
            if($form_comments.length) {
                let form_comments = $form_comments.val();
                comments += `Комментарий: ${form_comments}<br /><br />`;
            }
            
            let page_title = document.title,
                page_url = location.href;
            comments += `Страница: <a href="${page_url}">${page_title}</a><br /><br />`;
            
            sendData['comments'] = comments;
                    
            if (!requiredPhone) {
                sendToB24(sendData)
                form_send(title, sendMessage, file, 'form@market-vikna.com.ua');
                
                dataLayer.push({
                  'event': 'form-modal-Submit',
                  'leadsUserData': {
                    'phone_number': phone.replace(/[ \-()]/g,'') // передаємо динамічно телефон клієнта
                  }
                });

            }
        });
    });
}
function checkFileSize(fileInput) {
    $(fileInput).parent().find('.preview').remove()
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileSize = fileInput.files[0].size; // Size in bytes
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
        if (fileSize > maxSizeInBytes) {
            alert('File size exceeds the limit of 10MB.');
            fileInput.value = ''; // Clear the file input
        }

        const fileType = file.type;
        const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
        if (!supportedTypes.includes(fileType)) {
            return; // Stop processing if file type not supported
        }

// Create a preview element based on file type
        let previewElement;
        if (fileType.startsWith('image/')) {
            previewElement = $('<img>').attr('src', URL.createObjectURL(file));
        } else if (fileType.startsWith('video/')) {
            previewElement = $('<video>').attr('src', URL.createObjectURL(file)).attr('controls', true);
        }

// Wrap the preview element in a div
        const previewDiv = $('<div class="preview"></div>').append(previewElement);

// Display the preview element
        $(fileInput).after(previewDiv);
    }
}
function form_send(subject, message, file = false, from) {
    const formData = new FormData()

    formData.append('sendMail', true)
    formData.append('file', file)
    formData.append('mailsubject', subject)
    formData.append('mailmessage', message)
    formData.append('mailfrom', from)
    formData.append('url', location.href)
    formData.append('heading_title', $('title').text())

    $.ajax({
        url: "index.php?route=mail/form",
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: onAjaxSuccess
    });

    function onAjaxSuccess(data) {
        showMessage(data);
    }
}

function sendToB24(sendData) {
    let _gaid = getCookie("_ga");
    let gaid = "NODATA";
    if (_gaid) gaid = _gaid.slice(6);
    sendData['gaid'] = gaid;
    $.post("/catalog/controller/b24forms/sendformb24.php",
        sendData,
        onAjaxSuccess
    );
    function onAjaxSuccess(data) {

    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function showMessage(data) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("modal_message-wrapper");
    let modal = document.createElement("div");
    modal.classList.add("modal_message");
    let closeBtn = document.createElement("button")
    closeBtn.classList.add("modal_message-close");
    closeBtn.textContent = '×';
    let message = "<p>" + data + "</p>";
    modal.innerHTML = message;
    modal.appendChild(closeBtn);
    wrapper.appendChild(modal);
    document.body.appendChild(wrapper);
    wrapper.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal_message-wrapper")) {
            wrapper.remove();
        }
    });
    closeBtn.addEventListener("click", function () {
        wrapper.remove();
    });
}

/**
 * Function to make tabulation
 *
 * @params tabsBtn — class of select tabs btb, tabs — class of tabs
 *
 * @return void
 *
 */
function tabsThree(tabsBtn, tabs, tabN = false) {
    let selTabs = document.querySelectorAll(tabsBtn);
    selTabs.forEach(selectTab => {
        if (tabsBtn === '.brands_tab') {
            let modelTabs = document.querySelectorAll('.models_tab');
            modelTabs.forEach(tabElem => {
                tabElem.classList.add('hide');
                if (tabElem.getAttribute('brand') === '0') {
                    tabElem.classList.remove('hide');
                }
            });
            let modelTabsT = document.querySelectorAll('.models_tab2');
            modelTabsT.forEach(tabElem => {
                tabElem.classList.add('hide');
                if (tabElem.getAttribute('brand') === '0') {
                    tabElem.classList.remove('hide');
                }
            });
        }
        selectTab.addEventListener("click", function (e) {
            let selectedTab = this.getAttribute('tab');
            let tabsWrappers = document.querySelectorAll(tabs);
            if (tabsBtn === '.brands_tab') {
                let modelTabs = document.querySelectorAll('.models_tab');
                modelTabs.forEach(tabElem => {
                    tabElem.classList.add('hide');
                    tabElem.classList.remove('selected');
                    if (tabElem.getAttribute('brand') === selectedTab) {
                        if (tabElem.getAttribute('tab') === '0') {
                            tabElem.classList.add('selected');
                        }
                        tabElem.classList.remove('hide');
                    }
                });
                document.querySelectorAll('.what_window-info').forEach(item => {
                    item.classList.add('hide')
                    if (item.getAttribute('tab') == 0) {
                        item.classList.remove('hide')
                    }
                })
            }
            tabsWrappers.forEach(tab => {
                tab.classList.add('hide');
                let tabN = tab.getAttribute('tab');
                if (tabN === selectedTab) {
                    tab.classList.remove('hide');
                    selTabs.forEach(selected => {
                        selected.classList.remove('selected')
                    });
                    e.target.classList.add('selected');
                }
            });
        })
    });
    country();
}

function country() {
    let selectCountry = document.querySelectorAll(".select_country");
    selectCountry.forEach(country => {
        country.addEventListener("click", function (e) {

            switch (e.target.classList[0]) {
                case 'ukraine':
                    e.target.classList.add("selected");
                    document.querySelector(".europe").classList.remove("selected");
                    document.querySelector(".country_ua").classList.remove('hide');
                    document.querySelector(".country_eu").classList.add('hide');
                    break;
                case 'europe':
                    e.target.classList.add("selected");
                    document.querySelector(".ukraine").classList.remove("selected");
                    document.querySelector(".country_eu").classList.remove('hide');
                    document.querySelector(".country_ua").classList.add('hide');
                    break;

                default:
                    break;
            }
        });
    });
}

function make_links() {
    let dropLinks = document.querySelectorAll("#horizontal-menu").length ? document.querySelectorAll("#horizontal-menu")[1].querySelector(".navbar-nav").querySelectorAll(".dropdown-toggle") : false;
    if (dropLinks) {
        dropLinks.forEach(link => {
            link.addEventListener("click", function () {
                location.href = link.getAttribute("href");
            });
        });
    }
}

function showForm(title, fields, parent, submitText = '') {
    let wrapper = document.createElement("div");
    wrapper.classList.add("modal_message-wrapper");
    let modal = document.createElement("div");
    modal.classList.add("modal_message");
    let closeBtn = document.createElement("button")
    closeBtn.classList.add("modal_message-close");
    closeBtn.textContent = '×';
    let textBlock = '<div class="modal_message-title">' + title + '</div>';
    let mailSend = '<p>' + title + '</p>';
    if (parent) {
        let infoSelect = parent.parentNode.parentNode.querySelector(".info-select").querySelectorAll(".info-select-one");
        let checked = '';
        infoSelect.forEach(element => {
            let check = element.querySelector("input:checked");
            if (check) {
                checked = element.querySelector("input").parentNode.querySelector("label").textContent;
            }
        });
        textBlock += '<p>' + checked + '</p>';
        mailSend += '<p>' + checked + '</p>';

    }
    let fieldBody = document.createElement("div");
    fieldBody.classList.add("modal_message-body");
    fields.forEach(field => {
        switch (field) {
            case "phone":
                let input = document.createElement("input");
                input.type = 'tel';
                input.classList.add("modal_message-phone");
                fieldBody.appendChild(input);
                break;

            default:
                break;
        }
    });
    let submit = document.createElement("button");
    submit.classList.add("modal_message-submit");
    submit.textContent = parent ? parent.textContent : submitText;
    modal.innerHTML = textBlock;
    modal.appendChild(fieldBody);
    modal.appendChild(submit);
    modal.appendChild(closeBtn);
    wrapper.appendChild(modal);
    document.body.appendChild(wrapper);
    wrapper.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal_message-wrapper")) {
            wrapper.remove();
        }
    });
    closeBtn.addEventListener("click", function () {
        wrapper.remove();
    });
    phoneMask('+380 ', "input[type=tel]");
    textBlock += '<p>' + document.querySelector(".modal_message-body input").value + '</p>';
    submit.addEventListener("click", function () {
        mailSend += '<p>' + document.querySelector(".modal_message-body input").value + '</p>';

        if (modal.querySelector('.modal_message-phone').value.length < 17) {
            showMessage(document.querySelector('.form__error').value);
        } else {
            form_send(modal.querySelector('.modal_message-title').innerHTML, mailSend, 'form@market-vikna.com.ua');
        }
        wrapper.remove();
    });
}

function custom_range() {
    let ranges = document.querySelectorAll(".custom_range-wrapper");
    ranges.forEach(range => {
        let track = range.querySelector(".custom_range-track");
        let from = track.getAttribute('from');
        let to = track.getAttribute('to');
        let position = track.getAttribute('position');
        let slider = track.querySelector(".custom_range-slider");
        slider.addEventListener("mousedown", function(event) {
            document.addEventListener("mousemove", moveSlider);
            document.rect = event.target.getBoundingClientRect();
            document.elem = slider;
            document.range = range;
            document.from = from;
            document.to = to;
            document.position = position;
        });
        document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", moveSlider);
        });
    });

    function moveSlider(event) {
        let elem = event.currentTarget.elem;
        let from = parseInt(event.currentTarget.from);
        let to = parseInt(event.currentTarget.to);
        let position = parseInt(event.currentTarget.position);
        let parentRect = elem.parentNode.getBoundingClientRect();
        let parentLeft = parentRect.left;
        let parentRight = parentRect.right;
        let parentTop = parentRect.top;
        let parentBottom = parentRect.bottom;
        let parentWidth = parentRect.width;
        let parentHeight = parentRect.height;
        let appender = elem.querySelector("p");
        let interval = to - from;
        let fieldID = elem.getAttribute("input_id");
        if (event.currentTarget.range.classList.contains('horizontal_range')) {
            let elemLeft = event.clientX - parentLeft;
            if (elemLeft >= 0 && elemLeft <= parentRight - parentLeft - 17) {
                if (elemLeft < 1) {
                    elemLeft = 0;
                }
                if (elemLeft + 2 > parentRight - parentLeft - 17) {
                    elemLeft = parentRight - parentLeft - 17;
                }
                elem.style.left = elemLeft + 'px';
                let step =  interval / (parentWidth - 17);
                let position = from + Math.round(step * elemLeft);
                appender.textContent = position;
                document.querySelector('#' + fieldID).value = position;
            }
        } else {
            let elemBottom = parentBottom - event.clientY;
            if (elemBottom >= 0 && elemBottom <= parentBottom - parentTop - 17) {
                if (elemBottom < 1) {
                    elemBottom = 0;
                }
                if (elemBottom + 2 > parentBottom - parentTop - 17) {
                    elemBottom = parentBottom - parentTop - 17;
                }
                elem.style.bottom = elemBottom + 'px';
                let step =  interval / (parentHeight - 17);
                let position = from + Math.round(step * elemBottom);
                appender.textContent = position;
                document.querySelector('#' + fieldID).value = position;
            }
        }
    }
}
//moveSliderTo('height_window-1', 'h', 200)

function moveSliderTo(sliderID, direction, elem) {
    let ranges = document.querySelectorAll('.custom_range-wrapper');
    ranges.forEach(range => {
        let slider = range.querySelector('.custom_range-slider');

        let min = elem.getAttribute('min');
        let max = elem.getAttribute('max');
        let interval = max - min;
        let step = 0;
        if (parseInt(elem.value) < parseInt(min)) {
            elem.value = min;
        } else if (parseInt(elem.value) > parseInt(max)) {
            elem.value = max;
        }
        if (slider.getAttribute('input_id') === sliderID) {

            if (direction === 'v') {
                step =  interval / (slider.parentNode.getBoundingClientRect().width - 17);
            } else {
                step =  interval / (slider.parentNode.getBoundingClientRect().height - 17);
            }
            if (direction === 'v') {
                slider.style.left = ((elem.value - min) / step) + 'px';
            } else {
                slider.style.bottom = ((elem.value - min) / step) + 'px';
            }
        }
    });
}

function setSizeToRange(slide) {
    let img = slide.querySelector(".calculator_slider_slide_left-image_wrapper img");
    let imgSize = img.getBoundingClientRect();
    let bottomTrack = slide.querySelector(".calculator_slider_slide_left-image_wrapper-bottom .custom_range-track");
    let rightTrack = slide.querySelector(".calculator_slider_slide_left-image_wrapper-right .custom_range-track");
    let topTrack = slide.querySelector(".calculator_slider_slide_left-image_wrapper-top .custom_range-track");
    let leftTrack = slide.querySelector(".calculator_slider_slide_left-image_wrapper-left .custom_range-track");
    let percentsBottom = bottomTrack ? bottomTrack.getAttribute("data-max") : 100;
    let percentsRight = rightTrack ? rightTrack.getAttribute("data-max") : 100;
    let percentsTop = topTrack ? topTrack.getAttribute("data-max") : 100;
    let percentsLeft = leftTrack ? leftTrack.getAttribute("data-max") : 100;
    bottomTrack.style.width = (imgSize.width / 100) * percentsBottom + 'px';
    rightTrack.style.height = (imgSize.height / 100) * percentsRight + 'px';
    if (topTrack) topTrack.style.width = (imgSize.width / 100) * percentsTop + 'px';
    if (leftTrack) leftTrack.style.height = (imgSize.height / 100) * percentsLeft + 'px';
}