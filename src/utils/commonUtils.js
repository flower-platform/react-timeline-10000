import {GRID_LEFT_BORDER} from '../timeline';

let cachedVerticalScrollbarGutterWidth;
let cachedVerticalScrollbarGutterKey;

/**
 * Add int pixels to a css style (left or top generally)
 * @param  {string} style Style string in css format
 * @param  {number} diff The pixels to add/subtract
 * @returns {string} Style as string for css use
 */
export function sumStyle(style, diff) {
  return intToPix(pixToInt(style) + diff);
}

/**
 * Converts a pixel string to an int
 * @param  {string} pix Pixel string
 * @return {number} Integer value of the pixel string
 */
export function pixToInt(pix) {
  return parseInt(pix.replace('px', ''));
}

/**
 * Convert integer to pixel string.
 * If not an integer the input is returned as is
 * @param  {number} int Integer value
 * @returns {string} Pixel string
 */
export function intToPix(int) {
  if (int === Number(int)) return int + 'px';
  return int;
}

/**
 * Returns a unique cache key based on the current screen zoom level and pixel density
 * (`devicePixelRatio` and `visualViewport.scale`). This ensures that if the user zooms
 * in or out, the scrollbar gutter width is re-measured accurately instead of incorrect
 * data being returned from the cache.
 *
 * - `devicePixelRatio` - physical zoom level
 * - `visualViewport.scale` - user initiated zoom (e.g., Ctrl + / Ctrl - in the browser)
 *
 * @returns {string} Cache key in the format "devicePixelRatio:visualViewportScale"
 */
function verticalScrollbarGutterCacheKey() {
  if (typeof window === 'undefined') {
    return '0:1';
  }
  const devicePixelRatio = window.devicePixelRatio || 1;
  const viewportScale = window.visualViewport ? window.visualViewport.scale : 1;
  return devicePixelRatio + ':' + viewportScale;
}

/**
 * Measures and returns the width of the vertical scrollbar gutter on the Gantt grid.
 *
 * * We rely on:
 * 1. `.ReactVirtualized__Grid::-webkit-scrollbar { width: 10px }` - see comment in `style.css`.
 * If we don't set this, the browsers that accept -webkit-scrollbar (e.g., Chrome) will use the default
 * width (e.g, 15px) and this value will be cached, which is incorrect. The scrollbar width will change
 * after all the styles are applied, so we need to ensure that the correct width is cached.
 * 2. `scrollbar-gutter: stable` to ensure this space is always reserved in the layout (even when the
 * scrollbar does not appear) allowing us to accurately measure its exact width via
 * `offsetWidth - clientWidth` (offsetWidth includes the scrollbar, clientWidth does not).
 *
 * `offsetWidth - clientWidth` includes the 1px left border of `.rct9k-grid`; that pixel is subtracted.
 * Cached per zoom (`devicePixelRatio` + `visualViewport.scale`) because in some browsers (e.g., Firefox)
 * the scrollbar width can change with zoom. 0 is not cached (grid not rendered yet).
 *
 * @param {HTMLElement} [gridDomNode]
 * @returns {number}
 */
export function getVerticalScrollbarGutterWidth(gridDomNode) {
  const key = verticalScrollbarGutterCacheKey();
  if (cachedVerticalScrollbarGutterWidth != null && cachedVerticalScrollbarGutterKey === key) {
    return cachedVerticalScrollbarGutterWidth;
  }
  if (!gridDomNode || !gridDomNode.offsetWidth) {
    return 0;
  }
  const width = Math.max(0, gridDomNode.offsetWidth - gridDomNode.clientWidth - GRID_LEFT_BORDER);
  if (width === 0) {
    return 0;
  }
  cachedVerticalScrollbarGutterWidth = width;
  cachedVerticalScrollbarGutterKey = key;
  return width;
}
