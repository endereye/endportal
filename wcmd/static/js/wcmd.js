const wcmd = (url) => $(document).ready(() => {
    const paragraphs = (succ, cmd, txt) =>
        `<p class="command ${succ ? 'success' : 'failed'}">${cmd}</p>
         <p><span>&nbsp;</span>${txt.replace(/\n/g, '</p><p><span>&nbsp;</span>')}</p>`;
    const switchBtnState = () => {
        const btn = $('form button'), classes = 'spinner-border spinner-border-sm';
        btn[0].hasAttribute('disabled')
            ? btn.removeAttr('disabled').html(btn.children('.sr-only').html())
            : btn.attr('disabled', 'disabled')
                .html(`<span class="${classes}"></span><span class="sr-only">${btn.html()}</span>`);
    };
    $('form').submit((evt) => {
        evt.preventDefault();
        const command = $('input[name=_]').val().trim();
        switchBtnState();
        $.post(url, $('form').serializeArray(), (resp) => {
            switchBtnState();
            $(paragraphs(true, command, resp)).prependTo($('.response'));
        }).fail((resp) => {
            switchBtnState();
            $(paragraphs(false, command, resp.responseText || 'Network failed.')).prependTo($('.response'));
        });
    });
});
