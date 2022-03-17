import React from 'react';
import PropTypes from 'prop-types';
const Color = require('color');

const DEFAULT_ITEM_RENDERER_CLS = 'rct9k-item-renderer';
const ITEM_GLOW_CLS = 'rct9k-item-glow';

/**
 * Default values for gradient properties (in item).
 * defaultProps couldn't be used in this case because it doesn't merge the value
 * instead it replaces the value.
 */
const DEFAULT_COLOR = '#3791D4';
const DEFAULT_GRADIENT_BRIGHTNESS = 45;
const DEFAULT_GRADIENT_STOP = 40;
const DEFAULT_REVERSE_DIRECTION = false;

/**
 * Default item renderer class
 * @param {object} props - Component props
 * @param {number} props.itemHeight - The height of the item.
 * @param {object} props.item - The item to be rendered
 * @param {string} props.item.title - The item's title
 * @param {string} props.item.color - The color used for gradient
 * @param {string} props.item.tooltip - The item's tooltip
 * @param {number} props.item.gradientBrightness - Percentage use to lighten the color; the resulted color is used in gradient
 * @param {number} props.item.gradientStop - Percentage; where the first gradient color stops
 * @param {boolean} props.item.reverseDirection - If gradient colors should be reversed
 * @param {boolean} props.item.glowOnHover - If the item should glow on item hover
 */
export class DefaultItemRenderer extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    itemHeight: PropTypes.number
  };

  /**
   * Returns the color used for gradient.
   * @default DEFAULT_COLOR
   */
  getGradientColor() {
    return this.props.item.color || DEFAULT_COLOR;
  }

  /**
   * Returns the gradient brightness. The gradient uses two colors; one is props.color and the other one
   * is the color brightened by props.item.gradientBrightness percentage. Is a number between 0 and 100.
   * @default DEFAULT_GRADIENT_BRIGHTNESS
   */
  getGradientBrightness() {
    return this.props.item.gradientBrightness || DEFAULT_GRADIENT_BRIGHTNESS;
  }

  /**
   * Returns a number between 0 and 100 (percentage), where the first gradient color stops.
   * @default DEFAULT_GRADIENT_STOP
   */
  getGradientStop() {
    return this.props.item.gradientStop || DEFAULT_GRADIENT_STOP;
  }

  /**
   * If the colors in the gradient should be reversed.
   * Default order of the colors in the gradient: [brighter item.color, item.color]
   * @default DEFAULT_REVERSE_DIRECTION
   */
  getReverseDirection() {
    return this.props.item.reverseDirection || DEFAULT_REVERSE_DIRECTION;
  }

  /**
   * Returns the color of the text. When darker colors are used for the items,
   * the text is not visible. This method returns 'white' when props.item.color is darker,
   * otherwise returns black.
   */
  getTextColor() {
    return Color(this.getGradientColor()).light() ? 'black' : 'white';
  }

  /**
   * Create a linear gradient using the base color(calls getGradientColor) and a color obtained adjusting
   * the brightness of that color using getGradientBrightness(). The default order of the colors is
   * [brighter color, color]; this order can be reversed if getReverseDirection() is true.
   *
   * By default, the background of an item uses a gradient, this method should be overriden if this behaviour is not wanted.
   * @returns {string} linear gradient
   */
  getBackgroundGradient() {
    let colors = [
      Color(this.getGradientColor())
        .lightness(this.getGradientBrightness())
        .hexString(),
      this.getGradientColor()
    ];
    if (this.getReverseDirection()) {
      colors.reverse();
    }

    return 'linear-gradient(' + colors[0] + ' ' + this.getGradientStop() + '%, ' + colors[1] + ')';
  }

  /**
   * Returns the height of an item.
   */
  getItemHeight() {
    // subtract 10 because of the margin (see rct9k-items-inner class in style.css)
    return this.props.itemHeight - 10 || 'auto';
  }

  /**
   * Returns the style of the item.
   */
  getStyle() {
    return {
      ...this.props.style,
      color: this.getTextColor(),
      height: this.getItemHeight(),
      background: this.getBackgroundGradient()
    };
  }

  /**
   * Returns a css class used to apply glow on item hover.
   */
  getGlowOnHover() {
    return this.props.item.glowOnHover ? ITEM_GLOW_CLS : '';
  }

  /**
   * Returns the css classes applied on the item.
   */
  getClassName() {
    return DEFAULT_ITEM_RENDERER_CLS + ' ' + this.props.className + ' ' + this.getGlowOnHover();
  }

  /**
   * Returns the title of the item.
   */
  getTitle() {
    return this.props.item.title;
  }

  /**
   * Returns the text rendered in the tooltip.
   */
  getTooltip() {
    return this.props.item.tooltip;
  }

  render() {
    return (
      <span className={this.getClassName()} style={this.getStyle()} title={this.getTooltip()}>
        <span className="rct9k-item-renderer-inner">{this.getTitle()}</span>
      </span>
    );
  }
}

/**
 * Default group (row) renderer class
 * @param {object} props - Component props
 * @param {string} props.labelProperty - The key of the data from group that should be rendered
 * @param {object} props.group - The group to be rendered
 * @param {string} props.group.id - The group's id
 */
export class DefaultGroupRenderer extends React.Component {
  /**
   * Returns the label of the cell.
   */
  getLabel() {
    return this.props.group[this.props.labelProperty];
  }

  render() {
    return (
      <span data-group-index={this.props.group.id}>
        <span>{this.getLabel()}</span>
      </span>
    );
  }
}

/**
 * Default renderer for column header.
 * @param {object} props - Component props
 * @param {object} props.column - The properties of the column
 * @param {string} props.column.headerLabel - The header's label
 */
export class DefaultColumnHeaderRenderer extends React.Component {
  /**
   * Returns the label of the header.
   */
  getLabel() {
    return this.props.column ? this.props.column.headerLabel : '';
  }

  render() {
    return <span>{this.getLabel()}</span>;
  }
}
