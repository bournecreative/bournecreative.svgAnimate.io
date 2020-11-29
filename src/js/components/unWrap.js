import ScrollMagic from "scrollmagic/scrollmagic/uncompressed/ScrollMagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import TweenMax from "gsap/src/uncompressed/TweenMax";


export default function () {
    if (window.innerWidth > 767) {
        initScrollMagic();
    }
}

function initScrollMagic() {
    var numOfRows = document.querySelectorAll('.row'),
        controller = new ScrollMagic.Controller();
    setClipPath()

    for (var i = 0; i < numOfRows.length; i++) {
        var thisRow = document.querySelectorAll("[data-row='" + i + "']")
        addScene(thisRow)
    }

    function addScene(thisRow) {
        var currentRow = Array.prototype.slice.call(thisRow)[0],
            outer = currentRow.querySelectorAll('.outer'),
            inner = currentRow.querySelectorAll('.inner'),
            outerCirc = currentRow.querySelectorAll('.outer-circ'),
            innerCirc = currentRow.querySelectorAll('.inner-circ'),
            lowerTrees = currentRow.querySelectorAll('.lower-trees'),
            upperTrees = currentRow.querySelectorAll('.upper-trees'),
            cover = currentRow.querySelectorAll('.cover'),
            background1 = currentRow.querySelectorAll('.background100'),
            background2 = currentRow.querySelectorAll('.background65'),
            fadeOutTL = new TimelineMax(),

            scene = new ScrollMagic.Scene({
                triggerElement: thisRow,
                offset: 0,
                triggerHook: .6
            })
                // .on("enter", setIndex)
                .on("leave", reverseIndex)
                .setTween(fadeOutTL)
                .addTo(controller)

        fadeOutTL
            .to(cover, 1.20, { attr: { r: 0 }, ease: Power1.easeIn })
            .to(innerCirc, 0.5, { autoAlpha: 0, ease: Power2.easeInOut }, "-=.5")
            .to(inner, 0.8, { rotation: -30, transformOrigin: "50% 50%", ease: Power2.easeInOut }, "-=.2")
            .to(outerCirc, 0.5, { rotation: 60, transformOrigin: "50% 50%", scale: 1.2, ease: Power2.easeInOut }, "-=1")
            .to(outerCirc, 0.3, { scale: 0, transformOrigin: "50% 50%", ease: Power2.easeInOut }, "-=.50")
            .to(lowerTrees, 0.5, { scale: 0, transformOrigin: "center center", ease: Power2.easeInOut }, "-=.70")
            .to(upperTrees, 0.5, { scale: 0, transformOrigin: "50% 50%", ease: Power2.easeInOut }, "-=.50")
            .to(background1, 0.5, { autoAlpha: 0, transformOrigin: 'center', ease: Power2.easeInOut }, "-=0.75")
            .to(background2, 0.5, { autoAlpha: 0, transformOrigin: 'center', ease: Power2.easeInOut, onComplete: setIndex }, "-=0.75")
        return fadeOutTL

        function setIndex(e) {
            const ele = currentRow
            ele.classList.add('animate')
        }

        function reverseIndex(e) {
            const ele = e.target.triggerElement();
            if (e.scrollDirection === "REVERSE") {
                ele.classList.remove('animate')
            }
        }
    }
}


function setClipPath() {
    var clipPathTL = new TimelineMax(),
        data = document.querySelector(".outer").getBBox();

    clipPathTL
        .set(".cover", {
            attr: {
                cx: data.x + data.width / 2,
                cy: data.y + data.height / 2,
                r: figureRadius(data.width, data.height)
            }
        })
    return clipPathTL
}

function figureRadius(w, h) {
    return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
}