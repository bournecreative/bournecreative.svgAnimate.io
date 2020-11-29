import { svgfile } from "./svgfile"

export default function () {
    // need screen width to determine number of square to fill width
    var windowWidth = window.innerWidth,
        // target tag for injection
        target = document.querySelector('main'),
        // gather all sections to determine height of page content
        pageSections = document.querySelectorAll('.htmlscript .section'),
        // create container divs to house SVGs
        svgContainer = document.createElement('div'),
        patterns = document.createElement('div'),
        heroSVGContainer = document.createElement('div');
    svgContainer.classList.add('svg-contain');
    patterns.classList.add('patterns');

    target.insertBefore(svgContainer, target.firstChild);
    svgContainer.insertBefore(patterns, svgContainer.firstChild);

    if (window.innerWidth > 767) {
        // determie number of SVGs needed to fill width - round up and add 1 now that we need to offset odd rows to make a pattern
        var SVG_xAxis = Math.ceil((windowWidth / 404)) + 1,
            // We center the number of SVGs but need to offset this by the difference in number of SVGs created vs screen width
            offset = (windowWidth - (SVG_xAxis * 404)),
            // determine the total number of SVGs to create
            totalSVG = SVG_xAxis * Math.ceil((getDocumentHeight(pageSections)) / (276 - 70));
        // set width of pattern container and offset
        patterns.style.width = SVG_xAxis * 404 + "px";
        patterns.style.marginLeft = (offset / 2) + "px";
        patterns.style.height = (getDocumentHeight(pageSections)) + "px";
        SVGfactory(totalSVG)
    }

    // determine the height of the homepage content section
    function getDocumentHeight(sections) {
        var totalHeight = 0;
        for (var i = 0; i < sections.length; i++) {
            totalHeight += sections[i].offsetHeight + 1
        }
        return totalHeight;
    }

    // svg factory that tags svgs with index and group ID
    function SVGfactory(num) {
        var counter = 0,
            groupID = 0;
        createRowWrapper(groupID)
        for (var i = 0; i < num; i++) {
            if (counter < SVG_xAxis) {
                counter++
            } else {
                counter = 1;
                groupID++
                createRowWrapper(groupID)
            }
            (function (j, gID) {
                return createSVG(j, gID)
            }(i, groupID))
        }
    }

    function createRowWrapper(gID) {
        var target = document.querySelector('.patterns')
        var rowWrapper = document.createElement('div')
        rowWrapper.classList.add('row' + gID)
        rowWrapper.classList.add('row')
        rowWrapper.setAttribute('data-row', gID)
        target.insertBefore(rowWrapper, target.nextSibling)
    }

    // actually creates the SVG and sets element data attributes and classes needed for positioning and scroll magic
    function createSVG(index, gID) {
        var target = document.querySelector('.row' + gID)
        var SVG = document.createElement('div')
        SVG.classList.add('decoration')
        SVG.setAttribute('data-index', index)
        SVG.setAttribute('data-group', gID)
        if (gID % 2 !== 0) {
            SVG.classList.add('odd-row')
        } else {
            SVG.classList.add('even-row')
        }
        SVG.innerHTML = svgfile(gID)
        target.insertBefore(SVG, target.nextSibling)
    }
}




