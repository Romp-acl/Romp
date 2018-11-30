$('.hero button').on('click', function(){$('.loginSignup').toggleClass('active')});

$('.heroTabs').on('click', tabSwitcher);

function tabSwitcher(e) {
 var target = e.target.dataset.name;
    $('.credentialsForm').hide();
    $(`.credentialsForm[data-name='${target}']`).show();

 console.log(e.target);

}

function loadFNs() {
    $('.credentialsForm').first().next().hide();
}
window.addEventListener('load', loadFNs);