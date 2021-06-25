var scrolling = false;  // flag to determine if scrolling

function scrollToEl(el) {
    if ($(el).length > 0 && !scrolling) {  // the element exist and not already scrolling
        scrolling = true;
        $('.slides-wrapper').scrollTo($(el), {
            axis: 'x',
            duration: 500,
            offset: {top: 0, left: -$(el).parent().width()},
            over: {top: 0, left: 1},
            onAfter: function (el) {  // after scrolling animation completes
                scrolling = false;
                $('.current').removeClass('current');  // make the target element active
                $(el).addClass('current');
            }
        });
    }
}

// TODO make barriers % based on width rather than a fixed 200px
function relativePos(el) {
    var container = $(el).parent();
    var contWidth = container.width();

    var elemLeft = $(el).offset().left - container.offset().left;  // left position relative to parent container
    var elemRight = elemLeft + $(el).width();  // right position relative to parent container

    if (elemRight <= 200) {  // element is offscreen to the left
        return -1;
    } else if (
        elemLeft > contWidth - 200) {  // element is offscreen to the right
        return 1;
    } else {
        return 0;  // element is partially or fully in view
    }
}

function approxEq(v1, v2, epsilon = 0.001) {
    return Math.abs(v1 - v2) <= epsilon;
}

$(document).ready(function () {
    var $chapterSelect = $('#chapter-select');

    // initialize chapter select
    $chapterSelect.select2({
        theme: 'bootstrap4',
        width: '120px',
        placeholder: 'Choose a chapter',
        dropdownParent: $('#chapter-group')
    });

    // on selecting a chapter navigate to the appropriate page
    $chapterSelect.on('select2:selecting', function (e) {
        window.location.pathname = e.params.args.data.id;
    });

    var $slidesWrapper = $('.slides-wrapper');
    var $content = $('.content');

    $slidesWrapper.hScroll(40);  // make slides scrollable horizontally via mousewheel

    $slidesWrapper.scroll(function () {
        var current = $('.current');  // currently active element
        var relPos = relativePos(current);  // position of active element relative to parent
        var target;  // new active element

        if (approxEq($slidesWrapper.scrollLeft(), 0, 5)) {
            target = current.parent().children().first();
        } else if (approxEq(-$slidesWrapper.scrollLeft(), $slidesWrapper[0].scrollWidth - $slidesWrapper.width(), 5)) {
            target = current.parent().children().last();
        } else if (relPos > 0) {  // element is offscreen to the right
            target = current.next('.slide');  // adjacent left element is visible
        } else if (relPos < 0) {  // element is offscreen to the right
            target = current.prev('.slide');  // adjacent right element is visible
        }

        if (target) {  // if there is an adjacent element make it the active element
            current.removeClass('current');
            target.addClass('current');
        }
    });

    bindDragScroll($content, $slidesWrapper);

    $(document).keydown(function (e) {
        switch (e.key) {
            case "ArrowLeft":
                scrollToEl($('.current').next('.slide'));
                break;
            case "ArrowRight":
                scrollToEl($('.current').prev('.slide'));
                break;
        }
    });
});