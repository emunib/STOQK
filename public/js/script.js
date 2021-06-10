var scrolling = false;  // flag to determine if scrolling

$.extend($.scrollTo.defaults, {  // default settings for scrollTo
    axis: 'x',
    duration: 500,
    onAfter: function () {  // after scrolling animation completes
        scrolling = false;
    }
});

function scrollToEl(el) {
    if ($(el).length > 0 && !scrolling) {  // the element exist and not already scrolling
        scrolling = true;
        $('.wrapper').scrollTo($(el));
    }
}

function relativePos(el) {
    var container = $(el).parent();
    var contWidth = container.width();

    var elemLeft = $(el).offset().left - container.offset().left;  // left position relative to parent container
    var elemRight = elemLeft + $(el).width();  // right position relative to parent container

    if (elemRight <= 0) {  // element is offscreen to the left
        return -1;
    } else if (
        elemLeft > contWidth) {  // element is offscreen to the right
        return 1;
    } else {
        return 0;  // element is partially or fully in view
    }
}

$(document).ready(function () {
    $('.wrapper').scroll(function () {
        var current = $('.current');  // currently active element
        var relPos = relativePos(current);  // position of active element relative to parent
        var target;  // new active element

        if (relPos > 0) {  // element is offscreen to the right
            target = current.next('img');  // adjacent left element is visible
        } else if (relPos < 0) {  // element is offscreen to the right
            target = current.prev('img');  // adjacent right element is visible
        }

        if (target) {  // if there is an adjacent element make it the active element
            current.removeClass('current');
            target.addClass('current');
        }
    });

    $(document).keydown(function (e) {
        console.log(scrolling);
        switch (e.key) {
            case "ArrowLeft":
                scrollToEl($('.current').next('img'));
                break;
            case "ArrowRight":
                scrollToEl($('.current').prev('img'));
                break;
        }
    });
});